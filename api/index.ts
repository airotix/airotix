import type { VercelRequest, VercelResponse } from "@vercel/node";
import { OpenRouter } from "@openrouter/sdk";
import type { ChatResult } from "@openrouter/sdk/models/chatresult.js";
import type { EventStream } from "@openrouter/sdk/lib/event-streams.js";
import type { ChatStreamChunk } from "@openrouter/sdk/models/chatstreamchunk.js";
import { SYSTEM_PROMPT } from "../server/app";

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

// Vercel serverless handler for the AIROTIX chatbot.
// Uses non-streaming mode (reliable on serverless) and formats the
// response as SSE so the frontend ChatBot works unchanged.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body || {};

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res
        .status(500)
        .json({ error: "OpenRouter API key is not configured" });
    }

    // Set up SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Prepend system prompt
    const fullMessages = [{ role: "system", content: SYSTEM_PROMPT }, ...messages];

    // Initialize OpenRouter client
    const openrouter = new OpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    // Non-streaming request (reliable on serverless)
    const response = await openrouter.chat.send({
      chatRequest: {
        model: "openai/gpt-oss-20b:free",
        messages: fullMessages,
        stream: false,
      },
    });

    // Send the full content as a single SSE chunk
    if (isChatResult(response)) {
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
}