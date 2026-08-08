import { useState, useRef, useEffect } from "react";
import { Send, X, MessageSquare, Sparkles, Loader2 } from "lucide-react";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hi! I'm the AIROTIX AI Advisor. Ask me about computer vision, AI automation, or how we can help your business. What would you like to explore?",
};

const QUICK_PROMPTS = [
  "How does computer vision work in manufacturing?",
  "What ROI can AI bring to retail?",
  "Tell me about LLM fine-tuning",
  "How long does a CV deployment take?",
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasError, setHasError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Reset error state when chat opens
  useEffect(() => {
    if (isOpen && hasError) {
      setHasError(false);
    }
  }, [isOpen, hasError]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isStreaming) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsStreaming(true);
    setHasError(false);

    // Add an empty assistant message that we'll fill as chunks arrive
    const assistantMessage: Message = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      // Build the messages array to send (exclude the empty assistant placeholder)
      const messagesToSend = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: messagesToSend }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || `Server error: ${response.status}`);
      }

      // Read the streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No response stream available");
      }

      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process complete SSE lines
        const lines = buffer.split("\n");
        buffer = lines.pop() || ""; // Keep incomplete line in buffer

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim();

            if (data === "[DONE]") {
              break;
            }

            try {
              const parsed = JSON.parse(data);

              if (parsed.error) {
                throw new Error(parsed.error);
              }

              if (parsed.content) {
                // Append content to the last assistant message
                setMessages((prev) => {
                  const copy = [...prev];
                  const lastIdx = copy.length - 1;
                  if (copy[lastIdx]?.role === "assistant") {
                    copy[lastIdx] = {
                      ...copy[lastIdx],
                      content: copy[lastIdx].content + parsed.content,
                    };
                  }
                  return copy;
                });
              }
            } catch (e) {
              // Ignore JSON parse errors for partial data
              if (e instanceof Error && e.message !== "Unexpected end of JSON input") {
                // Re-throw if it's a real error message
                if (data.includes('"error"')) {
                  throw e;
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setHasError(true);

      // Update the last assistant message with an error
      setMessages((prev) => {
        const copy = [...prev];
        const lastIdx = copy.length - 1;
        if (copy[lastIdx]?.role === "assistant" && !copy[lastIdx].content) {
          copy[lastIdx] = {
            ...copy[lastIdx],
            content:
              "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or reach out to us directly through the contact form below.",
          };
        }
        return copy;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const resetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setHasError(false);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-[0_8px_30px_rgba(249,115,22,0.4)] transition-all hover:scale-110 hover:shadow-[0_12px_40px_rgba(249,115,22,0.6)]"
          aria-label="Open chat"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-orange-500" />
          </span>
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[600px] max-h-[calc(100vh-3rem)] w-[calc(100vw-3rem)] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0e]/95 shadow-[0_24px_90px_rgba(0,0,0,0.5)] ring-1 ring-white/5 backdrop-blur-xl">
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-white/[0.045] px-4 py-3 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-400 shadow-[0_0_16px_rgba(249,115,22,0.85)]" />
              <span className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-300">
                Airotix Advisor
              </span>
              <Sparkles className="h-4 w-4 text-orange-300" />
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                className="rounded-md px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-300"
                title="Reset conversation"
              >
                Reset
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md p-1 text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-300"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-[#0b0b0d] px-4 py-4 text-sm leading-relaxed text-zinc-300 selection:bg-orange-500/25 selection:text-orange-50">
            {messages.map((msg, index) => (
              <div key={index} className="mb-4 last:mb-0">
                {msg.role === "user" ? (
                  <div className="ml-auto max-w-[88%] rounded-2xl border border-orange-300/20 bg-orange-500/10 px-4 py-3 text-orange-50">
                    {msg.content}
                  </div>
                ) : (
                  <div className="max-w-[92%] rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-zinc-300">
                    {msg.content || (isStreaming && index === messages.length - 1 ? (
                      <span className="inline-flex items-center gap-2 text-zinc-500">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Thinking...
                      </span>
                    ) : "")}
                    {isStreaming &&
                      index === messages.length - 1 &&
                      msg.content && (
                        <span className="ml-1 inline-block h-4 w-1.5 translate-y-0.5 animate-pulse rounded-full bg-orange-300" />
                      )}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length <= 1 && (
            <div className="border-t border-white/10 bg-black/35 px-4 py-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
                Quick prompts
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => sendMessage(chip)}
                    disabled={isStreaming}
                    className="max-w-full truncate rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-left text-[11px] text-zinc-300 transition-colors hover:border-orange-300/35 hover:bg-orange-500/10 hover:text-orange-100 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex shrink-0 items-center gap-2 border-t border-white/10 bg-[#0f0f11] px-3 py-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about a use case..."
              disabled={isStreaming}
              autoComplete="off"
              spellCheck={false}
              className="min-w-0 flex-1 rounded-full border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-orange-300/45 focus:outline-none focus:ring-1 focus:ring-orange-300/15 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isStreaming || !input.trim()}
              title="Send"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-orange-300/30 bg-orange-500 text-black transition-colors hover:bg-orange-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isStreaming ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;