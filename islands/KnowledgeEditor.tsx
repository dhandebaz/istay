import { useSignal } from "@preact/signals";
import { useRef } from "preact/hooks";
import KnowledgeUploader from "./KnowledgeUploader.tsx";

interface KnowledgeEditorProps {
  /** Current host ID (from dashboard middleware) */
  hostId: string;
  /** Property ID to edit knowledge for */
  propertyId: string;
  /** Property name for display */
  propertyName: string;
  /** Existing knowledge content (if any) */
  initialContent?: string;
}

type EditorState = "idle" | "saving" | "saved" | "error" | "testing";

interface TestChatMsg {
  role: "user" | "model";
  content: string;
}

const TEMPLATE = `# 📶 WiFi
- **Network:** [Your WiFi Name]
- **Password:** [Your Password]

# 🕐 Check-in / Check-out
- **Check-in:** 2:00 PM onwards
- **Check-out:** 11:00 AM
- **Early check-in:** Subject to availability, contact host

# 📱 Contact Person
- **Name:** [Manager Name]
- **Phone:** [Phone Number]
- **WhatsApp:** [WhatsApp Number]

# 🏠 House Rules
- No smoking inside the property
- No loud music after 10 PM
- Guests not on the booking require prior approval
- Please keep the property clean

# 🍽️ Local Recommendations
- **Restaurant:** [Name] — 5 min walk
- **ATM:** [Bank] — 2 min walk
- **Grocery:** [Store] — 3 min walk
- **Hospital:** [Name] — 10 min drive

# 🚗 Directions & Parking
- **From Airport:** [Directions]
- **From Station:** [Directions]
- **Parking:** [Available/Not available]

# ⚡ Emergency Info
- **Police:** 100
- **Ambulance:** 108
- **Fire:** 101
- **Host Phone:** [Your Number]
`;

