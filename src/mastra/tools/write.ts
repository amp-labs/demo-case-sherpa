import { z } from "zod";
import { SDKNodeWrite } from "@amp-labs/sdk-node-write";
import { createTool } from "@mastra/core/tools";
import {
  WriteRecordsResponse,
  WriteRecordsSyncWriteResponseSuccess,
} from "@amp-labs/sdk-node-write/models/operations";

export const CaseResultSchema = z.object({
  AI_Severity__c: z.enum(["High", "Medium", "Low"]),
  AI_Summary__c: z.string(),
  Id: z.string(),
}).describe("The data to write to Salesforce");

const providerSchema = z
  .string()
  .describe(
    `The provider to connect to. Typically a SaaS tool like Monday, Hubspot, Salesforce, etc.`
  );

export const createActionTool = createTool({
  id: "create-record",
  description: `Perform a create operation on provider`,
  inputSchema: z.object({
    provider: providerSchema,
    objectName: z.string().describe("The name of the object to write to"),
    type: z.enum(["create"]).describe("The type of write operation"),
    record: z.record(z.any()).describe("The record data to write"),
    groupRef: z
      .string()
      .describe("The group reference for the write operation"),
    associations: z
      .array(
        z.object({
          to: z.object({
            id: z.string(),
          }),
          types: z.array(
            z.object({
              associationCategory: z.string(),
              associationTypeId: z.number(),
            })
          ),
        })
      )
      .optional()
      .describe("Optional associations for the record"),
  }),
  outputSchema: z.object({
    status: z.string(),
    recordId: z.string(),
    response: z.any(),
  }),
  execute: async ({ context }) => {
    console.log("Calling createActionTool");
    const { provider, objectName, type, record, groupRef, associations } =
      context;
    try {
      const writeSDK = new SDKNodeWrite({
        apiKeyHeader: process.env.AMPERSAND_API_KEY || "",
      });
      const writeData = {
        projectIdOrName: process.env.AMPERSAND_PROJECT_ID || "",
        integrationId: process.env.AMPERSAND_INTEGRATION_ID || "",
        objectName,
        requestBody: {
          provider,
          groupRef,
          type,
          record,
          ...(associations && { associations }),
        },
      };

      const data: WriteRecordsResponse = await writeSDK.write.records(
        writeData
      );

      console.log(`${type} operation on provider succeeded:`, data);

      return {
        status: "success",
        recordId:
          (data as WriteRecordsSyncWriteResponseSuccess)?.result?.recordId ||
          "",
        response: data,
      };
    } catch (error) {
      console.error("Error in write operation:", error);
      return {
        status: "error",
        recordId: "",
        response: error,
      };
    }
  },
});

export const updateActionTool = createTool({
  id: "update-record",
  description: `Perform an update operation on provider`,
  inputSchema: z.object({
    provider: providerSchema,
    objectName: z.string().describe("The name of the object to write to"),
    type: z.enum(["update"]).describe("The type of write operation"),
    record: CaseResultSchema,
    groupRef: z
      .string()
      .describe("The group reference for the write operation"),
    associations: z
      .array(
        z.object({
          to: z.object({
            id: z.string(),
          }),
          types: z.array(
            z.object({
              associationCategory: z.string(),
              associationTypeId: z.number(),
            })
          ),
        })
      )
      .optional()
      .describe("Optional associations for the record"),
  }),
  outputSchema: z.object({
    status: z.string(),
    recordId: z.string(),
    response: z.any(),
  }),
  execute: async ({ context }) => {

    const { provider, objectName, type, record, groupRef, associations } =
      context;

    // TODO: Get groupRef somehow.
    console.log("Calling updateActionTool", provider, objectName, type, record, groupRef, associations);
    try {
      const writeSDK = new SDKNodeWrite({
        apiKeyHeader: process.env.AMPERSAND_API_KEY || "",
      });
      const writeData = {
        projectIdOrName: process.env.AMPERSAND_PROJECT_ID || "",
        integrationId: process.env.AMPERSAND_INTEGRATION_ID || "",
        objectName,
        requestBody: {
          groupRef,
          type,
          record,
          ...(associations && { associations }),
        },
      };

      const data: WriteRecordsResponse = await writeSDK.write.records(
        writeData
      );

      console.log(`${type} operation on provider succeeded:`, data);

      return {
        status: "success",
        recordId:
          (data as WriteRecordsSyncWriteResponseSuccess)?.result?.recordId ||
          "",
        response: data,
      };
    } catch (error) {
      console.error("Error in write operation:", error);
      return {
        status: "error",
        recordId: "",
        response: error,
      };
    }
  },
});
