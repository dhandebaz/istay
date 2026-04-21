import { useState } from "preact/hooks";

const SETUP_FEE = 1000;

interface Platform {
  name: string;
  commission: number;
  color: string;
  bg: string;
  border: string;
  badge?: string;
}

const PLATFORMS: Platform[] = [
  {
    name: "istay",
    commission: 0.05,
    color: "text-teal-700",
    bg: "bg-teal-50",
    border: "border-teal-300",
    badge: "Best",
  },
  {
    name: "Airbnb",
    commission: 0.15,
    color: "text-rose-700",
    bg: "bg-rose-50",
    border: "border-rose-200",
  },
  {
    name: "MakeMyTrip",
    commission: 0.18,
    color: "text-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
  {
    name: "Agoda",
    commission: 0.18,
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    name: "Expedia",
    commission: 0.18,
    color: "text-indigo-700",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
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

  const istaySavingsVsAirbnb = grossRevenue * (0.15 - 0.05); // 10% difference
  const istaySavingsVsMMT = grossRevenue * (0.18 - 0.05); // 13% difference

  return (
    <div
      id="earnings-calculator"
      class="bg-white rounded-3xl border border-gray-100 shadow-md p-6 sm:p-8 lg:p-10"
    >
      <div class="mb-8">
        <h3 class="text-xl sm:text-2xl font-800 text-gray-900 mb-1">
          Earnings Calculator
        </h3>
        <p class="text-sm text-gray-400">
          Drag the sliders to see how much you keep with each platform.
        </p>
      </div>

      {/* ── SLIDERS ─────────────────────────────────────── */}
      <div class="space-y-7 mb-10">
        {/* Nightly Rate */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <label
              for="slider-nightly-rate"
              class="text-sm font-600 text-gray-700"
            >
              Average Nightly Rate
            </label>
            <span class="text-base font-800 text-teal-600">
              {formatINR(nightlyRate)}
            </span>
          </div>
          <input
            id="slider-nightly-rate"
            type="range"
            min={500}
            max={25000}
            step={500}
            value={nightlyRate}
            onInput={(e) =>
              setNightlyRate(Number((e.target as HTMLInputElement).value))}
            aria-label="Average nightly rate in rupees"
          />
          <div class="flex justify-between text-xs text-gray-400 mt-1.5">
            <span>₹500</span>
            <span>₹25,000</span>
          </div>
        </div>

        {/* Booked Nights */}
        <div>
          <div class="flex items-center justify-between mb-3">
            <label
              for="slider-booked-nights"
              class="text-sm font-600 text-gray-700"
            >
              Booked Nights per Month
            </label>
            <span class="text-base font-800 text-teal-600">
              {bookedNights} nights
            </span>
          </div>
          <input
            id="slider-booked-nights"
            type="range"
            min={1}
            max={30}
            step={1}
            value={bookedNights}
            onInput={(e) =>
              setBookedNights(Number((e.target as HTMLInputElement).value))}
            aria-label="Booked nights per month"
          />
          <div class="flex justify-between text-xs text-gray-400 mt-1.5">
            <span>1 night</span>
            <span>30 nights</span>
          </div>
        </div>
      </div>

      {/* ── GROSS REVENUE BADGE ─────────────────────────── */}
      <div class="flex items-center justify-between bg-gray-50 rounded-2xl px-5 py-4 mb-7">
        <span class="text-sm text-gray-500 font-500">
          Gross Monthly Revenue
        </span>
        <span class="text-2xl font-800 text-gray-900">
          {formatINR(grossRevenue)}
        </span>
      </div>

      {/* ── PLATFORM CARDS ──────────────────────────────── */}
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {results.map((
          { name, commission, fee, takehome, color, bg, border, badge },
        ) => (
          <div
            key={name}
            class={`relative rounded-2xl border-2 p-5 transition-transform hover:-translate-y-1 duration-200 ${bg} ${border}`}
          >
            {badge && (
              <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-mint-500 text-istay-900 text-xs font-900 shadow-sm">
                {badge}
              </div>
            )}
            <div
              class={`text-xs font-700 uppercase tracking-wider ${color} mb-3`}
            >
              {name}
            </div>

            <div class="mb-3">
              <div class="text-xs text-gray-400 mb-0.5">You keep</div>
              <div class={`text-2xl font-800 ${color}`}>
                {formatINR(takehome)}
              </div>
            </div>

            {/* Visual Bar */}
            <div class="w-full h-2 bg-gray-100 rounded-full mb-4 overflow-hidden flex">
              <div 
                class={`h-full ${name === 'istay' ? 'bg-mint-500' : 'bg-gray-300'}`} 
                style={{ width: `${(1 - commission) * 100}%` }}
              />
              <div 
                class={`h-full ${name === 'istay' ? 'bg-mint-200' : 'bg-rose-400'}`} 
                style={{ width: `${commission * 100}%` }}
              />
            </div>

            <div class="border-t border-current border-opacity-10 pt-3 space-y-1">
              <div class="flex justify-between text-xs text-gray-500">
                <span>Commission</span>
                <span class="font-600">{(commission * 100).toFixed(0)}%</span>
              </div>
              <div class="flex justify-between text-xs text-gray-500">
                <span>Platform fee</span>
                <span class="font-600 text-rose-500">
                  -{formatINR(fee)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── SAVINGS BANNER ──────────────────────────────── */}
      <div class="rounded-2xl bg-gradient-to-r from-mint-500 to-emerald-400 p-5 sm:p-6 text-istay-900 shadow-md">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p class="text-sm font-800 text-istay-900/80 mb-1">
              vs Airbnb (15%), you save every month:
            </p>
            <p class="text-3xl font-900 drop-shadow-sm">
              {formatINR(istaySavingsVsAirbnb)}
            </p>
          </div>
          <div class="sm:text-right">
            <p class="text-sm font-800 text-istay-900/80 mb-1">
              vs MakeMyTrip (18%):
            </p>
            <p class="text-3xl font-900 drop-shadow-sm">
              {formatINR(istaySavingsVsMMT)}
            </p>
          </div>
        </div>
        <p class="mt-4 text-xs text-istay-900/80 font-500">
          * Calculation based on gross revenue of{" "}
          {formatINR(grossRevenue)}/month. istay's flat ₹1,000 monthly SaaS subscription keeps your direct channel live.
        </p>
      </div>
    </div>
  );
}
