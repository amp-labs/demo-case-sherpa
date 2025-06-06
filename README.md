# Case Sherpa

An AI agent that triages new Salesforce Cases using the Mastra framework & Ampersand.

## What it does

Case Sherpa automatically processes incoming Salesforce cases by analyzing their content with AI to determine severity levels of a case and generates concise summaries, then updates the cases with this enriched information.

## Demo


https://github.com/user-attachments/assets/0e6be9ca-ca3a-4428-981e-f04d9c19b870


## Features

- Analyzes case Subject and Description to classify severity (High/Medium/Low)
- Generates a one-sentence summary of the case
- Writes back this information to Salesforce custom fields 
- Uses GPT-4 for accurate case analysis

## Project Structure

```
case-sherpa/
├── client/          # Frontend application (React/Vite)
├── server/          # Backend API server (Mastra framework)
├── amp/             # Ampersand configuration for Salesforce integration
└── README.md        # Project documentation
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


