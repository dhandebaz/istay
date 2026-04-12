// ================================================================
// islands/LinkPerformanceChart.tsx — 7-Day Views vs Bookings Chart
//
// Pure CSS bar chart rendered as a Preact island.
// Uses the Electric Mint (#00E676) accent for views bars and
// purple for bookings bars. Zero external dependencies.
// ================================================================

interface DayData {
  date: string;
  views: number;
  bookings: number;
}

interface LinkPerformanceChartProps {
  data: DayData[];
  totalViews: number;
  totalBookings: number;
}

export default function LinkPerformanceChart({
  data,
  totalViews,
  totalBookings,
}: LinkPerformanceChartProps) {
  // Find the max value for scaling bars
  const maxVal = Math.max(
    ...data.map((d) => Math.max(d.views, d.bookings)),
    1, // prevent division by zero
  );

  const conversionRate =
    totalViews > 0 ? ((totalBookings / totalViews) * 100).toFixed(1) : "0.0";

  // Format date to short day name
  const formatDay = (iso: string) => {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-IN", { weekday: "short" });
  };

  const formatDateShort = (iso: string) => {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };

  return (
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      {/* Header */}
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="text-base font-700 text-gray-900">Link Performance</h3>
          <p class="text-xs text-gray-400 mt-0.5">Views vs Bookings — Last 7 days</p>
        </div>

        {/* Summary pills */}
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-mint-500" />
            <span class="text-xs font-600 text-gray-600">
              {totalViews} views
            </span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span class="text-xs font-600 text-gray-600">
              {totalBookings} bookings
            </span>
          </div>
        </div>
      </div>

      {/* Chart Grid */}
      <div class="relative">
        {/* Horizontal grid lines */}
        <div class="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} class="border-b border-gray-50 w-full h-0" />
          ))}
        </div>

        {/* Bars */}
        <div class="relative flex items-end justify-between gap-2 sm:gap-4 h-44">
          {data.map((day) => {
            const viewsHeight =
              maxVal > 0 ? (day.views / maxVal) * 100 : 0;
            const bookingsHeight =
              maxVal > 0 ? (day.bookings / maxVal) * 100 : 0;

            return (
              <div
                key={day.date}
                class="flex-1 flex flex-col items-center gap-1 group"
              >
                {/* Bar Cluster */}
                <div class="flex items-end gap-1 w-full justify-center h-36">
                  {/* Views bar */}
                  <div
                    class="w-3 sm:w-4 rounded-t-md transition-all duration-500 ease-out relative group-hover:opacity-90"
                    style={{
                      height: `${Math.max(viewsHeight, 3)}%`,
                      background:
                        "linear-gradient(180deg, #00E676 0%, #00b35c 100%)",
                      boxShadow: viewsHeight > 0
                        ? "0 2px 8px rgba(0, 230, 118, 0.25)"
                        : "none",
                    }}
                    title={`${day.views} views`}
                  >
                    {/* Hover tooltip */}
                    <div class="absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover:block">
                      <span class="px-1.5 py-0.5 rounded bg-gray-800 text-white text-[9px] font-700 whitespace-nowrap shadow-lg">
                        {day.views}
                      </span>
                    </div>
                  </div>

                  {/* Bookings bar */}
                  <div
                    class="w-3 sm:w-4 rounded-t-md transition-all duration-500 ease-out relative group-hover:opacity-90"
                    style={{
                      height: `${Math.max(bookingsHeight, 3)}%`,
                      background:
                        "linear-gradient(180deg, #a855f7 0%, #7c3aed 100%)",
                      boxShadow: bookingsHeight > 0
                        ? "0 2px 8px rgba(168, 85, 247, 0.25)"
                        : "none",
                    }}
                    title={`${day.bookings} bookings`}
                  >
                    <div class="absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover:block">
                      <span class="px-1.5 py-0.5 rounded bg-gray-800 text-white text-[9px] font-700 whitespace-nowrap shadow-lg">
                        {day.bookings}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Day label */}
                <div class="text-center mt-1">
                  <p class="text-[10px] font-700 text-gray-500 leading-none">
                    {formatDay(day.date)}
                  </p>
                  <p class="text-[8px] text-gray-300 mt-0.5">
                    {formatDateShort(day.date)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Conversion Rate Footer */}
      <div class="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-mint-50 to-emerald-50 flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 11L6 7L9 10L14 4"
                stroke="#00E676"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10 4H14V8"
                stroke="#00E676"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div>
            <p class="text-xs font-700 text-gray-900">
              {conversionRate}% Conversion
            </p>
            <p class="text-[10px] text-gray-400">Views → Bookings</p>
          </div>
        </div>
        <span class="text-[10px] text-gray-300 font-500">Updated live</span>
      </div>
    </div>
  );
}
