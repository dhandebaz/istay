import { useState } from "preact/hooks";

const PLATFORMS = [
  {
    name: "istay",
    commission: 0.05,
    color: "text-mint-500",
    bg: "bg-gray-900",
    border: "border-gray-900",
    shadow: "shadow-[12px_12px_0px_0px_#4ade80]",
    labelColor: "text-white",
    subColor: "text-gray-400",
    badge: "WINNER_CORE",
  },
  {
    name: "Airbnb",
    commission: 0.15,
    color: "text-rose-600",
    bg: "bg-white",
    border: "border-gray-900",
    shadow: "shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]",
    labelColor: "text-gray-900",
    subColor: "text-gray-400",
  },
  {
    name: "Booking.com",
    commission: 0.20,
    color: "text-blue-600",
    bg: "bg-white",
    border: "border-gray-900",
    shadow: "shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]",
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
    <div class="bg-white rounded-[3rem] border-[4px] border-gray-900 shadow-[24px_24px_0px_0px_rgba(0,0,0,1)] p-10 sm:p-20 overflow-hidden relative group">
      <div class="mb-24">
        <div class="flex items-center gap-4 mb-6">
           <span class="px-5 py-2 rounded-xl bg-gray-900 text-mint-400 text-[10px] font-950 uppercase tracking-[0.3em] border-[2px] border-gray-900 shadow-[4px_4px_0px_0px_#4ade80]">REVENUE_SIMULATOR_V4</span>
           <div class="h-[2px] flex-1 bg-gray-100" />
        </div>
        <h3 class="text-6xl sm:text-8xl font-950 text-gray-900 leading-[0.85] uppercase tracking-tighter">
          Visualizing <br/> <span class="text-mint-500">Margin_Leak.</span>
        </h3>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
        <div class="space-y-20">
          <div class="space-y-8">
            <div class="flex items-end justify-between">
              <div>
                <label class="text-[10px] font-950 text-gray-400 uppercase tracking-widest block mb-2">NIGHTLY_UNIT_RATE</label>
                <span class="text-5xl font-950 text-gray-900 tracking-tighter">{formatINR(nightlyRate)}</span>
              </div>
            </div>
            <div class="relative h-4 w-full bg-gray-100 border-[3px] border-gray-900 rounded-full overflow-hidden">
              <input
                type="range"
                min={500}
                max={25000}
                step={500}
                value={nightlyRate}
                onInput={(e) => setNightlyRate(Number((e.target as HTMLInputElement).value))}
                class="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
              />
              <div class="h-full bg-mint-400 border-r-[3px] border-gray-900 transition-all duration-300" style={{ width: `${(nightlyRate / 25000) * 100}%` }} />
            </div>
          </div>

          <div class="space-y-8">
            <div class="flex items-end justify-between">
              <div>
                <label class="text-[10px] font-950 text-gray-400 uppercase tracking-widest block mb-2">MONTHLY_UNIT_VOLUME</label>
                <span class="text-5xl font-950 text-gray-900 tracking-tighter">{bookedNights} <span class="text-base font-950 text-gray-300">NIGHTS_SOLO</span></span>
              </div>
            </div>
            <div class="relative h-4 w-full bg-gray-100 border-[3px] border-gray-900 rounded-full overflow-hidden">
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={bookedNights}
                onInput={(e) => setBookedNights(Number((e.target as HTMLInputElement).value))}
                class="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
              />
              <div class="h-full bg-purple-400 border-r-[3px] border-gray-900 transition-all duration-300" style={{ width: `${(bookedNights / 30) * 100}%` }} />
            </div>
          </div>
        </div>

        <div class="p-12 bg-gray-900 rounded-[3rem] border-[4px] border-gray-900 flex flex-col justify-center text-center sm:text-left shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
           <div class="absolute -right-6 -top-6 text-9xl opacity-5">💰</div>
           <p class="text-[10px] font-950 text-mint-400 uppercase tracking-[0.3em] mb-6">GROSS_MONTHLY_CAPITAL</p>
           <p class="text-7xl sm:text-8xl font-950 text-white tracking-tighter leading-none">{formatINR(grossRevenue)}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {results.map((p) => (
          <div key={p.name} class={`p-10 rounded-[2.5rem] border-[4px] transition-all hover:scale-[1.02] ${p.border} ${p.bg} ${p.shadow}`}>
            {p.badge && (
               <div class="inline-block px-3 py-1 bg-white border-2 border-gray-900 rounded-lg text-[8px] font-950 text-gray-900 uppercase tracking-widest mb-6">
                 {p.badge}
               </div>
            )}
            <p class={`text-[10px] font-950 uppercase tracking-widest mb-2 ${p.subColor}`}>{p.name}</p>
            <p class={`text-4xl font-950 tracking-tighter mb-8 ${p.labelColor}`}>
              {formatINR(p.takehome)}
            </p>
            
            <div class="pt-6 border-t-[2px] border-gray-100/10 flex items-center justify-between">
               <p class="text-[9px] font-950 text-gray-400 uppercase tracking-widest">COMMISSION</p>
               <p class={`text-xs font-950 ${p.color}`}>-{formatINR(p.fee)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
