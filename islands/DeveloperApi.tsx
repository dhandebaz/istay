import { useCallback, useEffect, useState } from "preact/hooks";

// ── Toast Notification System ─────────────────────────────────

type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
  exiting?: boolean;
}

let toastId = 0;

function ToastContainer(
  { toasts, onDismiss }: {
    toasts: ToastItem[];
    onDismiss: (id: number) => void;
  },
) {
  const colorMap: Record<ToastType, string> = {
    success: "bg-emerald-500",
    error: "bg-rose-500",
    info: "bg-gray-900",
  };

  const iconMap: Record<ToastType, string> = {
    success: "✓",
    error: "✕",
    info: "ℹ",
  };

  return (
    <div class="fixed top-8 right-8 z-[9999] flex flex-col gap-4 max-w-[380px]">
      {toasts.map((t) => (
        <div
          key={t.id}
          class={`${colorMap[t.type]} text-white px-6 py-4 border-[3px] border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-xl flex items-center gap-4 text-xs font-950 uppercase tracking-widest cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all`}
          style={{
            animation: t.exiting
              ? "toast-exit 0.2s ease-in forwards"
              : "toast-enter 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}
          onClick={() => onDismiss(t.id)}
        >
          <span class="text-lg font-950 shrink-0">{iconMap[t.type]}</span>
          <span class="flex-1">{t.message}</span>
        </div>
      ))}
      <style>
        {`
        @keyframes toast-enter {
          from { opacity: 0; transform: translateX(100px) rotate(5deg); }
          to   { opacity: 1; transform: translateX(0) rotate(0); }
        }
        @keyframes toast-exit {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(100px); }
        }
      `}
      </style>
    </div>
  );
}

// ── Confirm Modal ─────────────────────────────────────────────

function ConfirmModal({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div class="fixed inset-0 z-[9998] flex items-center justify-center p-6 bg-gray-900/40 backdrop-blur-sm animate-fade-in">
      <div class="bg-white border-[4px] border-gray-900 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] rounded-[2.5rem] max-w-md w-full p-10 space-y-8 animate-brutal-pop">
        <div class="text-center space-y-4">
          <div class="w-20 h-20 bg-rose-50 border-[3px] border-gray-900 rounded-2xl flex items-center justify-center mx-auto text-4xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            ⚠️
          </div>
          <h3 class="text-2xl font-950 text-gray-900 uppercase tracking-tighter">Confirm_Action</h3>
          <p class="text-[10px] font-800 text-gray-400 uppercase tracking-widest leading-relaxed">{message}</p>
        </div>
        <div class="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            class="w-full py-5 bg-rose-500 text-white font-950 rounded-2xl border-[3px] border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase tracking-widest text-[10px]"
          >
            YES, EXECUTE
          </button>
          <button
            onClick={onCancel}
            class="w-full py-5 bg-white text-gray-900 font-950 rounded-2xl border-[3px] border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase tracking-widest text-[10px]"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────

interface Webhook {
  id: string;
  url: string;
  secret: string;
  event: string;
  active: boolean;
}

export default function DeveloperApi(
  { hostId, initialKey }: { hostId: string; initialKey?: string },
) {
  const [apiKey, setApiKey] = useState(initialKey || "");
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [loading, setLoading] = useState(false);
  const [rotating, setRotating] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [confirmState, setConfirmState] = useState<
    {
      message: string;
      onConfirm: () => void;
    } | null
  >(null);
  const [revealedSecrets, setRevealedSecrets] = useState<Set<string>>(
    new Set(),
  );

  // ── Toast helpers ─────────────────────────────────────────
  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => t.id === id ? { ...t, exiting: true } : t)
      );
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, 3000);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) =>
      prev.map((t) => t.id === id ? { ...t, exiting: true } : t)
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  // ── Handlers ──────────────────────────────────────────────
  const loadWebhooks = useCallback(async () => {
    try {
      const res = await fetch(`/api/developers/webhooks?hostId=${hostId}`);
      const data = await res.json();
      if (data.ok) setWebhooks(data.webhooks);
    } catch {
      showToast("Failed to sync webhooks", "error");
    }
  }, [hostId, showToast]);

  useEffect(() => {
    loadWebhooks();
  }, [loadWebhooks]);

  const rotateKey = async () => {
    setRotating(true);
    try {
      const res = await fetch("/api/developers/key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hostId }),
      });
      const data = await res.json();
      if (data.ok) {
        setApiKey(data.apiKey);
        showToast("Access token regenerated", "success");
      } else {
        showToast(data.error || "Regeneration failed", "error");
      }
    } catch {
      showToast("Network failure during rotation", "error");
    } finally {
      setRotating(false);
      setConfirmState(null);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to system buffer`, "success");
  };

  return (
    <div class="space-y-12 animate-fade-in">
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      {confirmState && (
        <ConfirmModal
          message={confirmState.message}
          onConfirm={confirmState.onConfirm}
          onCancel={() => setConfirmState(null)}
        />
      )}

      {/* ── API Access Section ─────────────────────────────────── */}
      <section class="space-y-8">
        <div class="flex items-center gap-4">
          <p class="text-[10px] font-950 text-gray-400 uppercase tracking-[0.4em] whitespace-nowrap">AUTHENTICATION_PROTOCOL</p>
          <div class="h-[2px] flex-1 bg-gray-100" />
        </div>

        <div class="bg-white p-10 rounded-[2.5rem] border-[4px] border-gray-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div class="flex-1 space-y-4">
              <h3 class="text-2xl font-950 text-gray-900 uppercase tracking-tighter">Global_Access_Token</h3>
              <p class="text-[10px] font-800 text-gray-400 uppercase tracking-widest leading-relaxed max-w-xl">
                Use this token to authenticate server-to-server requests. 
                Keep it secret. Regenerating will invalidate the previous token immediately.
              </p>
            </div>
            <div class="flex items-center gap-4 w-full lg:w-auto">
              <button
                onClick={() => setConfirmState({
                  message: "Previous token will be destroyed. All active integrations using the old token will fail immediately.",
                  onConfirm: rotateKey
                })}
                disabled={rotating}
                class="px-8 py-4 bg-gray-900 text-white font-950 rounded-2xl border-[3px] border-gray-900 shadow-[6px_6px_0px_0px_#4ade80] hover:bg-mint-400 hover:text-gray-900 transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 text-[10px] uppercase tracking-widest"
              >
                {rotating ? "REGENERATING..." : "ROTATE_TOKEN"}
              </button>
            </div>
          </div>

          <div class="mt-10 relative group">
            <div class="absolute inset-0 bg-gray-900 rounded-2xl border-[3px] border-gray-900 transform translate-x-[6px] translate-y-[6px]" />
            <div class="relative bg-gray-900 p-8 rounded-2xl border-[3px] border-gray-900 flex items-center justify-between gap-6 overflow-hidden">
               <code class="text-mint-400 font-mono text-sm tracking-widest truncate">
                 {apiKey || "TOKEN_NOT_PROVISIONED"}
               </code>
               <button
                 onClick={() => copyToClipboard(apiKey, "API Key")}
                 class="p-4 bg-mint-400 text-gray-900 rounded-xl border-[2px] border-gray-900 hover:scale-105 active:scale-95 transition-all shrink-0"
                 title="Copy to buffer"
               >
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                   <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                   <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                 </svg>
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Webhooks Section ───────────────────────────────────── */}
      <section class="space-y-8">
        <div class="flex items-center gap-4">
          <p class="text-[10px] font-950 text-gray-400 uppercase tracking-[0.4em] whitespace-nowrap">EVENT_DISPATCH_PIPELINE</p>
          <div class="h-[2px] flex-1 bg-gray-100" />
        </div>

        <div class="bg-white rounded-[3rem] border-[4px] border-gray-900 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          <div class="px-10 py-10 border-b-[4px] border-gray-900 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 class="text-2xl font-950 text-gray-900 uppercase tracking-tighter">Webhooks</h3>
              <p class="text-[10px] font-800 text-gray-400 uppercase tracking-widest mt-2">REAL-TIME SIGNAL STREAMING</p>
            </div>
            <button
               onClick={() => showToast("Webhook creation coming soon", "info")}
               class="px-8 py-4 bg-mint-400 text-gray-900 font-950 rounded-2xl border-[3px] border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-[10px] uppercase tracking-widest"
            >
              + NEW_ENDPOINT
            </button>
          </div>

          <div class="overflow-x-auto">
            {webhooks.length === 0 ? (
              <div class="py-32 text-center space-y-6">
                <p class="text-6xl grayscale opacity-20">📡</p>
                <p class="text-[10px] font-950 text-gray-400 uppercase tracking-[0.3em]">NO_ACTIVE_PIPELINES_DETECTED</p>
              </div>
            ) : (
              <table class="w-full text-left">
                <thead>
                  <tr class="bg-white border-b-[3px] border-gray-900">
                    <th class="px-10 py-6 text-[10px] font-950 text-gray-400 uppercase tracking-widest">ENDPOINT_URL</th>
                    <th class="px-10 py-6 text-[10px] font-950 text-gray-400 uppercase tracking-widest">EVENT_FILTER</th>
                    <th class="px-10 py-6 text-[10px] font-950 text-gray-400 uppercase tracking-widest">STATUS</th>
                    <th class="px-10 py-6 text-[10px] font-950 text-gray-400 uppercase tracking-widest text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody class="divide-y-[2px] divide-gray-100">
                  {webhooks.map((w) => (
                    <tr key={w.id} class="group hover:bg-gray-50 transition-colors">
                      <td class="px-10 py-8">
                        <p class="text-sm font-950 text-gray-900 tracking-tighter mb-1">{w.url}</p>
                        <p class="text-[9px] font-800 text-gray-400 uppercase tracking-widest">ID: {w.id}</p>
                      </td>
                      <td class="px-10 py-8">
                        <span class="px-3 py-1 bg-gray-900 text-mint-400 text-[9px] font-950 rounded-lg uppercase tracking-widest">
                          {w.event}
                        </span>
                      </td>
                      <td class="px-10 py-8">
                         <div class="flex items-center gap-3">
                           <div class={`w-2 h-2 rounded-full ${w.active ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`} />
                           <span class="text-[10px] font-950 text-gray-900 uppercase tracking-widest">{w.active ? 'ACTIVE' : 'DISABLED'}</span>
                         </div>
                      </td>
                      <td class="px-10 py-8 text-right space-x-3">
                        <button class="p-3 bg-white border-[2px] border-gray-900 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button class="p-3 bg-rose-50 text-rose-500 border-[2px] border-gray-900 rounded-xl shadow-[3px_3px_0px_0px_#9f1239] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>

      {/* ── Help Section ───────────────────────────────────────── */}
      <div class="p-10 bg-gray-900 rounded-[2.5rem] border-[4px] border-gray-900 shadow-[12px_12px_0px_0px_#4ade80]">
        <div class="flex items-start gap-8">
           <div class="w-16 h-16 bg-mint-400 border-[3px] border-gray-900 rounded-2xl flex items-center justify-center text-4xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shrink-0">
             📚
           </div>
           <div>
             <h4 class="text-lg font-950 text-white uppercase tracking-tighter mb-3">API_Documentation</h4>
             <p class="text-[11px] text-gray-400 font-700 uppercase tracking-widest leading-relaxed max-w-2xl">
               Build custom integrations using our RESTful JSON interface. 
               All requests must include the <span class="text-mint-400">Authorization: Bearer [TOKEN]</span> header. 
               Webhooks are dispatched via POST with a HMAC-SHA256 signature in the <span class="text-mint-400">X-IStay-Signature</span> header.
             </p>
           </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes brutal-pop {
          0% { transform: scale(0.9) translateY(20px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-brutal-pop { animation: brutal-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
      ` }} />
    </div>
  );
}
