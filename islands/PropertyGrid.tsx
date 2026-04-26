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
        if (!res.ok) throw new Error("Failed to synchronize property portfolio");
        const data = await res.json();
        setProperties(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Autonomous sync discrepancy");
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [initialQuery, initialVibe, initialCheckIn, initialCheckOut]);

  if (loading) {
    return (
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} class="bg-white rounded-[2.5rem] border border-gray-50 shadow-premium overflow-hidden animate-pulse">
            <div class="h-72 bg-gray-50" />
            <div class="p-10 space-y-6">
              <div class="h-8 bg-gray-50 rounded-xl w-3/4" />
              <div class="h-4 bg-gray-50 rounded-xl w-1/2" />
              <div class="flex gap-3">
                {[1, 2, 3].map((j) => <div key={j} class="h-8 w-24 bg-gray-50 rounded-xl" />)}
              </div>
              <div class="pt-8 flex items-center justify-between">
                <div class="h-12 w-32 bg-gray-50 rounded-2xl" />
                <div class="h-14 w-14 bg-gray-50 rounded-2xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div class="text-center py-24 bg-gray-50 rounded-[4rem] border border-emerald-50 max-w-2xl mx-auto px-10 animate-fade-in shadow-inner">
        <div class="w-24 h-24 rounded-[2rem] bg-white flex items-center justify-center mx-auto mb-8 text-emerald-500 shadow-premium">
          <span class="text-3xl">⚠️</span>
        </div>
        <p class="text-emerald-900 font-bold uppercase tracking-[0.2em] text-[11px] mb-8">Protocol Discrepancy: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          class="px-10 py-4 bg-gray-900 text-white rounded-[1.2rem] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-emerald-600 transition-all shadow-premium"
        >
          Initialize Re-Sync
        </button>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div class="text-center py-24 bg-white rounded-[4rem] shadow-premium-lg border border-gray-50 max-w-3xl mx-auto px-12 animate-fade-in">
        <div class="w-24 h-24 rounded-[2rem] bg-emerald-50 flex items-center justify-center mx-auto mb-10 text-emerald-500 shadow-sm">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <h3 class="text-4xl font-bold text-gray-900 tracking-tighter mb-4">Discovery Discrepancy</h3>
        <p class="text-[13px] text-gray-400 mb-12 leading-relaxed font-bold uppercase tracking-[0.2em]">
          No residencies match your current acquisition criteria.
        </p>
        <form action="/api/contact" method="GET" class="flex flex-col sm:flex-row items-center gap-4 group">
          <input type="hidden" name="context" value={`Portfolio Alert: ${initialQuery} ${initialVibe}`} />
          <input 
            type="email" 
            name="email" 
            placeholder="Portfolio synchronization protocol (email)..." 
            required 
            class="w-full flex-1 bg-gray-50 border border-emerald-50 rounded-[1.5rem] px-8 py-5 text-sm focus:outline-none focus:bg-white focus:shadow-inner transition-all font-medium placeholder:text-gray-300"
          />
          <button type="submit" class="w-full sm:w-auto px-12 py-5 rounded-[1.5rem] bg-gray-900 hover:bg-emerald-600 text-white font-bold text-[11px] uppercase tracking-[0.2em] shadow-premium transition-all">
            Subscribe
          </button>
        </form>
      </div>
    );
  }

  return (
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-32">
      {properties.map((prop) => (
        <a
          key={prop.id}
          href={`/p/${prop.id}`}
          class={`group flex flex-col bg-white rounded-[3rem] border border-gray-50 shadow-premium hover:shadow-premium-lg transition-all duration-700 hover:-translate-y-3 overflow-hidden ${
            !prop.isAvailable && initialCheckIn ? "opacity-60 grayscale-[0.5]" : ""
          }`}
        >
          <div class="relative h-72 bg-gray-50 overflow-hidden">
            {prop.imageUrl ? (
              <img
                src={prop.imageUrl}
                alt={prop.name}
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
                loading="lazy"
              />
            ) : (
              <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100/30">
                <span class="text-[8rem] opacity-20 filter grayscale">🏠</span>
              </div>
            )}

            {!prop.isAvailable && initialCheckIn && (
              <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center z-10">
                <span class="px-8 py-3 rounded-2xl bg-white text-gray-900 font-bold text-[11px] uppercase tracking-[0.2em] shadow-premium-lg border border-gray-50">
                  Residency Occupied
                </span>
              </div>
            )}

            {prop._vibeScore && (
              <div class="absolute top-6 left-6 z-20 group/tooltip">
                <div class="flex items-center gap-3 px-4 py-2.5 rounded-[1.2rem] bg-white/90 backdrop-blur-md shadow-premium border border-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-[0.2em] cursor-help transition-all group-hover:scale-105">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {prop._vibeScore}% Compatibility
                </div>
                <div class="absolute left-0 mt-4 w-64 p-6 bg-gray-900 text-white text-[12px] font-medium rounded-[2rem] shadow-premium-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-500 pointer-events-none z-30 leading-relaxed border border-white/10">
                  <strong class="block mb-2 text-emerald-400 uppercase tracking-[0.3em] text-[9px]">Autonomous Logic:</strong>
                  {prop._vibeReason}
                </div>
              </div>
            )}
          </div>

          <div class="p-10 flex-1 flex flex-col">
            <div class="flex items-center gap-4 mb-6">
              <span class="px-4 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-[0.2em] border border-emerald-100">
                Bespoke Residency
              </span>
              <div class="h-px flex-1 bg-gray-50" />
            </div>
            
            <h3 class="text-2xl font-bold text-gray-900 truncate group-hover:text-emerald-600 transition-colors tracking-tighter leading-tight">
              {prop.name}
            </h3>
            <p class="text-[11px] text-gray-300 mt-2 line-clamp-1 font-bold uppercase tracking-[0.3em] opacity-80 italic">
              {prop.address || "Proprietary Node"}
            </p>

            {!prop.isAvailable && prop.matchReason && (
              <div class="mt-6 p-4 bg-emerald-50/20 rounded-[1.2rem] border border-emerald-100/50">
                <p class="text-[10px] font-bold text-emerald-900/60 uppercase tracking-[0.2em]">
                  Schedule Note: {prop.matchReason}
                </p>
              </div>
            )}

            <div class="mt-8 flex items-center gap-4">
              <span class="px-3 py-1 rounded-[0.8rem] bg-gray-900 text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                Direct
              </span>
              <span class="text-[11px] text-emerald-600 font-bold uppercase tracking-[0.2em] opacity-60">
                Yield Optimized
              </span>
            </div>

            <div class="mt-auto pt-10 flex items-center justify-between gap-6">
              <div class="flex-1">
                <p class="text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em] mb-2">
                  {initialCheckIn ? "Net Residency / night" : "Entry Level"}
                </p>
                <div class="flex items-center gap-3">
                  <span class="text-3xl font-bold text-gray-900 tracking-tighter">
                    {formatINR(prop.dynamicPrice || prop.basePrice)}
                  </span>
                  {prop.isSurge && (
                    <span class="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-600 text-[9px] font-bold uppercase tracking-widest animate-pulse border border-amber-100">
                      Surge
                    </span>
                  )}
                </div>
              </div>
              <div class="px-8 py-4 rounded-2xl bg-gray-50 text-gray-400 group-hover:bg-emerald-600 group-hover:text-white group-hover:shadow-premium-lg transition-all duration-500 text-[11px] font-bold uppercase tracking-[0.3em] flex items-center gap-3">
                Acquisition
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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

