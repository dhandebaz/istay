import { type Handlers, type PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import type { DashboardState, Host } from "../../utils/types.ts";
import SettingsTabs from "../../islands/SettingsTabs.tsx";
import TeamManagement from "../../islands/TeamManagement.tsx";
import DeveloperApi from "../../islands/DeveloperApi.tsx";
import { getHost, saveHost } from "../../utils/db.ts";

interface SettingsPageData {
  host: Host | null;
}

export const handler: Handlers<SettingsPageData, DashboardState> = {
  GET: async (_req, ctx) => {
    const state = ctx.state as DashboardState;
    const { hostId } = state;
    const host = await getHost(hostId);
    return ctx.render({ host });
  },

  POST: async (req, ctx) => {
    const state = ctx.state as DashboardState;
    const { hostId } = state;
    const form = await req.formData();

    const name = (form.get("name") as string || "").trim();
    const email = (form.get("email") as string || "").trim();
    const phone = (form.get("phone") as string || "").trim();

    // Compliance fields
    const businessName = (form.get("businessName") as string || "").trim();
    const gstin = (form.get("gstin") as string || "").trim();
    const businessAddress = (form.get("businessAddress") as string || "").trim();
    const logoUrl = (form.get("logoUrl") as string || "").trim();

    if (!name || !email) {
      return ctx.render({ host: null });
    }

    const host = await getHost(hostId);
    if (!host) {
      return new Response("Host not found", { status: 404 });
    }

    const updatedHost: Host = {
      ...host,
      email,
      name,
      phone,
      updatedAt: new Date().toISOString(),
      settings: {
        ...(host.settings || {}),
        businessName,
        gstin,
        businessAddress,
        logoUrl,
      },
    };

    await saveHost(updatedHost);

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

export default function SettingsPage({ data, url, state }: PageProps<SettingsPageData, DashboardState>) {
  const { host } = data;
  const { role } = state;
  const saved = url.searchParams.get("saved") === "1";
  const activeTab = url.searchParams.get("tab") || "general";

  return (
    <>
      <Head>
        <title>Account Settings | iStay</title>
      </Head>

      <div class="space-y-16 pb-20">
        {/* Header */}
        <section class="flex flex-col lg:flex-row items-end justify-between gap-8">
          <div>
            <div class="flex items-center gap-4 mb-6">
              <span class="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-widest rounded-full border border-emerald-100">Settings</span>
              <div class="h-px w-24 bg-gray-100" />
            </div>
            <h2 class="text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Account <br/> <span class="text-emerald-500 font-serif italic">Configuration.</span>
            </h2>
          </div>
          {saved && (
            <div class="bg-emerald-50 text-emerald-600 px-8 py-4 rounded-2xl border border-emerald-100 shadow-premium text-sm font-bold animate-bounce flex items-center gap-3">
              <span class="text-lg">✨</span> Settings saved successfully!
            </div>
          )}
        </section>

        {/* Settings Interface */}
        <div class="bg-white rounded-[3rem] border border-gray-100 shadow-premium overflow-hidden min-h-[600px] flex flex-col">
          <SettingsTabs activeTab={activeTab} />

          <div class="p-12 flex-1 bg-gray-50/30">
            {activeTab === "general" && (
              <form method="POST" class="max-w-3xl space-y-12">
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 tracking-tight mb-8 pb-4 border-b border-gray-100">Personal Information</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="space-y-2.5">
                      <label class="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={host?.name}
                        class="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:border-emerald-200 focus:shadow-premium outline-none transition-all font-bold text-gray-900"
                        required
                      />
                    </div>
                    <div class="space-y-2.5">
                      <label class="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={host?.email}
                        class="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:border-emerald-200 focus:shadow-premium outline-none transition-all font-bold text-gray-900"
                        required
                      />
                    </div>
                    <div class="space-y-2.5 md:col-span-2">
                      <label class="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={host?.phone}
                        placeholder="+91 XXXX XXX XXX"
                        class="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:border-emerald-200 focus:shadow-premium outline-none transition-all font-bold text-gray-900"
                      />
                    </div>
                  </div>
                </div>

                <div class="pt-8">
                  <button
                    type="submit"
                    class="px-12 py-5 bg-gray-900 text-white text-sm font-bold rounded-2xl shadow-premium hover:bg-emerald-500 hover:shadow-premium-hover hover:-translate-y-0.5 transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {activeTab === "compliance" && (
              <form method="POST" class="max-w-3xl space-y-12">
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 tracking-tight mb-8 pb-4 border-b border-gray-100">Business Details</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="space-y-2.5">
                      <label class="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Legal Business Name</label>
                      <input
                        type="text"
                        name="businessName"
                        value={host?.settings?.businessName}
                        class="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:border-emerald-200 focus:shadow-premium outline-none transition-all font-bold text-gray-900"
                      />
                    </div>
                    <div class="space-y-2.5">
                      <label class="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">GST Number (Optional)</label>
                      <input
                        type="text"
                        name="gstin"
                        value={host?.settings?.gstin}
                        placeholder="22AAAAA0000A1Z5"
                        class="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:border-emerald-200 focus:shadow-premium outline-none transition-all font-bold text-gray-900"
                      />
                    </div>
                    <div class="space-y-2.5 md:col-span-2">
                      <label class="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Business Address</label>
                      <textarea
                        name="businessAddress"
                        rows={3}
                        class="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:border-emerald-200 focus:shadow-premium outline-none transition-all font-bold text-gray-900 no-scrollbar"
                      >{host?.settings?.businessAddress}</textarea>
                    </div>
                  </div>
                </div>

                <div class="pt-8">
                  <button
                    type="submit"
                    class="px-12 py-5 bg-gray-900 text-white text-sm font-bold rounded-2xl shadow-premium hover:bg-emerald-500 hover:shadow-premium-hover hover:-translate-y-0.5 transition-all"
                  >
                    Update Business Info
                  </button>
                </div>
              </form>
            )}

            {activeTab === "team" && <TeamManagement />}
            {activeTab === "developers" && <DeveloperApi host={host!} />}
            {activeTab === "notifications" && (
              <div class="py-24 text-center space-y-6">
                <p class="text-7xl">🔕</p>
                <h3 class="text-2xl font-bold text-gray-900 tracking-tight">Notifications</h3>
                <p class="text-sm font-medium text-gray-400 max-w-xs mx-auto leading-relaxed">System notifications are currently managed by the platform to ensure reliability.</p>
              </div>
            )}
            {activeTab === "billing" && (
              <div class="py-24 text-center space-y-6">
                <p class="text-7xl">💳</p>
                <h3 class="text-2xl font-bold text-gray-900 tracking-tight">Billing & Payments</h3>
                <p class="text-sm font-medium text-gray-400 max-w-xs mx-auto leading-relaxed">Manage your subscriptions, invoices, and payouts in the billing section.</p>
                <a href="/dashboard/billing" class="inline-block mt-8 px-12 py-5 bg-gray-900 text-white text-sm font-bold rounded-2xl shadow-premium hover:bg-emerald-500 hover:-translate-y-0.5 transition-all">Go to Billing</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
