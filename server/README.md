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
## Development

1. Build the project:
```bash
pnpm build
```

2. Start in production mode:
```bash
pnpm start
``` 