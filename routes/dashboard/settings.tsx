// ================================================================
// routes/dashboard/settings.tsx — Host Settings
// ================================================================

import { type Handlers, type PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import type { DashboardState, Host } from "../../utils/types.ts";
import SettingsTabs from "../../islands/SettingsTabs.tsx";
import TeamManagement from "../../islands/TeamManagement.tsx";
import DeveloperApi from "../../islands/DeveloperApi.tsx";

const getKv = (() => {
  let kv: Deno.Kv | null = null;
  return async () => {
    if (!kv) kv = await Deno.openKv();
    return kv;
  };
})();

interface SettingsPageData {
  host: Host | null;
}

export const handler: Handlers<SettingsPageData, DashboardState> = {
  GET: async (_req, ctx) => {
    const { hostId } = ctx.state;
    const kv = await getKv();

    const entry = await kv.get<Host>(["host", hostId]);
    return ctx.render({ host: entry.value });
  },

  POST: async (req, ctx) => {
    const { hostId } = ctx.state;
    const kv = await getKv();
    const form = await req.formData();

    const name = (form.get("name") as string || "").trim();
    const email = (form.get("email") as string || "").trim();
    const phone = (form.get("phone") as string || "").trim();

    if (!name || !email) {
      return ctx.render({ host: null });
    }

    const existing = await kv.get<Host>(["host", hostId]);
    const now = new Date().toISOString();

    const updatedHost: Host = {
      id: hostId,
      email,
      name,
      phone,
      plan: "lifetime",
      setupFeePaid: existing.value?.setupFeePaid ?? false,
      cashfreeVendorId: existing.value?.cashfreeVendorId,
      createdAt: existing.value?.createdAt ?? now,
      updatedAt: now,
    };

    await kv.set(["host", hostId], updatedHost);

    // Update session cookie with new name
    const cookieValue = encodeURIComponent(`${hostId}|${name}`);
    const headers = new Headers();
    headers.set("Location", "/dashboard/settings?saved=1");
    headers.set(
      "Set-Cookie",
      `host_session=${cookieValue}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000`,
    );

    return new Response(null, { status: 303, headers });
  },
};

export default function SettingsPage(
  { data, url, state }: PageProps<SettingsPageData, DashboardState>,
) {
  const { host } = data;
  const { role, hostId } = state;
  const saved = url.searchParams.get("saved") === "1";
  const activeTab = url.searchParams.get("tab") || "general";

  const tabs = [
    { id: "general", label: "General", icon: "⚙️" },
    ...(role === "owner" || role === "manager" ? [
      { id: "team", label: "Team", icon: "👥" },
      { id: "developers", label: "Developers", icon: "🔌" },
    ] : []),
  ];

  return (
    <>
      <Head>
        <title>Settings | istay Dashboard</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div class="space-y-6 max-w-4xl">
        {/* Header */}
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-800 text-gray-900">Settings</h1>
            <p class="text-sm text-gray-400 mt-0.5">
              Manage your agency and administrative preferences
            </p>
          </div>
          <div class="hidden sm:block">
             <span class={`px-3 py-1 rounded-full text-[10px] font-800 uppercase tracking-widest ${
               role === 'owner' ? 'bg-amber-100 text-amber-700' : 
               role === 'manager' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
             }`}>
               Role: {role}
             </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <SettingsTabs initialTab={activeTab} tabs={tabs} />

        <div class="mt-8">
          {/* ── GENERAL TAB ──────────────────────────────────── */}
          <div class={activeTab === "general" ? "block" : "hidden"}>
            <div class="max-w-2xl space-y-6">
                {saved && (
                  <div class="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8L6.5 11.5L13 4.5" stroke="#10b981" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p class="text-xs font-600 text-emerald-700">Settings saved successfully!</p>
                  </div>
                )}

                <form method="POST" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                  <h2 class="text-base font-700 text-gray-900">Agency Profile</h2>
                  <div>
                    <label for="name" class="block text-xs font-600 text-gray-500 mb-1.5">Full Name</label>
                    <input id="name" name="name" type="text" value={host?.name ?? ""} required class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:border-istay-700 focus:bg-white outline-none" />
                  </div>
                  <div>
                    <label for="email" class="block text-xs font-600 text-gray-500 mb-1.5">Email Address</label>
                    <input id="email" name="email" type="email" value={host?.email ?? ""} required class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:border-istay-700 focus:bg-white outline-none" />
                  </div>
                  <button type="submit" class="px-6 py-3 rounded-xl bg-istay-900 text-white text-sm font-700 hover:bg-istay-800 transition-all">Save Changes</button>
                </form>

                <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h2 class="text-base font-700 text-gray-900 mb-3">Subscription</h2>
                  <div class="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-istay-50 to-istay-100 border border-istay-200">
                    <div>
                      <p class="text-sm font-700 text-istay-900">Lifetime Plan</p>
                      <p class="text-xs text-istay-700 mt-0.5">5% commission per booking · No monthly fees</p>
                    </div>
                    <span class="px-3 py-1 rounded-full bg-istay-900 text-white text-xs font-700">Active</span>
                  </div>
                </div>
            </div>
          </div>

          {/* ── TEAM TAB ─────────────────────────────────────── */}
          {(role === "owner" || role === "manager") && (
            <div class={activeTab === "team" ? "block" : "hidden"}>
              <div class="max-w-2xl">
                <TeamManagement hostId={hostId} />
              </div>
            </div>
          )}

          {/* ── DEVELOPERS TAB ────────────────────────────────── */}
          {(role === "owner" || role === "manager") && (
            <div class={activeTab === "developers" ? "block" : "hidden"}>
              <div class="max-w-2xl">
                <DeveloperApi hostId={hostId} initialKey={host?.apiKey} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
