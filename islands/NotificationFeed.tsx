import { useState } from "preact/hooks";
import type { Notification } from "../utils/types.ts";

interface NotificationFeedProps {
  initialNotifications: Notification[];
}

export default function NotificationFeed({ initialNotifications }: NotificationFeedProps) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch("/api/notifications/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setNotifications(notifications.filter((n) => n.id !== id));
      }
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const res = await fetch("/api/notifications/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true }),
      });
      if (res.ok) {
        setNotifications([]);
      }
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err);
    }
  };

  return (
    <div class="bg-white flex flex-col">
      <div class="px-8 py-6 border-b-[3px] border-gray-900 bg-gray-50 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-3 h-3 rounded-full bg-mint-500 animate-pulse border-[2px] border-gray-900" />
          <h2 class="text-[10px] font-950 text-gray-900 uppercase tracking-[0.3em]">
            SYSTEM_SIGNALS
          </h2>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={markAllAsRead}
            class="text-[9px] font-950 text-gray-400 hover:text-rose-500 transition-colors uppercase tracking-widest border-b-2 border-transparent hover:border-rose-500"
          >
            PURGE_ALL
          </button>
        )}
      </div>

      <div class="flex-1 overflow-y-auto max-h-[500px] no-scrollbar">
        {notifications.length === 0
          ? (
            <div class="py-24 text-center">
              <p class="text-5xl mb-6 opacity-20">📡</p>
              <p class="text-[10px] text-gray-400 font-950 uppercase tracking-[0.3em]">
                NO_ACTIVE_SIGNALS
              </p>
            </div>
          )
          : (
            <div class="divide-y-[2px] divide-gray-100">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  class="p-8 transition-all hover:bg-gray-50 group relative"
                >
                  <div class="flex items-start gap-6">
                    <div
                      class={`w-14 h-14 rounded-2xl border-[3px] border-gray-900 flex items-center justify-center shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                        n.type === "housekeeping_ready"
                          ? "bg-emerald-400"
                          : n.type === "supply_request"
                          ? "bg-orange-400"
                          : "bg-mint-400"
                      }`}
                    >
                      <span class="text-2xl">
                        {n.type === "housekeeping_ready" ? "✨" : n.type === "supply_request" ? "📦" : "🔔"}
                      </span>
                    </div>
                    <div class="flex-1">
                      <div class="flex items-center justify-between gap-4 mb-2">
                        <p class="text-sm font-950 text-gray-900 uppercase tracking-tighter">{n.title}</p>
                        <button
                          onClick={() => markAsRead(n.id)}
                          class="w-8 h-8 rounded-lg border-[2px] border-gray-200 flex items-center justify-center text-gray-300 hover:border-rose-500 hover:text-rose-500 transition-all"
                        >
                          ✕
                        </button>
                      </div>
                      <p class="text-[11px] font-800 text-gray-500 uppercase tracking-widest leading-relaxed">
                        {n.message}
                      </p>

                      {n.meta?.imageUrl && (
                        <div class="mt-6 border-[3px] border-gray-900 rounded-[1.5rem] overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] h-48">
                          <img
                            src={n.meta.imageUrl}
                            alt="Audit Proof"
                            class="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500"
                          />
                        </div>
                      )}

                      <div class="mt-6 flex items-center gap-4">
                        <span class="px-3 py-1 bg-gray-900 text-white text-[8px] font-950 uppercase tracking-widest rounded-md">
                          {new Date(n.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        <span class="text-[9px] font-950 text-gray-400 uppercase tracking-[0.2em]">
                          {n.propertyName}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}
