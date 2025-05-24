import { Request, Response } from 'express';
import { WebhookData, ProcessCaseResponse, ErrorResponse } from '../types';
import { CaseAnalysisService } from '../services/caseAnalysisService';
import { validateWebhookData, validateCaseData } from '../utils/validation';
import { logger } from '../utils/logger';

/**
 * Controller for handling webhook requests
 */
export class WebhookController {
  private caseAnalysisService: CaseAnalysisService;

  constructor() {
    this.caseAnalysisService = new CaseAnalysisService();
  }

  /**
   * Processes incoming webhook data for case analysis
   */
  async processWebhook(req: Request, res: Response): Promise<void> {
    const requestId = this.generateRequestId();
    
    try {
      logger.setContext({ requestId });
      logger.info('Processing webhook request', { 
        method: req.method,
        url: req.url,
        userAgent: req.get('User-Agent')
      });

      const webhookData = req.body;
      // Validate webhook data structure
      if (!validateWebhookData(webhookData)) {
        logger.warn('Invalid webhook data format', { webhookData });
        this.sendErrorResponse(res, 400, 'Invalid webhook data format');
        return;
      }

      const caseData = webhookData.caseData;

      // Validate case data
      if (!validateCaseData(caseData)) {
        logger.warn('Invalid case data', { caseData });
        this.sendErrorResponse(res, 400, 'Invalid case data: missing required fields');
        return;
      }

      logger.info('Processing case', { caseId: caseData.id });

      // Analyze the case
      const analysisResponse = await this.caseAnalysisService.analyzeCase(caseData);
      
      // Extract analysis results for additional context
      const analysisResults = this.caseAnalysisService.extractAnalysisResults(analysisResponse);

      const response: ProcessCaseResponse = {
        text: analysisResponse.text,
        analysis: analysisResults || undefined,
      };

      logger.info('Case processing completed successfully', { 
        caseId: caseData.Id,
        severity: analysisResults?.severity 
      });

      res.status(200).json(response);

    } catch (error) {
      logger.error('Error processing webhook', { 
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      
      this.sendErrorResponse(res, 500, 'Internal server error');
    } finally {
      logger.clearContext();
    }
  }

  /**
   * Sends standardized error response
   */
  private sendErrorResponse(res: Response, statusCode: number, message: string, details?: string): void {
    const errorResponse: ErrorResponse = {
      error: message,
      ...(details && { details }),
    };
    
    res.status(statusCode).json(errorResponse);
  }

  /**
   * Generates a unique request ID for tracking
   */
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
} 