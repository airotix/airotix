import express from "express";
import dotenv from "dotenv";
import { OpenRouter } from "@openrouter/sdk";
import type { EventStream } from "@openrouter/sdk/lib/event-streams.js";
import type { ChatStreamChunk } from "@openrouter/sdk/models/chatstreamchunk.js";
import type { ChatResult } from "@openrouter/sdk/models/chatresult.js";
import { SYSTEM_PROMPT } from "../shared/system-prompt";

// Load environment variables
dotenv.config();

// Type guard: check if the response is an EventStream (ReadableStream)
function isEventStream(
  value: ChatResult | EventStream<ChatStreamChunk>
): value is EventStream<ChatStreamChunk> {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof (value as EventStream<ChatStreamChunk>).getReader === "function"
  );
}

// Type guard: check if the response is a non-streaming ChatResult
function isChatResult(
  value: ChatResult | EventStream<ChatStreamChunk>
): value is ChatResult {
  return (
    value !== null &&
    typeof value === "object" &&
    Array.isArray((value as ChatResult).choices)
  );
}

// Detect if running on Vercel serverless (Vercel sets this env var automatically)
const IS_VERCEL = process.env.VERCEL === "1";

// Retry helper for OpenRouter rate limits (429)
async function sendWithRetry(
  openrouter: OpenRouter,
  chatRequest: { model: string; messages: any[]; stream: boolean },
  maxRetries = 2
) {
  let lastError: any;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await openrouter.chat.send({ chatRequest });
    } catch (error: any) {
      lastError = error;
      // Only retry on rate limit (429)
      if (error?.statusCode === 429 && attempt < maxRetries) {
        const retryAfter =
          error?.data$?.error?.metadata?.retry_after_seconds || 5;
        const delay = Math.max(retryAfter, 5) * 1000;
        console.log(
          `Rate limited, retrying in ${delay / 1000}s (attempt ${attempt + 1}/${maxRetries})`
        );
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}

// Create the Express app (local development server only).
// NOTE: This server is NOT used in production. The production chatbot
// runs as a Vercel serverless function in api/chat.ts. This Express app
// exists purely for local development (streaming chat UX).
export function createApp() {
  const app = express();

  // Middleware
  app.use(express.json());

  // Initialize OpenRouter client
  const openrouter = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY || "",
  });

  // Chat endpoint with streaming
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required" });
      }

      if (!process.env.OPENROUTER_API_KEY) {
        return res
          .status(500)
          .json({ error: "OpenRouter API key is not configured" });
      }

      // Set up SSE headers for streaming
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      // Prepend system prompt
      const fullMessages = [{ role: "system", content: SYSTEM_PROMPT }, ...messages];

      // On Vercel serverless, use non-streaming mode (streaming is unreliable on serverless).
      // Locally, keep streaming for a nicer UX.
      const useStreaming = !IS_VERCEL;

      // Send the request to OpenRouter (with retry on rate limits)
      const response = await sendWithRetry(openrouter, {
        model: "openai/gpt-oss-20b:free",
        messages: fullMessages,
        stream: useStreaming,
      });

      if (useStreaming && isEventStream(response)) {
        // Streaming mode (local) — iterate over the stream
        const reader = response.getReader();

        while (true) {
          const { done, value: chunk } = await reader.read();
          if (done) break;

          if (chunk) {
            const content = chunk.choices?.[0]?.delta?.content;
            if (content) {
              res.write(`data: ${JSON.stringify({ content })}\n\n`);
            }

            if (chunk.usage) {
              res.write(
                `data: ${JSON.stringify({ usage: chunk.usage, done: true })}\n\n`
              );
            }
          }
        }
      } else if (isChatResult(response)) {
        // Non-streaming mode (Vercel or fallback) — send the full content as one chunk
        const content = response.choices?.[0]?.message?.content;
        if (content) {
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
        if (response.usage) {
          res.write(
            `data: ${JSON.stringify({ usage: response.usage, done: true })}\n\n`
          );
        }
      }

      res.write("data: [DONE]\n\n");
      res.end();
    } catch (error: any) {
      console.error("Chat API error:", error);

      // Build a helpful error message based on the error type
      let errorMessage = "Failed to get response from AI";
      if (error?.statusCode === 429) {
        errorMessage =
          "The AI service is temporarily rate-limited. Please try again in a moment.";
      } else if (error?.statusCode === 401 || error?.statusCode === 403) {
        errorMessage = "The AI service API key is invalid or unauthorized.";
      } else if (error?.statusCode === 400) {
        errorMessage = "The AI service rejected the request. Please try a different question.";
      } else if (error?.message?.includes("fetch failed") || error?.code === "ECONNREFUSED") {
        errorMessage = "Could not reach the AI service. Please check your connection.";
      }

      // If headers haven't been sent yet, send error as JSON
      if (!res.headersSent) {
        res.status(500).json({ error: errorMessage });
      } else {
        // If streaming has started, send error as SSE
        res.write(`data: ${JSON.stringify({ error: errorMessage })}\n\n`);
        res.end();
      }
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "AIROTIX Chat API is running" });
  });

  return app;
}