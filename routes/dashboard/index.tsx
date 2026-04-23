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
  getKv,
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
import PwaInstallPrompt from "../../islands/PwaInstallPrompt.tsx";
import NotificationFeed from "../../islands/NotificationFeed.tsx";
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

    let stats: DashboardStats;
    let allBookings: Booking[] = [];
    let notifications: Notification[] = [];
    let ledgerEntries: LedgerEntry[] = [];
    let properties: any[] = [];

    try {
      [stats, allBookings, properties, notifications, ledgerEntries] =
        await Promise.all([
          getDashboardStats(hostId).catch(err => {
            console.error("[dashboard] getDashboardStats failed:", err);
            return { totalRevenue: 0, occupancyRate: 0, activeProperties: 0, bookingsThisMonth: 0 };
          }),
          listBookings(hostId).catch(() => []),
          listProperties(hostId).catch(() => []),
          listNotifications(hostId).catch(() => []),
          listLedgerEntriesByHost(hostId).catch(() => []),
        ]);
    } catch (err) {
      console.error("[dashboard-critical] Critical failure in data fetch:", err);
      stats = { totalRevenue: 0, occupancyRate: 0, activeProperties: 0, bookingsThisMonth: 0 };
    }

    const currentMonth = new Date().toISOString().slice(0, 7);
    let analytics: MonthlyMetrics;
    let insights: FinancialInsight;

    try {
      [analytics, insights] = await Promise.all([
        calculateMonthlyMetrics(hostId, currentMonth).catch(err => {
          console.error("[dashboard] calculateMonthlyMetrics failed:", err);
          return { bookings: 0, occupancy: 0, revenue: 0, previousRevenue: 0, growth: 0, otaCommissionSaved: 0 };
        }),
        getFinancialInsights(hostId).catch(err => {
          console.error("[dashboard] getFinancialInsights failed:", err);
          return { monthlyEarnings: 0, projectedEarnings: 0, activeReservations: 0, guestSatisfaction: 0, earningsTrend: [] };
        }),
      ]);
    } catch (err) {
      console.error("[dashboard-critical] Analytics fetch failed:", err);
      analytics = { bookings: 0, occupancy: 0, revenue: 0, previousRevenue: 0, growth: 0, otaCommissionSaved: 0 };
      insights = { monthlyEarnings: 0, projectedEarnings: 0, activeReservations: 0, guestSatisfaction: 0, earningsTrend: [] };
    }

    const recentBookings = allBookings.slice(0, 5);

    // ── Build daily chart data (aggregate across all properties) ──
    const [bookingsDaily] = await Promise.all([
      getBookingsDaily(hostId, 7),
    ]);

    // Aggregate views across all properties for each day in parallel
    const viewsByDay = new Map<string, number>();
    const allPropertyViews = await Promise.all(
      properties.map((prop) => getPropertyViewsDaily(prop.id, 7)),
    );

    for (const daily of allPropertyViews) {
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
    <div class="relative rounded-[2rem] p-8 border-[3px] border-gray-900 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none group overflow-hidden">
      <div class="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-gray-50 group-hover:bg-mint-50 transition-colors" />
      <div class="relative z-10">
        <div class="flex items-start justify-between mb-8">
          <p class="text-[10px] font-950 text-gray-400 uppercase tracking-[0.2em]">{label}</p>
          <div class={`w-12 h-12 rounded-2xl border-[2px] border-gray-900 flex items-center justify-center transition-all group-hover:bg-mint-400 group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
            {icon}
          </div>
        </div>
        <p class="text-4xl font-950 text-gray-900 tracking-tighter mb-2 uppercase">{value}</p>
        <p class="text-[10px] font-800 text-gray-400 uppercase tracking-widest">{sub}</p>
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

      <PwaInstallPrompt />

      {/* Subscription Requirement Banner */}
      {stats.subscriptionStatus === "expired" && (
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
      <div class="mb-12">
        <div class="flex items-center gap-4 mb-4">
          <div class="px-3 py-1 bg-gray-900 text-mint-400 text-[10px] font-950 uppercase tracking-[0.2em] rounded-full border-[2px] border-gray-900 shadow-[3px_3px_0px_0px_#4ade80]">
            LIVE_INTELLIGENCE
          </div>
          <div class="h-[2px] flex-1 bg-gray-100" />
        </div>
        <h2 class="text-6xl sm:text-7xl font-950 text-gray-900 tracking-tighter uppercase leading-[0.85] mb-12">
          SYSTEM_STATE:<br />
          <span class="text-mint-500">OPERATIONAL_V2.</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <StatCard 
            label="PORTFOLIO_REVENUE" 
            value={formatINR(stats.totalRevenue)} 
            sub="+12.5%_MARGIN_LIFT" 
            gradient="bg-gray-900"
            icon={<span class="text-xl">💰</span>}
          />
          <StatCard 
            label="OCCUPANCY_RATE" 
            value={`${Math.round(stats.occupancyRate)}%`} 
            sub="REAL_TIME_OPTIMIZED" 
            gradient="bg-white"
            icon={<span class="text-xl">📈</span>}
          />
          <StatCard 
            label="ACTIVE_BOOKINGS" 
            value={stats.bookingsThisMonth.toString()} 
            sub={`${stats.activeProperties}_LIVE_LISTINGS`} 
            gradient="bg-white"
            icon={<span class="text-xl">📅</span>}
          />
        </div>
      </div>

      {/* ── Performance Grid ───────────────────────────────────── */}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        <div class="bg-white rounded-[2.5rem] p-2 border-[4px] border-gray-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <LinkPerformanceChart
            data={chartData}
            totalViews={chartTotalViews}
            totalBookings={chartTotalBookings}
          />
        </div>
        <div class="bg-white rounded-[2.5rem] p-2 border-[4px] border-gray-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <OtaSavingsChart data={otaSavingsData} totalSavings={cumulativeSavings} />
        </div>
      </div>

      {/* ── Operations Feed ── */}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
        {/* Quick Actions */}
        <div class="lg:col-span-1 space-y-6">
          <div class="flex items-center gap-4 mb-4">
            <p class="text-[10px] font-950 text-gray-400 uppercase tracking-widest whitespace-nowrap">
              QUICK_ACTIONS
            </p>
            <div class="h-[2px] flex-1 bg-gray-100" />
          </div>
          {[
            {
              href: "/dashboard/properties",
              icon: "🏠",
              label: "ADD_PROPERTY",
              desc: "Deploy new listing",
              bg: "bg-mint-50",
            },
            {
              href: "/dashboard/bookings",
              icon: "📅",
              label: "VIEW_LOGISTICS",
              desc: "Manage reservations",
              bg: "bg-teal-50",
            },
            {
              href: "/dashboard/settings",
              icon: "⚙️",
              label: "CORE_CONFIG",
              desc: "System adjustments",
              bg: "bg-gray-50",
            },
          ].map((action) => (
            <a
              key={action.label}
              href={action.href}
              class="flex items-center gap-6 p-6 bg-white border-[3px] border-gray-900 rounded-[2rem] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] group"
            >
              <div class={`w-16 h-16 ${action.bg} border-[3px] border-gray-900 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-white transition-colors`}>
                {action.icon}
              </div>
              <div>
                <p class="text-xs font-950 text-gray-900 uppercase tracking-tighter">{action.label}</p>
                <p class="text-[10px] font-800 text-gray-400 uppercase tracking-widest mt-1">{action.desc}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Intelligence Metrics */}
        <div class="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { 
              label: "MONTHLY_REVENUE", 
              value: formatINR(analytics.revenue), 
              trend: `+${analytics.growth}% LIFT`, 
              color: "emerald",
              icon: "💰"
            },
            { 
              label: "OTA_SAVINGS", 
              value: formatINR(analytics.otaCommissionSaved), 
              trend: "DIRECT_ROI", 
              color: "mint",
              icon: "🛡️"
            },
          ].map((stat) => (
            <div key={stat.label} class="bg-white p-8 rounded-[2rem] border-[3px] border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
              <div class="absolute -right-4 -top-4 text-6xl opacity-5 group-hover:scale-125 transition-transform">{stat.icon}</div>
              <p class="text-[10px] font-950 text-gray-400 uppercase tracking-[0.3em] mb-6">{stat.label}</p>
              <div class="flex items-end justify-between">
                <h3 class="text-3xl font-950 text-gray-900 tracking-tighter leading-none">{stat.value}</h3>
                <span class={`text-[9px] font-950 px-3 py-1 rounded-lg border-[2px] border-gray-900 ${stat.color === 'emerald' ? 'bg-emerald-500 text-white' : 'bg-mint-400 text-gray-900'}`}>
                  {stat.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recent Activity ──────────────────────────────────── */}
      <div class="space-y-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <p class="text-[10px] font-950 text-gray-400 uppercase tracking-widest whitespace-nowrap">
              LOGISTICS_LEDGER
            </p>
            <div class="h-[2px] w-24 bg-gray-100" />
          </div>
          <a
            href="/dashboard/bookings"
            class="px-5 py-2 rounded-xl bg-gray-900 text-white text-[10px] font-950 uppercase tracking-widest border-[3px] border-gray-900 shadow-[4px_4px_0px_0px_#4ade80] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            Full_Registry →
          </a>
        </div>

        <div class="bg-white border-[4px] border-gray-900 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] rounded-[2.5rem] overflow-hidden">
          {recentBookings.length === 0 ? (
            <div class="py-20 text-center space-y-4">
              <p class="text-6xl">📭</p>
              <h3 class="text-xl font-950 text-gray-900 uppercase tracking-tight">System Idle</h3>
              <p class="text-[10px] font-800 text-gray-400 uppercase tracking-widest">Deploy your booking link to initialize reservations.</p>
            </div>
          ) : (
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="bg-gray-50 border-b-[3px] border-gray-900">
                    <th class="px-8 py-6 text-[10px] font-950 text-gray-400 uppercase tracking-widest">GUEST_ID</th>
                    <th class="px-8 py-6 text-[10px] font-950 text-gray-400 uppercase tracking-widest">WINDOW</th>
                    <th class="px-8 py-6 text-[10px] font-950 text-gray-400 uppercase tracking-widest text-right">CAPITAL</th>
                    <th class="px-8 py-6 text-[10px] font-950 text-gray-400 uppercase tracking-widest text-center">STATUS</th>
                  </tr>
                </thead>
                <tbody class="divide-y-[2px] divide-gray-100">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} class="group hover:bg-gray-50 transition-colors">
                      <td class="px-8 py-6">
                        <p class="text-sm font-950 text-gray-900 uppercase tracking-tighter leading-none mb-1">{booking.guestName}</p>
                        <p class="text-[10px] font-800 text-gray-400 uppercase tracking-widest">{booking.guestEmail}</p>
                      </td>
                      <td class="px-8 py-6">
                        <p class="text-xs font-950 text-gray-900 uppercase tracking-tighter">
                          {formatDate(booking.checkIn)} — {formatDate(booking.checkOut)}
                        </p>
                        <p class="text-[10px] font-800 text-mint-500 uppercase tracking-widest mt-1">{booking.nights} NIGHTS_STAY</p>
                      </td>
                      <td class="px-8 py-6 text-right">
                        <p class="text-sm font-950 text-gray-900 tracking-tight">{formatINR(booking.amount)}</p>
                      </td>
                      <td class="px-8 py-6 text-center">
                        <span class={`px-4 py-2 rounded-xl border-[2px] border-gray-900 text-[9px] font-950 uppercase tracking-widest ${STATUS_STYLES[booking.status] || "bg-gray-100"}`}>
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
