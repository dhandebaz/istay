import { type Handlers, type PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getPropertyById, listBlockedDates } from "../../utils/db.ts";
import { getVibeMatches } from "../../utils/recommendations.ts";
import type { Property, VibeMatch } from "../../utils/types.ts";
import BookingCalendar from "../../islands/BookingCalendar.tsx";
import GuestChat from "../../islands/GuestChat.tsx";

interface PropertyPageData {
  property: Property;
  blockedDates: string[];
  vibeMatches: VibeMatch[];
  isHighlyBooked: boolean;
}

export const handler: Handlers<PropertyPageData> = {
  async GET(_req, ctx) {
    const { propId } = ctx.params;
    const property = await getPropertyById(propId);

    if (!property || property.status !== "active") {
      return ctx.renderNotFound();
    }

    const blocks = await listBlockedDates(propId);
    const blockedDates = blocks.map((b) => b.date);

    // Check if property is highly booked (>= 60% of next 30 days blocked)
    const today = new Date();
    const next30 = new Set<string>();
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      next30.add(d.toISOString().slice(0, 10));
    }
    const blockedNext30 = blockedDates.filter((d) => next30.has(d)).length;
    const isHighlyBooked = blockedNext30 >= 18; // 60% of 30

    // If highly booked, fetch Vibe Match recommendations
    let vibeMatches: VibeMatch[] = [];
    if (isHighlyBooked) {
      try {
        vibeMatches = await getVibeMatches(propId);
      } catch (err) {
        console.error("[propPage] Vibe match error:", err);
      }
    }

    return ctx.render({ property, blockedDates, vibeMatches, isHighlyBooked });
  },
};

