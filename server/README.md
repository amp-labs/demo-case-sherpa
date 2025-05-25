# Case Sherpa Server

An AI-powered case triage system that analyzes Salesforce cases to determine severity and provide intelligent summaries using Mastra agents.

## 🏗️ Architecture

The codebase follows a clean, modular architecture with clear separation of concerns:

```
src/
├── config/           # Configuration and environment variables
├── controllers/      # HTTP request handlers
├── services/         # Business logic and external integrations
├── mastra/          # AI agents and workflows
│   └── agents/      # Mastra agent configurations
├── types/           # TypeScript type definitions
├── utils/           # Utility functions and helpers
│   ├── logger.ts    # Structured logging
│   └── validation.ts # Data validation
└── index.ts         # Application entry point
```

## 🚀 Features

- **AI-Powered Case Analysis**: Uses OpenAI GPT-4 to analyze Salesforce cases
- **Intelligent Severity Classification**: Automatically categorizes cases as High/Medium/Low severity
- **Automated Summaries**: Generates concise, actionable case summaries
- **Salesforce Integration**: Updates case records with AI analysis via Ampersand
- **Structured Logging**: Comprehensive logging with request tracking
- **Type Safety**: Full TypeScript implementation with proper interfaces
- **Error Handling**: Robust error handling and validation
- **Health Monitoring**: Built-in health check endpoint

## 📋 Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Salesforce org with custom fields configured
- Ampersand integration setup

## 🔧 Setup

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Environment Configuration**:
   Create a `.env` file with the required variables:
   ```env
   # Server Configuration
   PORT=4001
   NODE_ENV=development

   # Ampersand Configuration
   AMPERSAND_API_KEY=your_api_key_here
   AMPERSAND_PROJECT_ID=your_project_id_here
   AMPERSAND_INTEGRATION_NAME=your_integration_name_here

   # OpenAI Configuration (if needed)
   OPENAI_API_KEY=your_openai_key_here
   ```

3. **Salesforce Custom Fields**:
   Ensure your Salesforce Case object has these custom fields:
   - `AI_Severity_c__c` (Picklist: High, Medium, Low)
   - `AI_Summary_c__c` (Text Area, 255 characters)

## 🏃‍♂️ Running the Application

### Development Mode
```bash
# Start with hot reload
pnpm dev

# Start Mastra development server
pnpm mastra:dev
```

### Production Mode
```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 📡 API Endpoints

### POST `/process`
Processes incoming Salesforce case webhooks for AI analysis.

**Request Body**:
```json
{
  "result": [
    {
      "fields": {
        "Id": "5003000000D8cuI",
        "Subject": "Login issues with mobile app",
        "Description": "Users unable to authenticate via mobile application",
        "Priority": "High",
        "Status": "New"
      }
    }
  ]
}
```

**Response**:
```json
{
  "text": "Based on my analysis, this case has Medium severity...",
  "analysis": {
    "severity": "Medium",
    "summary": "Authentication issues affecting mobile app users"
  }
}
```

### GET `/health`
Health check endpoint for monitoring.

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0"
}
```

## 🤖 AI Agent Configuration

The Case Sherpa Agent is configured with:

- **Model**: GPT-4 (configurable)
- **Tools**: Ampersand updateRecordTool for Salesforce updates
- **Instructions**: Comprehensive case analysis guidelines
- **Severity Criteria**: Predefined classification rules

### Severity Classification

- **High**: Critical system issues, production outages, data loss, security incidents
- **Medium**: Functional issues affecting multiple users, non-critical bugs  
- **Low**: Minor issues, documentation requests, single user problems

## 🔍 Logging

The application uses structured JSON logging with:

- Request tracking with unique IDs
- Contextual information for debugging
- Error stack traces and details
- Performance metrics

Log format:
```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "level": "info",
  "message": "Processing case",
  "requestId": "req_1705312200000_abc123",
  "caseId": "5003000000D8cuI"
}
```

## 🛠️ Development

### Code Structure

- **Types**: All interfaces defined in `src/types/`
- **Configuration**: Centralized in `src/config/`
- **Validation**: Input validation in `src/utils/validation.ts`
- **Services**: Business logic in `src/services/`
- **Controllers**: HTTP handling in `src/controllers/`

### Adding New Features

1. Define types in `src/types/`
2. Add configuration if needed in `src/config/`
3. Implement business logic in `src/services/`
4. Create controller methods in `src/controllers/`
5. Update routes in `src/index.ts`

### Testing

```bash
# Run tests (when implemented)
pnpm test

# Lint code
pnpm lint
```

## 🚨 Error Handling

The application includes comprehensive error handling:

- Input validation with detailed error messages
- Graceful degradation for external service failures
- Structured error logging with context
- Proper HTTP status codes and responses

## 📊 Monitoring

Monitor the application using:

- Health check endpoint (`/health`)
- Structured logs for debugging
- Request tracking with unique IDs
- Error rate monitoring via logs

## 🔒 Security

- Input validation on all endpoints
- Environment variable validation
- Secure error messages (no sensitive data exposure)
- Request size limits (10MB max)

## 📝 License

This project is licensed under the ISC License. 