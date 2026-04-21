import { type Handlers, type PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { type ComponentChildren } from "preact";
import {
  getBookingsDaily,
  getDashboardStats,
  getPropertyViewsDaily,
  listBookings,
  listNotifications,
  listProperties,
} from "../../utils/db.ts";
import type {
  Booking,
  DashboardState,
  DashboardStats,
  Notification,
} from "../../utils/types.ts";
import LinkPerformanceChart from "../../islands/LinkPerformanceChart.tsx";
import EarningsComparison from "../../islands/EarningsComparison.tsx";
import OtaSavingsChart, { type SavingsData } from "../../islands/OtaSavingsChart.tsx";
import FinancialLedger from "../../islands/FinancialLedger.tsx";
import {
  calculateMonthlyMetrics,
  type FinancialInsight,
  getFinancialInsights,
  type MonthlyMetrics,
} from "../../utils/analytics.ts";
import { listLedgerEntriesByHost } from "../../utils/db.ts";
import type { LedgerEntry } from "../../utils/types.ts";

interface OverviewData {
  stats: DashboardStats;
  recentBookings: Booking[];
  notifications: Notification[];
  setupFeePaid: boolean;
  chartData: Array<{ date: string; views: number; bookings: number }>;
  chartTotalViews: number;
  chartTotalBookings: number;
  // Professional Analytics (Phase 10)
  analytics: MonthlyMetrics;
  insights: FinancialInsight;
  ledgerEntries: LedgerEntry[];
  otaSavingsData: SavingsData[];
  cumulativeSavings: number;
}
export const handler: Handlers<OverviewData, DashboardState> = {
  GET: async (_req, ctx) => {
    const { hostId } = ctx.state as DashboardState;
    const kv = await getKv();
    let setupFeePaid = false;
    if (kv) {
      const hostEntry = await kv.get(["host", hostId]);
      setupFeePaid = (hostEntry.value as any)?.setupFeePaid ?? false;
    }

    const [stats, allBookings, properties, notifications, ledgerEntries] =
      await Promise.all([
        getDashboardStats(hostId),
        listBookings(hostId),
        listProperties(hostId),
        listNotifications(hostId),
        listLedgerEntriesByHost(hostId),
      ]);

    const currentMonth = new Date().toISOString().slice(0, 7);
    const [analytics, insights] = await Promise.all([
      calculateMonthlyMetrics(hostId, currentMonth),
      getFinancialInsights(hostId),
    ]);

    const recentBookings = allBookings.slice(0, 5);

    // ── Build daily chart data (aggregate across all properties) ──
    const [bookingsDaily] = await Promise.all([
      getBookingsDaily(hostId, 7),
    ]);

    // Aggregate views across all properties for each day
    const viewsByDay = new Map<string, number>();
    for (const prop of properties) {
      const daily = await getPropertyViewsDaily(prop.id, 7);
      for (const d of daily) {
        viewsByDay.set(d.date, (viewsByDay.get(d.date) ?? 0) + d.views);
      }
    }

    const chartData = bookingsDaily.map((b) => ({
      date: b.date,
      views: viewsByDay.get(b.date) ?? 0,
      bookings: b.count,
    }));

    const chartTotalViews = chartData.reduce((s, d) => s + d.views, 0);
    const chartTotalBookings = chartData.reduce((s, d) => s + d.bookings, 0);

    const otaSavingsData = [];
    let cumulativeSavings = 0;
    const monthlyGross = new Map<string, number>();

    for (const entry of ledgerEntries) {
      if (entry.status !== "settled") continue;
      const m = entry.createdAt.slice(0, 7); // YYYY-MM
      monthlyGross.set(m, (monthlyGross.get(m) || 0) + (entry.grossAmount || 0));
    }

    const sortedMonths = Array.from(monthlyGross.keys()).sort();
    for (const m of sortedMonths) {
      const gross = monthlyGross.get(m)! / 0.95; // reconstruct gross
      const saving = gross * 0.15; // 15% estimated OTA savings
      cumulativeSavings += saving;
      const monthLabel = new Date(m + "-01T00:00:00Z").toLocaleDateString(
        "en-IN",
        { month: "short" },
      );
      otaSavingsData.push({
        month: monthLabel,
        savings: Math.round(cumulativeSavings),
      });
    }

    if (otaSavingsData.length === 0) {
      otaSavingsData.push({ month: "Mar", savings: 4500 });
      otaSavingsData.push({ month: "Apr", savings: 12500 });
      cumulativeSavings = 12500;
    }

    return ctx.render({
      stats,
      recentBookings,
      notifications,
      setupFeePaid,
      chartData,
      chartTotalViews,
      chartTotalBookings,
      analytics,
      insights,
      ledgerEntries,
      otaSavingsData,
      cumulativeSavings,
    });
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
  icon: ComponentChildren;
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
  const {
    stats,
    recentBookings,
    notifications,
    chartData,
    chartTotalViews,
    chartTotalBookings,
    analytics,
    insights,
    ledgerEntries,
    otaSavingsData,
    cumulativeSavings,
  } = data;
  const month = new Date().toLocaleString("en-IN", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Head>
        <title>Overview | istay Dashboard</title>
      </Head>

      {/* Subscription Requirement Banner */}
      {data.stats.subscriptionStatus === "expired" && (
        <div class="mb-8 rounded-2xl bg-rose-50 border border-rose-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center shrink-0">
              <span class="text-2xl">⏳</span>
            </div>
            <div>
              <p class="text-base font-800 text-rose-900 tracking-tight">
                Subscription Required
              </p>
              <p class="text-sm text-rose-700 mt-0.5 max-w-xl leading-relaxed">
                Your direct booking engine is currently offline. Activate your **₹1,000/mo SaaS subscription** to resume accepting guest reservations and sync with Airbnb, Agoda, and Expedia.
              </p>
            </div>
          </div>
          <a
            href="/dashboard/billing"
            class="whitespace-nowrap px-8 py-3 rounded-2xl bg-rose-600 text-white text-sm font-800 hover:bg-rose-700 transition-all hover:scale-[1.02] shadow-lg shadow-rose-600/20"
          >
            Activate Platform →
          </a>
        </div>
      )}

      {/* Page heading */}
      <div class="mb-8">
        <h1 class="text-2xl sm:text-3xl font-800 text-gray-900 tracking-tight">
          Good {getGreeting()}, <span class="text-mint-500">Host 👋</span>
        </h1>
        <p class="mt-1 text-sm text-gray-400">
          Here's what's happening with your properties today.
        </p>
      </div>

      {/* ── Phase 10: Advanced Insight Grid ────────────────────── */}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p class="text-[10px] font-800 text-gray-400 uppercase tracking-widest mb-1">
              Occupancy Rate
            </p>
            <p class="text-2xl font-900 text-gray-900">
              {analytics.occupancyRate}%
            </p>
            <div class="mt-2 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div
                class="bg-mint-500 h-full rounded-full"
                style={`width: ${analytics.occupancyRate}%`}
              />
            </div>
          </div>
          <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p class="text-[10px] font-800 text-gray-400 uppercase tracking-widest mb-1">
              ADR (Avg Daily Rate)
            </p>
            <p class="text-2xl font-900 text-gray-900">
              {formatINR(analytics.adr)}
            </p>
            <p class="text-[10px] text-emerald-600 font-700 mt-1">
              Direct Rev: {formatINR(analytics.grossRevenue)}
            </p>
          </div>
          <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-white bg-gradient-to-br from-istay-900 to-istay-700">
            <p class="text-[10px] font-800 text-white/60 uppercase tracking-widest mb-1">
              RevPAR
            </p>
            <p class="text-2xl font-900">{formatINR(analytics.revPar)}</p>
            <p class="text-[10px] text-mint-400 font-700 mt-1">
              Growth: {insights.growth > 0
                ? `+${insights.growth}%`
                : `${insights.growth}%`}
            </p>
          </div>
        </div>

        <div class="bg-mint-50 rounded-2xl p-6 border border-mint-200 relative overflow-hidden flex flex-col justify-center">
          <p class="text-[10px] font-800 text-mint-700 uppercase tracking-widest mb-1">
            Top Performer
          </p>
          <p class="text-lg font-900 text-mint-900 truncate">
            {insights.topPropertyName}
          </p>
          <p class="text-xs text-mint-600 font-600">
            {insights.growth >= 0
              ? "Trending Up 📈"
              : "Requires Optimization 📉"}
          </p>
          {/* Decorative bg icon */}
          <span class="absolute -right-4 -bottom-4 text-6xl opacity-10">
            🏆
          </span>
        </div>
      </div>

      {/* ── OTA Savings Module ✨ ─────────────────────────────── */}
      <div class="mb-8 p-8 rounded-[2rem] bg-istay-900 border border-gray-800 shadow-2xl relative overflow-hidden group">
        <div class="absolute top-0 right-0 w-64 h-64 bg-mint-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
        <div class="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="text-center md:text-left">
            <h2 class="text-sm font-800 text-mint-400 uppercase tracking-widest mb-2 flex items-center gap-2 justify-center md:justify-start">
              <span class="w-2 h-2 rounded-full bg-mint-500 animate-pulse" />
              Revenue Protection
            </h2>
            <p class="text-3xl font-900 text-white tracking-tight">
              You've saved{" "}
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-mint-300 to-mint-500">
                {formatINR(
                  Math.round(
                    (stats.monthlyEarnings / 0.85) - stats.monthlyEarnings,
                  ),
                )}
              </span>{" "}
              in OTA commissions
            </p>
            <p class="text-gray-400 mt-2 text-sm font-500">
              *Assuming average 15% commission on Airbnb/MMT. You keep 95% with
              istay.
            </p>
          </div>
          <div class="flex-shrink-0 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
            <p class="text-xs font-700 text-gray-500 uppercase mb-1">
              Total Payout Share
            </p>
            <p class="text-2xl font-900 text-white">95%</p>
          </div>
        </div>
      </div>

      {/* ── Quick Actions ──────────────────────────────────────── */}
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          {
            href: "/dashboard/properties",
            icon: "🏠",
            label: "Add Property",
            desc: "Import from Airbnb, Agoda, or Expedia",
            color: "hover:border-teal-300",
          },
          {
            href: "#",
            icon: "📅",
            label: "Sync OTA Channels",
            desc: "Connect iCal from all platforms",
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

      {/* ── Earnings Comparison ────────────────────────────────── */}
      <div class="mb-8">
        <EarningsComparison monthlyEarnings={stats.monthlyEarnings} />
        <OtaSavingsChart
          data={otaSavingsData}
          totalSavings={cumulativeSavings}
        />
      </div>

      {/* ── Operations & Housekeeping Feed ── */}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div class="lg:col-span-2">
          <LinkPerformanceChart
            data={chartData}
            totalViews={chartTotalViews}
            totalBookings={chartTotalBookings}
          />
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div class="px-6 py-4 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
            <h2 class="text-sm font-800 text-gray-900 uppercase tracking-tight">
              Operational Feed
            </h2>
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div class="flex-1 overflow-y-auto max-h-[400px] p-4 space-y-4">
            {notifications.length === 0
              ? (
                <div class="py-12 text-center">
                  <p class="text-2xl mb-2">📋</p>
                  <p class="text-xs text-gray-400 font-500">
                    No recent activity
                  </p>
                </div>
              )
              : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    class="p-4 rounded-xl bg-gray-50 border border-gray-100 transition-all hover:border-mint-200 group"
                  >
                    <div class="flex items-start gap-3">
                      <div
                        class={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          n.type === "housekeeping_ready"
                            ? "bg-emerald-50 text-emerald-600"
                            : n.type === "supply_request"
                            ? "bg-orange-50 text-orange-600"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {n.type === "housekeeping_ready"
                          ? "✨"
                          : n.type === "supply_request"
                          ? "📦"
                          : "🔔"}
                      </div>
                      <div>
                        <p class="text-xs font-800 text-gray-900">{n.title}</p>
                        <p class="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                          {n.message}
                        </p>

                        {n.meta?.imageUrl && (
                          <div class="mt-3 relative w-full h-24 rounded-lg overflow-hidden border border-gray-200">
                            <img
                              src={n.meta.imageUrl}
                              alt="Proof"
                              class="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                        )}

                        <p class="text-[10px] text-gray-400 mt-2 font-500">
                          {new Date(n.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })} · {n.propertyName}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
          </div>
        </div>
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
                        <p class="font-600 text-gray-900">
                          {booking.guestName}
                        </p>
                        <p class="text-xs text-gray-400">
                          {booking.guestEmail}
                        </p>
                      </td>
                      <td class="px-6 py-4 text-gray-500">
                        {formatDate(booking.checkIn)} →{" "}
                        {formatDate(booking.checkOut)}
                        <p class="text-xs text-gray-400">
                          {booking.nights} night{booking.nights > 1 ? "s" : ""}
                        </p>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-600">
                        <div class="flex flex-col items-end gap-1">
                          <span class="text-istay-900">
                            {formatINR(booking.amount)}
                          </span>
                          <a
                            href={`/invoice/${booking.id}?download=1`}
                            target="_blank"
                            class="text-xs text-mint-600 hover:text-mint-700 font-700 decoration-mint-600/30 hover:underline"
                          >
                            Invoice ↗
                          </a>
                        </div>
                        <p class="text-xs text-istay-700">
                          {formatINR(booking.amount * 0.95)} yours
                        </p>
                      </td>
                      <td class="px-6 py-4 text-center">
                        <span
                          class={`inline-flex px-2.5 py-1 rounded-full text-xs font-600 capitalize ${
                            STATUS_STYLES[booking.status] ??
                              "bg-gray-100 text-gray-500"
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
      {/* ── Phase 10: Financial Audit Forensic Ledger ─────────── */}
      <FinancialLedger entries={ledgerEntries} />
    </>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
