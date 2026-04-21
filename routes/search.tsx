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
      properties: [], // No longer used in SSR
      query,
      vibe,
      checkIn,
      checkOut,
    });
  },
};

export default function SearchPage({ data }: PageProps<SearchData>) {
  const { properties, query, vibe, checkIn, checkOut } = data;

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n || 0);

  return (
    <>
      <SEOMeta 
        title={query ? `Stays in ${query} | istay` : "Discover Stays | istay"}
        description="Discover direct-booking properties via istay with zero OTA commission. Book exactly what you want."
      />

      <div class="min-h-screen bg-[#FAFAFA] font-sans pb-20">
        {/* Soft Tech Header */}
        <header class="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100/50 shadow-sm">
          <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <a
              href="/"
              class="flex items-center gap-2 group transition-transform hover:scale-[1.02] active:scale-95"
            >
              <span class="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
                <HomeIcon class="w-4.5 h-4.5 text-white" />
              </span>
              <span class="font-900 text-xl tracking-tight text-gray-900 group-hover:text-teal-600 transition-colors">
                istay
              </span>
            </a>
          </div>
        </header>

        {/* Hero Section */}
        <div class="max-w-6xl mx-auto px-6 pt-16 pb-12">
          <div class="text-center max-w-2xl mx-auto space-y-6">
            <h1 class="text-4xl sm:text-5xl font-900 text-gray-900 tracking-tight leading-tight">
              Find your next{" "}
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-400">
                Perfect Stay
              </span>
            </h1>
            <p class="text-lg text-gray-500 font-500">
              Zero platform commissions. Direct host bookings.
            </p>

            {/* Smart Search Bar */}
            <form class="mt-8 relative group" action="/search" method="GET">
              <div class="absolute inset-0 bg-teal-500/5 rounded-3xl blur-xl group-focus-within:bg-teal-500/10 transition-colors">
              </div>
              <div class="relative bg-white/90 backdrop-blur-sm border border-gray-200 shadow-xl rounded-3xl p-2 flex flex-col sm:flex-row gap-2">
                <div class="flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-100 flex items-center gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    class="text-teal-500 flex-shrink-0"
                  >
                    <path
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <input
                    type="text"
                    name="q"
                    value={query}
                    list="popular-destinations"
                    placeholder="Search by city (e.g. New Delhi)"
                    required
                    class="w-full bg-transparent text-gray-900 font-600 focus:outline-none placeholder:text-gray-400 placeholder:font-400"
                  />
                  <datalist id="popular-destinations">
                    <option value="New Delhi" />
                    <option value="Okhla" />
                    <option value="Bangalore" />
                    <option value="Mumbai" />
                    <option value="Goa" />
                  </datalist>
                </div>
                <div class="flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-100 flex items-center gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    class="text-teal-500 flex-shrink-0"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.485-6.364l-1.414 1.414M6.929 17.071l-1.414 1.414m0-12.728l1.414 1.414M17.071 17.071l1.414 1.414M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    name="vibe"
                    value={vibe}
                    placeholder="Vibe (e.g. romantic, luxury, cozy)"
                    class="w-full bg-transparent text-gray-900 font-600 focus:outline-none placeholder:text-gray-400 placeholder:font-400"
                  />
                </div>
                <button
                  type="submit"
                  class="w-full sm:w-auto px-8 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 active:scale-95 text-white font-800 transition-all shadow-lg shadow-teal-500/25"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Vibe Suggestion Chips */}
            <div class="mt-5 flex flex-wrap items-center justify-center gap-2">
              {[ "Luxury", "Cozy", "Office-friendly", "Romantic", "Nature Retreat" ].map((chip) => (
                <a
                  key={chip}
                  href={`/search?q=${encodeURIComponent(query || "New Delhi")}&vibe=${encodeURIComponent(chip)}`}
                  class="px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-600 text-gray-600 hover:text-teal-600 hover:border-teal-200 hover:bg-teal-50 transition-colors shadow-sm"
                >
                  ✨ {chip}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div class="max-w-6xl mx-auto px-6">
          <div class="mb-8 flex items-center justify-between">
            <h2 class="text-lg font-800 text-gray-900">
              {vibe
                ? `Properties matching "${vibe}" vibe`
                : (query ? `Stays in "${query}"` : "Discover Stays")}
            </h2>
          </div>

          <LazyIsland placeholderHeight="600px">
            <PropertyGrid 
              initialQuery={query}
              initialVibe={vibe}
              initialCheckIn={checkIn}
              initialCheckOut={checkOut}
            />
          </LazyIsland>
        </div>
      </div>
    </>
  );
}
