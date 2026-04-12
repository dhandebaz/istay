import { type Handlers, type PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { listAllPropertyIndices, getPropertyById, listBlockedDates } from "../utils/db.ts";
import type { Property } from "../utils/types.ts";

interface SearchData {
  properties: (Property & { isAvailable: boolean; matchReason?: string })[];
  query: string;
  checkIn: string;
  checkOut: string;
}

export const handler: Handlers<SearchData> = {
  GET: async (req, ctx) => {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "";
    const checkIn = url.searchParams.get("checkIn") || "";
    const checkOut = url.searchParams.get("checkOut") || "";

    const indices = await listAllPropertyIndices();
    const allProps = (await Promise.all(indices.map(i => getPropertyById(i.propId))))
      .filter((p): p is Property => p !== null && p.status === "active");

    // Filter by query (City / Name)
    let filtered = allProps;
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.address && p.address.toLowerCase().includes(q))
      );
    }

    // Availability check if dates provided
    const propsWithAvailability = await Promise.all(filtered.map(async (p) => {
      let isAvailable = true;
      let matchReason = "";
      
      if (checkIn && checkOut) {
        const blocks = await listBlockedDates(p.id);
        const blockedSet = new Set(blocks.map(b => b.date));
        
        let cur = new Date(checkIn + "T00:00:00Z");
        const end = new Date(checkOut + "T00:00:00Z");
        
        while (cur < end) {
          if (blockedSet.has(cur.toISOString().slice(0, 10))) {
            isAvailable = false;
            matchReason = "Selected dates unavailable, but highly recommended!";
            break;
          }
          cur.setUTCDate(cur.getUTCDate() + 1);
        }
      }

      return { ...p, isAvailable, matchReason };
    }));

    // Sort available ones first
    propsWithAvailability.sort((a, b) => Number(b.isAvailable) - Number(a.isAvailable));

    return ctx.render({ properties: propsWithAvailability, query, checkIn, checkOut });
  },
};

export default function SearchPage({ data }: PageProps<SearchData>) {
  const { properties, query, checkIn, checkOut } = data;

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <>
      <Head>
        <title>{query ? `Stays in ${query}` : "Discover Stays"} | istay</title>
        <meta name="description" content="Discover direct-booking properties via istay with zero OTA commission. Book exactly what you want." />
        <meta property="og:title" content={query ? `Stays in ${query} | istay` : "Discover Stays | istay"} />
        <meta property="og:description" content="Find the perfect verified stay without OTA commissions." />
      </Head>

      <div class="min-h-screen bg-[#FAFAFA] font-sans pb-20">
        
        {/* Soft Tech Header */}
        <header class="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100/50 shadow-sm">
          <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" class="flex items-center gap-2 group transition-transform hover:scale-[1.02] active:scale-95">
              <span class="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
                <svg width="18" height="18" viewBox="0 0 10 10" fill="white">
                  <path d="M5 0.5L0.5 4V9.5H3.5V6.5H6.5V9.5H9.5V4L5 0.5Z" stroke-width="0.3" stroke-linejoin="round" />
                </svg>
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
              Find your next <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-400">Perfect Stay</span>
            </h1>
            <p class="text-lg text-gray-500 font-500">
              Zero platform commissions. Direct host bookings. 
            </p>

            {/* Smart Search Bar */}
            <form class="mt-8 relative group" action="/search" method="GET">
              <div class="absolute inset-0 bg-teal-500/5 rounded-3xl blur-xl group-focus-within:bg-teal-500/10 transition-colors"></div>
              <div class="relative bg-white/90 backdrop-blur-sm border border-gray-200 shadow-xl rounded-3xl p-2 flex flex-col sm:flex-row gap-2">
                <div class="flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-100 flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="text-teal-500">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <input 
                    type="text" 
                    name="q" 
                    value={query}
                    placeholder="Search by city (e.g. New Delhi)" 
                    class="w-full bg-transparent text-gray-900 font-600 focus:outline-none placeholder:text-gray-400 placeholder:font-400"
                  />
                </div>
                <button type="submit" class="w-full sm:w-auto px-8 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 active:scale-95 text-white font-800 transition-all shadow-lg shadow-teal-500/25">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Results Grid */}
        <div class="max-w-6xl mx-auto px-6">
          <div class="mb-8 flex items-center justify-between">
            <h2 class="text-lg font-800 text-gray-900">
              {properties.length} {properties.length === 1 ? "Stay" : "Stays"} {query ? `Found in "${query}"` : "Available"}
            </h2>
          </div>

          {properties.length === 0 ? (
            <div class="py-20 text-center">
              <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <span class="text-3xl">🏜️</span>
              </div>
              <h3 class="text-xl font-800 text-gray-900">No properties found</h3>
              <p class="text-gray-500 mt-2">Try adjusting your search query.</p>
            </div>
          ) : (
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((prop) => (
                <a
                  key={prop.id}
                  href={`/p/${prop.id}`}
                  class={`group flex flex-col bg-white rounded-[2rem] border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden ${!prop.isAvailable && checkIn ? 'opacity-70 grayscale-[0.3]' : ''}`}
                >
                  <div class="relative h-56 bg-gray-100 overflow-hidden">
                    {prop.imageUrl ? (
                      <img
                        src={prop.imageUrl}
                        alt={prop.name}
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                    ) : (
                      <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-50 to-emerald-100">
                        <span class="text-6xl opacity-40">🏠</span>
                      </div>
                    )}
                    
                    {!prop.isAvailable && checkIn && (
                      <div class="absolute inset-0 bg-rose-900/40 backdrop-blur-[2px] flex items-center justify-center">
                        <span class="px-4 py-2 rounded-full bg-white/95 text-rose-600 font-800 text-xs shadow-xl">
                          Sold Out for these dates
                        </span>
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
                      <p class="text-xs font-600 text-rose-500 mt-3 pt-3 border-t border-gray-50">
                        {prop.matchReason}
                      </p>
                    )}
                    
                    <div class="mt-auto pt-6 flex items-center justify-between">
                      <div>
                        <span class="text-xl font-900 text-teal-600">
                          {formatINR(prop.basePrice)}
                        </span>
                        <span class="text-xs font-600 text-gray-400 ml-1 tracking-wider uppercase">/ night</span>
                      </div>
                      <div class="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-all text-teal-600">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
