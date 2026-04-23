// ================================================================
// islands/OtaSavingsChart.tsx — Accumulated Savings Chart
// ================================================================

export interface SavingsData {
  month: string;
  savings: number;
}

interface OtaSavingsChartProps {
  data: SavingsData[];
  totalSavings: number;
}

export default function OtaSavingsChart({
  data,
  totalSavings,
}: OtaSavingsChartProps) {
  const maxVal = Math.max(
    ...data.map((d) => Math.max(d.savings, 1)),
    1,
  );

  return (
    <div class="bg-white rounded-[2.5rem] border-[4px] border-gray-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-10 overflow-hidden group h-full flex flex-col">
      {/* Header */}
      <div class="flex items-center justify-between mb-12">
        <div>
           <div class="flex items-center gap-3 mb-2">
             <div class="px-3 py-0.5 bg-gray-900 text-mint-400 text-[8px] font-950 uppercase tracking-[0.2em] rounded border-2 border-gray-900 shadow-[2px_2px_0px_0px_#4ade80]">SAVINGS_CORE</div>
           </div>
           <h3 class="text-2xl font-950 text-gray-900 uppercase tracking-tighter">Retained_Capital</h3>
        </div>

        <div class="flex items-center gap-3">
          <div class="flex items-center gap-3 px-5 py-2.5 bg-mint-50 border-[2px] border-gray-900 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-all">
            <span class="w-3 h-3 rounded-full bg-mint-500 animate-pulse" />
            <span class="text-[10px] font-950 text-gray-900 uppercase tracking-widest">
              ₹{totalSavings.toLocaleString("en-IN")}_SAVED
            </span>
          </div>
        </div>
      </div>

      {/* Chart Grid */}
      <div class="relative flex-1 min-h-[200px] flex flex-col justify-end">
        <div class="absolute inset-0 flex flex-col justify-between pointer-events-none pb-12">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} class="border-b-[2px] border-gray-50 w-full h-0" />
          ))}
        </div>

        {/* Bars */}
        <div class="relative flex items-end justify-between gap-6 sm:gap-10 h-48 pb-10">
          {data.map((month) => {
            const barHeight = maxVal > 0 ? (month.savings / maxVal) * 100 : 0;

            return (
              <div
                key={month.month}
                class="flex-1 flex flex-col items-center gap-4 group/bar"
              >
                {/* Bar Cluster */}
                <div class="flex items-end gap-1 w-full justify-center h-full">
                  {/* Savings bar */}
                  <div
                    class="w-full sm:w-10 rounded-t-xl transition-all duration-700 ease-out relative bg-mint-400 border-x-[3px] border-t-[3px] border-gray-900 shadow-[6px_0px_0px_0px_rgba(0,0,0,1)] group-hover/bar:bg-emerald-500 group-hover/bar:shadow-[10px_0px_0px_0px_rgba(0,0,0,1)]"
                    style={{
                      height: `${Math.max(barHeight, 5)}%`,
                    }}
                  >
                    <div class="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover/bar:block z-10">
                      <span class="px-3 py-1.5 rounded-lg bg-gray-900 text-white text-[9px] font-950 uppercase tracking-widest shadow-[4px_4px_0px_0px_#4ade80]">
                        ₹{(month.savings / 1000).toFixed(1)}K
                      </span>
                    </div>
                  </div>
                </div>

                {/* label */}
                <div class="text-center">
                  <p class="text-[10px] font-950 text-gray-400 uppercase tracking-[0.2em] group-hover/bar:text-gray-900 transition-colors">
                    {month.month}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
