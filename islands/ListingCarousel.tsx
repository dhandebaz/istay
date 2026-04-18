import { useEffect, useState } from "preact/hooks";
import type { Property } from "../utils/types.ts";

export default function ListingCarousel() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/public/listings")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProperties(data);
      })
      .catch((err) => console.error("Failed to fetch listings:", err))
      .finally(() => setLoading(false));
  }, []);

  const toggleReveal = (id: string) => {
    const next = new Set(revealedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setRevealedIds(next);
  };

  if (loading) {
    return (
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            class="bg-gray-100 rounded-[2.5rem] aspect-video sm:aspect-square"
          />
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div class="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
        <div class="text-4xl mb-4">🏠</div>
        <p class="text-gray-500 font-600">No public properties listed yet.</p>
        <p class="text-gray-400 text-sm mt-2">
          Check back soon for curated direct bookings.
        </p>
      </div>
    );
  }

  return (
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {properties.map((prop) => (
        <div
          key={prop.id}
          class="group relative rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-pointer"
          onClick={() => toggleReveal(prop.id)}
        >
          {/* Image Container */}
          <div class="aspect-square overflow-hidden relative">
            <img
              src={prop.imageUrl}
              alt={prop.name}
              loading="lazy"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />

            {/* Elegant Gradient Strip (User requested better visibility) */}
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

            {/* Top Badge: Price */}
            <div class="absolute top-6 right-6 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg">
              <span class="text-istay-900 font-900 text-sm">
                ₹{prop.basePrice.toLocaleString()}
              </span>
              <span class="text-gray-500 text-[10px] font-700 uppercase tracking-tighter ml-1">
                /night
              </span>
            </div>

            {/* Bottom Content Area */}
            <div class="absolute bottom-8 left-8 right-8">
              <div class="flex items-center gap-1.5 mb-2">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span class="text-[10px] font-800 text-white uppercase tracking-widest drop-shadow-md">
                  Live & Bookable
                </span>
              </div>
              <h3 class="text-white font-900 text-xl tracking-tight leading-tight mb-2">
                {prop.name}
              </h3>

              <div class="flex items-center gap-2">
                {revealedIds.has(prop.id)
                  ? (
                    <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-mint-500 text-istay-900 text-xs font-800 animate-fade-in">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M8 0C4.68629 0 2 2.68629 2 6C2 10.5 8 16 8 16C8 16 14 10.5 14 6C14 2.68629 11.3137 0 8 0ZM8 8C6.89543 8 6 7.10457 6 6C6 4.89543 6.89543 4 8 4C9.10457 4 10 4.89543 10 6C10 7.10457 9.10457 8 8 8Z" />
                      </svg>
                      {prop.address || "Verified Location"}
                    </div>
                  )
                  : (
                    <button class="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-700 hover:bg-white/40 transition-colors">
                      Click to Reveal Location
                    </button>
                  )}
              </div>
            </div>
          </div>

          {/* Description Blur (Legibility Fix) */}
          <div class="p-8">
            <p class="text-gray-600 text-sm leading-relaxed line-clamp-2">
              {prop.description}
            </p>
            <div class="mt-6 flex items-center justify-between">
              <span class="text-[10px] font-800 uppercase tracking-widest text-mint-600 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-mint-500 animate-pulse" />
                95% payout to host
              </span>
              <a
                href={`/p/${prop.id}`}
                class="text-istay-900 text-xs font-900 underline decoration-mint-500 decoration-2 underline-offset-4 hover:decoration-mint-600"
              >
                View Listing
              </a>
            </div>
          </div>
        </div>
      ))}
      {/* View All Button */}
      <div class="md:col-span-3 flex justify-center mt-12">
        <a
          href="/search"
          class="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-istay-50 text-istay-900 text-sm font-800 border border-istay-100 hover:bg-istay-100 transition-colors"
        >
          View All Verified Properties
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M2 8H14M8 2L14 8L8 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}
