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
          class={`${colorMap[t.type]} text-white px-6 py-4 shadow-premium-lg rounded-2xl flex items-center gap-4 text-xs font-bold uppercase tracking-widest cursor-pointer hover:-translate-y-0.5 transition-all`}
          style={{
            animation: t.exiting
              ? "toast-exit 0.2s ease-in forwards"
              : "toast-enter 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}
          onClick={() => onDismiss(t.id)}
        >
          <span class="text-lg font-bold shrink-0">{iconMap[t.type]}</span>
          <span class="flex-1">{t.message}</span>
        </div>
      ))}
      <style>
        {`
        @keyframes toast-enter {
          from { opacity: 0; transform: translateX(100px); }
          to   { opacity: 1; transform: translateX(0); }
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
      <div class="bg-white border border-gray-100 shadow-premium rounded-[2.5rem] max-w-md w-full p-10 space-y-8 animate-slide-up">
        <div class="text-center space-y-4">
          <div class="w-20 h-20 bg-rose-50 border border-rose-100 rounded-3xl flex items-center justify-center mx-auto text-4xl shadow-sm">
            ⚠️
          </div>
          <h3 class="text-2xl font-bold text-gray-900 tracking-tight">Are you sure?</h3>
          <p class="text-sm font-medium text-gray-400 leading-relaxed">{message}</p>
        </div>
        <div class="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            class="w-full py-5 bg-rose-500 text-white font-bold rounded-2xl shadow-premium hover:bg-rose-600 transition-all uppercase tracking-widest text-[11px]"
          >
            Regenerate Token
          </button>
          <button
            onClick={onCancel}
            class="w-full py-5 bg-gray-50 text-gray-900 font-bold rounded-2xl border border-gray-100 hover:bg-white transition-all uppercase tracking-widest text-[11px]"
          >
            Cancel
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
          <p class="text-[11px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">API Authentication</p>
          <div class="h-px flex-1 bg-gray-100" />
        </div>

        <div class="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-premium">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div class="flex-1 space-y-3">
              <h3 class="text-2xl font-bold text-gray-900 tracking-tight">Access Token</h3>
              <p class="text-sm font-medium text-gray-400 leading-relaxed max-w-xl">
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
                class="px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl shadow-premium hover:bg-emerald-500 transition-all disabled:opacity-50 text-[11px] uppercase tracking-widest"
              >
                {rotating ? "Regenerating..." : "Regenerate Token"}
              </button>
            </div>
          </div>

          <div class="mt-10 relative group">
            <div class="relative bg-gray-900 p-8 rounded-2xl border border-gray-800 flex items-center justify-between gap-6 overflow-hidden shadow-premium-lg">
               <code class="text-emerald-400 font-mono text-sm tracking-widest truncate">
                 {apiKey || "No token provisioned"}
               </code>
               <button
                 onClick={() => copyToClipboard(apiKey, "API Key")}
                 class="p-4 bg-emerald-500 text-white rounded-xl shadow-sm hover:bg-emerald-600 active:scale-95 transition-all shrink-0"
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
          <p class="text-[11px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Webhooks</p>
          <div class="h-px flex-1 bg-gray-100" />
        </div>

        <div class="bg-white rounded-[3rem] border border-gray-100 shadow-premium overflow-hidden">
          <div class="px-10 py-10 border-b border-gray-50 bg-gray-50/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 class="text-2xl font-bold text-gray-900 tracking-tight">Webhooks</h3>
              <p class="text-xs font-medium text-gray-400 mt-2 uppercase tracking-widest">Receive real-time updates for property events.</p>
            </div>
            <button
               onClick={() => showToast("Webhook creation coming soon", "info")}
               class="px-8 py-4 bg-gray-900 text-white text-sm font-bold rounded-2xl shadow-premium hover:bg-emerald-500 transition-all uppercase tracking-widest"
            >
              + Add Webhook
            </button>
          </div>

          <div class="overflow-x-auto">
            {webhooks.length === 0 ? (
              <div class="py-32 text-center space-y-6">
                <p class="text-6xl grayscale opacity-20">📡</p>
                <p class="text-[11px] font-bold text-gray-300 uppercase tracking-widest">No webhooks configured</p>
              </div>
            ) : (
              <table class="w-full text-left">
                <thead>
                  <tr class="bg-white border-b border-gray-50">
                    <th class="px-10 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">URL</th>
                    <th class="px-10 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Event</th>
                    <th class="px-10 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                    <th class="px-10 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  {webhooks.map((w) => (
                    <tr key={w.id} class="group hover:bg-emerald-50/30 transition-colors">
                      <td class="px-10 py-8">
                        <p class="text-sm font-bold text-gray-900 tracking-tight mb-1">{w.url}</p>
                        <p class="text-[10px] font-medium text-gray-400">ID: {w.id}</p>
                      </td>
                      <td class="px-10 py-8">
                        <span class="px-3 py-1 bg-gray-900 text-emerald-400 text-[10px] font-bold rounded-lg uppercase tracking-widest">
                          {w.event}
                        </span>
                      </td>
                      <td class="px-10 py-8">
                         <div class="flex items-center gap-3">
                           <div class={`w-2 h-2 rounded-full ${w.active ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`} />
                           <span class="text-[10px] font-bold text-gray-900 uppercase tracking-widest">{w.active ? 'Active' : 'Disabled'}</span>
                         </div>
                      </td>
                      <td class="px-10 py-8 text-right space-x-3">
                        <button class="p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-premium-hover hover:-translate-y-0.5 transition-all text-gray-400 hover:text-emerald-500">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button class="p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-premium-hover hover:-translate-y-0.5 transition-all text-gray-400 hover:text-rose-500">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
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
      <div class="p-10 bg-gray-900 rounded-[2.5rem] shadow-premium-lg relative overflow-hidden group">
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none" />
        <div class="flex items-start gap-8">
           <div class="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-4xl shadow-sm shrink-0">
             📚
           </div>
           <div>
             <h4 class="text-lg font-bold text-white tracking-tight mb-3">API Documentation</h4>
             <p class="text-[11px] text-gray-400 font-medium uppercase tracking-widest leading-relaxed max-w-2xl">
               Build custom integrations using our RESTful JSON interface. 
               All requests must include the <span class="text-emerald-400 font-bold">Authorization: Bearer [TOKEN]</span> header. 
               Webhooks are dispatched via POST with a HMAC-SHA256 signature.
             </p>
           </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
      ` }} />
    </div>
  );
}
