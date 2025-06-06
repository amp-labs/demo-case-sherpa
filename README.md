# Case Sherpa

An AI agent that triages new Salesforce Cases using the Mastra framework & Ampersand.

## What it does

Case Sherpa automatically processes incoming Salesforce cases by analyzing their content with AI to determine severity levels of a case and generates concise summaries, then updates the cases with this enriched information.

## Demo

<video width="100%" style="max-width: 800px;" controls>
  <source src="./assets/case-sherpa-demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>


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


