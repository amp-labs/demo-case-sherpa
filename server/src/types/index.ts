export interface CaseData {
  id: string;
  subject: string;
  description: string;
  priority?: string;
  status?: string;
  createdDate?: string;
  [key: string]: any; // Allow for additional Salesforce fields
}

export interface WebhookData {
  "caseData": CaseData;
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