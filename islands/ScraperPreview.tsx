import { useState } from "preact/hooks";
import type { ScrapedListing } from "../utils/types.ts";

export default function ScraperPreview() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ScrapedListing | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showKnowledge, setShowKnowledge] = useState(false);

  const handleScrape = async (e: Event) => {
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
      if (!res.ok) throw new Error(json.error || "Failed to scrape");

      setData(json);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="w-full max-w-xl mx-auto">
      {!data
        ? (
          <form onSubmit={handleScrape} class="relative">
            <div class="relative flex flex-col sm:flex-row gap-0 bg-white border-[4px] border-gray-900 rounded-[2rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden transition-all focus-within:translate-x-[-2px] focus-within:translate-y-[-2px] focus-within:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
              <div class="flex-1 flex items-center gap-4 px-8 py-5 bg-white border-b-[4px] sm:border-b-0 sm:border-r-[4px] border-gray-900">
                <span class="text-2xl">🔗</span>
                <input
                  type="url"
                  value={url}
                  onInput={(e) => setUrl(e.currentTarget.value)}
                  placeholder="Paste Airbnb/Booking.com link..."
                  class="w-full bg-transparent text-gray-900 font-950 uppercase tracking-widest text-xs focus:outline-none placeholder:text-gray-300"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                class="px-10 py-5 bg-mint-400 text-gray-900 font-950 uppercase tracking-[0.2em] text-xs transition-all hover:bg-white active:translate-x-[1px] active:translate-y-[1px] disabled:opacity-50"
              >
                {loading ? "PROCESSING..." : "IMPORT_VIBE"}
              </button>
            </div>
            {error && (
              <div class="mt-6 p-6 bg-rose-50 border-[3px] border-rose-900 rounded-2xl shadow-[6px_6px_0px_0px_#9f1239] animate-shake">
                <p class="text-[10px] font-950 text-rose-900 uppercase tracking-widest flex items-center gap-3">
                  <span class="text-lg">⚠️</span> PROTOCOL_ERROR: {error}
                </p>
              </div>
            )}
          </form>
        )
        : (
          <div class="animate-scale-in">
            <div class="relative bg-white rounded-[3rem] border-[4px] border-gray-900 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] overflow-hidden group">
              {/* istay Branding Ribbon */}
              <div class="absolute top-8 right-8 z-10">
                <span class="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-gray-900 text-mint-400 text-[10px] font-950 uppercase tracking-[0.2em] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-[3px] border-gray-900">
                  <span class="w-2.5 h-2.5 rounded-full bg-mint-400 animate-pulse" />
                  AI_SYNTHESIZED
                </span>
              </div>

              <div class="aspect-video bg-gray-100 overflow-hidden border-b-[4px] border-gray-900">
                <img
                  src={data.imageUrl}
                  alt={data.name}
                  class="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>

              <div class="p-10 sm:p-12">
                <h3 class="text-3xl font-950 text-gray-900 leading-[1] uppercase tracking-tighter mb-6">
                  {data.name}
                </h3>
                <p class="text-xs text-gray-500 font-800 uppercase tracking-widest line-clamp-3 leading-relaxed mb-10">
                  {data.description}
                </p>

                {/* Amenities Badges */}
                {data.amenities && data.amenities.length > 0 && (
                  <div class="flex flex-wrap gap-3 mb-10">
                    {data.amenities.slice(0, 4).map((a) => (
                      <span key={a} class="px-4 py-2 bg-gray-50 border-[2px] border-gray-900 rounded-xl text-[9px] font-950 text-gray-900 uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                        {a}
                      </span>
                    ))}
                    {data.amenities.length > 4 && (
                      <span class="px-4 py-2 bg-mint-50 border-[2px] border-mint-900 rounded-xl text-[9px] font-950 text-mint-900 uppercase tracking-widest">
                        +{data.amenities.length - 4}_MORE
                      </span>
                    )}
                  </div>
                )}

                <div class="pt-10 border-t-[3px] border-gray-100 flex items-center justify-between gap-6">
                   <button 
                    onClick={() => setShowKnowledge(!showKnowledge)}
                    class="text-[10px] font-950 text-gray-400 uppercase tracking-[0.2em] hover:text-gray-900 transition-colors"
                   >
                     {showKnowledge ? "[ HIDE_LOGIC ]" : "[ VIEW_AI_LOGIC ]"}
                   </button>
                   <button 
                    onClick={() => setData(null)}
                    class="px-8 py-3 bg-gray-900 text-white text-[10px] font-950 uppercase tracking-widest rounded-xl border-[3px] border-gray-900 shadow-[4px_4px_0px_0px_#4ade80] active:translate-x-[1px] active:translate-y-[1px]"
                   >
                     RESET_CORE
                   </button>
                </div>

                {showKnowledge && data.aiKnowledge && (
                   <div class="mt-10 p-8 bg-gray-50 border-[4px] border-gray-900 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-slide-up">
                      <p class="text-[9px] font-950 text-mint-600 uppercase tracking-[0.3em] mb-6">AI_KNOWLEDGE_KERNEL</p>
                      <div class="text-[11px] font-800 text-gray-500 uppercase leading-loose font-mono whitespace-pre-wrap">
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
