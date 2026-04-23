import { useEffect, useState } from "preact/hooks";

export default function MagicScraperAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div class="relative bg-white rounded-[2.5rem] border-[4px] border-gray-900 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] overflow-hidden h-[400px] flex flex-col">
      {/* Header bar simulating browser */}
      <div class="bg-gray-50 border-b-[4px] border-gray-900 flex items-center px-6 py-4 gap-4">
        <div class="flex gap-2">
          <div class="w-3 h-3 rounded-full bg-rose-500 border-[2px] border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
          <div class="w-3 h-3 rounded-full bg-amber-400 border-[2px] border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
          <div class="w-3 h-3 rounded-full bg-mint-500 border-[2px] border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
        </div>
        <div class="flex-1 h-9 bg-white rounded-xl border-[3px] border-gray-900 flex items-center px-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <span
            class={`text-[10px] text-gray-400 font-950 uppercase tracking-widest overflow-hidden whitespace-nowrap transition-opacity duration-300 ${
              step >= 1 ? "opacity-100" : "opacity-0"
            }`}
          >
            HTTPS://AIRBNB.COM/H/VILLA_PRIME
          </span>
        </div>
      </div>

      <div class="flex-1 relative flex flex-col items-center justify-center p-8 bg-white overflow-hidden">
        {/* Step 0: Idle/Waiting */}
        <div
          class={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-out ${
            step === 0
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10 pointer-events-none"
          }`}
        >
          <div class="w-24 h-24 rounded-3xl bg-mint-400 border-[4px] border-gray-900 flex items-center justify-center mb-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] rotate-[-6deg]">
             <span class="text-4xl">⚡</span>
          </div>
          <h4 class="text-2xl font-950 text-gray-900 uppercase tracking-tighter">Initialize_Asset</h4>
          <p class="text-[10px] font-950 text-gray-400 uppercase tracking-[0.3em] mt-2">
            Awaiting source link...
          </p>
        </div>

        {/* Step 1: Scanning */}
        <div
          class={`absolute inset-0 p-10 flex flex-col justify-center transition-all duration-500 ease-out ${
            step === 1
              ? "opacity-100 translate-x-0"
              : step < 1
              ? "opacity-0 translate-x-12"
              : "opacity-0 -translate-x-12"
          }`}
        >
          <div class="flex items-center gap-4 mb-6">
            <div class="w-10 h-10 rounded-2xl bg-rose-500 border-[3px] border-gray-900 text-white flex items-center justify-center text-xs font-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              OTA
            </div>
            <div class="h-4 w-32 bg-gray-100 border-[2px] border-gray-900 rounded-full" />
          </div>
          <div class="h-40 bg-gray-50 border-[4px] border-gray-900 rounded-[2rem] mb-6 relative overflow-hidden flex items-center justify-center p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div class="grid grid-cols-2 gap-3 w-full h-full">
              <div class="bg-gray-200 border-[2px] border-gray-900 rounded-xl h-full" />
              <div class="flex flex-col gap-3">
                <div class="bg-gray-200 border-[2px] border-gray-900 rounded-xl h-1/2" />
                <div class="bg-gray-200 border-[2px] border-gray-900 rounded-xl h-1/2" />
              </div>
            </div>
            {/* Scanning line */}
            <div class="absolute inset-0 bg-mint-500/20 animate-pulse pointer-events-none" />
            <div class="absolute top-0 left-0 w-full h-[4px] bg-mint-500 shadow-[0px_0px_20px_#4ade80] animate-scan" />
          </div>
          <p class="text-[10px] font-950 text-mint-600 animate-pulse text-center uppercase tracking-widest">
            EXTRACTING_ASSET_DNA...
          </p>
        </div>

        {/* Step 2: Building */}
        <div
          class={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-out ${
            step === 2
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90 pointer-events-none"
          }`}
        >
          <div class="relative w-28 h-28 mb-10">
            <div class="absolute inset-0 rounded-full border-[6px] border-gray-100" />
            <div class="absolute inset-0 rounded-full border-[6px] border-t-purple-500 border-r-purple-600 border-b-transparent border-l-transparent animate-spin" />
            <div class="absolute inset-0 flex items-center justify-center text-4xl animate-bounce">
              🪄
            </div>
          </div>
          <h4 class="text-2xl font-950 text-gray-900 uppercase tracking-tighter">AI_MAPPING_CORE</h4>
          <div class="flex flex-col items-center gap-4 mt-6">
            <div class="flex items-center gap-3">
              <span class="w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping" />
              <p class="text-[10px] font-950 uppercase tracking-[0.3em] text-purple-600">
                Drafting_Cognitive_Layer
              </p>
            </div>
            <p class="text-[9px] font-950 text-gray-400 uppercase tracking-widest">
              T-MINUS: ~2s_REMAINING
            </p>
          </div>
        </div>

        {/* Step 3: Success */}
        <div
          class={`absolute inset-0 p-8 flex flex-col justify-center transition-all duration-500 ease-out ${
            step === 3
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12 pointer-events-none"
          }`}
        >
          <div class="bg-gray-900 rounded-[2.5rem] p-8 text-white flex flex-col border-[4px] border-gray-900 shadow-[16px_16px_0px_0px_#4ade80] h-full relative overflow-hidden group">
            <div class="absolute -right-10 -top-10 text-9xl opacity-10 group-hover:scale-125 transition-transform duration-700">⚡</div>
            
            <div class="flex justify-between items-center mb-8 relative z-10">
              <span class="text-sm font-950 tracking-[0.2em] uppercase">
                ISTAY_OS
              </span>
              <span class="px-5 py-2 rounded-xl bg-mint-400 text-gray-900 text-[10px] font-950 uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                ASSET_LIVE
              </span>
            </div>

            <div class="h-28 bg-white/5 border-[3px] border-white/20 rounded-[1.5rem] mb-6 relative overflow-hidden flex-shrink-0 group-hover:border-mint-500/50 transition-colors">
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              <div class="absolute bottom-4 left-4 right-4">
                <div class="h-3 w-40 bg-white/80 rounded-full mb-3" />
                <div class="h-2 w-24 bg-white/30 rounded-full" />
              </div>
            </div>

            <div class="mt-auto space-y-4 relative z-10">
              <button
                type="button"
                class="w-full py-5 bg-mint-400 text-gray-900 text-[11px] font-950 uppercase tracking-[0.2em] rounded-2xl border-[3px] border-gray-900 shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center gap-3 transition-all hover:bg-white active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              >
                DEPLOY_RESERVATION_HUB
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
