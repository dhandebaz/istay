import { useState, useEffect } from "preact/hooks";

interface Webhook {
  id: string;
  url: string;
  event: string;
  active: boolean;
}

export default function DeveloperApi({ hostId, initialKey }: { hostId: string, initialKey?: string }) {
  const [apiKey, setApiKey] = useState(initialKey || "");
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [loading, setLoading] = useState(false);
  const [rotating, setRotating] = useState(false);

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

  const handleRotateKey = async () => {
    if (!confirm("This will invalidate your current API Key. Are you sure?")) return;
    setRotating(true);
    try {
      const res = await fetch("/api/host/api-key/rotate", {
        method: "POST",
        body: JSON.stringify({ hostId }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      if (data.apiKey) setApiKey(data.apiKey);
    } catch (err) {
      alert("Failed to rotate key");
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
          event: formData.get("event")
        }),
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) {
        form.reset();
        await fetchWebhooks();
      }
    } catch (err) {
      alert("Failed to add webhook");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWebhook = async (id: string) => {
    try {
      const res = await fetch("/api/host/webhooks/remove", {
        method: "POST",
        body: JSON.stringify({ hostId, webhookId: id }),
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) await fetchWebhooks();
    } catch (err) {
      alert("Failed to remove webhook");
    }
  };

  return (
    <div class="space-y-6">
      {/* API Key Section */}
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base font-700 text-gray-900">Agency API Key</h2>
            <p class="text-xs text-gray-400">Use this key to authenticate with the istay Open API</p>
          </div>
          <button 
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
            onClick={() => {
              navigator.clipboard.writeText(apiKey);
              alert("Copied to clipboard!");
            }}
            class="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-istay-600 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Webhooks Section */}
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-gray-50">
          <h2 class="text-base font-700 text-gray-900">Outbound Webhooks</h2>
          <p class="text-xs text-gray-400">Receive real-time events when bookings are confirmed or rooms are ready</p>
        </div>

        <div class="divide-y divide-gray-50">
          {webhooks.length === 0 ? (
            <div class="p-12 text-center text-gray-400 text-sm italic">No webhooks configured</div>
          ) : (
            webhooks.map((hook) => (
              <div key={hook.id} class="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                <div class="flex items-center gap-3">
                  <div class={`w-2 h-2 rounded-full ${hook.active ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                  <div>
                    <p class="text-sm font-600 text-gray-900 truncate max-w-xs">{hook.url}</p>
                    <p class="text-[10px] uppercase font-700 text-gray-400">{hook.event}</p>
                  </div>
                </div>
                <button 
                   onClick={() => handleDeleteWebhook(hook.id)}
                   class="p-2 text-gray-400 hover:text-rose-500 rounded-lg transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        <div class="p-4 bg-gray-50/50 border-t border-gray-50">
           <form onSubmit={handleAddWebhook} class="flex flex-col sm:flex-row gap-3">
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
                <option value="verification_complete">Verification Complete</option>
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
    </div>
  );
}
