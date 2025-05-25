export interface CaseData {
  id: string;
  subject: string;
  description: string;
  priority?: string;
  status?: string;
  createdDate?: string;
  [key: string]: any; // Allow for additional Salesforce fields
}

export interface WebhookResult {
  fields: {
    description: string;
    id: string;
    subject: string;
    [key: string]: any;
  };
  providerEventType: string;
  raw: {
    Description: string;
    Id: string;
    Subject: string;
    attributes?: {
      type: string;
      url: string;
    };
    [key: string]: any;
  };
  rawEvent: {
    [key: string]: any;
  };
  subscribeEventType: string;
}

export interface WebhookData {
  action: string;
  groupName: string;
  groupRef: string;
  installationId: string;
  installationUpdateTime: string;
  objectName: string;
  projectId: string;
  provider: string;
  result: WebhookResult[];
  resultInfo: {
    numRecords: number;
    type: string;
  };
  workspace: string;
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