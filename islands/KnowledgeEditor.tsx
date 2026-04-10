import { useSignal } from "@preact/signals";
import { useRef } from "preact/hooks";

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
    <div class="space-y-5">
      {/* Property Header */}
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-700 text-gray-900">{propertyName}</h2>
          <p class="text-xs text-gray-400 mt-0.5">
            AI Concierge Knowledge Base
          </p>
        </div>
        <span class="text-xs text-gray-400">
          {charCount.value.toLocaleString()} / {MAX_CHARS.toLocaleString()}
        </span>
      </div>

      {/* Editor */}
      <div class="relative">
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
          placeholder="Type your property knowledge base here in Markdown format...

Include WiFi credentials, check-in instructions, house rules, nearby places, caretaker contact, and emergency numbers.

Your AI concierge will use ONLY this information to answer guests."
          class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 font-mono leading-relaxed focus:border-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-100 resize-y transition-all"
          aria-label="Knowledge base content"
          spellcheck={false}
        />

        {/* Char count bar */}
        <div class="absolute bottom-3 right-3 flex items-center gap-2">
          {charCount.value > MAX_CHARS * 0.9 && (
            <span class="text-xs text-amber-500 font-500">
              {MAX_CHARS - charCount.value} left
            </span>
          )}
        </div>
      </div>

      {/* Action Row */}
      <div class="flex flex-wrap gap-3">
        {/* Save */}
        <button
          onClick={handleSave}
          disabled={state.value === "saving" || !content.value.trim()}
          class={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-700 transition-all active:scale-95 ${
            state.value === "saved"
              ? "bg-emerald-500 text-white"
              : "bg-mint-500 text-white hover:bg-mint-600"
          } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          {state.value === "saving" && (
            <span class="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
          )}
          {state.value === "saved" && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7L5.5 10.5L12 3.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          )}
          {state.value === "saved"
            ? "Saved!"
            : state.value === "saving"
            ? "Saving..."
            : hasChanges
            ? "Save Changes"
            : "Save"}
        </button>

        {/* Use Template */}
        <button
          onClick={handleUseTemplate}
          class="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-600 text-gray-600 hover:bg-gray-50 transition-colors active:scale-95"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <rect x="2" y="1" width="10" height="12" rx="1.5" stroke="currentColor" stroke-width="1.25" />
            <path d="M5 4H9M5 7H9M5 10H7" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" />
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
          class={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-600 transition-all active:scale-95 ${
            showTestChat.value
              ? "bg-purple-500 text-white"
              : "border border-purple-200 text-purple-600 hover:bg-purple-50"
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.25" />
            <path d="M5 5.5C5 4.67 5.67 4 6.5 4H7.5C8.33 4 9 4.67 9 5.5C9 6.33 8.33 7 7.5 7H7V8.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" />
            <circle cx="7" cy="10" r="0.75" fill="currentColor" />
          </svg>
          {showTestChat.value ? "Close Test" : "Test AI"}
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
        <div class="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => (showTestChat.value = false)}
          />

          {/* Drawer */}
          <div class="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col transform transition-transform duration-300 translate-x-0">
            {/* Header */}
            <div class="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div>
                <h3 class="text-base font-800 text-gray-900">AI Playground</h3>
                <p class="text-[11px] text-gray-400 font-500 uppercase tracking-wider">
                  Testing as Guest
                </p>
              </div>
              <button
                onClick={() => (showTestChat.value = false)}
                class="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-all"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
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
                  GEMINI_API_KEY is missing. AI concierge functions are disabled. Please set the key in your environment to enable chat.
                </p>
              </div>
            )}

            {/* Chat Body */}
            <div class="flex-1 overflow-y-auto px-6 py-6 space-y-4 no-scrollbar bg-gray-50/50">
              {testMessages.value.length === 0 && (
                <div class="h-full flex flex-col items-center justify-center text-center px-4 space-y-4">
                  <div class="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-3xl">
                    🤖
                  </div>
                  <div>
                    <h4 class="text-sm font-700 text-gray-900">Ask your Concierge</h4>
                    <p class="text-[11px] text-gray-400 mt-1 max-w-[180px]">
                      Type a question or pick a suggestion below to see how the AI answers.
                    </p>
                  </div>
                </div>
              )}

              {testMessages.value.map((msg, i) => (
                <div
                  key={i}
                  class={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    class={`max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-purple-600 text-white rounded-tr-sm"
                        : "bg-white border border-gray-100 text-gray-800 rounded-tl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {testLoading.value && (
                <div class="flex gap-1.5 items-center px-4 py-3 bg-white border border-gray-100 rounded-2xl w-fit shadow-sm">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      class="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce"
                      style={`animation-delay: ${i * 150}ms;`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Input & Footer */}
            <div class="p-6 border-t border-gray-100 bg-white">
              {/* Suggestions */}
              {testSuggestions.value.length > 0 && !testLoading.value && (
                <div class="flex gap-2 overflow-x-auto no-scrollbar mb-4 pb-1">
                  {testSuggestions.value.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => sendTestMessage(s)}
                      class="flex-shrink-0 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-[10px] font-700 text-purple-700 hover:bg-purple-100 transition-all whitespace-nowrap"
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
                  onInput={(e) => (testInput.value = (e.target as HTMLInputElement).value)}
                  placeholder="Ask a guest question..."
                  disabled={!isApiConfigured.value}
                  class="w-full pl-4 pr-12 py-3.5 rounded-2xl bg-gray-100 text-xs text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-purple-100 focus:outline-none transition-all border-none disabled:opacity-50"
                  maxLength={500}
                />
                <button
                  type="submit"
                  disabled={!testInput.value.trim() || testLoading.value || !isApiConfigured.value}
                  class="absolute right-2 top-2 w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700 active:scale-90 transition-all disabled:opacity-40 shadow-sm"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7L13 1L7 13L6.25 7.75L1 7Z" fill="white" />
                  </svg>
                </button>
              </form>
              <p class="mt-3 text-[10px] text-center text-gray-400">
                AI uses your saved knowledge to respond.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Help text */}
      <div class="p-5 rounded-2xl bg-gray-50 border border-gray-100">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-lg">📖</span>
          <h4 class="text-xs font-800 text-gray-700">Writing Great Knowledge</h4>
        </div>
        <p class="text-[11px] text-gray-500 leading-relaxed">
          Use clear bullet points. Include <span class="text-gray-900 font-600">WiFi password</span>, 
          <span class="text-gray-900 font-600">caretaker name</span>, and <span class="text-gray-900 font-600">emergency spots</span>. 
          Markdown is supported. The AI only knows what you write here — it has no access to your Airbnb account once imported.
        </p>
      </div>
    </div>
  );
}
