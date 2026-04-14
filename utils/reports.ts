// ================================================================
// utils/reports.ts — Automated Performance Reporting
// ================================================================

import { calculateMonthlyMetrics } from "./analytics.ts";
import { getHost } from "./db.ts";

/**
 * Generates a professional Markdown performance statement for a host.
 */
export async function generateMonthlyStatement(
  hostId: string,
  month: string,
): Promise<string> {
  const host = await getHost(hostId);
  const metrics = await calculateMonthlyMetrics(hostId, month);

  const formatINR = (amt: number) => 
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amt);

  return `
# iStay Performance Statement — ${month}
**Host:** ${host?.name || "Valued Partner"}
**Account ID:** ${hostId.slice(0, 8).toUpperCase()}

---

## 📊 Key Highlights
- **Total Gross Revenue:** ${formatINR(metrics.grossRevenue)}
- **Net Payout (95%):** ${formatINR(metrics.netPayout)}
- **iStay Platform Fee (5%):** ${formatINR(metrics.istayFees)}
- **Occupancy Rate:** ${metrics.occupancyRate}%
- **Average Daily Rate (ADR):** ${formatINR(metrics.adr)}

## 🏨 Operational Stats
- **Total Bookings:** ${metrics.bookingCount}
- **Nights Hosted:** ${metrics.nightsCount}
- **RevPAR:** ${formatINR(metrics.revPar)}

---

## 🛡️ Support & Compliance
- **PII Status:** All guest sensitive data for this period has been archived and is scheduled for automatic scrubbing 30 days post-checkout in accordance with iStay DPDP compliance protocols.
- **Support:** If you have questions regarding this statement, please reach out to support@istay.space.

*Thank you for being part of the iStay network.*
`;
}
