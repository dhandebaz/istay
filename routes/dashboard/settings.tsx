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
    { id: "notifications", label: "Notifications", icon: "🔔" },
    ...(role === "owner" || role === "manager" ? [
      { id: "team", label: "Team", icon: "👥" },
      { id: "developers", label: "Developers", icon: "🔌" },
    ] : []),
    { id: "billing", label: "Billing", icon: "💳" },
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
        <SettingsTabs initialTab={activeTab} tabs={tabs}>
          <div class="mt-8 space-y-0">
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
                    <div>
                      <label for="phone" class="block text-xs font-600 text-gray-500 mb-1.5">Phone Number</label>
                      <input id="phone" name="phone" type="tel" value={host?.phone ?? ""} class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:border-istay-700 focus:bg-white outline-none" placeholder="+91 XXXXX XXXXX" />
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

            {/* ── NOTIFICATIONS TAB ─────────────────────────────── */}
            <div class={activeTab === "notifications" ? "block" : "hidden"}>
              <div class="max-w-2xl space-y-6">
                <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                  <h2 class="text-base font-700 text-gray-900">Notification Preferences</h2>
                  <p class="text-xs text-gray-400">Choose how you want to be notified about booking activity.</p>

                  {[
                    { id: "notif_email_booking", label: "New Booking Confirmation", desc: "Receive an email when a new booking is confirmed", icon: "📩" },
                    { id: "notif_email_checkout", label: "Check-out Reminder", desc: "Get notified when a guest's check-out date is approaching", icon: "📅" },
                    { id: "notif_whatsapp_room", label: "Room Ready (WhatsApp)", desc: "WhatsApp alert when caretaker marks room as clean", icon: "💬" },
                    { id: "notif_email_payout", label: "Payout Settled", desc: "Email confirmation when earnings are transferred", icon: "💰" },
                    { id: "notif_whatsapp_verify", label: "ID Verification (WhatsApp)", desc: "Instant WhatsApp when guest identity is verified", icon: "🆔" },
                  ].map((pref) => (
                    <div key={pref.id} class="flex items-start justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div class="flex items-start gap-3">
                        <span class="text-lg mt-0.5">{pref.icon}</span>
                        <div>
                          <p class="text-sm font-700 text-gray-900">{pref.label}</p>
                          <p class="text-xs text-gray-400 mt-0.5">{pref.desc}</p>
                        </div>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                        <input type="checkbox" class="sr-only peer" checked />
                        <div class="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-istay-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-istay-600 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                      </label>
                    </div>
                  ))}
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

            {/* ── BILLING TAB ──────────────────────────────────── */}
            <div class={activeTab === "billing" ? "block" : "hidden"}>
              <div class="max-w-2xl space-y-6">
                <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h2 class="text-base font-700 text-gray-900 mb-4">Billing Overview</h2>
                  
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div class="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200">
                      <p class="text-[10px] font-800 text-emerald-600 uppercase tracking-widest mb-1">Commission Model</p>
                      <p class="text-xl font-900 text-emerald-800">5%</p>
                      <p class="text-xs text-emerald-600 mt-0.5">Per confirmed booking</p>
                    </div>
                    <div class="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
                      <p class="text-[10px] font-800 text-gray-500 uppercase tracking-widest mb-1">Monthly Fees</p>
                      <p class="text-xl font-900 text-gray-800">₹0</p>
                      <p class="text-xs text-gray-500 mt-0.5">Lifetime plan — zero overhead</p>
                    </div>
                  </div>

                  <div class="p-4 rounded-xl bg-istay-50 border border-istay-200 flex items-center justify-between">
                    <div>
                      <p class="text-sm font-700 text-istay-900">Setup Fee</p>
                      <p class="text-xs text-istay-700 mt-0.5">One-time ₹1,000 activation</p>
                    </div>
                    <span class={`px-3 py-1 rounded-full text-xs font-800 ${
                      host?.setupFeePaid 
                        ? "bg-emerald-100 text-emerald-700" 
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {host?.setupFeePaid ? "Paid ✓" : "Pending"}
                    </span>
                  </div>
                </div>

                <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h2 class="text-base font-700 text-gray-900 mb-3">Payment Method</h2>
                  <p class="text-xs text-gray-400 mb-4">
                    Payouts are processed automatically to your registered bank account via Cashfree.
                  </p>
                  
                  <div class="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-4">
                    <div class="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center text-gray-400">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                        <line x1="1" y1="10" x2="23" y2="10"></line>
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-700 text-gray-900">
                        {host?.cashfreeVendorId ? `Vendor: ${host.cashfreeVendorId}` : "Not configured"}
                      </p>
                      <p class="text-xs text-gray-400 mt-0.5">
                        {host?.cashfreeVendorId ? "Automatic payouts enabled" : "Contact support@istay.space to set up payouts"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SettingsTabs>
      </div>
    </>
  );
}
