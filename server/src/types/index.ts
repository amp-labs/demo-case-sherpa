export interface CaseData {
  Id: string;
  Subject: string;
  Description: string;
  Priority?: string;
  Status?: string;
  CreatedDate?: string;
  [key: string]: any; // Allow for additional Salesforce fields
}

export interface WebhookData {
  result: Array<{
    fields: CaseData;
  }>;
}

export interface CaseAnalysisResult {
  severity: 'High' | 'Medium' | 'Low';
  summary: string;
}

export interface ProcessCaseResponse {
  text: string;
  analysis?: CaseAnalysisResult;
}

export interface ErrorResponse {
  error: string;
  details?: string;
}

export interface AgentResponse {
  text: string;
  toolCalls?: any[];
} 