export default function KnowledgeEditor({
  hostId,
  propertyId,
  propertyName,
  initialContent,
}: KnowledgeEditorProps) {
  const content = useSignal(initialContent ?? "");
  const state = useSignal<EditorState>("idle");
  const errorMsg = useSignal("");
  const charCount = useSignal(initialContent?.length ?? 0);
  const showTestChat = useSignal(false);
  const testMessages = useSignal<TestChatMsg[]>([]);
  const testInput = useSignal("");
  const testSessionId = useSignal<string | null>(null);
  const testLoading = useSignal(false);
  const testSuggestions = useSignal<string[]>([]);
  const isApiConfigured = useSignal(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const MAX_CHARS = 10_000;
  const hasChanges = content.value !== (initialContent ?? "");

  // ── Save Knowledge ────────────────────────────────────────
  async function handleSave() {
    if (!content.value.trim()) {
      errorMsg.value = "Knowledge base cannot be empty.";
      return;
    }

    state.value = "saving";
    errorMsg.value = "";

    try {
      const res = await fetch("/api/knowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hostId,
          propertyId,
          content: content.value,
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        state.value = "saved";
        setTimeout(() => {
          if (state.value === "saved") state.value = "idle";
        }, 2500);
      } else {
        state.value = "error";
        errorMsg.value = data.error ?? "Save failed. Please try again.";
      }
    } catch {
      state.value = "error";
      errorMsg.value = "Network error. Check your connection.";
    }
  }

  // ── Use Template ──────────────────────────────────────────
  function handleUseTemplate() {
    if (
      content.value.trim() &&
      !confirm("This will replace your current content. Continue?")
    ) {
      return;
    }
    content.value = TEMPLATE;
    charCount.value = TEMPLATE.length;
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }

  // ── Test AI Chat ──────────────────────────────────────────
  async function sendTestMessage(text: string) {
    if (!text.trim() || testLoading.value) return;

    const userMsg: TestChatMsg = { role: "user", content: text.trim() };
    testMessages.value = [...testMessages.value, userMsg];
    testInput.value = "";
    testLoading.value = true;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propId: propertyId,
          sessionId: testSessionId.value,
          message: text.trim(),
          testMode: true,
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        testMessages.value = [
          ...testMessages.value,
          { role: "model", content: data.reply },
        ];
        testSessionId.value = data.sessionId;
        if (data.suggestions) {
          testSuggestions.value = data.suggestions;
        }
      } else {
        if (res.status === 401) {
          isApiConfigured.value = false;
        }
        testMessages.value = [
          ...testMessages.value,
          { role: "model", content: `Error: ${data.error ?? "An unexpected error occurred"}` },
        ];
      }
    } catch {
      testMessages.value = [
        ...testMessages.value,
        { role: "model", content: "Network error — check connection" },
      ];
    } finally {
      testLoading.value = false;
    }
  }

  // ── Render ────────────────────────────────────────────────
  return (
    <div class="space-y-8 animate-fade-in">
      {/* Property Header */}
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div class="flex items-center gap-3 mb-2">
             <div class="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)] animate-pulse" />
             <h2 class="text-3xl font-bold text-gray-900 tracking-tight">{propertyName}</h2>
          </div>
          <p class="text-xs font-semibold text-gray-400 tracking-wide">
            Property Knowledge Base
          </p>
        </div>
        <div class="px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100 shadow-sm">
          <span class="text-[11px] font-bold text-emerald-700 tracking-wider">
            {charCount.value.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters
          </span>
        </div>
      </div>

      <KnowledgeUploader
        onScanComplete={(markdown) => {
          const spacer = content.value.trim() ? "\n\n" : "";
          content.value += spacer + markdown;
          charCount.value = content.value.length;
          state.value = "idle";
        }}
      />

      {/* Editor */}
      <div class="relative group">
        <textarea
          ref={textareaRef}
          value={content.value}
          onInput={(e) => {
            const v = (e.target as HTMLTextAreaElement).value;
            if (v.length <= MAX_CHARS) {
              content.value = v;
              charCount.value = v.length;
            }
          }}
          rows={16}
          placeholder="Start typing your property information here..."
          class="w-full px-8 py-8 rounded-[2rem] border border-gray-100 bg-white shadow-premium text-sm font-medium text-gray-700 leading-relaxed focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all resize-y selection:bg-emerald-100"
          aria-label="Knowledge base content"
          spellcheck={true}
        />
      </div>

      {/* Action Row */}
      <div class="flex flex-wrap gap-4">
        {/* Save */}
        <button
          onClick={handleSave}
          disabled={state.value === "saving" || !content.value.trim()}
          class={`flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold transition-all active:scale-[0.98] ${
            state.value === "saved"
              ? "bg-emerald-500 text-white shadow-premium-lg"
              : "bg-gray-900 text-white shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5"
          } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          {state.value === "saving" && (
            <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          {state.value === "saved" && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
          {state.value === "saved"
            ? "Saved"
            : state.value === "saving"
            ? "Saving..."
            : "Save Changes"}
        </button>

        {/* Use Template */}
        <button
          onClick={handleUseTemplate}
          class="flex items-center gap-2 px-8 py-4 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 transition-all"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          Use Template
        </button>

        {/* Test AI */}
        <button
          onClick={() => {
            if (!content.value.trim()) {
              errorMsg.value = "Save your knowledge base first before testing.";
              return;
            }
            showTestChat.value = !showTestChat.value;
            testMessages.value = [];
            testSessionId.value = null;
            testSuggestions.value = [];
          }}
          class={`flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold transition-all active:scale-[0.98] ${
            showTestChat.value
              ? "bg-emerald-600 text-white shadow-premium-lg"
              : "bg-white text-emerald-600 border border-emerald-100 shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-10.6 8.5 8.5 0 0 1 7 3.7Z" />
            <path d="m11 8 1 2 2-2" />
            <path d="M12 11v4" />
          </svg>
          {showTestChat.value ? "Close Simulator" : "Test with AI"}
        </button>
      </div>

      {/* Error Display */}
      {errorMsg.value && (
        <div class="flex items-start gap-2 p-4 rounded-2xl bg-rose-50 border border-rose-100 animate-shake">
          <span class="text-rose-500 text-sm mt-0.5">⚠️</span>
          <p class="text-xs text-rose-700 font-bold leading-relaxed">{errorMsg.value}</p>
        </div>
      )}

      {/* Side Drawer for Test AI */}
      {showTestChat.value && (
        <div class="fixed inset-0 z-[100] overflow-hidden">
          {/* Backdrop */}
          <div
            class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => (showTestChat.value = false)}
          />

          {/* Drawer */}
          <div class="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-500 ease-out translate-x-0">
            {/* Header */}
            <div class="px-8 py-10 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div>
                <h3 class="text-2xl font-bold text-gray-900 tracking-tight">AI Simulator</h3>
                <p class="text-xs text-gray-400 font-medium tracking-wide mt-1">
                  Test your concierge with guest questions
                </p>
              </div>
              <button
                onClick={() => (showTestChat.value = false)}
                class="w-10 h-10 flex items-center justify-center rounded-2xl bg-gray-50 border border-gray-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all group"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* API Key Missing Notice */}
            {!isApiConfigured.value && (
              <div class="m-6 p-5 rounded-2xl bg-amber-50 border border-amber-100 shadow-sm">
                <div class="flex items-center gap-2 text-amber-800 font-bold text-xs mb-1">
                  <span>⚠️ AI Not Configured</span>
                </div>
                <p class="text-[11px] text-amber-700 font-medium leading-relaxed">
                  The AI Concierge requires a Gemini API Key. Please set the key in your environment variables to enable the simulator.
                </p>
              </div>
            )}

            {/* Chat Body */}
            <div class="flex-1 overflow-y-auto px-8 py-8 space-y-6 no-scrollbar bg-gray-50/50">
              {testMessages.value.length === 0 && (
                <div class="h-full flex flex-col items-center justify-center text-center px-4 space-y-8 animate-fade-in">
                  <div class="w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center text-4xl shadow-sm border border-emerald-500/10">
                    ✨
                  </div>
                  <div class="space-y-2">
                    <h4 class="text-lg font-bold text-gray-900 tracking-tight">
                      Simulator Ready
                    </h4>
                    <p class="text-xs text-gray-400 font-medium leading-relaxed max-w-[240px] mx-auto">
                      Ask a question to see how the AI concierge would respond to your guests.
                    </p>
                  </div>
                </div>
              )}

              {testMessages.value.map((msg, i) => (
                <div
                  key={i}
                  class={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  } animate-slide-up`}
                >
                  <div
                    class={`max-w-[85%] px-6 py-4 rounded-2xl text-xs font-medium leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-gray-900 text-white"
                        : "bg-white text-gray-700 border border-gray-100"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {testLoading.value && (
                <div class="flex gap-2 items-center px-6 py-4 bg-white border border-gray-100 rounded-2xl w-fit shadow-sm">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                      style={`animation-delay: ${i * 200}ms;`}
                    />
                  ))}
                  <span class="text-[10px] font-bold text-gray-400 ml-2 tracking-widest uppercase">Thinking</span>
                </div>
              )}
            </div>

            {/* Input & Footer */}
            <div class="p-8 border-t border-gray-100 bg-white">
              {/* Suggestions */}
              {testSuggestions.value.length > 0 && !testLoading.value && (
                <div class="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-2">
                  {testSuggestions.value.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => sendTestMessage(s)}
                      class="flex-shrink-0 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold tracking-wide border border-emerald-100 hover:bg-emerald-100 transition-all whitespace-nowrap"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendTestMessage(testInput.value);
                }}
                class="relative"
              >
                <input
                  type="text"
                  value={testInput.value}
                  onInput={(
                    e,
                  ) => (testInput.value = (e.target as HTMLInputElement).value)}
                  placeholder="Ask a test question..."
                  disabled={!isApiConfigured.value}
                  class="w-full px-6 py-5 rounded-2xl bg-gray-50 border border-gray-100 text-sm font-medium text-gray-900 placeholder:text-gray-300 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all"
                  maxLength={500}
                />
                <button
                  type="submit"
                  disabled={!testInput.value.trim() || testLoading.value ||
                    !isApiConfigured.value}
                  class="absolute right-2 top-2 w-11 h-11 rounded-2xl bg-emerald-500 text-white shadow-premium flex items-center justify-center hover:bg-emerald-600 hover:-translate-y-0.5 transition-all disabled:opacity-40"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
              <p class="mt-4 text-[10px] text-center text-gray-400 font-medium">
                The AI concierge responds based on your saved knowledge base.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Help text */}
      <div class="p-8 rounded-[2rem] bg-gray-900 shadow-premium-lg overflow-hidden relative group">
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none" />
        <div class="relative z-10">
          <div class="flex items-center gap-4 mb-4">
            <span class="text-3xl">💡</span>
            <h4 class="text-sm font-bold text-white tracking-widest uppercase">
              Optimizing your knowledge
            </h4>
          </div>
          <p class="text-xs text-gray-400 font-medium leading-relaxed tracking-wide">
            Use clear bullet points for the best AI results. Be sure to include <span class="text-emerald-400 font-bold">WiFi details</span>,
            <span class="text-emerald-400 font-bold">contact information</span>, and <span class="text-emerald-400 font-bold">check-in instructions</span>. 
            The AI concierge only knows what you provide here.
          </p>
        </div>
      </div>
    </div>
  );
}
