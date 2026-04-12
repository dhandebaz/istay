import { useMemo } from "preact/hooks";

interface EarningsComparisonProps {
  monthlyEarnings: number; // Host's 95% share
}

export default function EarningsComparison({ monthlyEarnings }: EarningsComparisonProps) {
  const calculations = useMemo(() => {
    const gross = monthlyEarnings / 0.95;
    const otaFeePct = 0.15; // 15% typical for Airbnb/Booking/MMT
    const otaEarnings = gross * (1 - otaFeePct);
    const savings = monthlyEarnings - otaEarnings;
    const otaFeeAmount = gross * otaFeePct;
    const istayFeeAmount = gross * 0.05;

    return { gross, otaEarnings, savings, otaFeeAmount, istayFeeAmount };
  }, [monthlyEarnings]);

  if (monthlyEarnings <= 0) return null;

  return (
    <div class="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden p-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="flex-1 space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-800 uppercase tracking-wider">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Profit Optimizer
          </div>
          <h2 class="text-2xl font-800 text-gray-900 tracking-tight leading-tight">
            You saved <span class="text-emerald-500">₹{calculations.savings.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span> this month
          </h2>
          <p class="text-sm text-gray-500 max-w-sm">
            By booking directly through istay instead of high-commission OTAs (15% avg), you kept more of your hard-earned revenue.
          </p>
        </div>

        <div class="w-full md:w-auto flex flex-col gap-3 min-w-[300px]">
          {/* istay Bar */}
          <div class="space-y-1.5">
            <div class="flex justify-between text-xs font-700 text-gray-400 uppercase tracking-widest">
              <span>Earnings via istay</span>
              <span class="text-teal-600">₹{monthlyEarnings.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
            </div>
            <div class="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
               <div class="h-full bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full" style={{ width: '95%' }}></div>
            </div>
          </div>

          {/* OTA Bar */}
          <div class="space-y-1.5 opacity-60">
            <div class="flex justify-between text-xs font-700 text-gray-400 uppercase tracking-widest">
              <span>If on Airbnb/MMT</span>
              <span class="text-rose-500">₹{calculations.otaEarnings.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
            </div>
            <div class="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
               <div class="h-full bg-rose-400 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          
          <div class="mt-4 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-center">
            <p class="text-xs font-600 text-emerald-700">
              Savings automatically reinvested in your growth. 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
