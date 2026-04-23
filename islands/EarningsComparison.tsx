import { useMemo } from "preact/hooks";

interface EarningsComparisonProps {
  monthlyEarnings: number; // Host's 95% share
}

export default function EarningsComparison(
  { monthlyEarnings }: EarningsComparisonProps,
) {
  const calculations = useMemo(() => {
    const gross = monthlyEarnings / 0.95;
    const otaFeePct = 0.15;
    const otaEarnings = gross * (1 - otaFeePct);
    const savings = monthlyEarnings - otaEarnings;

    return { gross, otaEarnings, savings };
  }, [monthlyEarnings]);

  if (monthlyEarnings <= 0) return null;

  return (
    <div class="bg-white rounded-[3rem] border-[4px] border-gray-900 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-12 sm:p-16 overflow-hidden relative group">
      {/* Decorative pulse */}
      <div class="absolute -top-10 -right-10 w-40 h-40 bg-mint-400/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
      
      <div class="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
        <div class="flex-1 space-y-8 text-center lg:text-left">
          <div>
            <div class="flex items-center justify-center lg:justify-start gap-4 mb-6">
              <span class="px-4 py-1.5 rounded-xl bg-gray-900 text-mint-400 text-[10px] font-950 uppercase tracking-[0.3em] border-[2px] border-gray-900 shadow-[4px_4px_0px_0px_#4ade80]">REVENUE_OPTIMIZER</span>
              <div class="h-[2px] w-12 bg-gray-100 hidden lg:block" />
            </div>
            <h2 class="text-5xl sm:text-7xl font-950 text-gray-900 tracking-tighter leading-[0.85] uppercase">
              YOU_RETAINED <br/>
              <span class="text-emerald-500">
                ₹{calculations.savings.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}_SURPLUS.
              </span>
            </h2>
          </div>
          <p class="text-xs sm:text-sm text-gray-400 font-800 uppercase tracking-widest leading-loose max-w-md">
            BY BYPASSING LEGACY OTA COMMISSIONS, YOU HAVE SECURED ELITE REVENUE RETENTION. THIS CAPITAL IS NOW RE-ALLOCATED TO YOUR ASSET GROWTH.
          </p>
        </div>

        <div class="w-full lg:w-[450px] space-y-10">
          {/* istay Bar */}
          <div class="space-y-4">
            <div class="flex justify-between items-end">
              <span class="text-[10px] font-950 text-gray-900 uppercase tracking-widest">ISTAY_REVENUE_CORE</span>
              <span class="text-3xl font-950 text-emerald-500 tracking-tighter">
                ₹{monthlyEarnings.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div class="h-10 w-full bg-white border-[4px] border-gray-900 rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-1">
              <div
                class="h-full bg-emerald-500 rounded-xl border-[2px] border-gray-900 transition-all duration-[1500ms] animate-grow"
                style={{ width: "95%" }}
              />
            </div>
          </div>

          {/* OTA Bar */}
          <div class="space-y-4 opacity-40 group-hover:opacity-60 transition-opacity">
            <div class="flex justify-between items-end">
              <span class="text-[10px] font-950 text-gray-400 uppercase tracking-widest">LEGACY_OTA_WINDOW</span>
              <span class="text-2xl font-950 text-gray-400 tracking-tighter">
                ₹{calculations.otaEarnings.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div class="h-10 w-full bg-gray-50 border-[4px] border-gray-300 rounded-2xl overflow-hidden p-1">
              <div
                class="h-full bg-gray-300 rounded-xl transition-all duration-[1500ms] animate-grow"
                style={{ width: "80%" }}
              />
            </div>
          </div>

          <div class="p-8 rounded-[2rem] bg-gray-900 border-[4px] border-gray-900 text-center shadow-[12px_12px_0px_0px_#4ade80] animate-bounce-slow">
            <p class="text-[10px] font-950 text-mint-400 uppercase tracking-[0.3em]">
              COMMISSION_LEAKAGE_STABILIZED 🛡️
            </p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes grow { from { width: 0%; } }
        .animate-grow { animation: grow 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
      ` }} />
    </div>
  );
}
