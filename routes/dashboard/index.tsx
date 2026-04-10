import { type Handlers, type PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getDashboardStats, listBookings } from "../../utils/db.ts";
import type { Booking, DashboardState, DashboardStats } from "../../utils/types.ts";

interface OverviewData {
  stats: DashboardStats;
  recentBookings: Booking[];
  setupFeePaid: boolean;
}
export const handler: Handlers<OverviewData> = {
  async GET(_req, ctx) {
    const { hostId } = ctx.state;
    const kv = await Deno.openKv();
    const hostEntry = await kv.get(["host", hostId]);
    const setupFeePaid = (hostEntry.value as any)?.setupFeePaid ?? false;

    const [stats, allBookings] = await Promise.all([
      getDashboardStats(hostId),
      listBookings(hostId),
    ]);
    const recentBookings = allBookings.slice(0, 5);
    return ctx.render({ stats, recentBookings, setupFeePaid });
  },
};

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

interface StatCardProps {
  label: string;
  value: string;
  sub: string;
  gradient: string;
  icon: JSX.Element;
}

function StatCard({ label, value, sub, gradient, icon }: StatCardProps) {
  return (
    <div
      class={`relative rounded-2xl p-6 overflow-hidden text-white shadow-md ${gradient}`}
    >
      {/* Decorative circle */}
      <div
        class="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10"
        aria-hidden="true"
      />
      <div
        class="absolute -right-2 top-8 w-14 h-14 rounded-full bg-white/10"
        aria-hidden="true"
      />

      <div class="relative">
        <div class="flex items-start justify-between mb-4">
          <p class="text-sm font-500 text-white/80">{label}</p>
          <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            {icon}
          </div>
        </div>
        <p class="text-3xl font-800 mb-1 tracking-tight">{value}</p>
        <p class="text-xs text-white/70">{sub}</p>
      </div>
    </div>
  );
}

const STATUS_STYLES: Record<string, string> = {
  confirmed: "bg-emerald-50 text-emerald-700",
  pending: "bg-amber-50 text-amber-700",
  cancelled: "bg-gray-100 text-gray-500",
  refunded: "bg-rose-50 text-rose-600",
};

