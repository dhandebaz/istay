import { useComputed, useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";

interface GuestChatProps {
  /** Property ID — for session persistence */
  propId: string;
  /** Property name — displayed in chat header */
  propertyName: string;
  /** Property image — used for branding */
  propertyImage?: string;
  /** Property amenities — seeds contextual suggestions */
  amenities?: string[];
}

interface ChatMsg {
  role: "user" | "model";
  content: string;
}

export default function GuestChat(
  { propId, propertyName, propertyImage, amenities }: GuestChatProps,
) {
  // ── State ─────────────────────────────────────────────────
  const isOpen = useSignal(false);
  const messages = useSignal<ChatMsg[]>([]);
  const inputText = useSignal("");
  const sessionId = useSignal<string | null>(null);
  const isLoading = useSignal(false);
  const defaultSuggestions = [
    "Residency access protocol 📶",
    "Bespoke arrival time? 🕐",
    "Concierge contact? 📱",
    "Residency charter? 📋",
    "Bespoke dining? 🍽️",
  ];
  
  const amenitySuggestions =
    amenities?.slice(0, 3).map((a) => `Contextual insights on ${a}?`) || [];
  const suggestions = useSignal<string[]>(
    amenitySuggestions.length > 0
      ? [...amenitySuggestions, ...defaultSuggestions.slice(0, 2)]
      : defaultSuggestions,
  );
  const hasInteracted = useSignal(false);
  const unreadCount = useComputed(() =>
    !isOpen.value && messages.value.filter((m) => m.role === "model").length > 0
      ? 1
      : 0
  );

  const SESSION_STORAGE_KEY = `istay_chat_v2_${propId}`;

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
        globalThis.sessionStorage?.setItem(
          SESSION_STORAGE_KEY,
          sessionId.value,
        );
      }
    } catch {
      // SSR or sessionStorage not available
    }
  }, [sessionId.value]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.value.length]);

  useEffect(() => {
    if (isOpen.value && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 500);
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
              content:
                "Synchronized Intelligence is currently optimizing. Please coordinate with the host directly for priority assistance.",
            },
          ];
        } else {
          messages.value = [
            ...messages.value,
            {
              role: "model",
              content: data.error ?? "Protocol error — please re-initialize synchronization.",
            },
          ];
        }
      }
    } catch {
      messages.value = [
        ...messages.value,
        {
          role: "model",
          content: "Network discrepancy — verify your connectivity protocol.",
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
    isLoading.value = true;
    sendMessage(text);
  }

  // ── Collapsed Bubble ──────────────────────────────────────
  if (!isOpen.value) {
    return (
      <div class="fixed bottom-10 right-10 z-50">
        {!hasInteracted.value && (
          <span
            class="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping"
            style="animation-duration: 3s;"
            aria-hidden="true"
          />
        )}

        <button
          type="button"
          id="chat-bubble-btn"
          onClick={() => (isOpen.value = true)}
          class="relative w-16 h-16 rounded-[1.5rem] bg-gray-900 text-white shadow-premium-lg hover:bg-emerald-600 active:scale-95 transition-all duration-500 flex items-center justify-center group"
          aria-label="Open Concierge"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            class="transition-transform duration-500 group-hover:rotate-12"
          >
            <path
              d="M12 2C6.48 2 2 5.82 2 10.5C2 13.07 3.54 15.32 5.88 16.72L5 21L9.34 18.66C10.18 18.88 11.07 19 12 19C17.52 19 22 15.18 22 10.5C22 5.82 17.52 2 12 2Z"
              fill="currentColor"
            />
            <circle cx="8" cy="10.5" r="1.5" fill="white" fill-opacity="0.2" />
            <circle cx="12" cy="10.5" r="1.5" fill="white" fill-opacity="0.2" />
            <circle cx="16" cy="10.5" r="1.5" fill="white" fill-opacity="0.2" />
          </svg>

          {unreadCount.value > 0 && (
            <span class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white text-[10px] font-bold text-white flex items-center justify-center animate-bounce">
              {unreadCount.value}
            </span>
          )}
        </button>

        {!hasInteracted.value && (
          <div class="absolute bottom-[84px] right-0 bg-white/90 backdrop-blur-md text-emerald-600 text-[10px] font-bold px-4 py-2 rounded-xl shadow-premium border border-emerald-50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-[0.2em]">
            Bespoke Concierge Protocol 💬
            <div class="absolute -bottom-1 right-6 w-2 h-2 bg-white/90 rotate-45 border-r border-b border-emerald-50" />
          </div>
        )}
      </div>
    );
  }

  // ── Expanded Chat Panel ───────────────────────────────────
  return (
    <div
      class="fixed bottom-10 right-10 z-50 w-[400px] max-w-[calc(100vw-40px)] flex flex-col bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-premium-lg border border-gray-50 overflow-hidden animate-scale-in"
      style="height: min(600px, calc(100vh - 120px));"
    >
      <div class="relative flex items-center justify-between px-6 py-6 text-white flex-shrink-0 overflow-hidden">
        {propertyImage && (
          <div class="absolute inset-0 z-0">
            <img
              src={propertyImage}
              class="w-full h-full object-cover blur-[12px] scale-125 brightness-50"
            />
            <div class="absolute inset-0 bg-emerald-950/20 mix-blend-multiply" />
          </div>
        )}
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-600/90 to-emerald-500/80 z-0 opacity-90" />

        <div class="relative z-10 flex items-center gap-4">
          <div class="w-10 h-10 rounded-[1.2rem] bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20">
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="white"
            >
              <path
                d="M8 1L1.5 6V14.5H5.5V10H10.5V14.5H14.5V6L8 1Z"
                stroke-width="0.5"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="space-y-0.5">
            <p class="text-xs font-bold uppercase tracking-[0.3em] leading-tight">iStay Concierge</p>
            <p class="text-[10px] text-white/60 font-bold uppercase tracking-widest truncate max-w-[200px]">
              {propertyName}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => (isOpen.value = false)}
          class="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all active:scale-90"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M2 2L10 10M10 2L2 10"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>

      <div
        class="flex-1 overflow-y-auto px-6 py-6 space-y-6 selection:bg-emerald-100"
        style="scroll-behavior: smooth;"
      >
        {messages.value.length === 0 && (
          <div class="flex gap-4 animate-slide-up">
            <div class="w-8 h-8 rounded-[0.8rem] bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
              <span class="text-xs">✨</span>
            </div>
            <div class="bg-gray-50 rounded-[1.5rem] rounded-tl-md px-5 py-4 max-w-[85%] border border-emerald-50/50">
              <p class="text-[13px] text-gray-500 font-medium leading-relaxed">
                Welcome to your <span class="font-bold text-emerald-600">Synchronized Stay Intelligence</span>. I am here to provide protocol-level assistance regarding your residency. How may I facilitate your experience today?
              </p>
            </div>
          </div>
        )}

        {messages.value.map((msg, i) => (
          <div
            key={i}
            class={`flex gap-4 animate-slide-up ${msg.role === "user" ? "justify-end" : ""}`}
          >
            {msg.role === "model" && (
              <div class="w-8 h-8 rounded-[0.8rem] bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                <span class="text-xs">✨</span>
              </div>
            )}
            <div
              class={`px-5 py-4 rounded-[1.5rem] max-w-[85%] text-[13px] font-medium leading-relaxed transition-all duration-500 shadow-premium ${
                msg.role === "user"
                  ? "bg-gray-900 text-white rounded-tr-md"
                  : "bg-white text-gray-600 rounded-tl-md border border-gray-50"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading.value && (
          <div class="flex gap-4 animate-pulse">
            <div class="w-8 h-8 rounded-[0.8rem] bg-emerald-50 flex-shrink-0" />
            <div class="space-y-2 flex-1">
              <div class="h-4 bg-emerald-50/50 rounded-lg w-3/4" />
              <div class="h-4 bg-emerald-50/30 rounded-lg w-1/2" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {suggestions.value.length > 0 && !isLoading.value && (
        <div class="flex-shrink-0 px-6 pb-4 flex gap-2.5 overflow-x-auto no-scrollbar animate-slide-up">
          {suggestions.value.map((s, i) => (
            <button
              type="button"
              key={i}
              onClick={() => handleSuggestionClick(s)}
              class="flex-shrink-0 px-5 py-2.5 rounded-2xl bg-white border border-emerald-50 text-[10px] font-bold text-emerald-600 uppercase tracking-widest hover:bg-emerald-50 hover:border-emerald-100 transition-all active:scale-95 whitespace-nowrap shadow-sm"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        class="flex-shrink-0 flex items-center gap-3 px-5 py-5 border-t border-gray-50 bg-white"
      >
        <input
          ref={inputRef}
          type="text"
          value={inputText.value}
          onInput={(e) => (inputText.value = (e.target as HTMLInputElement).value)}
          placeholder="Facilitate a request..."
          maxLength={500}
          class="flex-1 px-5 py-3.5 rounded-[1.2rem] bg-gray-50 text-[13px] font-medium text-gray-900 placeholder:text-gray-300 focus:outline-none focus:bg-white focus:shadow-inner transition-all duration-500"
          disabled={isLoading.value}
        />
        <button
          type="submit"
          disabled={!inputText.value.trim() || isLoading.value}
          class="w-12 h-12 rounded-[1.2rem] bg-gray-900 text-white flex items-center justify-center hover:bg-emerald-600 active:scale-90 transition-all duration-500 disabled:opacity-20 disabled:cursor-not-allowed flex-shrink-0 shadow-premium"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M2 8L14 2L8 14L7 9L2 8Z"
              fill="currentColor"
              stroke-width="0.5"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}

