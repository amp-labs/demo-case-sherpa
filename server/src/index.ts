import express from 'express';
import { config, validateConfig } from './config';
import { WebhookController } from './controllers/webhookController';
import { logger } from './utils/logger';

/**
 * Case Sherpa Server
 * Handles webhook requests for Salesforce case analysis
 */

try {
  validateConfig();
  logger.info('Configuration validated successfully');
} catch (error) {
  logger.error('Configuration validation failed', { 
    error: error instanceof Error ? error.message : 'Unknown error' 
  });
  process.exit(1);
}

const app = express();
const webhookController = new WebhookController();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use((req, res, next) => {
  logger.info('Incoming request', {
    method: req.method,
    url: req.url,
    userAgent: req.get('User-Agent'),
    contentType: req.get('Content-Type'),
  });
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
  });
});

// Main webhook processing endpoint
app.post('/process', async (req, res) => {
  await webhookController.processWebhook(req, res);
});

app.use('*', (req, res) => {
  logger.warn('Route not found', { 
    method: req.method, 
    url: req.url 
  });
  res.status(404).json({ 
    error: 'Route not found',
    path: req.url,
    method: req.method,
  });
});

app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error', { 
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
  });
  
  res.status(500).json({ 
    error: 'Internal server error',
    timestamp: new Date().toISOString(),
  });
});


process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});


const server = app.listen(config.server.port, () => {
  logger.info('Server started successfully', { 
    port: config.server.port,
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version,
  });
});


server.on('error', (error: Error) => {
  logger.error('Server error', { error: error.message });
  process.exit(1);
});

export default app;
