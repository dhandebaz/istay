import { useSignal, useComputed } from "@preact/signals";
import { useRef, useEffect } from "preact/hooks";

interface GuestChatProps {
  /** Property ID — used to route chat to correct knowledge base */
  propId: string;
  /** Property name — displayed in chat header */
  propertyName: string;
}

interface ChatMsg {
  role: "user" | "model";
  content: string;
}

export default function GuestChat({ propId, propertyName }: GuestChatProps) {
  // ── State ─────────────────────────────────────────────────
  const isOpen = useSignal(false);
  const messages = useSignal<ChatMsg[]>([]);
  const inputText = useSignal("");
  const sessionId = useSignal<string | null>(null);
  const isLoading = useSignal(false);
  const suggestions = useSignal<string[]>([
    "What's the WiFi password? 📶",
    "Check-in time? 🕐",
    "Caretaker number? 📱",
    "House rules? 📋",
    "Nearby restaurants? 🍽️",
  ]);
  const hasInteracted = useSignal(false);
  const unreadCount = useComputed(() =>
    !isOpen.value && messages.value.filter((m) => m.role === "model").length > 0
      ? 1
      : 0
  );

  // Persist sessionId in sessionStorage so refreshing the page doesn't lose context
  const SESSION_STORAGE_KEY = `istay_chat_${propId}`;

  useEffect(() => {
    try {
      const stored = globalThis.sessionStorage?.getItem(SESSION_STORAGE_KEY);
      if (stored) sessionId.value = stored;
    } catch {
      // SSR or sessionStorage not available
    }
  }, []);

  useEffect(() => {
    try {
      if (sessionId.value) {
        globalThis.sessionStorage?.setItem(SESSION_STORAGE_KEY, sessionId.value);
      }
    } catch {
      // SSR or sessionStorage not available
    }
  }, [sessionId.value]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.value.length]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen.value && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen.value]);

  // ── Send Message ──────────────────────────────────────────
  async function sendMessage(text: string) {
    if (!text.trim() || isLoading.value) return;

    const userMsg: ChatMsg = { role: "user", content: text.trim() };
    messages.value = [...messages.value, userMsg];
    inputText.value = "";
    isLoading.value = true;
    hasInteracted.value = true;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propId,
          sessionId: sessionId.value,
          message: text.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        const modelMsg: ChatMsg = { role: "model", content: data.reply };
        messages.value = [...messages.value, modelMsg];
        sessionId.value = data.sessionId;
        if (data.suggestions) {
          suggestions.value = data.suggestions;
        }
      } else {
        if (res.status === 401) {
          messages.value = [
            ...messages.value,
            {
              role: "model",
              content: "AI Concierge is currently undergoing maintenance. Please contact the host directly for assistance! 📱",
            },
          ];
        } else {
          messages.value = [
            ...messages.value,
            {
              role: "model",
              content: data.error ?? "Something went wrong. Try again! 🔄",
            },
          ];
        }
      }
    } catch {
      messages.value = [
        ...messages.value,
        {
          role: "model",
          content: "Network error — please check your connection 📡",
        },
      ];
    } finally {
      isLoading.value = false;
    }
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    sendMessage(inputText.value);
  }

  function handleSuggestionClick(text: string) {
    // Immediately show typing indicator for snappier perceived performance
    isLoading.value = true;
    sendMessage(text);
  }

  // ── Collapsed Bubble ──────────────────────────────────────
  if (!isOpen.value) {
    return (
      <div class="fixed bottom-6 right-6 z-50">
        {/* Pulse ring behind the button */}
        {!hasInteracted.value && (
          <span
            class="absolute inset-0 rounded-full bg-teal-400/30 animate-ping"
            style="animation-duration: 2s;"
            aria-hidden="true"
          />
        )}

        <button
          id="chat-bubble-btn"
          onClick={() => (isOpen.value = true)}
          class="relative w-14 h-14 rounded-full bg-teal-500 text-white shadow-lg hover:bg-teal-600 active:scale-90 transition-all duration-200 flex items-center justify-center"
          aria-label="Open chat"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 2C6.48 2 2 5.82 2 10.5C2 13.07 3.54 15.32 5.88 16.72L5 21L9.34 18.66C10.18 18.88 11.07 19 12 19C17.52 19 22 15.18 22 10.5C22 5.82 17.52 2 12 2Z"
              fill="currentColor"
            />
            <circle cx="8" cy="10.5" r="1.2" fill="white" />
            <circle cx="12" cy="10.5" r="1.2" fill="white" />
            <circle cx="16" cy="10.5" r="1.2" fill="white" />
          </svg>

          {/* Unread dot */}
          {unreadCount.value > 0 && (
            <span class="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-500 border-2 border-white text-[10px] font-700 text-white flex items-center justify-center">
              {unreadCount.value}
            </span>
          )}
        </button>

        {/* Hover tooltip */}
        {!hasInteracted.value && (
          <div class="absolute bottom-[72px] right-0 bg-gray-900 text-white text-xs font-600 px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 hover-parent:opacity-100 pointer-events-none">
            Ask me anything about this stay! 💬
            <div class="absolute -bottom-1 right-5 w-2 h-2 bg-gray-900 rotate-45" />
          </div>
        )}
      </div>
    );
  }

  // ── Expanded Chat Panel ───────────────────────────────────
  return (
    <div class="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-32px)] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
      style="height: min(520px, calc(100vh - 80px));"
    >
      {/* Header */}
      <div class="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white flex-shrink-0">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white" aria-hidden="true">
              <path d="M8 1L1.5 6V14.5H5.5V10H10.5V14.5H14.5V6L8 1Z" stroke-width="0.3" stroke-linejoin="round" />
            </svg>
          </div>
          <div>
            <p class="text-sm font-700 leading-tight">istay Concierge</p>
            <p class="text-[10px] text-white/70 font-500">
              {propertyName.length > 28
                ? propertyName.slice(0, 28) + "…"
                : propertyName}
            </p>
          </div>
        </div>

        <button
          onClick={() => (isOpen.value = false)}
          class="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          aria-label="Close chat"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 2L10 10M10 2L2 10" stroke="white" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </button>
      </div>

      {/* Messages Area */}
      <div class="flex-1 overflow-y-auto px-4 py-3 space-y-3" style="scroll-behavior: smooth;">
        {/* Welcome message if no history */}
        {messages.value.length === 0 && (
          <div class="flex gap-2">
            <div class="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M6 1L1 4.5V11H4V8H8V11H11V4.5L6 1Z" fill="#14b8a6" />
              </svg>
            </div>
            <div class="bg-gray-50 rounded-2xl rounded-tl-md px-3 py-2 max-w-[80%]">
              <p class="text-sm text-gray-700 leading-relaxed">
                Hi! 👋 I'm your AI assistant for this stay. Ask me anything about WiFi, check-in, house rules, or the neighbourhood!
              </p>
            </div>
          </div>
        )}

        {/* Message bubbles */}
        {messages.value.map((msg, i) => (
          <div
            key={i}
            class={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}
          >
            {msg.role === "model" && (
              <div class="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M6 1L1 4.5V11H4V8H8V11H11V4.5L6 1Z" fill="#14b8a6" />
                </svg>
              </div>
            )}
            <div
              class={`px-3 py-2 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-teal-500 text-white rounded-tr-md"
                  : "bg-gray-50 text-gray-700 rounded-tl-md"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading.value && (
          <div class="flex gap-2">
            <div class="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M6 1L1 4.5V11H4V8H8V11H11V4.5L6 1Z" fill="#14b8a6" />
              </svg>
            </div>
            <div class="bg-gray-50 rounded-2xl rounded-tl-md px-4 py-3">
              <div class="flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    class="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                    style={`animation-delay: ${i * 150}ms; animation-duration: 0.8s;`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Pills */}
      {suggestions.value.length > 0 && !isLoading.value && (
        <div class="flex-shrink-0 px-4 pb-2 flex gap-1.5 overflow-x-auto no-scrollbar">
          {suggestions.value.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSuggestionClick(s)}
              class="flex-shrink-0 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-xs font-600 text-teal-700 hover:bg-teal-100 active:scale-95 transition-all whitespace-nowrap"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input Bar */}
      <form
        onSubmit={handleSubmit}
        class="flex-shrink-0 flex items-center gap-2 px-3 py-3 border-t border-gray-100 bg-white"
      >
        <input
          ref={inputRef}
          type="text"
          value={inputText.value}
          onInput={(e) =>
            (inputText.value = (e.target as HTMLInputElement).value)
          }
          placeholder="Ask me anything..."
          maxLength={500}
          class="flex-1 px-3 py-2.5 rounded-xl bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-gray-100 transition-colors"
          disabled={isLoading.value}
          aria-label="Chat message input"
        />
        <button
          type="submit"
          disabled={!inputText.value.trim() || isLoading.value}
          class="w-9 h-9 rounded-xl bg-teal-500 text-white flex items-center justify-center hover:bg-teal-600 active:scale-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          aria-label="Send message"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M2 8L14 2L8 14L7 9L2 8Z"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="0.5"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
