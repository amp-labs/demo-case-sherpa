import { WebhookData, CaseData, WebhookResult } from '../types';

/**
 * Validates webhook data structure
 */
export function validateWebhookData(data: any): data is WebhookData {
  if (!data || typeof data !== 'object') {
    return false;
  }

  // Check for required top-level fields
  const requiredFields = [
    'action', 'groupName', 'groupRef', 'installationId', 
    'objectName', 'provider', 'result', 'resultInfo'
  ];
  
  const hasRequiredFields = requiredFields.every(field => 
    data[field] !== undefined && data[field] !== null
  );

  if (!hasRequiredFields) {
    return false;
  }

  // Validate result is an array
  if (!Array.isArray(data.result)) {
    return false;
  }

  // Validate resultInfo structure
  if (!data.resultInfo || typeof data.resultInfo !== 'object' || 
      typeof data.resultInfo.numRecords !== 'number') {
    return false;
  }

  // Validate each result item has required structure
  return data.result.every((item: any) => validateWebhookResult(item));
}

/**
 * Validates individual webhook result structure
 */
export function validateWebhookResult(result: any): result is WebhookResult {
  if (!result || typeof result !== 'object') {
    return false;
  }

  // Check for required fields
  if (!result.fields || typeof result.fields !== 'object') {
    return false;
  }

  // Check that fields has required case data
  const fields = result.fields;
  if (!fields.id || !fields.subject || !fields.description) {
    return false;
  }

  return true;
}

/**
 * Extracts case data from webhook result
 */
export function extractCaseDataFromWebhook(webhookData: WebhookData): CaseData[] {
  return webhookData.result.map(result => {
    const { id, subject, description, ...otherFields } = result.fields;
    return {
      id,
      subject,
      description,
      // Extract additional fields from raw data if available
      priority: result.raw?.Priority,
      status: result.raw?.Status,
      createdDate: result.raw?.CreatedDate,
      // Include any other fields from the fields object (excluding the main ones to avoid duplicates)
      ...otherFields
    };
  });
}

export function extractGroupRefFromWebhook(webhookData: WebhookData): string {
  return webhookData.groupRef;
}

/**
 * Validates case data has required fields
 */
export function validateCaseData(caseData: any): caseData is CaseData {
  if (!caseData || typeof caseData !== 'object') {
    return false;
  }

  // Check for required fields
  const requiredFields = ['id', 'subject', 'description']; 
  const hasRequiredFields = requiredFields.every(field => 
    caseData[field] && typeof caseData[field] === 'string'
  );

  if (!hasRequiredFields) {
    return false;
  }

  // Check for at least one of Subject or Description
  const hasContent = caseData.subject || caseData.description;
  
  return Boolean(hasContent);
}

/**
 * Sanitizes case data for processing
 */
export function sanitizeCaseData(caseData: CaseData): CaseData {
  return {
    ...caseData,
    subject: caseData.subject?.trim() || '',
    description: caseData.description?.trim() || '',
  };
} 