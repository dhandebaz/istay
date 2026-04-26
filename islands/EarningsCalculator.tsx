import { useState } from "preact/hooks";

const PLATFORMS = [
  {
    name: "iStay",
    commission: 0.05,
    color: "text-emerald-500",
    bg: "bg-gray-900",
    border: "border-gray-900",
    shadow: "shadow-premium-lg",
    labelColor: "text-white",
    subColor: "text-gray-400",
    badge: "Optimized Protocol",
  },
  {
    name: "Airbnb",
    commission: 0.15,
    color: "text-rose-500",
    bg: "bg-white",
    border: "border-gray-50",
    shadow: "shadow-premium",
    labelColor: "text-gray-900",
    subColor: "text-gray-400",
  },
  {
    name: "Booking.com",
    commission: 0.20,
    color: "text-blue-500",
    bg: "bg-white",
    border: "border-gray-50",
    shadow: "shadow-premium",
    labelColor: "text-gray-900",
    subColor: "text-gray-400",
  },
];

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function EarningsCalculator() {
  const [nightlyRate, setNightlyRate] = useState(3000);
  const [bookedNights, setBookedNights] = useState(15);

  const grossRevenue = nightlyRate * bookedNights;

  const results = PLATFORMS.map((p) => ({
    ...p,
    fee: grossRevenue * p.commission,
    takehome: grossRevenue * (1 - p.commission),
  }));

  return (
    <div class="bg-white rounded-[4rem] border border-gray-50 shadow-premium-xl p-12 sm:p-24 overflow-hidden relative group animate-fade-in">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.03)_0%,transparent_50%)]" />
      
      <div class="mb-24 relative z-10">
        <div class="flex items-center gap-6 mb-8">
           <span class="px-6 py-2.5 rounded-2xl bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-[0.4em] border border-emerald-100 shadow-sm">Optimization Engine</span>
           <div class="h-px flex-1 bg-gray-50" />
        </div>
        <h3 class="text-6xl sm:text-8xl font-bold text-gray-900 leading-[0.85] tracking-tighter">
          Visualizing <br/> <span class="text-emerald-500 italic font-medium font-serif">Yield Erosion.</span>
        </h3>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-24 relative z-10">
        <div class="space-y-24">
          <div class="space-y-10">
            <div class="flex items-end justify-between">
              <div>
                <label class="text-[11px] font-bold text-gray-300 uppercase tracking-[0.4em] block mb-4 italic">Nightly Residency Rate</label>
                <span class="text-6xl font-bold text-gray-900 tracking-tighter transition-all">{formatINR(nightlyRate)}</span>
              </div>
            </div>
            <div class="relative h-2.5 w-full bg-gray-50 rounded-full overflow-visible">
              <input
                type="range"
                min={500}
                max={25000}
                step={500}
                value={nightlyRate}
                onInput={(e) => setNightlyRate(Number((e.target as HTMLInputElement).value))}
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              <div class="absolute top-0 left-0 h-full bg-emerald-500 rounded-full transition-all duration-300" style={{ width: `${(nightlyRate / 25000) * 100}%` }}>
                 <div class="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-emerald-500 rounded-full shadow-premium scale-110" />
              </div>
            </div>
          </div>

          <div class="space-y-10">
            <div class="flex items-end justify-between">
              <div>
                <label class="text-[11px] font-bold text-gray-300 uppercase tracking-[0.4em] block mb-4 italic">Monthly Scaling</label>
                <span class="text-6xl font-bold text-gray-900 tracking-tighter transition-all">{bookedNights} <span class="text-xl font-bold text-gray-300 uppercase tracking-widest ml-3">Days</span></span>
              </div>
            </div>
            <div class="relative h-2.5 w-full bg-gray-50 rounded-full overflow-visible">
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={bookedNights}
                onInput={(e) => setBookedNights(Number((e.target as HTMLInputElement).value))}
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              <div class="absolute top-0 left-0 h-full bg-emerald-900 rounded-full transition-all duration-300" style={{ width: `${(bookedNights / 30) * 100}%` }}>
                 <div class="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-emerald-900 rounded-full shadow-premium scale-110" />
              </div>
            </div>
          </div>
        </div>

        <div class="p-16 bg-gray-900 rounded-[4rem] flex flex-col justify-center text-center sm:text-left shadow-premium-xl relative overflow-hidden group/gross transition-transform duration-700 hover:scale-[1.02]">
           <div class="absolute -right-12 -top-12 text-[15rem] opacity-5 transition-transform duration-1000 group-hover/gross:scale-110 group-hover/gross:rotate-12 select-none">💰</div>
           <p class="text-[11px] font-bold text-emerald-400 uppercase tracking-[0.5em] mb-8 relative z-10">Gross Monthly Revenue</p>
           <p class="text-7xl sm:text-[6.5rem] font-bold text-white tracking-tighter leading-none relative z-10">{formatINR(grossRevenue)}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
        {results.map((p) => (
          <div key={p.name} class={`p-12 rounded-[3.5rem] border transition-all duration-700 hover:-translate-y-3 ${p.border} ${p.bg} ${p.shadow} flex flex-col`}>
            {p.badge && (
               <div class="self-start px-4 py-1.5 bg-emerald-50 text-[9px] font-bold text-emerald-600 uppercase tracking-[0.3em] rounded-xl mb-10 border border-emerald-100">
                 {p.badge}
               </div>
            )}
            <p class={`text-[11px] font-bold uppercase tracking-[0.4em] mb-4 ${p.subColor} ${!p.badge ? 'mt-4' : ''}`}>{p.name}</p>
            <p class={`text-5xl font-bold tracking-tighter mb-12 ${p.labelColor}`}>
              {formatINR(p.takehome)}
            </p>
            
            <div class="mt-auto pt-8 border-t border-gray-100/10 flex items-center justify-between">
               <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest opacity-60">Overhead</p>
               <p class={`text-[13px] font-bold ${p.color}`}>-{formatINR(p.fee)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

