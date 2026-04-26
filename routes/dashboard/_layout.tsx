import { type PageProps } from "$fresh/server.ts";
import { type Handlers } from "$fresh/server.ts";
import type { DashboardState, Notification } from "../../utils/types.ts";
import DashboardSidebar from "../../islands/DashboardSidebar.tsx";
import ResendVerificationBtn from "../../islands/ResendVerificationBtn.tsx";
import ErrorBoundary from "../../islands/ErrorBoundary.tsx";

import { getKv } from "../../utils/db.ts";

interface LayoutData {
  unreadCount: number;
}

export const handler: Handlers<LayoutData, DashboardState> = {
  GET: async (_req, ctx) => {
    // Load unread notification count from KV
    let unreadCount = 0;
    try {
      const kv = await getKv();
      const iter = kv.list<Notification>({
        prefix: ["notification", (ctx.state as DashboardState).hostId],
      });
      for await (const entry of iter) {
        if (entry.value && !entry.value.read) {
          unreadCount++;
        }
      }
    } catch {
      // KV not available — show 0
    }

    ctx.state = { ...ctx.state };
    const resp = await ctx.render({ unreadCount });
    return resp;
  },
};

export default function DashboardLayout(
  { Component, url, state, data }: PageProps<LayoutData, DashboardState>,
) {
  const hostName = state?.hostName ?? "Host";
  const hostInitial = hostName.charAt(0).toUpperCase();
  const currentPath = url.pathname;
  const unreadCount = data?.unreadCount ?? 0;

  return (
    <div class="flex h-screen overflow-hidden bg-white font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* ── Sidebar ──────────────────────────────────────────── */}
      <DashboardSidebar currentPath={currentPath} />

      {/* ── Main Panel ───────────────────────────────────────── */}
      <div class="flex flex-col flex-1 overflow-hidden relative">
        {/* Top Header */}
        <header class="flex-shrink-0 bg-white border-b border-gray-100 px-10 py-5 flex items-center justify-between z-20">
          <div class="flex items-center gap-4">
            <h1 class="text-xs font-bold text-gray-400 uppercase tracking-widest">
              iStay Dashboard / <span class="text-gray-900">{currentPath.split("/").pop()?.replace(/_/g, ' ') || "Overview"}</span>
            </h1>
          </div>

          <div class="flex items-center gap-6">
            {/* Notifications */}
            <a href="/dashboard/notifications" class="relative group">
              <div class="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center transition-all group-hover:bg-emerald-50 group-hover:border-emerald-100 group-hover:text-emerald-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                {unreadCount > 0 && (
                  <span class="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold border-2 border-white">
                    {unreadCount}
                  </span>
                )}
              </div>
            </a>

            {/* Profile */}
            <div class="flex items-center gap-4 pl-6 border-l border-gray-100">
              <p class="text-sm font-bold text-gray-900 tracking-tight">{hostName}</p>
              <div class="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-emerald-400 font-bold text-base shadow-sm">
                {hostInitial}
              </div>
            </div>
          </div>
        </header>

        {/* ── Content Viewport ─────────────────────────────────── */}
        <main class="flex-1 overflow-y-auto px-10 py-10 relative bg-gray-50/50">
          {/* Verification Banner */}
          {!state.emailVerified && (
            <div class="mb-10 p-6 bg-rose-50 border border-rose-100 rounded-[2rem] shadow-premium flex flex-col sm:flex-row items-center justify-between gap-6">
              <div class="flex items-center gap-5 text-center sm:text-left">
                <span class="text-3xl">🛡️</span>
                <div>
                  <p class="text-base font-bold text-rose-900 tracking-tight">Verification Required</p>
                  <p class="text-xs font-medium text-rose-700/70 leading-relaxed mt-1">
                    Please verify your email address to enable the AI concierge and payment processing.
                  </p>
                </div>
              </div>
              <ResendVerificationBtn email={state.hostEmail} name={hostName} />
            </div>
          )}

          <ErrorBoundary>
            <Component />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
