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
    info: "bg-gray-800",
  };

  const iconMap: Record<ToastType, string> = {
    success: "✓",
    error: "✕",
    info: "ℹ",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        maxWidth: "380px",
      }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          class={`${
            colorMap[t.type]
          } text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 text-sm font-600`}
          style={{
            animation: t.exiting
              ? "toast-exit 0.3s ease-in forwards"
              : "toast-enter 0.35s ease-out",
            cursor: "pointer",
          }}
          onClick={() => onDismiss(t.id)}
        >
          <span class="text-base font-800 shrink-0">{iconMap[t.type]}</span>
          <span class="flex-1">{t.message}</span>
        </div>
      ))}
      <style>
        {`
        @keyframes toast-enter {
          from { opacity: 0; transform: translateX(80px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes toast-exit {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(80px); }
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
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        class="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4"
        style={{ animation: "toast-enter 0.25s ease-out" }}
      >
        <p class="text-sm text-gray-700 mb-5 leading-relaxed">{message}</p>
        <div class="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onCancel}
            class="px-4 py-2 rounded-xl text-sm font-600 text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            class="px-4 py-2 rounded-xl text-sm font-700 text-white bg-rose-500 hover:bg-rose-600 transition-colors"
          >
            Confirm
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
    // Auto-dismiss after 3s
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

  const showConfirm = useCallback(
    (message: string): Promise<boolean> =>
      new Promise((resolve) => {
        setConfirmState({
          message,
          onConfirm: () => {
            setConfirmState(null);
            resolve(true);
          },
        });
        // If user cancels, the onCancel handler in the modal resolves false
      }),
    [],
  );

  // ── Data fetching ─────────────────────────────────────────
  const fetchWebhooks = async () => {
    try {
      const res = await fetch(`/api/host/webhooks?hostId=${hostId}`);
      const data = await res.json();
      if (data.webhooks) setWebhooks(data.webhooks);
    } catch (err) {
      console.error("Failed to fetch webhooks:", err);
    }
  };

  useEffect(() => {
    fetchWebhooks();
  }, []);

  // ── Handlers ──────────────────────────────────────────────
  const handleRotateKey = async () => {
    const confirmed = await showConfirm(
      "This will generate a new API key. Your current key will remain valid for 24 hours. Continue?",
    );
    if (!confirmed) return;

    setRotating(true);
    try {
      const res = await fetch("/api/host/api-key/rotate", {
        method: "POST",
        body: JSON.stringify({ hostId }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.apiKey) {
        setApiKey(data.apiKey);
        showToast(
          "API key rotated successfully. Old key valid for 24h.",
          "success",
        );
      } else {
        showToast(data.error || "Failed to rotate key", "error");
      }
    } catch (_err) {
      showToast("Failed to rotate key. Please try again.", "error");
    } finally {
      setRotating(false);
    }
  };

  const handleAddWebhook = async (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    setLoading(true);
    try {
      const res = await fetch("/api/host/webhooks/add", {
        method: "POST",
        body: JSON.stringify({
          hostId,
          url: formData.get("url"),
          event: formData.get("event"),
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        form.reset();
        await fetchWebhooks();
        showToast("Webhook endpoint added", "success");
      } else {
        showToast("Failed to add webhook endpoint", "error");
      }
    } catch (_err) {
      showToast("Failed to add webhook. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWebhook = async (id: string) => {
    try {
      const res = await fetch("/api/host/webhooks/remove", {
        method: "POST",
        body: JSON.stringify({ hostId, webhookId: id }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        await fetchWebhooks();
        showToast("Webhook removed", "info");
      } else {
        showToast("Failed to remove webhook", "error");
      }
    } catch (_err) {
      showToast("Failed to remove webhook. Please try again.", "error");
    }
  };

  const handleCopyApiKey = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(apiKey);
      showToast("API key copied to clipboard", "success");
    }
  };

  const handleCopySecret = (secret: string) => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(secret);
      showToast("Webhook secret copied to clipboard", "success");
    }
  };

  const toggleSecretReveal = (hookId: string) => {
    setRevealedSecrets((prev) => {
      const next = new Set(prev);
      if (next.has(hookId)) {
        next.delete(hookId);
      } else {
        next.add(hookId);
      }
      return next;
    });
  };

  const maskSecret = (secret: string) => {
    if (!secret) return "••••••••";
    const prefix = secret.slice(0, 6);
    return `${prefix}${"•".repeat(Math.max(0, secret.length - 6))}`;
  };

  return (
    <div class="space-y-6">
      {/* Toast Layer */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Confirm Modal */}
      {confirmState && (
        <ConfirmModal
          message={confirmState.message}
          onConfirm={confirmState.onConfirm}
          onCancel={() => {
            setConfirmState(null);
          }}
        />
      )}

      {/* API Key Section */}
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base font-700 text-gray-900">Agency API Key</h2>
            <p class="text-xs text-gray-400">
              Use this key to authenticate with the istay Open API
            </p>
          </div>
          <button
            type="button"
            onClick={handleRotateKey}
            disabled={rotating}
            class="text-xs font-700 text-istay-600 hover:text-istay-800 disabled:opacity-50"
          >
            {rotating ? "Rotating..." : "Rotate Key"}
          </button>
        </div>

        <div class="relative group">
          <input
            type="text"
            readonly
            value={apiKey || "istay_sk_xxxxxxxxxxxxxxxxxxxxxxxx"}
            class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 font-mono text-sm text-gray-600 pr-12 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleCopyApiKey}
            class="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-istay-600 transition-colors"
            title="Copy to clipboard"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1">
              </path>
            </svg>
          </button>
        </div>
      </div>

      {/* Webhooks Section */}
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-gray-50">
          <h2 class="text-base font-700 text-gray-900">Outbound Webhooks</h2>
          <p class="text-xs text-gray-400">
            Receive real-time events when bookings are confirmed or rooms are
            ready
          </p>
        </div>

        <div class="divide-y divide-gray-50">
          {webhooks.length === 0
            ? (
              <div class="p-12 text-center text-gray-400 text-sm italic">
                No webhooks configured
              </div>
            )
            : (
              webhooks.map((hook) => (
                <div
                  key={hook.id}
                  class="p-4 hover:bg-gray-50/50 transition-colors"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div
                        class={`w-2 h-2 rounded-full ${
                          hook.active ? "bg-emerald-500" : "bg-gray-300"
                        }`}
                      />
                      <div>
                        <p class="text-sm font-600 text-gray-900 truncate max-w-xs">
                          {hook.url}
                        </p>
                        <p class="text-[10px] uppercase font-700 text-gray-400">
                          {hook.event}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteWebhook(hook.id)}
                      class="p-2 text-gray-400 hover:text-rose-500 rounded-lg transition-colors"
                      title="Remove webhook"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>

                  {/* Webhook Secret Row */}
                  {hook.secret && (
                    <div class="mt-2 flex items-center gap-2 ml-5 pl-3 border-l-2 border-gray-100">
                      <span class="text-[10px] uppercase font-700 text-gray-400 shrink-0">
                        HMAC Secret
                      </span>
                      <code class="text-xs font-mono text-gray-500 bg-gray-50 px-2 py-1 rounded-lg flex-1 truncate">
                        {revealedSecrets.has(hook.id)
                          ? hook.secret
                          : maskSecret(hook.secret)}
                      </code>
                      <button
                        type="button"
                        onClick={() => toggleSecretReveal(hook.id)}
                        class="text-[10px] font-700 text-istay-600 hover:text-istay-800 transition-colors shrink-0"
                        title={revealedSecrets.has(hook.id)
                          ? "Hide secret"
                          : "Reveal secret"}
                      >
                        {revealedSecrets.has(hook.id) ? "Hide" : "Reveal"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopySecret(hook.secret)}
                        class="p-1 text-gray-400 hover:text-istay-600 transition-colors shrink-0"
                        title="Copy secret"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <rect
                            x="9"
                            y="9"
                            width="13"
                            height="13"
                            rx="2"
                            ry="2"
                          >
                          </rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1">
                          </path>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
        </div>

        <div class="p-4 bg-gray-50/50 border-t border-gray-50">
          <form
            onSubmit={handleAddWebhook}
            class="flex flex-col sm:flex-row gap-3"
          >
            <input
              name="url"
              type="url"
              placeholder="https://your-app.com/webhook"
              required
              class="flex-1 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-istay-500 transition-all"
            />
            <select
              name="event"
              class="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-istay-500 transition-all"
            >
              <option value="all">All Events</option>
              <option value="booking_confirmed">Booking Confirmed</option>
              <option value="verification_complete">
                Verification Complete
              </option>
              <option value="room_ready">Room Ready</option>
            </select>
            <button
              type="submit"
              disabled={loading}
              class="px-5 py-2 rounded-xl bg-gray-900 text-white text-sm font-700 hover:bg-gray-800 transition-all disabled:opacity-50"
            >
              Add Endpoint
            </button>
          </form>
        </div>
      </div>

      {/* Widget Generator Section */}
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base font-700 text-gray-900">Direct Booking Widget</h2>
            <p class="text-xs text-gray-400">
              Embed a "Book Now" button on your personal website or blog
            </p>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-800 uppercase tracking-wider">
              No Fee
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <label class="text-[10px] uppercase font-800 text-gray-400 mb-1.5 block">
                Widget Accent Color
              </label>
              <div class="flex items-center gap-2">
                <input
                  type="color"
                  id="widget-color"
                  value="#0d9488"
                  class="w-10 h-10 rounded-lg cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  id="widget-color-hex"
                  value="0d9488"
                  class="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label class="text-[10px] uppercase font-800 text-gray-400 mb-1.5 block">
                Button Label
              </label>
              <input
                type="text"
                id="widget-label"
                defaultValue="Book Direct & Save"
                class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-600"
              />
            </div>

            <div class="flex gap-4">
              <div class="flex-1">
                <label class="text-[10px] uppercase font-800 text-gray-400 mb-1.5 block">
                  Theme
                </label>
                <select id="widget-theme" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-600">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
              <div class="flex-1">
                <label class="text-[10px] uppercase font-800 text-gray-400 mb-1.5 block">
                  Size
                </label>
                <select id="widget-size" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-600">
                  <option value="sm">Small</option>
                  <option value="md" selected>Medium</option>
                  <option value="lg">Large</option>
                </select>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <label class="text-[10px] uppercase font-800 text-gray-400 mb-1.5 block">
              Embed Snippet
            </label>
            <div class="relative group h-full">
              <textarea
                readonly
                id="widget-snippet"
                class="w-full h-[120px] px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 font-mono text-[11px] text-gray-300 focus:outline-none resize-none"
                value={`<!-- istay Direct Booking Widget -->\n<iframe \n  src="https://istay.space/widgets/book-now/${hostId}?accent=0d9488&label=Book+Direct+&+Save"\n  width="240"\n  height="60"\n  frameborder="0"\n  scrolling="no"\n></iframe>`}
              />
              <button
                type="button"
                onClick={() => {
                  const color = (document.getElementById("widget-color-hex") as HTMLInputElement).value;
                  const label = encodeURIComponent((document.getElementById("widget-label") as HTMLInputElement).value);
                  const theme = (document.getElementById("widget-theme") as HTMLSelectElement).value;
                  const size = (document.getElementById("widget-size") as HTMLSelectElement).value;
                  
                  const snippet = `<!-- istay Direct Booking Widget -->\n<iframe \n  src="https://istay.space/widgets/book-now/${hostId}?accent=${color}&label=${label}&theme=${theme}&size=${size}"\n  width="${size === 'lg' ? '280' : size === 'sm' ? '200' : '240'}"\n  height="${size === 'lg' ? '70' : size === 'sm' ? '50' : '60'}"\n  frameborder="0"\n  scrolling="no"\n></iframe>`;
                  
                  navigator.clipboard.writeText(snippet);
                  showToast("Widget snippet copied to clipboard", "success");
                }}
                class="absolute right-3 top-3 p-2 text-gray-500 hover:text-white transition-colors"
                title="Copy to clipboard"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
