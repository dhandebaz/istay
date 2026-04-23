// ================================================================
// islands/LinkPerformanceChart.tsx — 7-Day Views vs Bookings Chart
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
  const maxVal = Math.max(
    ...data.map((d) => Math.max(d.views, d.bookings)),
    1, 
  );

  const conversionRate = totalViews > 0
    ? ((totalBookings / totalViews) * 100).toFixed(1)
    : "0.0";

  const formatDay = (iso: string) => {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-IN", { weekday: "short" }).toUpperCase();
  };

  const formatDateShort = (iso: string) => {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }).toUpperCase();
  };

  return (
    <div class="bg-white rounded-[2.5rem] border-[4px] border-gray-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-10 h-full flex flex-col group transition-all">
      {/* Header */}
      <div class="flex items-center justify-between mb-12">
        <div>
           <div class="flex items-center gap-3 mb-2">
             <div class="px-3 py-0.5 bg-gray-900 text-mint-400 text-[8px] font-950 uppercase tracking-[0.2em] rounded border-2 border-gray-900 shadow-[2px_2px_0px_0px_#4ade80]">TRAFFIC_ANALYSIS</div>
           </div>
           <h3 class="text-2xl font-950 text-gray-900 uppercase tracking-tighter">Signal_Performance</h3>
        </div>

        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded bg-mint-500 border-2 border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
            <span class="text-[9px] font-950 text-gray-400 uppercase tracking-widest">{totalViews}_VIEWS</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded bg-purple-500 border-2 border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
            <span class="text-[9px] font-950 text-gray-400 uppercase tracking-widest">{totalBookings}_CONV</span>
          </div>
        </div>
      </div>

      {/* Chart Grid */}
      <div class="relative flex-1 min-h-[220px] flex flex-col justify-end">
        <div class="absolute inset-0 flex flex-col justify-between pointer-events-none pb-14">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} class="border-b-[2px] border-gray-50 w-full h-0" />
          ))}
        </div>

        {/* Bars */}
        <div class="relative flex items-end justify-between gap-4 h-48 pb-10">
          {data.map((day) => {
            const viewsHeight = maxVal > 0 ? (day.views / maxVal) * 100 : 0;
            const bookingsHeight = maxVal > 0 ? (day.bookings / maxVal) * 100 : 0;

            return (
              <div key={day.date} class="flex-1 flex flex-col items-center gap-4 group/bar">
                <div class="flex items-end gap-1.5 w-full justify-center h-full">
                  <div
                    class="w-4 sm:w-6 rounded-t-lg bg-mint-400 border-[2px] border-gray-900 shadow-[4px_0px_0px_0px_rgba(0,0,0,1)] transition-all duration-700 animate-grow"
                    style={{ height: `${Math.max(viewsHeight, 5)}%` }}
                  >
                    <div class="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover/bar:block z-10">
                      <span class="px-2 py-1 rounded bg-gray-900 text-white text-[8px] font-950 uppercase tracking-widest shadow-[3px_3px_0px_0px_#4ade80]">{day.views}</span>
                    </div>
                  </div>
                  <div
                    class="w-4 sm:w-6 rounded-t-lg bg-purple-400 border-[2px] border-gray-900 shadow-[4px_0px_0px_0px_rgba(0,0,0,1)] transition-all duration-700 animate-grow-delay"
                    style={{ height: `${Math.max(bookingsHeight, 5)}%` }}
                  >
                    <div class="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover/bar:block z-10">
                      <span class="px-2 py-1 rounded bg-gray-900 text-white text-[8px] font-950 uppercase tracking-widest shadow-[3px_3px_0px_0px_#a855f7]">{day.bookings}</span>
                    </div>
                  </div>
                </div>

                <div class="text-center">
                  <p class="text-[9px] font-950 text-gray-400 uppercase tracking-widest group-hover/bar:text-gray-900 transition-colors">{formatDay(day.date)}</p>
                  <p class="text-[7px] text-gray-300 font-950 uppercase mt-1">{formatDateShort(day.date)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div class="mt-8 pt-8 border-t-[3px] border-gray-50 flex items-center justify-between">
         <div class="flex items-center gap-5">
           <div class="w-12 h-12 rounded-2xl bg-gray-900 border-[2px] border-gray-900 flex items-center justify-center shadow-[4px_4px_0px_0px_#4ade80]">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="3">
               <path d="M22 11L12 21L2 11" stroke-linecap="round" stroke-linejoin="round"/>
               <path d="M12 21V3" stroke-linecap="round" stroke-linejoin="round"/>
             </svg>
           </div>
           <div>
             <p class="text-lg font-950 text-gray-900 tracking-tighter leading-none">{conversionRate}%_CONVERSION</p>
             <p class="text-[9px] font-950 text-gray-400 uppercase tracking-widest mt-2">TRAFFIC_TO_RESERVATION_FLOW</p>
           </div>
         </div>
         <span class="text-[9px] font-950 text-gray-300 uppercase tracking-widest">REAL_TIME_SYNC</span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes grow { from { height: 0%; } }
        .animate-grow { animation: grow 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-grow-delay { animation: grow 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; }
      ` }} />
    </div>
  );
}
