import { useCallback, useMemo, useState } from "preact/hooks";
import type { LedgerEntry } from "../utils/types.ts";

interface FinancialLedgerProps {
  entries: LedgerEntry[];
}

const PAGE_SIZE = 20;

export default function FinancialLedger({ entries }: FinancialLedgerProps) {
  const [filter, setFilter] = useState<"all" | "settled" | "pending">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // ── Filtered + date-ranged entries (memoized) ──────────────
  const filtered = useMemo(() => {
    let result = entries;

    // Status filter
    if (filter !== "all") {
      result = result.filter((e) => e.status === filter);
    }

    // Date range filter
    if (dateFrom) {
      result = result.filter((e) => e.createdAt.slice(0, 10) >= dateFrom);
    }
    if (dateTo) {
      result = result.filter((e) => e.createdAt.slice(0, 10) <= dateTo);
    }

    return result;
  }, [entries, filter, dateFrom, dateTo]);

  // ── Pagination ──────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginatedEntries = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  // Reset to page 1 when filters change
  const handleFilterChange = useCallback((f: "all" | "settled" | "pending") => {
    setFilter(f);
    setCurrentPage(1);
  }, []);

  const handleDateChange = useCallback((type: "from" | "to", value: string) => {
    if (type === "from") setDateFrom(value);
    else setDateTo(value);
    setCurrentPage(1);
  }, []);

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

  const handleExportCSV = useCallback(() => {
    const headers = [
      "Date",
      "Transaction ID",
      "Booking Ref",
      "Gross Amount",
      "iStay Fee",
      "Net Payout",
      "Status",
    ];
    const rows = filtered.map((e) => [
      new Date(e.createdAt).toISOString().slice(0, 10),
      e.gatewayOrderId,
      e.bookingId,
      e.grossAmount.toString(),
      e.istayAmount.toString(),
      e.hostAmount.toString(),
      e.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `istay-ledger-${filter}-${
      new Date().toISOString().slice(0, 10)
    }.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }, [filtered, filter]);

  return (
    <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mt-8">
      <div class="px-8 py-6 border-b border-gray-50 flex flex-col gap-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-xl font-900 text-gray-900 tracking-tight">
              Audit Trail
            </h2>
            <p class="text-sm text-gray-500 mt-1 font-500">
              Full forensic ledger for your payouts.
            </p>
          </div>

          <div class="flex items-center gap-3">
            <div class="flex gap-2">
              {(["all", "settled", "pending"] as const).map((f) => (
                <button
                  type="button"
                  key={f}
                  onClick={() => handleFilterChange(f)}
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

            {filtered.length > 0 && (
              <button
                type="button"
                onClick={handleExportCSV}
                class="px-4 py-2 rounded-xl text-xs font-700 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all flex items-center gap-1.5"
                title="Export filtered entries as CSV"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                CSV
              </button>
            )}
          </div>
        </div>

        {/* ── Date Range Picker ──────────────────────────────── */}
        <div class="flex flex-wrap items-center gap-3">
          <div class="flex items-center gap-2">
            <label class="text-[10px] font-700 text-gray-400 uppercase tracking-widest shrink-0">
              From
            </label>
            <input
              type="date"
              value={dateFrom}
              onInput={(e) => handleDateChange("from", e.currentTarget.value)}
              class="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 bg-gray-50 focus:border-istay-500 focus:bg-white outline-none transition-colors"
            />
          </div>
          <div class="flex items-center gap-2">
            <label class="text-[10px] font-700 text-gray-400 uppercase tracking-widest shrink-0">
              To
            </label>
            <input
              type="date"
              value={dateTo}
              onInput={(e) => handleDateChange("to", e.currentTarget.value)}
              class="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 bg-gray-50 focus:border-istay-500 focus:bg-white outline-none transition-colors"
            />
          </div>
          {(dateFrom || dateTo) && (
            <button
              type="button"
              onClick={() => {
                setDateFrom("");
                setDateTo("");
                setCurrentPage(1);
              }}
              class="text-[10px] font-700 text-rose-500 hover:text-rose-700 transition-colors"
            >
              Clear dates
            </button>
          )}
          <span class="text-[10px] text-gray-400 font-600 ml-auto">
            {filtered.length} entries{filtered.length !== entries.length
              ? ` of ${entries.length}`
              : ""}
          </span>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-gray-50/50">
              <th class="text-left px-8 py-4 text-[10px] font-800 text-gray-400 uppercase tracking-widest">
                Date
              </th>
              <th class="text-left px-8 py-4 text-[10px] font-800 text-gray-400 uppercase tracking-widest">
                Transaction / Booking
              </th>
              <th class="text-right px-8 py-4 text-[10px] font-800 text-gray-400 uppercase tracking-widest">
                Gross
              </th>
              <th class="text-right px-8 py-4 text-[10px] font-800 text-gray-400 uppercase tracking-widest">
                iStay Fee (5%)
              </th>
              <th class="text-right px-8 py-4 text-[10px] font-800 text-gray-400 uppercase tracking-widest font-900">
                Net Payout
              </th>
              <th class="text-center px-8 py-4 text-[10px] font-800 text-gray-400 uppercase tracking-widest">
                Status
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            {paginatedEntries.length === 0
              ? (
                <tr>
                  <td colSpan={6} class="px-8 py-20 text-center">
                    <span class="text-4xl block mb-4">🔍</span>
                    <p class="text-gray-400 font-500">
                      No ledger entries found.
                    </p>
                  </td>
                </tr>
              )
              : (
                paginatedEntries.map((entry) => (
                  <tr
                    key={entry.id}
                    class="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td class="px-8 py-5 whitespace-nowrap text-gray-500 font-500">
                      {formatDate(entry.createdAt)}
                    </td>
                    <td class="px-8 py-5">
                      <p class="font-700 text-gray-900 group-hover:text-istay-600 transition-colors">
                        #{entry.gatewayOrderId.slice(-8)}
                      </p>
                      <p class="text-[10px] text-gray-400 uppercase tracking-tight">
                        Booking Ref: {entry.bookingId.slice(0, 8)}
                      </p>
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

      {/* ── Pagination Controls ────────────────────────────────── */}
      {totalPages > 1 && (
        <div class="px-8 py-4 border-t border-gray-50 flex items-center justify-between">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((p) => Math.max(1, p - 1))}
            class="px-4 py-2 rounded-xl text-xs font-700 text-gray-600 bg-gray-50 hover:bg-gray-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          <div class="flex items-center gap-1.5">
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let page: number;
              if (totalPages <= 7) {
                page = i + 1;
              } else if (currentPage <= 4) {
                page = i + 1;
              } else if (currentPage >= totalPages - 3) {
                page = totalPages - 6 + i;
              } else {
                page = currentPage - 3 + i;
              }
              return (
                <button
                  type="button"
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  class={`w-8 h-8 rounded-lg text-xs font-700 transition-all ${
                    currentPage === page
                      ? "bg-istay-900 text-white shadow-sm"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            class="px-4 py-2 rounded-xl text-xs font-700 text-gray-600 bg-gray-50 hover:bg-gray-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      )}

      <div class="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
        <p class="text-[11px] text-gray-400 font-600 uppercase tracking-widest">
          Institutional Audit Layer v1.0
        </p>
        <p class="text-[11px] text-gray-500 font-700">
          Total Filtered Benefit:{" "}
          <span class="text-lg text-gray-900 ml-2">
            {formatINR(filtered.reduce((s, e) => s + e.hostAmount, 0))}
          </span>
        </p>
      </div>
    </div>
  );
}