export default function DashboardOverview(
  { data }: PageProps<OverviewData>,
) {
  const { stats, recentBookings } = data;
  const month = new Date().toLocaleString("en-IN", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Head>
        <title>Overview | istay Dashboard</title>
      </Head>

      {/* Payment Reminder Banner */}
      {!data.setupFeePaid && (
        <div class="mb-8 rounded-2xl bg-amber-50 border border-amber-200 p-4 flex items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="text-2xl">⚠️</span>
            <div>
              <p class="text-sm font-700 text-amber-900">Account Activation Required</p>
              <p class="text-xs text-amber-700">Pay the one-time ₹1,000 setup fee to activate your booking page and start accepting guests.</p>
            </div>
          </div>
          <a
            href="/pricing"
            class="whitespace-nowrap px-4 py-2 rounded-full bg-amber-600 text-white text-xs font-700 hover:bg-amber-700 transition-colors"
          >
            Activate Now
          </a>
        </div>
      )}

      {/* Page heading */}
      <div class="mb-8">
        <h1 class="text-2xl sm:text-3xl font-800 text-gray-900 tracking-tight">
          Good {getGreeting()},{" "}
          <span class="text-mint-500">Host 👋</span>
        </h1>
        <p class="mt-1 text-sm text-gray-400">
          Here's what's happening with your properties today.
        </p>
      </div>

      {/* ── Stats Grid ─────────────────────────────────────────── */}
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Active Bookings"
          value={String(stats.activeBookings)}
          sub="Upcoming confirmed stays"
          gradient="bg-gradient-to-br from-istay-900 to-istay-700"
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <rect x="3" y="4" width="14" height="13" rx="2" stroke="white" stroke-width="1.5" />
              <path d="M7 2V6M13 2V6M3 8.5H17" stroke="white" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          }
        />
        <StatCard
          label="Monthly Earnings"
          value={formatINR(stats.monthlyEarnings)}
          sub={`Net (95% share) · ${month}`}
          gradient="bg-gradient-to-br from-violet-500 to-purple-600"
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M10 2V4M10 16V18M4.22 4.22L5.64 5.64M14.36 14.36L15.78 15.78M2 10H4M16 10H18M4.22 15.78L5.64 14.36M14.36 5.64L15.78 4.22"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <circle cx="10" cy="10" r="4" stroke="white" stroke-width="1.5" />
            </svg>
          }
        />
        <StatCard
          label="Blocked Dates"
          value={String(stats.blockedDates)}
          sub="Future unavailable dates"
          gradient="bg-gradient-to-br from-orange-400 to-rose-500"
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="7" stroke="white" stroke-width="1.5" />
              <path d="M4.93 4.93L15.07 15.07" stroke="white" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          }
        />
        <StatCard
          label="Properties"
          value={String(stats.totalProperties)}
          sub="Listed in your dashboard"
          gradient="bg-gradient-to-br from-sky-400 to-blue-600"
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M10 2L2 8V18H8V13H12V18H18V8L10 2Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
            </svg>
          }
        />
      </div>

      {/* ── Quick Actions ──────────────────────────────────────── */}
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          {
            href: "/dashboard/properties",
            icon: "🏠",
            label: "Add Property",
            desc: "Import from Airbnb in seconds",
            color: "hover:border-istay-300",
          },
          {
            href: "#",
            icon: "📅",
            label: "Sync Calendar",
            desc: "Block dates from iCal",
            color: "hover:border-violet-300",
          },
          {
            href: "/contact",
            icon: "💬",
            label: "Get Support",
            desc: "We reply in 24–48 hours",
            color: "hover:border-blue-300",
          },
        ].map(({ href, icon, label, desc, color }) => (
          <a
            key={label}
            href={href}
            class={`flex items-start gap-4 p-5 bg-white rounded-2xl border-2 border-gray-100 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${color}`}
          >
            <span class="text-2xl">{icon}</span>
            <div>
              <p class="text-sm font-700 text-gray-900">{label}</p>
              <p class="text-xs text-gray-400 mt-0.5">{desc}</p>
            </div>
          </a>
        ))}
      </div>

      {/* ── Recent Bookings ────────────────────────────────────── */}
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <h2 class="text-base font-700 text-gray-900">Recent Bookings</h2>
          <a
            href="/dashboard/bookings"
            class="text-xs text-istay-700 font-600 hover:text-istay-800 transition-colors"
          >
            View all →
          </a>
        </div>

        {recentBookings.length === 0
          ? (
            <div class="py-16 text-center">
              <p class="text-4xl mb-3">📭</p>
              <p class="text-sm font-600 text-gray-600">No bookings yet</p>
              <p class="text-xs text-gray-400 mt-1">
                Share your booking link to get your first reservation
              </p>
              <a
                href="/dashboard/properties"
                class="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-istay-900 text-white text-xs font-600 hover:bg-istay-800 transition-colors"
              >
                Add your first property →
              </a>
            </div>
          )
          : (
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="bg-gray-50/50">
                    <th class="text-left px-6 py-3 text-xs font-700 text-gray-400 uppercase tracking-wider">
                      Guest
                    </th>
                    <th class="text-left px-6 py-3 text-xs font-700 text-gray-400 uppercase tracking-wider">
                      Dates
                    </th>
                    <th class="text-right px-6 py-3 text-xs font-700 text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th class="text-center px-6 py-3 text-xs font-700 text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  {recentBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      class="hover:bg-gray-50/50 transition-colors"
                    >
                      <td class="px-6 py-4">
                        <p class="font-600 text-gray-900">{booking.guestName}</p>
                        <p class="text-xs text-gray-400">{booking.guestEmail}</p>
                      </td>
                      <td class="px-6 py-4 text-gray-500">
                        {formatDate(booking.checkIn)} →{" "}
                        {formatDate(booking.checkOut)}
                        <p class="text-xs text-gray-400">
                          {booking.nights} night{booking.nights > 1 ? "s" : ""}
                        </p>
                      </td>
                      <td class="px-6 py-4 text-right">
                        <p class="font-700 text-gray-900">
                          {formatINR(booking.amount)}
                        </p>
                        <p class="text-xs text-istay-700">
                          {formatINR(booking.amount * 0.95)} yours
                        </p>
                      </td>
                      <td class="px-6 py-4 text-center">
                        <span
                          class={`inline-flex px-2.5 py-1 rounded-full text-xs font-600 capitalize ${
                            STATUS_STYLES[booking.status] ?? "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>
    </>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
