// ================================================================
// utils/analytics.ts — Professional-Grade Analytics Engine
// ================================================================

import { listBookings, listProperties } from "./db.ts";
import type { Booking, LedgerEntry } from "./types.ts";

export interface MonthlyMetrics {
  month: string;
  grossRevenue: number;
  netPayout: number;
  istayFees: number;
  occupancyRate: number;
  adr: number; // Average Daily Rate
  revPar: number; // Revenue Per Available Room
  bookingCount: number;
  nightsCount: number;
}

export interface FinancialInsight {
  totalRevenue: number;
  previousMonthRevenue: number;
  growth: number; // Percentage
  topPropertyId: string;
  topPropertyName: string;
}

/**
 * Calculates high-level financial and operational metrics for a host.
 * @param hostId The UUID of the host
 * @param month Target month in YYYY-MM format
 */
export async function calculateMonthlyMetrics(
  hostId: string,
  month: string,
): Promise<MonthlyMetrics> {
  const [allBookings, properties] = await Promise.all([
    listBookings(hostId),
    listProperties(hostId),
  ]);

  // Filter confirmed bookings for the target month (by check-in date)
  const monthlyBookings = allBookings.filter((b) =>
    (b.status === "confirmed" || b.status === "room_ready") &&
    b.checkIn.startsWith(month)
  );

  const nightsCount = monthlyBookings.reduce((sum, b) => sum + b.nights, 0);
  const grossRevenue = monthlyBookings.reduce((sum, b) => sum + b.amount, 0);
  const istayFees = Math.round(grossRevenue * 0.05 * 100) / 100;
  const netPayout = Math.round(grossRevenue * 0.95 * 100) / 100;

  // Occupancy calculation: (Booked Nights / Potential Nights)
  // Potential Nights = Total Properties * Days in Month
  const year = parseInt(month.split("-")[0]);
  const monthIdx = parseInt(month.split("-")[1]) - 1;
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
  const potentialNights = properties.length * daysInMonth;

  const occupancyRate = potentialNights > 0
    ? Math.round((nightsCount / potentialNights) * 10000) / 100
    : 0;

  const adr = nightsCount > 0
    ? Math.round((grossRevenue / nightsCount) * 100) / 100
    : 0;

  const revPar = Math.round((adr * (occupancyRate / 100)) * 100) / 100;

  return {
    month,
    grossRevenue,
    netPayout,
    istayFees,
    occupancyRate,
    adr,
    revPar,
    bookingCount: monthlyBookings.length,
    nightsCount,
  };
}

/**
 * Compares current month performance vs previous month.
 */
export async function getFinancialInsights(
  hostId: string,
): Promise<FinancialInsight> {
  const now = new Date();
  const currentMonth = now.toISOString().slice(0, 7);

  const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevMonth = prevDate.toISOString().slice(0, 7);

  const [current, previous, properties] = await Promise.all([
    calculateMonthlyMetrics(hostId, currentMonth),
    calculateMonthlyMetrics(hostId, prevMonth),
    listProperties(hostId),
  ]);

  const growth = previous.grossRevenue > 0
    ? Math.round(
      ((current.grossRevenue - previous.grossRevenue) / previous.grossRevenue) *
        100,
    )
    : 0;

  // Find top performing property by revenue (this month)
  const allBookings = await listBookings(hostId);
  const propRevenue = new Map<string, number>();

  allBookings.filter((b) =>
    b.checkIn.startsWith(currentMonth) && b.status === "confirmed"
  ).forEach((b) => {
    propRevenue.set(
      b.propertyId,
      (propRevenue.get(b.propertyId) ?? 0) + b.amount,
    );
  });

  let topPropId = "";
  let topRevenue = -1;
  for (const [id, rev] of propRevenue.entries()) {
    if (rev > topRevenue) {
      topRevenue = rev;
      topPropId = id;
    }
  }

  const topProp = properties.find((p) => p.id === topPropId);

  return {
    totalRevenue: current.grossRevenue,
    previousMonthRevenue: previous.grossRevenue,
    growth,
    topPropertyId: topPropId,
    topPropertyName: topProp?.name || "N/A",
  };
}
