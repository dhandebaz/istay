// ================================================================
// routes/dashboard/settings.tsx — Host Settings
// ================================================================

import { type Handlers, type PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import type { DashboardState, Host } from "../../utils/types.ts";

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
  async GET(_req, ctx) {
    const { hostId } = ctx.state;
    const kv = await getKv();

    const entry = await kv.get<Host>(["host", hostId]);
    return ctx.render({ host: entry.value });
  },

  async POST(req, ctx) {
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
  { data, url }: PageProps<SettingsPageData>,
) {
  const { host } = data;
  const saved = url.searchParams.get("saved") === "1";

  return (
    <>
      <Head>
        <title>Settings | istay Dashboard</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div class="space-y-6 max-w-2xl">
        {/* Header */}
        <div>
          <h1 class="text-xl font-800 text-gray-900">Settings</h1>
          <p class="text-sm text-gray-400 mt-0.5">
            Manage your account and preferences
          </p>
        </div>

        {/* Success toast */}
        {saved && (
          <div class="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8L6.5 11.5L13 4.5" stroke="#10b981" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="text-xs font-600 text-emerald-700">Settings saved successfully!</p>
          </div>
        )}

        {/* Profile Form */}
        <form method="POST" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <div>
            <h2 class="text-base font-700 text-gray-900 mb-1">Profile</h2>
            <p class="text-xs text-gray-400">Your display name and contact info</p>
          </div>

          {/* Name */}
          <div>
            <label for="name" class="block text-xs font-600 text-gray-500 mb-1.5">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={host?.name ?? ""}
              required
              class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 focus:border-istay-700 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label for="email" class="block text-xs font-600 text-gray-500 mb-1.5">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={host?.email ?? ""}
              required
              class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 focus:border-istay-700 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          {/* Phone */}
          <div>
            <label for="phone" class="block text-xs font-600 text-gray-500 mb-1.5">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={host?.phone ?? ""}
              class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 focus:border-istay-700 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            class="px-6 py-3 rounded-xl bg-istay-900 text-white text-sm font-700 hover:bg-istay-800 active:scale-95 transition-all shadow-sm"
          >
            Save Changes
          </button>
        </form>

        {/* Plan Info */}
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 class="text-base font-700 text-gray-900 mb-3">Subscription</h2>

          <div class="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-istay-50 to-istay-100 border border-istay-200">
            <div>
              <p class="text-sm font-700 text-istay-900">Lifetime Plan</p>
              <p class="text-xs text-istay-700 mt-0.5">
                5% commission per booking · No monthly fees
              </p>
            </div>
            <span class="px-3 py-1 rounded-full bg-istay-900 text-white text-xs font-700">
              Active
            </span>
          </div>

          {host?.setupFeePaid && (
            <p class="text-xs text-gray-400 mt-3">
              Setup fee: ₹1,000 (paid)
            </p>
          )}
        </div>

        {/* Danger Zone */}
        <div class="bg-white rounded-2xl border border-rose-100 shadow-sm p-6">
          <h2 class="text-base font-700 text-rose-800 mb-1">Danger Zone</h2>
          <p class="text-xs text-gray-400 mb-4">
            Contact support to deactivate your account. All property pages will be taken offline.
          </p>
          <a
            href="/contact"
            class="inline-flex px-4 py-2 rounded-xl border border-rose-200 text-xs font-600 text-rose-600 hover:bg-rose-50 transition-colors"
          >
            Contact Support
          </a>
        </div>

        {/* Host ID (for debugging) */}
        <div class="px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
          <p class="text-xs text-gray-400">
            Host ID: <code class="font-mono text-gray-500">{host?.id ?? "—"}</code>
          </p>
        </div>
      </div>
    </>
  );
}
