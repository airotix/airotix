import { useEffect, useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const promptChips = [
  "How does computer vision work in manufacturing?",
  "What ROI can AI bring to retail?",
  "Tell me about LLM fine-tuning",
  "How long does a CV deployment take?",
];

const demoResponses: Record<string, string> = {
  greeting:
    "Hello. I am the AIROTIX AI advisor. I can help you explore computer vision, AI automation, and intelligent systems. What would you like to know?",
  manufacturing:
    "In manufacturing, our computer vision systems inspect products on moving production lines at 120+ FPS, catching defects like scratches, misprints, and misalignments that human inspectors miss. Clients typically see defect escape rates drop from about 2% to under 0.1% within weeks of deployment.",
  retail:
    "For retail, AI can drive ROI through automated inventory monitoring, demand forecasting, and visual search. One retail deployment reduced inventory discrepancies by 34% and modeled more than $2M in annual waste reduction.",
  automation:
    "AIROTIX builds automation solutions that streamline operations, eliminate manual review, and improve decision speed. That can include workflow automation, anomaly detection, real-time monitoring, or governed AI agents.",
  llm:
    "LLM fine-tuning with LoRA and QLoRA lets us adapt language models for your domain, such as legal document analysis, medical records, or technical support, without training from scratch. We handle data preparation, training, evaluation, and deployment.",
  deployment:
    "A typical computer vision deployment follows discovery, data collection, model development, testing, deployment, and continuous improvement. Most projects reach production-ready status within 2 to 4 months depending on complexity.",
  contact:
    "If you are ready to discuss a project, we can set up a tailored consultation and estimate. Tell me a little about your industry and the challenge you want to solve.",
  default:
    "Great question. AIROTIX combines domain expertise with production-grade AI, from computer vision for defect detection to LLM-powered workflow automation. What industry or challenge are you exploring?",
};

function matchResponse(input: string): string {
  const lower = input.toLowerCase();

  if (/(^|\s)(hi|hello|hey|greetings|good morning|good afternoon)/.test(lower)) {
    return demoResponses.greeting;
  }

  if (/\b(manufactur|production line|inspection|defect|quality control|factory)\b/.test(lower)) {
    return demoResponses.manufacturing;
  }

  if (/\b(retail|inventory|store|shop|shopping|roi|return on investment|customer experience)\b/.test(lower)) {
    return demoResponses.retail;
  }

  if (/\b(automation|workflow|process automation|robot|robotic|manual review|streamline)\b/.test(lower)) {
    return demoResponses.automation;
  }

  if (/\b(llm|fine-tun|language model|chatgpt|gpt|model tuning|model deployment)\b/.test(lower)) {
    return demoResponses.llm;
  }

  if (/\b(deploy|deployment|timeline|schedule|timeframe|how long|launch|production-ready)\b/.test(lower)) {
    return demoResponses.deployment;
  }

  if (/\b(contact|demo|proposal|estimate|quote|engage|project|work with)\b/.test(lower)) {
    return demoResponses.contact;
  }

  return demoResponses.default;
}

type AiDemoExperienceProps = {
  variant?: "split" | "standalone";
};

export function AiDemoExperience({ variant = "standalone" }: AiDemoExperienceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello. I am the AIROTIX AI advisor. I can help you explore how computer vision, AI automation, and intelligent systems can transform your business. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const response = matchResponse(text);
    let i = 0;
    const partial: Message = { role: "assistant", content: "" };

    setMessages((prev) => [...prev, partial]);

    const interval = setInterval(() => {
      i++;
      const assistantMessage = { role: "assistant", content: response.slice(0, i) };
      setMessages((prev) => {
        const copy = [...prev];
        if (copy[copy.length - 1]?.role === "assistant") {
          copy[copy.length - 1] = assistantMessage;
        } else {
          copy.push(assistantMessage);
        }
        return copy;
      });
      if (i >= response.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 15);
  };

  return (
    <div id="ai-demo" data-ai-demo-variant={variant}>
      <div className="mx-auto w-full max-w-2xl">
        <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#0c0c0e]/95 shadow-[0_24px_90px_rgba(0,0,0,0.35)] ring-1 ring-white/5">
          <div className="relative flex min-h-12 shrink-0 items-center justify-between border-b border-white/10 bg-white/[0.045] px-4 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-400 shadow-[0_0_16px_rgba(249,115,22,0.85)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                Airotix Advisor
              </span>
            </div>
            <Sparkles className="h-4 w-4 text-orange-300" />
          </div>

          <div className="h-[380px] overflow-y-auto bg-[#0b0b0d] px-4 py-4 text-sm leading-relaxed text-zinc-300 selection:bg-orange-500/25 selection:text-orange-50">
            {messages.map((msg, index) => (
              <div key={index} className="mb-4 last:mb-0">
                {msg.role === "user" ? (
                  <div className="ml-auto max-w-[88%] rounded-2xl border border-orange-300/20 bg-orange-500/10 px-4 py-3 text-orange-50">
                    {msg.content}
                  </div>
                ) : (
                  <div className="max-w-[92%] rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-zinc-300">
                    {msg.content}
                    {isTyping && index === messages.length - 1 && (
                      <span className="ml-1 inline-block h-4 w-1.5 translate-y-0.5 animate-pulse rounded-full bg-orange-300" />
                    )}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-white/10 bg-black/35 px-4 py-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
              Quick prompts
            </p>
            <div className="flex flex-wrap gap-2">
              {promptChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => sendMessage(chip)}
                  disabled={isTyping}
                  className="max-w-full truncate rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-left text-[11px] text-zinc-300 transition-colors hover:border-orange-300/35 hover:bg-orange-500/10 hover:text-orange-100 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(input);
            }}
            className="flex items-center gap-2 border-t border-white/10 bg-[#0f0f11] px-3 py-3"
          >
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about a use case..."
              disabled={isTyping}
              autoComplete="off"
              spellCheck={false}
              className="min-w-0 flex-1 rounded-full border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-orange-300/45 focus:outline-none focus:ring-1 focus:ring-orange-300/15 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isTyping || !input.trim()}
              title="Send"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-orange-300/30 bg-orange-500 text-black transition-colors hover:bg-orange-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
