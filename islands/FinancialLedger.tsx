/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import type { LedgerEntry } from "../utils/types.ts";

interface FinancialLedgerProps {
  entries: LedgerEntry[];
}

export default function FinancialLedger({ entries }: FinancialLedgerProps) {
  const [filter, setFilter] = useState<"all" | "settled" | "pending">("all");

  const filtered = entries.filter((e) => {
    if (filter === "all") return true;
    return e.status === filter;
  });

  const formatINR = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mt-8">
      <div class="px-8 py-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-900 text-gray-900 tracking-tight">Audit Trail</h2>
          <p class="text-sm text-gray-500 mt-1 font-500">Full forensic ledger for your payouts.</p>
        </div>

        <div class="flex gap-2">
          {(["all", "settled", "pending"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              class={`px-4 py-2 rounded-xl text-xs font-700 capitalize transition-all ${
                filter === f
                  ? "bg-istay-900 text-white shadow-lg shadow-istay-900/20"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-gray-50/50">
              <th class="text-left px-8 py-4 text-[10px] font-800 text-gray-400 uppercase tracking-widest">Date</th>
              <th class="text-left px-8 py-4 text-[10px] font-800 text-gray-400 uppercase tracking-widest">Transaction / Booking</th>
              <th class="text-right px-8 py-4 text-[10px] font-800 text-gray-400 uppercase tracking-widest">Gross</th>
              <th class="text-right px-8 py-4 text-[10px] font-800 text-gray-400 uppercase tracking-widest">iStay Fee (5%)</th>
              <th class="text-right px-8 py-4 text-[10px] font-800 text-gray-400 uppercase tracking-widest font-900">Net Payout</th>
              <th class="text-center px-8 py-4 text-[10px] font-800 text-gray-400 uppercase tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} class="px-8 py-20 text-center">
                  <span class="text-4xl block mb-4">🔍</span>
                  <p class="text-gray-400 font-500">No ledger entries found.</p>
                </td>
              </tr>
            ) : (
              filtered.map((entry) => (
                <tr key={entry.id} class="hover:bg-gray-50/50 transition-colors group">
                  <td class="px-8 py-5 whitespace-nowrap text-gray-500 font-500">
                    {formatDate(entry.createdAt)}
                  </td>
                  <td class="px-8 py-5">
                    <p class="font-700 text-gray-900 group-hover:text-istay-600 transition-colors">#{entry.gatewayOrderId.slice(-8)}</p>
                    <p class="text-[10px] text-gray-400 uppercase tracking-tight">Booking Ref: {entry.bookingId.slice(0, 8)}</p>
                  </td>
                  <td class="px-8 py-5 text-right font-600 text-gray-500">
                    {formatINR(entry.grossAmount)}
                  </td>
                  <td class="px-8 py-5 text-right font-600 text-rose-500/70">
                    -{formatINR(entry.istayAmount)}
                  </td>
                  <td class="px-8 py-5 text-right font-900 text-emerald-600 bg-emerald-50/30">
                    {formatINR(entry.hostAmount)}
                  </td>
                  <td class="px-8 py-5 text-center">
                    <span
                      class={`px-3 py-1.5 rounded-lg text-[10px] font-900 uppercase tracking-tighter ${
                        entry.status === "settled"
                          ? "bg-emerald-100 text-emerald-700"
                          : entry.status === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {entry.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div class="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
        <p class="text-[11px] text-gray-400 font-600 uppercase tracking-widest">
           Institutional Audit Layer v1.0
        </p>
        <p class="text-[11px] text-gray-500 font-700">
           Total Filtered Benefit: <span class="text-lg text-gray-900 ml-2">{formatINR(filtered.reduce((s, e) => s + e.hostAmount, 0))}</span>
        </p>
      </div>
    </div>
  );
}
