# AIROTIX Website

AIROTIX is a company that builds high-performance AI and computer vision systems for enterprise automation. This repository contains the AIROTIX marketing website with an integrated AI chatbot advisor.

## Tech Stack

- **Frontend**: Vite + React + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Express + OpenRouter SDK (AI chatbot)
- **Deployment**: Vercel (frontend + serverless API)

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm
- An [OpenRouter API key](https://openrouter.ai/keys)

### Installation

```sh
# 1. Install dependencies
npm install

# 2. Create your environment file
cp .env.example .env
# Then edit .env and add your OpenRouter API key:
# OPENROUTER_API_KEY=sk-or-v1-...
```

### Running Locally

Run both the frontend and backend together:

```sh
npm run dev:all
```

- **Frontend**: http://localhost:8080
- **Backend (chatbot API)**: http://localhost:3001

Or run them separately in two terminals:

```sh
# Terminal 1 — Backend (chatbot server)
npm run dev:server

# Terminal 2 — Frontend (website)
npm run dev
```

## Project Structure

```
├── api/                  # Vercel serverless functions
│   ├── chat.ts           # Chatbot API (/api/chat) → OpenRouter
│   └── index.ts          # Health check (/api)
├── server/               # Express backend (local development)
│   ├── app.ts            # Shared Express app + system prompt
│   └── index.ts          # Local server entry point
├── src/                  # React frontend
│   ├── components/       # UI components (incl. ChatBot.tsx)
│   ├── pages/            # Page components
│   └── ...
├── public/               # Static assets
├── vercel.json           # Vercel configuration
└── .env.example          # Environment variable template
```

## Chatbot

The AIROTIX AI Advisor is a floating chat widget available on every page. It uses OpenRouter's `openai/gpt-oss-20b:free` model with a custom system prompt that keeps responses concise and on-brand.

- **Frontend**: `src/components/ChatBot.tsx`
- **Backend**: `server/app.ts` (system prompt + streaming logic)

## Deploying to Vercel

### Option 1: Vercel Dashboard (recommended)

1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **Add New → Project**.
3. Import your GitHub repository.
4. Vercel will auto-detect the Vite framework. The `vercel.json` config handles the rest.
5. **Add the environment variable** (Settings → Environment Variables):
   - `OPENROUTER_API_KEY` = your OpenRouter API key
6. Click **Deploy**.

### Option 2: Vercel CLI

```sh
# Install Vercel CLI
npm i -g vercel

# Deploy (first time will prompt for setup)
vercel

# Set the environment variable
vercel env add OPENROUTER_API_KEY production

# Deploy to production
vercel --prod
```

### How it works on Vercel

- The frontend builds to `dist/` and is served as static files.
- The `/api/chat` route is handled by the serverless function in `api/chat.ts`, which calls OpenRouter in non-streaming mode and formats the response as SSE so the ChatBot works unchanged.
- The `/api` route is a health check in `api/index.ts`.
- The `vercel.json` rewrites keep `/api/*` pointing at the serverless functions and route all other paths to `/index.html` for client-side routing.
- The `OPENROUTER_API_KEY` environment variable is injected at runtime.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend dev server (port 8080) |
| `npm run dev:server` | Start backend dev server (port 3001) |
| `npm run dev:all` | Run both frontend + backend together |
| `npm run build` | Build the site for production |
| `npm run preview` | Preview the production build |
| `npm run server` | Run the backend without watch mode |
| `npm run lint` | Run ESLint |