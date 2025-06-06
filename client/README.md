# Case Sherpa Client

A React-based frontend application for the Case Sherpa AI case triage system.

## Project Structure

```
src/
├── App.tsx          # Main component
├── main.tsx         # Entry point
├── index.css        # Global styles
└── vite-env.d.ts    # Vite types
```


## Prerequisites

- Node.js 16+
- pnpm (recommended) or npm
- Running Case Sherpa server instance

## Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Create `.env` file if needed:
   ```env
   VITE_AMPERSAND_API_KEY= <Your Ampersand Api key>
   VITE_AMPERSAND_PROJECT_ID= <Your Ampersand project id>
   ```

## Development

Start development server:
```bash
pnpm dev
```

Application runs at `http://localhost:3006`

## Build

```bash
# Production build
pnpm build
```

```bash
# Preview build
pnpm preview
```

