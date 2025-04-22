# Case Sherpa

An AI agent that triages new & updated Salesforce Cases using Mastra framework.

## Features

- Analyzes case Subject and Description to classify severity (High/Medium/Low)
- Generates a one-sentence summary of the case
- Posts high-severity cases to Slack
- Uses GPT-4 for accurate case analysis

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Set up your OpenAI API key in `.env`:
```bash
OPENAI_API_KEY=your_api_key_here
```

3. Add Ampersand API key in `.env`: 

```bash
AMPERSAND_API_KEY=your_api_key_here
```

4. (Optional) Configure Slack webhook URL in `.env` for high-severity notifications:
```bash
SLACK_WEBHOOK_URL=your_webhook_url_here
```

## Usage

### Development Mode

Run the Mastra development server:
```bash
pnpm dev
```

This will start a server at http://localhost:4111 with the following endpoints:
- POST `/api/workflows/case-sherpa/start` - Start a new case triage workflow
- GET `/api/workflows/case-sherpa/status/:runId` - Check workflow status

### Test the Workflow

Run the test script with a sample case:
```bash
pnpm test
```

### API Example

```bash
curl -X POST http://localhost:4111/api/workflows/case-sherpa/start \
  -H "Content-Type: application/json" \
  -d '{
    "Id": "CASE-001",
    "Subject": "Production server down",
    "Description": "Our main production server has crashed and all customers are affected. Need immediate assistance."
  }'
```

## Project Structure

- `src/mastra/workflows/case-triage.ts` - Main workflow definition
- `src/mastra/index.ts` - Mastra instance configuration
- `src/test.ts` - Test script with sample case

## Development

1. Build the project:
```bash
pnpm build
```

2. Start in production mode:
```bash
pnpm start
``` 