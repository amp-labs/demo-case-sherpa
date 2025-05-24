import { CaseData, AgentResponse, CaseAnalysisResult } from '../types';
import { caseSherpaAgent } from '../mastra/agents';
import { logger } from '../utils/logger';
import { sanitizeCaseData } from '../utils/validation';

/**
 * Service for analyzing Salesforce cases using AI
 */
export class CaseAnalysisService {
  async analyzeCase(caseData: CaseData): Promise<AgentResponse> {
    try {
      logger.info('Starting case analysis', { caseId: caseData.id });
      
      const sanitizedData = sanitizeCaseData(caseData);
      
      const prompt = this.buildAnalysisPrompt(sanitizedData);
      
      const response = await caseSherpaAgent.generate([
        { role: "user", content: prompt },
      ]);

      logger.info('Case analysis completed', { 
        caseId: caseData.id,
        responseLength: response?.text?.length || 0 
      });

      return response;
    } catch (error) {
      logger.error('Failed to analyze case', { 
        caseId: caseData.id,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw new Error(`Case analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  private buildAnalysisPrompt(caseData: CaseData): string {
    const caseInfo = {
      id: caseData.Id,
      subject: caseData.subject || 'No subject provided',
      description: caseData.description || 'No description provided',
    };

    return `  
    Please analyze the following Salesforce case data and determine its severity:

    Case Information:
    ${JSON.stringify(caseInfo, null, 2)}

    Please provide:
    1. Severity classification (High/Medium/Low)
    2. A concise summary of the issue
    3. Update the case record with your analysis

    Focus on:
    - Business impact and urgency
    - Number of users affected
    - System criticality
    - Security implications
    - Time sensitivity`;
  }

  extractAnalysisResults(response: AgentResponse): CaseAnalysisResult | null {
    try {
      const text = response.text?.toLowerCase() || '';
      
      // Simple extraction logic - could be enhanced with more sophisticated parsing
      let severity: 'High' | 'Medium' | 'Low' = 'Medium';
      
      if (text.includes('high') || text.includes('critical') || text.includes('urgent')) {
        severity = 'High';
      } else if (text.includes('low') || text.includes('minor')) {
        severity = 'Low';
      }

      const summary = response.text?.split('.')[0]?.trim() || 'Analysis completed';
      
      return {
        severity,
        summary: summary.length > 200 ? summary.substring(0, 197) + '...' : summary,
      };
    } catch (error) {
      logger.error('Failed to extract analysis results', { error });
      return null;
    }
  }
} 