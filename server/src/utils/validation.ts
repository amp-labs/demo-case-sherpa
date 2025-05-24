import { WebhookData, CaseData } from '../types';

/**
 * Validates webhook data structure
 */
export function validateWebhookData(data: any): data is WebhookData {
  if (!data || typeof data !== 'object') {
    return false;
  }
  return true;
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
    Subject: caseData.Subject?.trim() || '',
    Description: caseData.Description?.trim() || '',
  };
} 