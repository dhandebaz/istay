// ================================================================
// utils/pricing.ts — Autonomous Yield Management System
//
// Calculates dynamic pricing based on:
//   1. Occupancy Percentage (Next 30 Days)
//   2. Lead Time (Recency)
//   3. Day of Week (Weekend Premium)
// ================================================================

import { getPropertyById, listBlockedDates } from "./db.ts";
import { Property } from "./types.ts";

export interface PricingFactors {
  occupancyRate: number;
  isWeekend: boolean;
  isLastMinute: boolean;
}

export interface DynamicPriceResult {
  finalPrice: number;
  basePrice: number;
  surgeMultiplier: number;
  discountMultiplier: number;
  appliedRules: string[];
}

/**
 * Converts INR to other currencies using a robust fallback mechanism.
 */
export function convertCurrency(
  amountInInr: number,
  targetCurrency: "USD" | "EUR" | "GBP" | "INR" = "INR",
): { amount: number; symbol: string } {
  const rates = {
    USD: 0.012, // ₹83.33 fallback
    EUR: 0.011, // ₹90.90 fallback
    GBP: 0.0095, // ₹105.26 fallback
    INR: 1,
  };

  const symbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
  };

  const rate = rates[targetCurrency] || 1;
  const symbol = symbols[targetCurrency] || "₹";

  return {
    amount: Number((amountInInr * rate).toFixed(2)),
    symbol,
  };
}

/**
 * Calculates a dynamic price for a specific date at a property.
 */
export async function getDynamicPrice(
  propertyId: string,
  basePrice: number,
  targetDateStr: string,
  propertyOverride?: Property, // Optimization for batch pricing
): Promise<DynamicPriceResult> {
  const targetDate = new Date(targetDateStr + "T00:00:00Z");
  const dayOfWeek = targetDate.getUTCDay(); // 0=Sun, 6=Sat

  // 1. Fetch property settings if not provided
  const property = propertyOverride || await getPropertyById(propertyId);
  const settings = property?.pricingSettings;

  // 2. Fetch blocks to calculate occupancy
  const blocks = await listBlockedDates(propertyId);

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const next30Days = new Array(30).fill(0).map((_, i) => {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() + i);
    return d.toISOString().slice(0, 10);
  });

  const occupiedNext30Count = blocks.filter((b) =>
    next30Days.includes(b.date) &&
    (b.reason === "booked" || b.reason === "manual_block")
  ).length;

  const occupancyRate = occupiedNext30Count / 30;

  // ── Rules ──
  let surgeMultiplier = 1.0;
  let discountMultiplier = 1.0;
  const appliedRules: string[] = [];

  // Rule A: Occupancy Surge (>70% booked -> +20%)
  if (occupancyRate > 0.7) {
    surgeMultiplier += 0.2;
    appliedRules.push("High Demand Surge (70%+ Occupancy)");
  }

  // Rule B: Weekend Premium (Sat/Sun check-in or stay)
  // Use host setting if available, fallback to 15%
  const weekendSurcharge = settings?.weekendSurcharge ?? 0.15;
  if (dayOfWeek === 5 || dayOfWeek === 6) {
    surgeMultiplier += weekendSurcharge;
    appliedRules.push(`Weekend Premium (+${Math.round(weekendSurcharge * 100)}%)`);
  }

  // Rule C: Seasonal Adjustments
  if (settings?.seasonalAdjustments) {
    const monthDay = targetDate.toISOString().slice(5, 10); // MM-DD
    for (const adj of settings.seasonalAdjustments) {
      if (monthDay >= adj.startDate && monthDay <= adj.endDate) {
        surgeMultiplier += adj.adjustment;
        appliedRules.push(`${adj.label} (+${Math.round(adj.adjustment * 100)}%)`);
      }
    }
  }

  // Rule D: Last-Minute Recovery (within 3 days -> -10%)
  const diffDays = Math.ceil(
    (targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays >= 0 && diffDays <= 3) {
    discountMultiplier -= 0.1;
    appliedRules.push("Last Minute Deal (<3 days)");
  }

  let finalPrice = Math.round(
    basePrice * surgeMultiplier * discountMultiplier,
  );

  // Apply floor/ceiling
  if (settings?.minPrice && finalPrice < settings.minPrice) {
    finalPrice = settings.minPrice;
    appliedRules.push("Minimum Price Protection active");
  }
  if (settings?.maxPrice && finalPrice > settings.maxPrice) {
    finalPrice = settings.maxPrice;
    appliedRules.push("Maximum Price Cap active");
  }

  return {
    finalPrice,
    basePrice,
    surgeMultiplier,
    discountMultiplier,
    appliedRules,
  };
}

/**
 * Convenience function for a range of dates.
 */
export async function getPriceForRange(
  propertyId: string,
  basePrice: number,
  checkIn: string,
  checkOut: string,
): Promise<
  { total: number; average: number; breakdown: Record<string, number> }
> {
  // Fetch property once for efficiency
  const property = await getPropertyById(propertyId);

  const dates: string[] = [];
  const cur = new Date(checkIn + "T00:00:00Z");
  const end = new Date(checkOut + "T00:00:00Z");

  while (cur < end) {
    dates.push(cur.toISOString().slice(0, 10));
    cur.setUTCDate(cur.getUTCDate() + 1);
  }

  let total = 0;
  const breakdown: Record<string, number> = {};

  const prices = await Promise.all(
    dates.map((d) => getDynamicPrice(propertyId, basePrice, d, property || undefined)),
  );

  prices.forEach((res, i) => {
    total += res.finalPrice;
    breakdown[dates[i]] = res.finalPrice;
  });

  return {
    total,
    average: Math.round(total / dates.length),
    breakdown,
  };
}
