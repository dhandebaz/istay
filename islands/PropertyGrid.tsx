import { useEffect, useState } from "preact/hooks";
import type { Property } from "../utils/types.ts";

interface PropertyGridProps {
  initialQuery: string;
  initialVibe: string;
  initialCheckIn: string;
  initialCheckOut: string;
}

type ExtendedProperty = Property & {
  isAvailable: boolean;
  matchReason?: string;
  dynamicPrice?: number;
  isSurge?: boolean;
  _vibeScore?: number;
  _vibeReason?: string;
};

export default function PropertyGrid({
  initialQuery,
  initialVibe,
  initialCheckIn,
  initialCheckOut,
}: PropertyGridProps) {
  const [properties, setProperties] = useState<ExtendedProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n || 0);

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          q: initialQuery,
          vibe: initialVibe,
          checkIn: initialCheckIn,
          checkOut: initialCheckOut,
        });
        const res = await fetch(`/api/public/search?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch properties");
        const data = await res.json();
        setProperties(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [initialQuery, initialVibe, initialCheckIn, initialCheckOut]);

  if (loading) {
    return (
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} class="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden animate-pulse">
            <div class="h-56 bg-gray-200" />
            <div class="p-6 space-y-4">
              <div class="h-6 bg-gray-200 rounded-lg w-3/4" />
              <div class="h-4 bg-gray-200 rounded-lg w-1/2" />
              <div class="flex gap-2">
                {[1, 2, 3].map((j) => <div key={j} class="h-6 w-16 bg-gray-200 rounded-full" />)}
              </div>
              <div class="pt-6 flex items-center justify-between">
                <div class="h-8 w-24 bg-gray-200 rounded-lg" />
                <div class="h-10 w-10 bg-gray-200 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div class="text-center py-20 bg-white rounded-[3rem] shadow-xl border border-gray-100">
        <p class="text-rose-500 font-700">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          class="mt-4 px-6 py-2 bg-gray-900 text-white rounded-xl text-sm font-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div class="text-center py-20 bg-white rounded-[3rem] shadow-xl border border-gray-100 max-w-2xl mx-auto px-6">
        <div class="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto mb-6 text-teal-500">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <h3 class="text-2xl font-800 text-gray-900">No properties found</h3>
        <p class="text-gray-500 mt-2 mb-8 leading-relaxed">
          We couldn't find any stays matching your criteria. Get notified when new hosts join in this area.
        </p>
        <form action="/api/contact" method="GET" class="flex items-center gap-2">
          <input type="hidden" name="context" value={`Search Alert: ${initialQuery} ${initialVibe}`} />
          <input 
            type="email" 
            name="email" 
            placeholder="Enter your email address" 
            required 
            class="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-500"
          />
          <button type="submit" class="px-6 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-700 text-sm transition-colors cursor-pointer">
            Notify Me
          </button>
        </form>
      </div>
    );
  }

  return (
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((prop) => (
        <a
          key={prop.id}
          href={`/p/${prop.id}`}
          class={`group flex flex-col bg-white rounded-[2rem] border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden ${
            !prop.isAvailable && initialCheckIn ? "opacity-70 grayscale-[0.3]" : ""
          }`}
        >
          <div class="relative h-56 bg-gray-100 overflow-hidden">
            {prop.imageUrl ? (
              <img
                src={prop.imageUrl}
                alt={prop.name}
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                loading="lazy"
              />
            ) : (
              <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-50 to-emerald-100">
                <span class="text-6xl opacity-40">🏠</span>
              </div>
            )}

            {!prop.isAvailable && initialCheckIn && (
              <div class="absolute inset-0 bg-rose-900/40 backdrop-blur-[2px] flex items-center justify-center z-10">
                <span class="px-4 py-2 rounded-full bg-white/95 text-rose-600 font-800 text-xs shadow-xl">
                  Sold Out for these dates
                </span>
              </div>
            )}

            {prop._vibeScore && (
              <div class="absolute top-4 left-4 z-20 group/tooltip">
                <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-800 uppercase tracking-widest shadow-lg cursor-help">
                  <span class="text-amber-400">⚡</span>
                  {prop._vibeScore}% Match
                </div>
                <div class="absolute left-0 mt-2 w-48 p-3 bg-gray-900 text-white text-xs font-500 rounded-xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 pointer-events-none z-30">
                  <strong>Why?</strong> {prop._vibeReason}
                </div>
              </div>
            )}
          </div>

          <div class="p-6 flex-1 flex flex-col">
            <h3 class="text-lg font-800 text-gray-900 truncate group-hover:text-teal-600 transition-colors">
              {prop.name}
            </h3>
            <p class="text-sm text-gray-500 mt-1 line-clamp-1 font-500">
              {prop.address || "Location unavailable"}
            </p>

            {!prop.isAvailable && prop.matchReason && (
              <p class="text-xs font-600 text-rose-500 mt-2 pt-2 border-t border-gray-50">
                {prop.matchReason}
              </p>
            )}

            <div class="mt-4 flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-md bg-istay-900 text-white text-[9px] font-900 uppercase tracking-widest">
                Direct
              </span>
              <span class="text-[10px] text-gray-400 font-500 italic">
                No platform fees
              </span>
            </div>

            <div class="mt-auto pt-5 flex items-center justify-between">
              <div class="flex-1">
                <p class="text-[10px] font-700 text-gray-400 uppercase tracking-wider mb-0.5">
                  {initialCheckIn ? "Average / night" : "Starting at"}
                </p>
                <div class="flex items-center gap-2">
                  <span class="text-xl font-900 text-teal-600">
                    {formatINR(prop.dynamicPrice || prop.basePrice)}
                  </span>
                  {prop.isSurge && (
                    <span class="px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-600 text-[9px] font-900 uppercase animate-pulse">
                      Surge
                    </span>
                  )}
                </div>
              </div>
              <div class="px-4 py-2 rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-500 group-hover:text-white transition-all text-xs font-900 uppercase tracking-wider flex items-center gap-2">
                Book
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
