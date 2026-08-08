import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenRouter } from "@openrouter/sdk";
import type { EventStream } from "@openrouter/sdk/lib/event-streams.js";
import type { ChatStreamChunk } from "@openrouter/sdk/models/chatstreamchunk.js";
import type { ChatResult } from "@openrouter/sdk/models/chatresult.js";

// Load environment variables
dotenv.config();

// System prompt for the AIROTIX assistant — optimized for concise streaming responses
export const SYSTEM_PROMPT = `You are the AIROTIX AI Advisor, a concise expert assistant for AIROTIX, a company that builds high-performance AI and computer vision systems for enterprise automation.

About AIROTIX (use this context to answer accurately, but keep answers brief):
- AIROTIX builds AI and computer vision systems that see, understand, and act in real time
- Services: Computer Vision & Defect Detection, AI Automation & Workflow, LLM Fine-Tuning & NLP, Predictive Analytics, Edge AI Deployment, AI Strategy Consulting
- Industries: Manufacturing, Retail, Healthcare, Logistics, Agriculture, and more
- Key metrics: 120+ FPS inspection, defect escape <0.1% from ~2%, retail inventory discrepancies reduced by 34%, $2M+ annual waste reduction, deployment 2-4 months
- LLM fine-tuning uses LoRA and QLoRA

CRITICAL CONCISENESS RULES — Follow these strictly:
1. Keep every response to 2-4 short sentences (max 80 words).
2. NEVER use tables, markdown tables, or lengthy lists. Use at most 2 bullet points if helpful.
3. Answer the question directly in the first sentence. Add one supporting detail or metric maximum.
4. End with a brief follow-up question like "Would you like to explore a specific use case?" or "Want to learn more about [topic]?"
5. If asked about pricing: "Pricing depends on your use case and scale. Contact AIROTIX for a free consultation and estimate."
6. If outside scope: briefly redirect to relevant AI/automation topics in 1-2 sentences.
7. Be professional, warm, and direct. No fluff.`;

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

// Create the Express app (shared between local server and Vercel serverless)
export function createApp() {
  const app = express();

  // Middleware
  app.use(cors());
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

      // Send the request to OpenRouter
      const response = await openrouter.chat.send({
        chatRequest: {
          model: "openai/gpt-oss-20b:free",
          messages: fullMessages,
          stream: useStreaming,
        },
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
    } catch (error) {
      console.error("Chat API error:", error);

      // If headers haven't been sent yet, send error as JSON
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to get response from AI" });
      } else {
        // If streaming has started, send error as SSE
        res.write(`data: ${JSON.stringify({ error: "Stream interrupted" })}\n\n`);
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
