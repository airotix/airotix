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
├── api/                  # Vercel serverless function (chatbot API)
│   └── index.ts
├── server/               # Express backend
│   ├── app.ts            # Shared Express app (used by local + Vercel)
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
- The `/api/*` routes are handled by the serverless function in `api/index.ts` (the Express app).
- The `vercel.json` rewrite routes `/api/chat` and `/api/health` to the serverless function.
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