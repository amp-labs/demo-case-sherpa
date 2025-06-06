# Case Sherpa

An AI agent that triages new Salesforce Cases using the Mastra framework & Ampersand.

## What it does

Case Sherpa automatically processes incoming Salesforce cases by analyzing their content with AI to determine severity levels of a case and generates concise summaries, then updates the cases with this enriched information.

## Features

- Analyzes case Subject and Description to classify severity (High/Medium/Low)
- Generates a one-sentence summary of the case
- Writes back this information to Salesforce custom fields 
- Uses GPT-4 for accurate case analysis

## Directory Structure

```
case-sherpa/
├── client/          # Frontend application (React/Vite)
├── server/          # Backend API server (Mastra framework)
├── amp/             # Ampersand configuration for Salesforce integration
└── README.md        # Project documentation
```


