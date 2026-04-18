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
    <div class="relative bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden h-[340px] flex flex-col">
      {/* Header bar simulating browser */}
      <div class="bg-gray-50 border-b border-gray-100 flex items-center px-4 py-3 gap-2">
        <div class="flex gap-1.5">
          <div class="w-3 h-3 rounded-full bg-rose-400" />
          <div class="w-3 h-3 rounded-full bg-amber-400" />
          <div class="w-3 h-3 rounded-full bg-emerald-400" />
        </div>
        <div class="ml-4 flex-1 h-7 bg-white rounded-md border border-gray-200 flex items-center px-3 shadow-inner">
          <span
            class={`text-[10px] sm:text-xs text-gray-500 font-mono overflow-hidden whitespace-nowrap transition-opacity duration-300 ${
              step >= 1 ? "opacity-100" : "opacity-0"
            }`}
          >
            https://airbnb.com/h/beautiful-villa-stay
          </span>
        </div>
      </div>

      <div class="flex-1 relative flex flex-col items-center justify-center p-6 bg-white overflow-hidden">
        {/* Step 0: Idle/Waiting */}
        <div
          class={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-out ${
            step === 0
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div class="w-16 h-16 rounded-2xl bg-mint-50 text-mint-600 flex items-center justify-center mb-4 border border-mint-100 shadow-sm">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71">
              </path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71">
              </path>
            </svg>
          </div>
          <p class="text-base font-800 text-gray-900">Paste your link</p>
          <p class="text-sm font-500 text-gray-400 mt-1">
            We'll handle the rest...
          </p>
        </div>

        {/* Step 1: Scanning */}
        <div
          class={`absolute inset-0 p-6 flex flex-col justify-center transition-all duration-500 ease-out ${
            step === 1
              ? "opacity-100 translate-x-0"
              : step < 1
              ? "opacity-0 translate-x-8"
              : "opacity-0 -translate-x-8"
          }`}
        >
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-800">
              A
            </div>
            <div class="h-3 w-24 bg-gray-200 rounded-full" />
          </div>
          <div class="h-32 bg-gray-50 border border-gray-100 rounded-xl mb-4 relative overflow-hidden flex items-center justify-center p-2">
            <div class="grid grid-cols-2 gap-2 w-full h-full">
              <div class="bg-gray-200 rounded-lg h-full" />
              <div class="flex flex-col gap-2">
                <div class="bg-gray-200 rounded-lg h-1/2" />
                <div class="bg-gray-200 rounded-lg h-1/2" />
              </div>
            </div>
            {/* Pulsing indicator */}
            <div class="absolute inset-0 bg-mint-500 opacity-10 animate-pulse pointer-events-none" />
          </div>
          <p class="text-xs font-700 text-mint-600 animate-pulse text-center">
            Extracting photos & amenities...
          </p>
        </div>

        {/* Step 2: Building */}
        <div
          class={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-out ${
            step === 2
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div class="relative w-20 h-20 mb-8">
            <div class="absolute inset-0 rounded-full border-4 border-gray-100/20" />
            <div class="absolute inset-0 rounded-full border-4 border-t-teal-400 border-r-teal-500 border-b-transparent border-l-transparent animate-spin" />
            <div class="absolute inset-0 flex items-center justify-center text-2xl animate-pulse">
              🪄
            </div>
          </div>
          <p class="text-base font-800 text-gray-900 tracking-tight">
            AI Mapping Vibe...
          </p>
          <div class="flex flex-col items-center gap-2 mt-4">
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
              <p class="text-[11px] font-700 uppercase tracking-widest text-teal-600">
                Drafting Knowledge Base
              </p>
            </div>
            <p class="text-[10px] font-500 text-gray-400">
              Time to value: ~2s remaining
            </p>
          </div>
        </div>

        {/* Step 3: Success */}
        <div
          class={`absolute inset-0 p-6 flex flex-col justify-center transition-all duration-500 ease-out ${
            step === 3
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <div class="bg-gradient-to-br from-istay-900 to-istay-800 rounded-2xl p-5 text-white flex flex-col shadow-xl border border-istay-700/50 h-full">
            <div class="flex justify-between items-center mb-6">
              <span class="text-xs font-900 tracking-wider flex items-center gap-1.5">
                <img
                  src="/logo.svg"
                  alt="istay"
                  class="h-4 brightness-0 invert"
                />
              </span>
              <span class="py-1 px-3 rounded-full bg-mint-500 text-istay-900 text-[10px] font-900 uppercase tracking-widest shadow-sm">
                Live
              </span>
            </div>

            <div class="h-20 bg-white/10 rounded-xl mb-4 relative overflow-hidden flex-shrink-0">
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div class="absolute bottom-2 left-2 right-2">
                <div class="h-2 w-32 bg-white/80 rounded-full mb-1.5" />
                <div class="h-1.5 w-16 bg-white/50 rounded-full" />
              </div>
            </div>

            <button
              type="button"
              class="w-full py-2 bg-mint-500 text-istay-900 font-900 rounded-xl text-xs shadow-md flex items-center justify-center gap-2 mt-auto hover:bg-white transition-colors"
            >
              Share Booking Link
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6">
                </path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
