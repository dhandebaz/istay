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
          <form onSubmit={handleScrape} class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-mint-400 to-emerald-500 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000 group-focus-within:duration-200">
            </div>
            <div class="relative flex flex-col sm:flex-row gap-2 bg-white/90 backdrop-blur-xl border border-gray-100 p-2 rounded-2xl shadow-xl">
              <div class="flex-1 flex items-center gap-3 px-4 py-2.5">
                <span class="text-xl">🔗</span>
                <input
                  type="url"
                  value={url}
                  onInput={(e) => setUrl(e.currentTarget.value)}
                  placeholder="Paste your Property URL..."
                  class="w-full bg-transparent text-gray-900 font-600 focus:outline-none placeholder:font-400 placeholder:text-gray-400"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                class="px-8 py-3 rounded-xl bg-mint-500 text-istay-900 font-800 transition-all hover:bg-mint-400 active:scale-95 disabled:opacity-50"
              >
                {loading ? "Scraping..." : "Try it Free"}
              </button>
            </div>
            {error && (
              <p class="mt-4 text-sm font-600 text-rose-500 text-center animate-shake">
                ⚠️ {error}
              </p>
            )}
          </form>
        )
        : (
          <div class="animate-scale-in">
            <div class="relative bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden group">
              {/* istay Branding Ribbon */}
              <div class="absolute top-4 right-4 z-10">
                <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-mint-500 text-istay-900 text-[10px] font-900 uppercase tracking-widest shadow-lg">
                  <span class="w-1.5 h-1.5 rounded-full bg-istay-900 animate-pulse" />
                  istay Verified
                </span>
              </div>

              <div class="aspect-video bg-gray-100 overflow-hidden">
                <img
                  src={data.imageUrl}
                  alt={data.name}
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div class="p-8">
                <h3 class="text-xl font-800 text-gray-900 leading-tight">
                  {data.name}
                </h3>
                <p class="mt-3 text-sm text-gray-500 line-clamp-2 leading-relaxed">
                  {data.description}
                </p>

                {/* ── Amenities Badges ─────────────────────────── */}
                {data.amenities && data.amenities.length > 0 && (
                  <div class="mt-5 flex flex-wrap gap-2">
                    {data.amenities.map((amenity, i) => (
                      <span
                        key={i}
                        class="px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-[11px] font-700 text-teal-700"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                )}

                {/* ── AI Knowledge Preview ─────────────────────── */}
                {data.aiKnowledge && (
                  <div class="mt-5">
                    <button
                      type="button"
                      onClick={() => setShowKnowledge(!showKnowledge)}
                      class="flex items-center gap-2 text-xs font-700 text-istay-600 hover:text-istay-800 transition-colors"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        class={`transition-transform ${
                          showKnowledge ? "rotate-90" : ""
                        }`}
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                      AI Knowledge Base Preview
                    </button>

                    {showKnowledge && (
                      <div class="mt-3 p-4 rounded-xl bg-gray-50 border border-gray-100 max-h-48 overflow-y-auto">
                        <pre class="text-xs text-gray-600 whitespace-pre-wrap font-mono leading-relaxed">
                        {data.aiKnowledge}
                        </pre>
                      </div>
                    )}
                  </div>
                )}

                <div class="mt-8 pt-8 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <p class="text-[10px] font-800 text-gray-400 uppercase tracking-[0.2em] mb-1">
                      Your direct price
                    </p>
                    <p class="text-2xl font-900 text-teal-600">
                      ₹ 4,750{" "}
                      <span class="text-sm font-600 text-gray-400">
                        / night
                      </span>
                    </p>
                  </div>
                  <a
                    href={`/register?importUrl=${encodeURIComponent(url)}`}
                    class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0d9488] text-white font-900 text-base hover:bg-[#0f766e] transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 group"
                  >
                    Import to Dashboard
                    <span class="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => setData(null)}
                  class="mt-6 w-full text-xs flex justify-center items-center font-700 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ← Import a different link
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
