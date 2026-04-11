import { type PageProps } from "$fresh/server.ts";
import { type Handlers } from "$fresh/server.ts";
import type { DashboardState, Notification } from "../../utils/types.ts";
import DashboardSidebar from "../../islands/DashboardSidebar.tsx";

const getKv = (() => {
  let kv: Deno.Kv | null = null;
  return async () => {
    if (!kv) kv = await Deno.openKv();
    return kv;
  };
})();

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
        prefix: ["notification", ctx.state.hostId],
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
    <div class="flex h-screen overflow-hidden bg-gray-50 font-sans">
      {/* ── Sidebar ──────────────────────────────────────────── */}
      <DashboardSidebar currentPath={currentPath} />

      {/* ── Main Panel ───────────────────────────────────────── */}
      <div class="flex flex-col flex-1 overflow-hidden">
        {/* Top Bar */}
        <header class="flex-shrink-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shadow-sm">
          {/* Page breadcrumb */}
          <div class="flex items-center gap-2.5 min-w-0">
            <div class="hidden md:flex items-center gap-1.5 text-sm text-gray-400">
              <span class="text-istay-900 font-700">istay</span>
              <span aria-hidden="true">/</span>
              <span class="text-gray-600 font-500 capitalize">
                {currentPath.split("/").filter(Boolean).slice(-1)[0] ||
                  "overview"}
              </span>
            </div>
          </div>

          {/* Right side — Host info + actions */}
          <div class="flex items-center gap-3">
            {/* Notification bell */}
            <a
              href="/dashboard/bookings"
              class="relative p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors duration-150"
              aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9 1.5C6.51 1.5 4.5 3.51 4.5 6V10.5L3 12V12.75H15V12L13.5 10.5V6C13.5 3.51 11.49 1.5 9 1.5ZM9 16.5C9.825 16.5 10.5 15.825 10.5 15H7.5C7.5 15.825 8.175 16.5 9 16.5Z"
                  fill="currentColor"
                />
              </svg>
              {/* Indicator dot — only shown when there are unread notifications */}
              {unreadCount > 0 && (
                <span
                  class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-mint-500 ring-2 ring-white"
                  aria-hidden="true"
                />
              )}
            </a>

            {/* Divider */}
            <div class="w-px h-6 bg-gray-100" aria-hidden="true" />

            {/* Host Avatar + Name */}
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-istay-900 to-istay-700 flex items-center justify-center text-white text-sm font-700 shadow-sm">
                {hostInitial}
              </div>
              <div class="hidden sm:block">
                <p class="text-sm font-600 text-gray-800 leading-tight">
                  {hostName}
                </p>
                <p class="text-xs text-gray-400 leading-tight">Lifetime Plan</p>
              </div>
            </div>

            {/* Logout */}
            <a
              href="/api/auth/logout"
              class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-500 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-150"
              aria-label="Sign out"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5.25 12.25H2.625C2.279 12.25 2 11.971 2 11.625V2.375C2 2.029 2.279 1.75 2.625 1.75H5.25M9.625 10L12.25 7M12.25 7L9.625 4M12.25 7H5.25"
                  stroke="currentColor"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Sign out
            </a>
          </div>
        </header>

        {/* Main Content Area */}
        <main class="flex-1 overflow-y-auto">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
            <Component />
          </div>
        </main>
      </div>
    </div>
  );
}
