// ================================================================
// islands/OtaSavingsChart.tsx — Accumulated Savings Chart
//
// Pure CSS bar chart rendered as a Preact island.
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
  // Find the max value for scaling bars
  const maxVal = Math.max(
    ...data.map((d) => Math.max(d.savings, 1)),
    1,
  );

  return (
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-8">
      {/* Header */}
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="text-base font-700 text-gray-900">OTA Savings History</h3>
          <p class="text-xs text-gray-400 mt-0.5">
            Retained commissions vs Airbnb, Agoda, and MMT distributions
          </p>
        </div>

        {/* Summary pills */}
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-1.5 px-3 py-1.5 bg-mint-50 rounded-lg">
            <span class="w-2.5 h-2.5 rounded-full bg-mint-500 animate-pulse" />
            <span class="text-xs font-800 text-mint-700">
              ₹{totalSavings.toLocaleString("en-IN")} Total Saved
            </span>
          </div>
        </div>
      </div>

      {/* Chart Grid */}
      <div class="relative">
        <div class="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} class="border-b border-gray-50 w-full h-0" />
          ))}
        </div>

        {/* Bars */}
        <div class="relative flex items-end justify-between gap-4 sm:gap-6 h-44">
          {data.map((month) => {
            const barHeight = maxVal > 0 ? (month.savings / maxVal) * 100 : 0;

            return (
              <div
                key={month.month}
                class="flex-1 flex flex-col items-center gap-1 group"
              >
                {/* Bar Cluster */}
                <div class="flex items-end gap-1 w-full justify-center h-36">
                  {/* Savings bar */}
                  <div
                    class="w-4 sm:w-6 rounded-t-md transition-all duration-500 ease-out relative group-hover:opacity-90"
                    style={{
                      height: `${Math.max(barHeight, 3)}%`,
                      background:
                        "linear-gradient(180deg, #0d9488 0%, #0f766e 100%)",
                      boxShadow: barHeight > 0
                        ? "0 2px 8px rgba(13, 148, 136, 0.25)"
                        : "none",
                    }}
                    title={`₹${month.savings.toLocaleString("en-IN")} saved`}
                  >
                    <div class="absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover:block z-10">
                      <span class="px-2 py-1 rounded-md bg-gray-900 text-white text-[10px] font-700 whitespace-nowrap shadow-xl">
                        ₹{(month.savings / 1000).toFixed(1)}k
                      </span>
                    </div>
                  </div>
                </div>

                {/* label */}
                <div class="text-center mt-2">
                  <p class="text-[10px] font-700 text-gray-500 leading-none">
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
