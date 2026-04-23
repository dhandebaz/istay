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

# 📱 Caretaker
- **Name:** [Caretaker Name]
- **Phone:** [Phone Number]
- **WhatsApp:** [WhatsApp Number]

# 🏠 House Rules
- No smoking inside the property
- No loud music after 10 PM
- Guests not on the booking require prior approval
- Please keep the property clean

# 🍽️ Nearby Places
- **Restaurant:** [Name] — 5 min walk
- **ATM:** [Bank] — 2 min walk
- **Grocery:** [Store] — 3 min walk
- **Hospital:** [Name] — 10 min drive

# 🚗 How to Reach
- **From Airport:** [Directions]
- **From Station:** [Directions]
- **Parking:** [Available/Not available]

# ⚡ Emergency
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
          { role: "model", content: `Error: ${data.error ?? "Unknown error"}` },
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
    <div class="space-y-8">
      {/* Property Header */}
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div class="flex items-center gap-3 mb-2">
             <div class="w-2 h-2 rounded-full bg-mint-500 animate-pulse" />
             <h2 class="text-2xl font-950 text-gray-900 uppercase tracking-tighter">{propertyName}</h2>
          </div>
          <p class="text-[10px] font-950 text-gray-400 uppercase tracking-[0.2em]">
            ASSET_COGNITIVE_KERNEL
          </p>
        </div>
        <div class="px-5 py-2 bg-gray-50 border-[2px] border-gray-900 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <span class="text-[10px] font-950 text-gray-900 uppercase tracking-widest">
            {charCount.value.toLocaleString()} / {MAX_CHARS.toLocaleString()} _ BYTES
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
          placeholder="ENTER_ASSET_LOGIC_HERE..."
          class="w-full px-8 py-8 rounded-[2rem] border-[4px] border-gray-900 bg-white text-xs font-900 text-gray-900 leading-relaxed focus:bg-gray-50 focus:shadow-[8px_8px_0px_0px_#4ade80] outline-none transition-all resize-y selection:bg-mint-400"
          aria-label="Knowledge base content"
          spellcheck={false}
        />
      </div>

      {/* Action Row */}
      <div class="flex flex-wrap gap-5">
        {/* Save */}
        <button
          onClick={handleSave}
          disabled={state.value === "saving" || !content.value.trim()}
          class={`flex items-center gap-3 px-8 py-4 rounded-2xl text-[11px] font-950 uppercase tracking-[0.2em] border-[3px] border-gray-900 transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
            state.value === "saved"
              ? "bg-emerald-500 text-white shadow-none"
              : "bg-mint-400 text-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-mint-500"
          } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          {state.value === "saving" && (
            <span class="w-4 h-4 border-[3px] border-gray-900 border-t-white rounded-full animate-spin" />
          )}
          {state.value === "saved" && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
          {state.value === "saved"
            ? "COMMITTED"
            : state.value === "saving"
            ? "TRANSMITTING"
            : "COMMIT_CHANGES"}
        </button>

        {/* Use Template */}
        <button
          onClick={handleUseTemplate}
          class="flex items-center gap-3 px-8 py-4 bg-white border-[3px] border-gray-900 rounded-2xl text-[11px] font-950 text-gray-900 uppercase tracking-[0.2em] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          LOAD_TEMPLATE
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
          class={`flex items-center gap-3 px-8 py-4 rounded-2xl text-[11px] font-950 uppercase tracking-[0.2em] border-[3px] border-gray-900 transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
            showTestChat.value
              ? "bg-purple-500 text-white shadow-none"
              : "bg-white text-purple-600 shadow-[6px_6px_0px_0px_#a855f7] hover:bg-purple-50"
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-10.6 8.5 8.5 0 0 1 7 3.7Z" />
            <path d="m11 8 1 2 2-2" />
            <path d="M12 11v4" />
            <path d="M12 18h.01" />
          </svg>
          {showTestChat.value ? "ABORT_TEST" : "INITIALIZE_AI_PROBE"}
        </button>
      </div>

      {/* Error Display */}
      {errorMsg.value && (
        <div class="flex items-start gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200">
          <span class="text-rose-500 text-sm mt-0.5">⚠️</span>
          <p class="text-xs text-rose-700 leading-relaxed">{errorMsg.value}</p>
        </div>
      )}

      {/* Side Drawer for Test AI */}
      {showTestChat.value && (
        <div class="fixed inset-0 z-[100] overflow-hidden">
          {/* Backdrop */}
          <div
            class="absolute inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity duration-300"
            onClick={() => (showTestChat.value = false)}
          />

          {/* Drawer */}
          <div class="absolute inset-y-0 right-0 w-full max-w-md bg-white border-l-[6px] border-gray-900 shadow-[-20px_0px_0px_0px_#a855f7] flex flex-col transform transition-transform duration-300 translate-x-0">
            {/* Header */}
            <div class="px-8 py-8 border-b-[4px] border-gray-900 flex items-center justify-between bg-white sticky top-0 z-10">
              <div>
                <h3 class="text-2xl font-950 text-gray-900 uppercase tracking-tighter">AI_Playground</h3>
                <p class="text-[10px] text-gray-400 font-950 uppercase tracking-[0.3em] mt-1">
                  KERNEL_PROBE // GUEST_EMULATION
                </p>
              </div>
              <button
                onClick={() => (showTestChat.value = false)}
                class="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 border-[3px] border-gray-900 hover:bg-rose-50 hover:text-rose-600 transition-all group"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* API Key Missing Notice */}
            {!isApiConfigured.value && (
              <div class="m-4 p-4 rounded-2xl bg-amber-50 border border-amber-100">
                <div class="flex items-center gap-2 text-amber-800 font-700 text-xs mb-1">
                  <span>⚠️ AI Not Configured</span>
                </div>
                <p class="text-[11px] text-amber-700 leading-relaxed">
                  GEMINI_API_KEY is missing. AI concierge functions are
                  disabled. Please set the key in your environment to enable
                  chat.
                </p>
              </div>
            )}

            {/* Chat Body */}
            <div class="flex-1 overflow-y-auto px-8 py-8 space-y-6 no-scrollbar bg-gray-50">
              {testMessages.value.length === 0 && (
                <div class="h-full flex flex-col items-center justify-center text-center px-4 space-y-8">
                  <div class="w-24 h-24 rounded-[2rem] bg-purple-400 border-[4px] border-gray-900 flex items-center justify-center text-5xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-bounce">
                    🤖
                  </div>
                  <div>
                    <h4 class="text-lg font-950 text-gray-900 uppercase tracking-tighter">
                      Probe_Initialized
                    </h4>
                    <p class="text-[10px] text-gray-400 font-800 uppercase tracking-[0.2em] mt-2 max-w-[200px] mx-auto">
                      TRANSMIT A QUERY TO VERIFY KERNEL LOGIC ACCURACY.
                    </p>
                  </div>
                </div>
              )}

              {testMessages.value.map((msg, i) => (
                <div
                  key={i}
                  class={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    class={`max-w-[85%] px-6 py-4 rounded-2xl text-[11px] font-800 uppercase tracking-tight leading-relaxed border-[3px] border-gray-900 ${
                      msg.role === "user"
                        ? "bg-purple-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-white text-gray-900 shadow-[4px_4px_0px_0px_#a855f7]"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {testLoading.value && (
                <div class="flex gap-2 items-center px-6 py-4 bg-white border-[3px] border-gray-900 rounded-2xl w-fit shadow-[4px_4px_0px_0px_#a855f7]">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      class="w-2 h-2 rounded-full bg-purple-400 animate-pulse"
                      style={`animation-delay: ${i * 200}ms;`}
                    />
                  ))}
                  <span class="text-[10px] font-950 text-gray-400 ml-2">PROBING...</span>
                </div>
              )}
            </div>

            {/* Input & Footer */}
            <div class="p-8 border-t-[4px] border-gray-900 bg-white">
              {/* Suggestions */}
              {testSuggestions.value.length > 0 && !testLoading.value && (
                <div class="flex gap-3 overflow-x-auto no-scrollbar mb-6 pb-2">
                  {testSuggestions.value.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => sendTestMessage(s)}
                      class="flex-shrink-0 px-4 py-2 rounded-xl bg-gray-900 text-mint-400 text-[9px] font-950 uppercase tracking-widest border-[2px] border-gray-900 shadow-[3px_3px_0px_0px_#4ade80] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all whitespace-nowrap"
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
                  placeholder="TRANSMIT_QUERY..."
                  disabled={!isApiConfigured.value}
                  class="w-full px-6 py-5 rounded-2xl bg-gray-50 border-[3px] border-gray-900 text-xs font-950 text-gray-900 placeholder:text-gray-300 focus:bg-white focus:shadow-[6px_6px_0px_0px_#a855f7] outline-none transition-all uppercase tracking-widest"
                  maxLength={500}
                />
                <button
                  type="submit"
                  disabled={!testInput.value.trim() || testLoading.value ||
                    !isApiConfigured.value}
                  class="absolute right-3 top-3 w-10 h-10 rounded-xl bg-gray-900 text-white border-[2px] border-gray-900 shadow-[3px_3px_0px_0px_#a855f7] flex items-center justify-center hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all disabled:opacity-40"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
              <p class="mt-4 text-[9px] text-center text-gray-400 font-950 uppercase tracking-[0.2em]">
                KERNEL RESPONDS BASED ON COMMITTED LOGIC.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Help text */}
      <div class="p-8 rounded-[2.5rem] bg-gray-900 border-[4px] border-gray-900 shadow-[10px_10px_0px_0px_#4ade80]">
        <div class="flex items-center gap-4 mb-4">
          <span class="text-3xl">📖</span>
          <h4 class="text-sm font-950 text-white uppercase tracking-widest">
            ENGINE_OPTIMIZATION
          </h4>
        </div>
        <p class="text-[11px] text-gray-400 font-700 uppercase leading-relaxed tracking-widest">
          Use clear bullet points. Include <span class="text-mint-400">WiFi credentials</span>,
          <span class="text-mint-400">caretaker protocols</span>, and <span class="text-mint-400">emergency extraction points</span>. 
          Markdown is supported. The kernel only knows what you commit here.
        </p>
      </div>
    </div>
  );
}
