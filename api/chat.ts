import type { VercelRequest, VercelResponse } from "@vercel/node";
import { OpenRouter } from "@openrouter/sdk";
import type { ChatResult } from "@openrouter/sdk/models/chatresult.js";
import type { EventStream } from "@openrouter/sdk/lib/event-streams.js";
import type { ChatStreamChunk } from "@openrouter/sdk/models/chatstreamchunk.js";
import { SYSTEM_PROMPT } from "../shared/system-prompt";

// Default timeout for the AI provider request (ms).
// Kept below Vercel's function duration limits so we can return a
// graceful error instead of hitting the platform hard timeout.
const DEFAULT_TIMEOUT_MS = 25000;

// Abuse-prevention limits for the public /api/chat endpoint.
const MAX_MESSAGES = 20;          // Cap on message history depth
const MAX_CONTENT_CHARS = 4000;   // Cap on a single message's content length

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

// Wrap a promise with a timeout so a slow AI provider returns a graceful
// error instead of hanging until the platform kills the function.
async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error("AI request timed out"));
    }, timeoutMs);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

// Vercel serverless function for the AIROTIX chatbot at /api/chat.
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

    if (messages.length === 0) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    if (messages.length > MAX_MESSAGES) {
      return res.status(400).json({ error: "Too many messages" });
    }

    // Validate each message: well-formed, allowed role, reasonable size
    const validRoles = new Set(["user", "assistant"]);
    const validMessages = messages.every(
      (m: any) =>
        m &&
        typeof m === "object" &&
        typeof m.role === "string" &&
        validRoles.has(m.role) &&
        typeof m.content === "string" &&
        m.content.length > 0 &&
        m.content.length <= MAX_CONTENT_CHARS
    );
    if (!validMessages) {
      return res.status(400).json({ error: "Invalid message format" });
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

    // Non-streaming request (reliable on serverless) with retry on rate limits
    // and a timeout so we never hang past the platform limit.
    const timeoutMs = Number(process.env.CHAT_TIMEOUT_MS) || DEFAULT_TIMEOUT_MS;
    const response = await withTimeout(
      sendWithRetry(openrouter, {
        model: "openai/gpt-oss-20b:free",
        messages: fullMessages,
        stream: false,
      }),
      timeoutMs
    );

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
    } else if (error?.message?.includes("timed out")) {
      errorMessage = "The AI service took too long to respond. Please try again.";
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
}