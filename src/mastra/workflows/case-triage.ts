import { Step, Workflow } from "@mastra/core/workflows";
import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { createActionTool, updateActionTool } from "../tools";
import { caseSherpaAgent } from "../agents";  
// Define schemas for case data
const CaseSchema = z.object({
  Id: z.string(),
  Subject: z.string(),
  Description: z.string(),
});

const CaseResultSchema = z.object({
  AI_Severity__c: z.enum(["High", "Medium", "Low"]),
  AI_Summary__c: z.string(),
  Id: z.string(),
});

const classifyCaseStep = new Step({
  id: "classifyCase",
  inputSchema: CaseSchema,
  outputSchema: CaseResultSchema,
  execute: async ({ context }) => {
    const { Subject, Description, Id } = context.inputData;

    const prompt = `
      Analyze this Salesforce case and:
      1. Classify its severity as High, Medium, or Low
      2. Generate a one-sentence summary
      
      Case ID: ${Id}
      Case Subject: ${Subject}
      Case Description: ${Description}
      
      Respond in JSON format:
      {
        "AI_Severity__c": "High|Medium|Low",
        "AI_Summary__c": "one sentence summary",
        "Id": "${Id}"
      }
    `;

    const response = await caseSherpaAgent.stream([
      {
        role: 'user',
        content: prompt,
      },
    ],       {
      output: CaseResultSchema,
    });

    let result = '';
    for await (const chunk of response.textStream) {
      result += chunk;
    }
    // Parse and validate the response
    return CaseResultSchema.parse(JSON.parse(result));
  },
});

// Step 2: Post to Slack if severity is high
const postToSlackStep = new Step({
  id: "postToSlack",
  inputSchema: CaseResultSchema,
  execute: async ({ context }) => {
    const { AI_Severity__c, AI_Summary__c, Id } = context.inputData;
    
    if (AI_Severity__c === "High") {
      console.log(`[SLACK] High severity case ${Id}: ${AI_Summary__c}`);
      // TODO: Post to Slack
    }
    
    return { posted: AI_Severity__c === "High" };
  },
});

// Create and export the workflow
export const caseSherpaWorkflow = new Workflow({
  name: "caseSherpaWorkflow",
  triggerSchema: CaseSchema
});

// Build the workflow
caseSherpaWorkflow
  .step(classifyCaseStep, {
    variables: {
      Id: { step: 'trigger', path: 'Id' },
      Subject: { step: 'trigger', path: 'Subject' },
      Description: { step: 'trigger', path: 'Description' }
    }
  })
  .then(postToSlackStep, {
    variables: {
      AI_Severity__c: { step: classifyCaseStep, path: 'AI_Severity__c' },
      AI_Summary__c: { step: classifyCaseStep, path: 'AI_Summary__c' },
      Id: { step: classifyCaseStep, path: 'Id' }
    }
  })
  .commit(); 