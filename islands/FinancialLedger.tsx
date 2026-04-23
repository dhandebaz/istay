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
    }).toUpperCase();

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
    <div class="bg-white rounded-[3rem] border-[4px] border-gray-900 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] overflow-hidden mt-16">
      {/* Header & Controls */}
      <div class="px-10 py-10 border-b-[4px] border-gray-900 bg-gray-50 space-y-10">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <div class="flex items-center gap-4 mb-4">
               <div class="px-3 py-1 bg-gray-900 text-mint-400 text-[9px] font-950 uppercase tracking-widest rounded-lg border-2 border-gray-900">AUDIT_PROTOCOL_L4</div>
               <div class="h-[2px] w-12 bg-gray-200" />
            </div>
            <h2 class="text-4xl font-950 text-gray-900 tracking-tighter uppercase leading-none">
              Financial_Ledger
            </h2>
          </div>

          <div class="flex flex-wrap items-center gap-4">
            <div class="flex bg-white border-[3px] border-gray-900 rounded-2xl p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {(["all", "settled", "pending"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => handleFilterChange(f)}
                  class={`px-6 py-2.5 rounded-xl text-[10px] font-950 uppercase tracking-widest transition-all ${
                    filter === f
                      ? "bg-gray-900 text-white"
                      : "text-gray-400 hover:text-gray-900"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <button
              onClick={handleExportCSV}
              class="px-8 py-3.5 bg-mint-400 text-gray-900 text-[10px] font-950 uppercase tracking-widest rounded-2xl border-[3px] border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
            >
              EXPORT_CSV
            </button>
          </div>
        </div>

        {/* Date Range & Stats */}
        <div class="flex flex-wrap items-center justify-between gap-8 pt-8 border-t-[2px] border-gray-200">
           <div class="flex flex-wrap items-center gap-6">
              <div class="flex items-center gap-3">
                <span class="text-[9px] font-950 text-gray-400 uppercase tracking-widest">FROM:</span>
                <input
                  type="date"
                  value={dateFrom}
                  onInput={(e) => handleDateChange("from", e.currentTarget.value)}
                  class="px-4 py-2 rounded-xl border-[2px] border-gray-900 text-[11px] font-950 text-gray-900 bg-white outline-none focus:bg-mint-50 transition-colors"
                />
              </div>
              <div class="flex items-center gap-3">
                <span class="text-[9px] font-950 text-gray-400 uppercase tracking-widest">TO:</span>
                <input
                  type="date"
                  value={dateTo}
                  onInput={(e) => handleDateChange("to", e.currentTarget.value)}
                  class="px-4 py-2 rounded-xl border-[2px] border-gray-900 text-[11px] font-950 text-gray-900 bg-white outline-none focus:bg-mint-50 transition-colors"
                />
              </div>
              {(dateFrom || dateTo) && (
                <button
                  onClick={() => { setDateFrom(""); setDateTo(""); setCurrentPage(1); }}
                  class="text-[9px] font-950 text-rose-500 uppercase tracking-widest border-b-2 border-rose-500 pb-0.5 hover:text-rose-700 transition-colors"
                >
                  RESET_WINDOW
                </button>
              )}
           </div>
           
           <div class="px-6 py-2 bg-gray-900 text-white rounded-xl border-2 border-gray-900 text-[10px] font-950 uppercase tracking-widest">
              ENTRIES: {filtered.length} <span class="text-gray-500 mx-2">|</span> CYCLE: 2026_Q2
           </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-gray-50/50 border-b-[4px] border-gray-900">
              <th class="px-10 py-8 text-[10px] font-950 text-gray-400 uppercase tracking-widest">TIMESTAMP</th>
              <th class="px-10 py-8 text-[10px] font-950 text-gray-400 uppercase tracking-widest">TRANS_CORE_ID</th>
              <th class="px-10 py-8 text-right text-[10px] font-950 text-gray-400 uppercase tracking-widest">GROSS</th>
              <th class="px-10 py-8 text-right text-[10px] font-950 text-gray-400 uppercase tracking-widest">CORE_FEE</th>
              <th class="px-10 py-8 text-right text-[10px] font-950 text-gray-400 uppercase tracking-widest">NET_PAYOUT</th>
              <th class="px-10 py-8 text-center text-[10px] font-950 text-gray-400 uppercase tracking-widest">STATE</th>
            </tr>
          </thead>
          <tbody class="divide-y-[3px] divide-gray-100">
            {paginatedEntries.length === 0 ? (
              <tr>
                <td colSpan={6} class="px-10 py-32 text-center">
                  <span class="text-7xl block mb-6">🏜️</span>
                  <p class="text-[10px] font-950 text-gray-300 uppercase tracking-[0.3em]">
                    The audit trail is currently vacant.
                  </p>
                </td>
              </tr>
            ) : (
              paginatedEntries.map((entry) => (
                <tr key={entry.id} class="group hover:bg-gray-50 transition-colors">
                  <td class="px-10 py-8">
                    <p class="text-xs font-950 text-gray-900 uppercase tracking-tighter leading-none">{formatDate(entry.createdAt)}</p>
                    <p class="text-[9px] font-800 text-gray-400 uppercase tracking-widest mt-2">UTC_SIGNAL_OK</p>
                  </td>
                  <td class="px-10 py-8">
                    <p class="text-xs font-950 text-gray-900 uppercase tracking-widest mb-1 truncate max-w-[120px]">{entry.gatewayOrderId}</p>
                    <p class="text-[9px] font-800 text-mint-500 uppercase tracking-widest">BOOKING_REF: {entry.bookingId.slice(0, 8)}</p>
                  </td>
                  <td class="px-10 py-8 text-right font-950 text-gray-400 text-xs">
                    {formatINR(entry.grossAmount)}
                  </td>
                  <td class="px-10 py-8 text-right font-950 text-rose-400 text-xs">
                    -{formatINR(entry.istayAmount)}
                  </td>
                  <td class="px-10 py-8 text-right font-950 text-gray-900 text-base tracking-tighter">
                    {formatINR(entry.hostAmount)}
                  </td>
                  <td class="px-10 py-8 text-center">
                    <span class={`px-4 py-2 rounded-xl border-[2px] border-gray-900 text-[9px] font-950 uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                      entry.status === 'settled' ? 'bg-emerald-500 text-white' : 'bg-amber-400 text-gray-900'
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
        <div class="px-10 py-10 border-t-[4px] border-gray-900 bg-gray-50 flex items-center justify-between">
          <p class="text-[10px] font-950 text-gray-400 uppercase tracking-widest">
            PAGE {currentPage} OF {totalPages}
          </p>
          <div class="flex gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(c => c - 1)}
              class="px-6 py-3 bg-white border-[3px] border-gray-900 rounded-xl text-[10px] font-950 uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-30 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
            >
              PREV_SEGMENT
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(c => c + 1)}
              class="px-6 py-3 bg-gray-900 text-white border-[3px] border-gray-900 rounded-xl text-[10px] font-950 uppercase tracking-widest shadow-[4px_4px_0px_0px_#4ade80] disabled:opacity-30 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
            >
              NEXT_SEGMENT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
