import { type Handlers, type PageProps } from "$fresh/server.ts";
import PropertyGrid from "../islands/PropertyGrid.tsx";
import LazyIsland from "../islands/LazyIsland.tsx";
import SEOMeta from "../components/SEOMeta.tsx";
import { HomeIcon, SearchIcon, SparklesIcon } from "../components/Icons.tsx";
import {
  getPropertyById,
  listAllPropertyIndices,
  listBlockedDates,
} from "../utils/db.ts";
import type { Property } from "../utils/types.ts";

interface SearchData {
  properties: (Property & {
    isAvailable: boolean;
    matchReason?: string;
    _vibeScore?: number;
    _vibeReason?: string;
  })[];
  query: string;
  vibe: string;
  checkIn: string;
  checkOut: string;
}

export const handler: Handlers<SearchData> = {
  GET: (req, ctx) => {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "";
    const vibe = url.searchParams.get("vibe") || "";
    const checkIn = url.searchParams.get("checkIn") || "";
    const checkOut = url.searchParams.get("checkOut") || "";

    return ctx.render({
      properties: [],
      query,
      vibe,
      checkIn,
      checkOut,
    });
  },
};

export default function SearchPage({ data }: PageProps<SearchData>) {
  const { query, vibe, checkIn, checkOut } = data;

  return (
    <>
      <SEOMeta 
        title={query ? `Residency Portfolio in ${query} | iStay` : "Explore Residency Discovery | iStay"}
        description="Discover autonomous direct-residency properties with zero platform commissions. Establish your next premium experience."
      />
      <style dangerouslySetInnerHTML={{ __html: `
        .search-hero { background: radial-gradient(circle at center, #064e3b 0%, #022c22 100%); }
        .text-gradient { background: linear-gradient(135deg, #10b981, #34d399, #059669); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      ` }} />

      <div class="min-h-screen bg-white font-sans pb-48 selection:bg-emerald-100">
        <nav class="sticky top-0 z-40 bg-white/80 backdrop-blur-2xl border-b border-gray-50 transition-all duration-500">
          <div class="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
            <a href="/" class="flex items-center gap-2 group transition-all hover:scale-105">
              <img src="/logo.svg" alt="iStay" class="h-10 w-auto" width="40" height="40" />
            </a>
            <div class="flex items-center gap-10">
              <a href="/login" class="text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em] hover:text-emerald-600 transition-colors">Credential Access</a>
              <a href="/register" class="px-8 py-3 bg-gray-900 text-white rounded-[1.2rem] text-[10px] font-bold uppercase tracking-[0.2em] shadow-premium hover:bg-emerald-600 hover:-translate-y-1 transition-all">Host Onboarding</a>
            </div>
          </div>
        </nav>

        <div class="relative search-hero overflow-hidden py-32 sm:py-48">
          <div class="absolute -top-64 -right-64 w-[50rem] h-[50rem] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
          <div class="absolute -bottom-64 -left-64 w-[50rem] h-[50rem] bg-emerald-600/5 rounded-full blur-[120px] animate-pulse delay-700" />

          <div class="max-w-7xl mx-auto px-10 relative z-10">
            <div class="max-w-4xl mx-auto text-center space-y-12">
              <div class="inline-flex items-center gap-4 px-6 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl mb-4 animate-fade-in">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse" />
                <p class="text-[11px] font-bold text-emerald-400 uppercase tracking-[0.3em]">Direct Residency Discovery Protocol</p>
              </div>

              <h1 class="text-6xl sm:text-8xl font-bold text-white tracking-tighter leading-[0.9] animate-slide-up">
                Portfolio Acquisition<br />
                <span class="text-gradient">Discovery Discovery</span>
              </h1>
              <p class="text-xl font-medium text-emerald-100/50 max-w-2xl mx-auto leading-relaxed animate-slide-up delay-100">
                Establish direct synchronization with premium independent residency managers. Zero platform commission volatility. Just autonomous curation.
              </p>

              <form class="mt-16 group animate-slide-up delay-200" action="/search" method="GET">
                <div class="bg-white p-4 rounded-[3rem] shadow-premium-lg border border-white/10 flex flex-col sm:flex-row gap-3 transition-all duration-700 focus-within:shadow-premium-xl focus-within:-translate-y-2">
                  <div class="flex-[1.2] px-8 py-5 flex items-center gap-5 border-b sm:border-b-0 sm:border-r border-gray-50 group/input">
                    <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner flex-shrink-0 transition-transform group-focus-within/input:scale-110">
                      <SearchIcon class="w-6 h-6" />
                    </div>
                    <div class="flex-1 text-left">
                      <label class="block text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em] mb-2">Residency Node</label>
                      <input
                        type="text"
                        name="q"
                        value={query}
                        list="popular-destinations"
                        placeholder="Select destination protocol..."
                        required
                        class="w-full bg-transparent text-gray-900 font-bold focus:outline-none placeholder:text-gray-200 text-sm uppercase tracking-widest"
                      />
                    </div>
                    <datalist id="popular-destinations">
                      <option value="New Delhi" />
                      <option value="Okhla" />
                      <option value="Bangalore" />
                      <option value="Mumbai" />
                      <option value="Goa" />
                    </datalist>
                  </div>
                  <div class="flex-1 px-8 py-5 flex items-center gap-5 border-b sm:border-b-0 sm:border-r border-gray-50 group/input">
                    <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner flex-shrink-0 transition-transform group-focus-within/input:scale-110">
                      <SparklesIcon class="w-6 h-6" />
                    </div>
                    <div class="flex-1 text-left">
                      <label class="block text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em] mb-2">Strategic Vibe</label>
                      <input
                        type="text"
                        name="vibe"
                        value={vibe}
                        placeholder="Luxury, Bespoke, etc."
                        class="w-full bg-transparent text-gray-900 font-bold focus:outline-none placeholder:text-gray-200 text-sm uppercase tracking-widest"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="w-full sm:w-auto px-12 py-6 rounded-[2.2rem] bg-gray-900 hover:bg-emerald-600 text-white font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-500 shadow-premium active:scale-95"
                  >
                    Explore Residency Portfolio
                  </button>
                </div>
              </form>

              <div class="flex flex-wrap items-center justify-center gap-4 animate-slide-up delay-300">
                <span class="text-[11px] font-bold text-emerald-100/40 uppercase tracking-[0.4em] mr-2">Curation Filters:</span>
                {[ "Luxury", "Cozy", "Productive", "Romantic", "Bespoke" ].map((chip) => (
                  <a
                    key={chip}
                    href={`/search?q=${encodeURIComponent(query || "New Delhi")}&vibe=${encodeURIComponent(chip)}`}
                    class={`px-6 py-3 rounded-[1.2rem] text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 shadow-premium border ${
                      vibe.toLowerCase() === chip.toLowerCase()
                      ? "bg-emerald-500 text-white border-emerald-400"
                      : "bg-white/5 backdrop-blur-xl border-white/10 text-emerald-100/60 hover:bg-white hover:text-gray-900 hover:scale-105"
                    }`}
                  >
                    ✨ {chip}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div class="max-w-7xl mx-auto px-8 -mt-16 relative z-20">
          <div class="bg-white rounded-[4rem] p-12 sm:p-20 shadow-premium-lg border border-gray-50/50">
            <div class="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-10">
              <div class="space-y-4">
                <div class="flex items-center gap-4 mb-6">
                  <div class="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-xl shadow-premium animate-bounce">🏠</div>
                  <div class="h-px w-24 bg-emerald-100" />
                </div>
                <h2 class="text-4xl font-bold text-gray-900 tracking-tighter leading-tight">
                  {vibe
                    ? `Residencies with "${vibe}" curation`
                    : (query ? `Premium residency nodes in ${query}` : "Discover our Global Collection")}
                </h2>
                <p class="text-[12px] font-bold text-gray-400 uppercase tracking-[0.3em]">
                  Autonomous property selection with direct synchronization support
                </p>
              </div>
              <div class="flex items-center gap-6 bg-gray-50 p-2.5 rounded-[1.5rem] border border-gray-100">
                <div class="px-6 py-3 bg-white rounded-xl shadow-sm border border-gray-50 text-[10px] font-bold text-gray-900 uppercase tracking-[0.3em]">
                  Sort: Optimized Recommendations
                </div>
              </div>
            </div>

            <LazyIsland placeholderHeight="800px">
              <PropertyGrid 
                initialQuery={query}
                initialVibe={vibe}
                initialCheckIn={checkIn}
                initialCheckOut={checkOut}
              />
            </LazyIsland>
          </div>
        </div>
      </div>
    </>
  );
}