export default function PropertyPage(
  { data }: PageProps<PropertyPageData>,
) {
  const { property, blockedDates, vibeMatches, isHighlyBooked } = data;

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <>
      <Head>
        <title>{property.name} | istay Direct Booking</title>
        <meta name="description" content={property.description} />
        <meta property="og:title" content={property.name} />
        <meta property="og:description" content={property.description} />
        {property.imageUrl && (
          <meta property="og:image" content={property.imageUrl} />
        )}
        <meta property="og:type" content="website" />
      </Head>

      <div class="min-h-screen bg-white font-sans">
        {/* ── Hero Image ──────────────────────────────────────── */}
        <div class="relative h-80 sm:h-[450px] lg:h-[550px] overflow-hidden bg-gray-100">
          {property.imageUrl
            ? (
              <img
                src={property.imageUrl}
                alt={property.name}
                class="w-full h-full object-cover"
              />
            )
            : (
              <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-mint-50 to-emerald-100">
                <span class="text-8xl opacity-40">🏠</span>
              </div>
            )}

          {/* Gradient overlay */}
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* istay branding on top */}
          <div class="absolute top-6 left-6">
            <a
              href="/"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-xs font-800 text-mint-600 shadow-xl hover:bg-white transition-all transform hover:scale-105"
            >
              <span class="w-5 h-5 rounded bg-mint-500 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 10 10" fill="white">
                  <path d="M5 0.5L0.5 4V9.5H3.5V6.5H6.5V9.5H9.5V4L5 0.5Z" stroke-width="0.3" stroke-linejoin="round" />
                </svg>
              </span>
              Direct Booking via istay
            </a>
          </div>

          {/* Highly booked badge */}
          {isHighlyBooked && (
            <div class="absolute top-6 right-6">
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500 text-white text-xs font-800 shadow-xl animate-pulse">
                🔥 Filling up fast
              </span>
            </div>
          )}

          {/* Property name on hero */}
          <div class="absolute bottom-10 left-6 right-6 max-w-5xl mx-auto">
            <h1 class="text-3xl sm:text-5xl font-900 text-white leading-tight drop-shadow-2xl">
              {property.name}
            </h1>
            {property.address && (
              <p class="mt-2 text-base text-white/90 flex items-center gap-2 font-500">
                <svg width="16" height="16" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M6 0.5C4.07 0.5 2.5 2.07 2.5 4C2.5 6.75 6 11.5 6 11.5C6 11.5 9.5 6.75 9.5 4C9.5 2.07 7.93 0.5 6 0.5ZM6 5.5C5.17 5.5 4.5 4.83 4.5 4C4.5 3.17 5.17 2.5 6 2.5C6.83 2.5 7.5 3.17 7.5 4C7.5 4.83 6.83 5.5 6 5.5Z" />
                </svg>
                {property.address}
              </p>
            )}
          </div>
        </div>

        {/* ── Main Content ─────────────────────────────────────── */}
        <div class="max-w-6xl mx-auto px-6 py-12">
          <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left column: info */}
            <div class="lg:col-span-3 space-y-10">
              {/* Price + trust badges */}
              <div class="flex items-center justify-between pb-6 border-b border-gray-100">
                <div>
                  <span class="text-4xl font-900 text-mint-600">
                    {formatINR(property.basePrice)}
                  </span>
                  <span class="text-gray-400 text-base ml-1 font-500">/ night</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-mint-50 text-mint-700 text-xs font-700">
                    ✨ 0% OTA Commission
                  </span>
                  <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-700">
                    🔒 Verified Stay
                  </span>
                </div>
              </div>

              {/* Direct Booking Callout */}
              <div class="flex items-start gap-4 p-6 rounded-3xl bg-mint-50 border border-mint-100 shadow-sm transition-transform hover:scale-[1.01]">
                <span class="text-2xl mt-0.5">🚀</span>
                <div>
                  <p class="text-base font-800 text-mint-900">
                    The Smart Way to Stay
                  </p>
                  <p class="text-sm text-mint-700 mt-1 leading-relaxed font-500">
                    By booking through istay, you avoid platform fees and help the host earn 100% of their nightly rate. Better service, lower prices.
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 class="text-2xl font-800 text-gray-900 mb-4 tracking-tight">
                  About this property
                </h2>
                <p class="text-base text-gray-600 leading-relaxed whitespace-pre-line font-400">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div>
                  <h2 class="text-2xl font-800 text-gray-900 mb-6 tracking-tight">
                    Premium Amenities
                  </h2>
                  <div class="grid grid-cols-2 gap-4">
                    {property.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        class="flex items-center gap-3 text-base text-gray-600 font-500 p-3 rounded-2xl border border-gray-50 hover:bg-gray-50 transition-colors"
                      >
                        <span class="w-2 h-2 rounded-full bg-mint-500" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Vibe Match Recommendations ──────────────────── */}
              {vibeMatches.length > 0 && (
                <div class="pt-6 border-t border-gray-100" id="vibe-match">
                  <div class="flex items-end justify-between mb-8">
                    <div>
                      <h2 class="text-2xl font-900 text-gray-900 tracking-tight">
                        ✨ Similar Stays You'll Love
                      </h2>
                      <p class="text-sm text-gray-400 mt-1 font-500 uppercase tracking-wider">
                        Handpicked by istay AI for you
                      </p>
                    </div>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {vibeMatches.map((match) => (
                      <a
                        key={match.propId}
                        href={`/p/${match.propId}`}
                        class="group block rounded-[32px] overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white"
                      >
                        {/* Image */}
                        <div class="relative h-44 bg-gray-100 overflow-hidden">
                          {match.imageUrl ? (
                            <img
                              src={match.imageUrl}
                              alt={match.propertyName}
                              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-mint-50 to-emerald-100">
                              <span class="text-5xl opacity-40">🏠</span>
                            </div>
                          )}
                          {/* Match score badge */}
                          <div class="absolute top-3 right-3">
                            <span class="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-900 text-mint-600 shadow-md">
                              {match.score}% MATCH
                            </span>
                          </div>
                        </div>

                        {/* Card body */}
                        <div class="p-6">
                          <h3 class="text-lg font-800 text-gray-900 truncate group-hover:text-mint-500 transition-colors">
                            {match.propertyName}
                          </h3>
                          <p class="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed font-500 italic">
                            "{match.reason}"
                          </p>
                          <div class="flex items-center justify-between mt-5 pt-4 border-t border-gray-50">
                            <span class="text-xl font-900 text-mint-600">
                              {formatINR(match.basePrice)}
                              <span class="text-xs font-500 text-gray-400 ml-1">/NIGHT</span>
                            </span>
                            <div class="w-10 h-10 rounded-full bg-mint-50 flex items-center justify-center group-hover:bg-mint-500 group-hover:text-white transition-all">
                              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                                <path d="M6 12L10 8L6 4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust Footer */}
              <div class="pt-10 border-t border-gray-100 space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="p-4 rounded-2xl bg-gray-50 flex items-center gap-3">
                    <span class="text-xl">💳</span>
                    <div>
                      <p class="text-xs font-800 text-gray-900">Secure Payments</p>
                      <p class="text-[10px] text-gray-500">Processed via Easebuzz Slices API</p>
                    </div>
                  </div>
                  <div class="p-4 rounded-2xl bg-gray-50 flex items-center gap-3">
                    <span class="text-xl">⚖️</span>
                    <div>
                      <p class="text-xs font-800 text-gray-900">Refund Policy</p>
                      <p class="text-[10px] text-gray-500">Standard istay Cancellation Rules</p>
                    </div>
                  </div>
                </div>
                <p class="text-[11px] text-gray-400 text-center px-4 leading-relaxed">
                  istay | Ghaffar Manzil, Okhla, New Delhi, India.<br />
                  All payments are processed securely. By booking, you agree to our <a href="/legal/terms" class="underline hover:text-mint-600 transition-colors">Terms of Service</a>.
                </p>
              </div>
            </div>

            {/* Right column: calendar sticky */}
            <div class="lg:col-span-2">
              <div class="lg:sticky lg:top-10">
                <BookingCalendar
                  blockedDates={blockedDates}
                  basePrice={property.basePrice}
                  propId={property.id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Concierge Chat Bubble */}
      <GuestChat propId={property.id} propertyName={property.name} />
    </>
  );
}
