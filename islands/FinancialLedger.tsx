import { useCallback, useMemo, useState } from "preact/hooks";
import type { LedgerEntry } from "../utils/types.ts";

interface FinancialLedgerProps {
  entries: LedgerEntry[];
}

const PAGE_SIZE = 15;

export default function FinancialLedger({ entries }: FinancialLedgerProps) {
  const [filter, setFilter] = useState<"all" | "settled" | "pending">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filtered = useMemo(() => {
    let result = entries;
    if (filter !== "all") {
      result = result.filter((e) => e.status === filter);
    }
    if (dateFrom) {
      result = result.filter((e) => e.createdAt.slice(0, 10) >= dateFrom);
    }
    if (dateTo) {
      result = result.filter((e) => e.createdAt.slice(0, 10) <= dateTo);
    }
    return result;
  }, [entries, filter, dateFrom, dateTo]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginatedEntries = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

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
    const headers = ["Date", "Transaction ID", "Booking Ref", "Gross Amount", "iStay Fee", "Net Payout", "Status"];
    const rows = filtered.map((e) => [
      new Date(e.createdAt).toISOString().slice(0, 10),
      e.gatewayOrderId,
      e.bookingId,
      e.grossAmount.toString(),
      e.istayAmount.toString(),
      e.hostAmount.toString(),
      e.status,
    ]);
    const csvContent = [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `istay-ledger-${filter}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }, [filtered, filter]);

  return (
    <div class="bg-white rounded-[3rem] border border-gray-100 shadow-premium overflow-hidden mt-16">
      {/* Header & Controls */}
      <div class="px-10 py-10 border-b border-gray-50 bg-gray-50/30 space-y-10">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <div class="flex items-center gap-4 mb-4">
               <div class="px-3 py-1 bg-white border border-gray-100 text-[11px] font-bold text-emerald-600 uppercase tracking-widest rounded-full shadow-sm">Financial Audit</div>
               <div class="h-px w-12 bg-gray-200" />
            </div>
            <h2 class="text-4xl font-bold text-gray-900 tracking-tight leading-none">
              Earnings Ledger
            </h2>
          </div>

          <div class="flex flex-wrap items-center gap-4">
            <div class="flex bg-white border border-gray-100 rounded-2xl p-1.5 shadow-sm">
              {(["all", "settled", "pending"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => handleFilterChange(f)}
                  class={`px-6 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${
                    filter === f
                      ? "bg-gray-900 text-white shadow-premium"
                      : "text-gray-400 hover:text-gray-900"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <button
              onClick={handleExportCSV}
              class="px-8 py-4 bg-gray-900 text-white text-[11px] font-bold uppercase tracking-widest rounded-2xl shadow-premium hover:bg-emerald-500 transition-all"
            >
              Export Spreadsheet
            </button>
          </div>
        </div>

        {/* Date Range & Stats */}
        <div class="flex flex-wrap items-center justify-between gap-8 pt-8 border-t border-gray-100">
           <div class="flex flex-wrap items-center gap-6">
              <div class="flex items-center gap-3">
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">From:</span>
                <input
                  type="date"
                  value={dateFrom}
                  onInput={(e) => handleDateChange("from", e.currentTarget.value)}
                  class="px-4 py-2 rounded-xl border border-gray-100 text-[12px] font-bold text-gray-900 bg-white outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                />
              </div>
              <div class="flex items-center gap-3">
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">To:</span>
                <input
                  type="date"
                  value={dateTo}
                  onInput={(e) => handleDateChange("to", e.currentTarget.value)}
                  class="px-4 py-2 rounded-xl border border-gray-100 text-[12px] font-bold text-gray-900 bg-white outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                />
              </div>
              {(dateFrom || dateTo) && (
                <button
                  onClick={() => { setDateFrom(""); setDateTo(""); setCurrentPage(1); }}
                  class="text-[10px] font-bold text-rose-500 uppercase tracking-widest hover:text-rose-700 transition-colors"
                >
                  Reset Dates
                </button>
              )}
           </div>
           
           <div class="px-6 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 text-[11px] font-bold uppercase tracking-widest">
              {filtered.length} Transactions <span class="text-emerald-300 mx-2">|</span> Q2 2026
           </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-white border-b border-gray-50">
              <th class="px-10 py-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Date</th>
              <th class="px-10 py-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Transaction ID</th>
              <th class="px-10 py-8 text-right text-[11px] font-bold text-gray-400 uppercase tracking-widest">Gross Revenue</th>
              <th class="px-10 py-8 text-right text-[11px] font-bold text-gray-400 uppercase tracking-widest">Platform Fee</th>
              <th class="px-10 py-8 text-right text-[11px] font-bold text-gray-400 uppercase tracking-widest">Net Earnings</th>
              <th class="px-10 py-8 text-center text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            {paginatedEntries.length === 0 ? (
              <tr>
                <td colSpan={6} class="px-10 py-32 text-center">
                  <span class="text-7xl block mb-6">🏜️</span>
                  <p class="text-[11px] font-bold text-gray-300 uppercase tracking-widest">
                    No transactions found in this period.
                  </p>
                </td>
              </tr>
            ) : (
              paginatedEntries.map((entry) => (
                <tr key={entry.id} class="group hover:bg-emerald-50/30 transition-colors">
                  <td class="px-10 py-8">
                    <p class="text-sm font-bold text-gray-900 tracking-tight leading-none">{formatDate(entry.createdAt)}</p>
                    <p class="text-[10px] font-medium text-emerald-500 uppercase tracking-widest mt-2">Verified</p>
                  </td>
                  <td class="px-10 py-8">
                    <p class="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1 truncate max-w-[120px]">{entry.gatewayOrderId}</p>
                    <p class="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Ref: {entry.bookingId.slice(0, 8)}</p>
                  </td>
                  <td class="px-10 py-8 text-right font-bold text-gray-400 text-sm">
                    {formatINR(entry.grossAmount)}
                  </td>
                  <td class="px-10 py-8 text-right font-bold text-rose-400 text-sm">
                    -{formatINR(entry.istayAmount)}
                  </td>
                  <td class="px-10 py-8 text-right font-bold text-gray-900 text-lg tracking-tight">
                    {formatINR(entry.hostAmount)}
                  </td>
                  <td class="px-10 py-8 text-center">
                    <span class={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-sm border ${
                      entry.status === 'settled' 
                        ? 'bg-emerald-500 text-white border-emerald-600' 
                        : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {entry.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div class="px-10 py-10 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between">
          <p class="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Page {currentPage} of {totalPages}
          </p>
          <div class="flex gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(c => c - 1)}
              class="px-8 py-3 bg-white border border-gray-100 rounded-xl text-[11px] font-bold uppercase tracking-widest shadow-sm disabled:opacity-30 hover:-translate-y-0.5 transition-all"
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(c => c + 1)}
              class="px-8 py-3 bg-gray-900 text-white rounded-xl text-[11px] font-bold uppercase tracking-widest shadow-premium disabled:opacity-30 hover:-translate-y-0.5 transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
