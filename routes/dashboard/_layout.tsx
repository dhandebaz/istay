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
    <div class="flex h-screen overflow-hidden bg-white font-sans selection:bg-mint-400 selection:text-gray-900">
      {/* ── Sidebar ──────────────────────────────────────────── */}
      <DashboardSidebar currentPath={currentPath} />

      {/* ── Main Panel ───────────────────────────────────────── */}
      <div class="flex flex-col flex-1 overflow-hidden relative">
        {/* Top Header */}
        <header class="flex-shrink-0 bg-white border-b-[4px] border-gray-900 px-8 py-5 flex items-center justify-between z-20">
          <div class="flex items-center gap-4">
            <h1 class="text-[10px] font-950 text-gray-400 uppercase tracking-[0.4em]">
              ISTAY_CORE // {currentPath.split("/").pop()?.toUpperCase() || "OVERVIEW"}
            </h1>
          </div>

          <div class="flex items-center gap-6">
            {/* Notifications */}
            <a href="/dashboard/notifications" class="relative group">
              <div class="w-11 h-11 rounded-2xl border-[3px] border-gray-900 flex items-center justify-center transition-all group-hover:bg-mint-400 group-hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                {unreadCount > 0 && (
                  <span class="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </div>
            </a>

            {/* Profile */}
            <div class="flex items-center gap-4 pl-6 border-l-[3px] border-gray-100">
              <p class="text-[10px] font-950 text-gray-900 uppercase tracking-tighter">{hostName}</p>
              <div class="w-11 h-11 rounded-2xl bg-gray-900 border-[3px] border-gray-900 flex items-center justify-center text-mint-400 font-950 text-base">
                {hostInitial}
              </div>
            </div>
          </div>
        </header>

        {/* ── Content Viewport ─────────────────────────────────── */}
        <main class="flex-1 overflow-y-auto px-8 py-10 relative">
          {/* Verification Banner */}
          {!state.emailVerified && (
            <div class="mb-10 p-6 bg-rose-50 border-[4px] border-gray-900 rounded-[2.5rem] shadow-[8px_8px_0px_0px_#9f1239] flex flex-col sm:flex-row items-center justify-between gap-6 animate-pulse">
              <div class="flex items-center gap-5 text-center sm:text-left">
                <span class="text-3xl">🛡️</span>
                <div>
                  <p class="text-sm font-950 text-rose-900 uppercase tracking-tighter leading-none mb-1">UNVERIFIED ENGINE</p>
                  <p class="text-[10px] font-800 text-rose-700/60 uppercase tracking-widest">Verify your profile to unlock the AI concierge and payments.</p>
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
