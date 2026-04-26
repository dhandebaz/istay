import { useState } from "preact/hooks";
import type { ScrapedListing } from "../utils/types.ts";

export default function ScraperPreview() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ScrapedListing | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showKnowledge, setShowKnowledge] = useState(false);

  const handleSync = async (e: Event) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to synchronize asset");

      setData(json);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Autonomous synchronization protocol failure");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="w-full max-w-xl mx-auto selection:bg-emerald-100">
      {!data
        ? (
          <form onSubmit={handleSync} class="relative group">
            <div class="relative flex flex-col sm:flex-row gap-0 bg-white rounded-[2.5rem] shadow-premium-lg overflow-hidden border border-gray-50 transition-all duration-700 focus-within:shadow-premium-xl focus-within:border-emerald-100/50">
              <div class="flex-1 flex items-center gap-6 px-10 py-8 bg-white border-b sm:border-b-0 sm:border-r border-gray-50 transition-colors focus-within:bg-emerald-50/5">
                <span class="text-3xl transition-transform duration-700 group-focus-within:rotate-12">🔗</span>
                <input
                  type="url"
                  value={url}
                  onInput={(e) => setUrl(e.currentTarget.value)}
                  placeholder="Paste Airbnb residency link..."
                  class="w-full bg-transparent text-gray-900 font-bold uppercase tracking-[0.2em] text-[11px] focus:outline-none placeholder:text-gray-200"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                class="px-14 py-8 bg-gray-900 text-white font-bold uppercase tracking-[0.4em] text-[11px] transition-all duration-700 hover:bg-emerald-600 disabled:opacity-50 flex items-center justify-center gap-4 group/btn"
              >
                {loading ? (
                  <>
                    <span class="w-2 h-2 rounded-full bg-white animate-pulse" />
                    Synchronizing...
                  </>
                ) : (
                  <>
                    Initialize Sync
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" class="opacity-40 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </div>
            {error && (
              <div class="mt-10 p-8 bg-rose-50 border border-rose-100 rounded-[2rem] animate-shake relative overflow-hidden">
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.05)_0%,transparent_50%)]" />
                <p class="text-[11px] font-bold text-rose-500 uppercase tracking-[0.4em] flex items-center gap-4 relative z-10 italic">
                  <span class="text-2xl">⚠️</span> Protocol Discrepancy: {error}
                </p>
              </div>
            )}
          </form>
        )
        : (
          <div class="animate-scale-in">
            <div class="relative bg-white rounded-[3rem] shadow-premium-lg overflow-hidden group border border-gray-50 transition-all duration-700 hover:shadow-premium-xl">
              <div class="absolute top-8 right-8 z-10">
                <span class="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/90 backdrop-blur-xl text-[10px] font-bold text-emerald-600 uppercase tracking-[0.4em] shadow-premium border border-emerald-50 italic">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  Autonomous Analysis
                </span>
              </div>

              <div class="aspect-video bg-gray-50 overflow-hidden relative">
                <img
                  src={data.imageUrl}
                  alt={data.name}
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms]"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
              </div>

              <div class="p-12 sm:p-16">
                <h3 class="text-3xl font-bold text-gray-900 leading-[1.1] tracking-tighter mb-8">
                  {data.name}
                </h3>
                <p class="text-[15px] text-gray-400 font-medium tracking-wide line-clamp-3 leading-relaxed mb-12 italic opacity-80">
                  {data.description}
                </p>

                {data.amenities && data.amenities.length > 0 && (
                  <div class="flex flex-wrap gap-4 mb-16">
                    {data.amenities.slice(0, 4).map((a) => (
                      <span key={a} class="px-6 py-3 bg-gray-50 rounded-[1.2rem] text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border border-gray-100 transition-all duration-500 hover:border-emerald-200 hover:text-emerald-600 hover:bg-emerald-50/50">
                        {a}
                      </span>
                    ))}
                    {data.amenities.length > 4 && (
                      <span class="px-6 py-3 bg-emerald-50 rounded-[1.2rem] text-[10px] font-bold text-emerald-700 uppercase tracking-[0.2em] border border-emerald-100 opacity-60">
                        +{data.amenities.length - 4} More Nodes
                      </span>
                    )}
                  </div>
                )}

                <div class="pt-12 border-t border-gray-50 flex items-center justify-between gap-10">
                   <button 
                    onClick={() => setShowKnowledge(!showKnowledge)}
                    class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] hover:text-emerald-500 transition-all duration-700 flex items-center gap-4 group/btn italic opacity-60 hover:opacity-100"
                   >
                     <div class={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center transition-all duration-500 group-hover/btn:bg-emerald-50 group-hover/btn:rotate-180 ${showKnowledge ? 'rotate-180 bg-emerald-50' : ''}`}>
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="opacity-40 group-hover/btn:opacity-100">
                         <path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                       </svg>
                     </div>
                     {showKnowledge ? "Conceal Protocol" : "Review Concierge Logic"}
                   </button>
                   <button 
                    onClick={() => setData(null)}
                    class="px-12 py-5 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-[1.5rem] shadow-premium-lg hover:bg-emerald-600 hover:-translate-y-1 transition-all duration-700 active:scale-95"
                   >
                     Reset Sync
                   </button>
                </div>

                {showKnowledge && data.aiKnowledge && (
                   <div class="mt-16 p-12 bg-gray-50/50 rounded-[2.5rem] border border-emerald-100/50 shadow-inner animate-slide-up relative overflow-hidden group/knowledge">
                      <div class="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-transparent opacity-0 group-hover/knowledge:opacity-100 transition-opacity duration-[2000ms]" />
                      <div class="flex items-center gap-4 mb-10 relative">
                         <div class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                         <p class="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.4em] italic opacity-80">Residency Knowledge Node</p>
                      </div>
                      <div class="text-[13px] font-medium text-gray-500 leading-relaxed font-mono whitespace-pre-wrap relative opacity-70 italic selection:bg-emerald-200">
                        {data.aiKnowledge}
                      </div>
                   </div>
                )}
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

