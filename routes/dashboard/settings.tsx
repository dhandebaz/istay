// ================================================================
// routes/dashboard/settings.tsx — Host Settings
// ================================================================

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
        <title>Kernel_Config | iStay</title>
      </Head>

      <div class="space-y-16 pb-20">
        {/* Header */}
        <section class="flex flex-col lg:flex-row items-end justify-between gap-8">
          <div>
            <div class="flex items-center gap-4 mb-4">
              <div class="px-3 py-1 bg-gray-900 text-mint-400 text-[10px] font-950 uppercase tracking-[0.2em] rounded-full border-[2px] border-gray-900 shadow-[3px_3px_0px_0px_#4ade80]">
                SYSTEM_CONFIG
              </div>
              <div class="h-[2px] w-24 bg-gray-100" />
            </div>
            <h2 class="text-4xl sm:text-7xl font-950 text-gray-900 tracking-tighter uppercase leading-[0.8]">
              Platform <br/> <span class="text-mint-500">Settings.</span>
            </h2>
          </div>
          {saved && (
            <div class="bg-emerald-500 text-white px-8 py-4 rounded-2xl border-[3px] border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-[11px] font-950 uppercase tracking-[0.2em] animate-bounce">
              CONFIG_SYNCED_SUCCESSFULLY
            </div>
          )}
        </section>

        {/* Settings Interface */}
        <div class="bg-white rounded-[3rem] border-[4px] border-gray-900 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] overflow-hidden min-h-[600px] flex flex-col">
          <SettingsTabs activeTab={activeTab} />

          <div class="p-12 flex-1">
            {activeTab === "general" && (
              <form method="POST" class="max-w-3xl space-y-12">
                <div>
                  <h3 class="text-2xl font-950 text-gray-900 uppercase tracking-tighter mb-8 pb-4 border-b-[3px] border-gray-100">Primary_Protocol</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="space-y-3">
                      <label class="text-[10px] font-950 text-gray-400 uppercase tracking-widest ml-1">HOST_NAME</label>
                      <input
                        type="text"
                        name="name"
                        value={host?.name}
                        class="w-full px-6 py-4 bg-gray-50 border-[3px] border-gray-900 rounded-2xl focus:bg-white focus:shadow-[4px_4px_0px_0px_#4ade80] outline-none transition-all font-950 text-gray-900"
                        required
                      />
                    </div>
                    <div class="space-y-3">
                      <label class="text-[10px] font-950 text-gray-400 uppercase tracking-widest ml-1">COMM_EMAIL</label>
                      <input
                        type="email"
                        name="email"
                        value={host?.email}
                        class="w-full px-6 py-4 bg-gray-50 border-[3px] border-gray-900 rounded-2xl focus:bg-white focus:shadow-[4px_4px_0px_0px_#4ade80] outline-none transition-all font-950 text-gray-900"
                        required
                      />
                    </div>
                    <div class="space-y-3 md:col-span-2">
                      <label class="text-[10px] font-950 text-gray-400 uppercase tracking-widest ml-1">PHONE_UPLINK</label>
                      <input
                        type="tel"
                        name="phone"
                        value={host?.phone}
                        placeholder="+91 XXXX XXX XXX"
                        class="w-full px-6 py-4 bg-gray-50 border-[3px] border-gray-900 rounded-2xl focus:bg-white focus:shadow-[4px_4px_0px_0px_#4ade80] outline-none transition-all font-950 text-gray-900"
                      />
                    </div>
                  </div>
                </div>

                <div class="pt-8">
                  <button
                    type="submit"
                    class="px-12 py-5 bg-gray-900 text-white text-[11px] font-950 uppercase tracking-[0.2em] rounded-2xl border-[3px] border-gray-900 shadow-[8px_8px_0px_0px_#4ade80] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                  >
                    DEPLOY_CHANGES_TO_KERNEL
                  </button>
                </div>
              </form>
            )}

            {activeTab === "compliance" && (
              <form method="POST" class="max-w-3xl space-y-12">
                <div>
                  <h3 class="text-2xl font-950 text-gray-900 uppercase tracking-tighter mb-8 pb-4 border-b-[3px] border-gray-100">Legal_Directives</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="space-y-3">
                      <label class="text-[10px] font-950 text-gray-400 uppercase tracking-widest ml-1">ENTITY_LEGAL_NAME</label>
                      <input
                        type="text"
                        name="businessName"
                        value={host?.settings?.businessName}
                        class="w-full px-6 py-4 bg-gray-50 border-[3px] border-gray-900 rounded-2xl focus:bg-white focus:shadow-[4px_4px_0px_0px_#4ade80] outline-none transition-all font-950 text-gray-900"
                      />
                    </div>
                    <div class="space-y-3">
                      <label class="text-[10px] font-950 text-gray-400 uppercase tracking-widest ml-1">TAX_IDENTIFIER (GSTIN)</label>
                      <input
                        type="text"
                        name="gstin"
                        value={host?.settings?.gstin}
                        placeholder="22AAAAA0000A1Z5"
                        class="w-full px-6 py-4 bg-gray-50 border-[3px] border-gray-900 rounded-2xl focus:bg-white focus:shadow-[4px_4px_0px_0px_#4ade80] outline-none transition-all font-950 text-gray-900"
                      />
                    </div>
                    <div class="space-y-3 md:col-span-2">
                      <label class="text-[10px] font-950 text-gray-400 uppercase tracking-widest ml-1">REGISTERED_OFFICE_ADDRESS</label>
                      <textarea
                        name="businessAddress"
                        rows={3}
                        class="w-full px-6 py-4 bg-gray-50 border-[3px] border-gray-900 rounded-2xl focus:bg-white focus:shadow-[4px_4px_0px_0px_#4ade80] outline-none transition-all font-950 text-gray-900 no-scrollbar"
                      >{host?.settings?.businessAddress}</textarea>
                    </div>
                  </div>
                </div>

                <div class="pt-8">
                  <button
                    type="submit"
                    class="px-12 py-5 bg-gray-900 text-white text-[11px] font-950 uppercase tracking-[0.2em] rounded-2xl border-[3px] border-gray-900 shadow-[8px_8px_0px_0px_#4ade80] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                  >
                    COMMIT_LEGAL_OVERRIDE
                  </button>
                </div>
              </form>
            )}

            {activeTab === "team" && <TeamManagement />}
            {activeTab === "developers" && <DeveloperApi host={host!} />}
            {activeTab === "notifications" && (
              <div class="py-20 text-center space-y-6">
                <p class="text-7xl">🔕</p>
                <h3 class="text-3xl font-950 text-gray-900 uppercase tracking-tighter">Signal_Silence</h3>
                <p class="text-[10px] font-950 text-gray-400 uppercase tracking-[0.3em]">Notification steering protocols are currently locked by the kernel.</p>
              </div>
            )}
            {activeTab === "billing" && (
              <div class="py-20 text-center space-y-6">
                <p class="text-7xl">💳</p>
                <h3 class="text-3xl font-950 text-gray-900 uppercase tracking-tighter">Financial_Module</h3>
                <p class="text-[10px] font-950 text-gray-400 uppercase tracking-[0.3em]">Visit the WALLET section for granular capital control.</p>
                <a href="/dashboard/billing" class="inline-block mt-8 px-12 py-5 bg-gray-900 text-white text-[11px] font-950 uppercase tracking-[0.2em] rounded-2xl border-[3px] border-gray-900 shadow-[8px_8px_0px_0px_#4ade80] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">GOTO_WALLET</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
