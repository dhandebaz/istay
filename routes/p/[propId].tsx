import { type Handlers, type PageProps } from "$fresh/server.ts";
import Header from "../../islands/Header.tsx";
import Footer from "../../components/Footer.tsx";
import SEOMeta from "../../components/SEOMeta.tsx";
import { HomeIcon, MapPinIcon, CheckIcon, StarIcon } from "../../components/Icons.tsx";
import {
  getBookingById,
  getGuestVerification,
  getKnowledgeByPropId,
  getPropertyById,
  listBlockedDates,
  listReviews,
  recordPropertyView,
} from "../../utils/db.ts";
import { getVibeMatches } from "../../utils/recommendations.ts";
import { getDynamicPrice } from "../../utils/pricing.ts";

import type {
  Booking,
  GuestVerification,
  HostKnowledge,
  Property,
  Review,
  VibeMatch,
} from "../../utils/types.ts";
import BookingCalendar from "../../islands/BookingCalendar.tsx";
import BookingFlow from "../../islands/BookingFlow.tsx";
import GuestChat from "../../islands/GuestChat.tsx";

interface PropertyPageData {
  property: Property;
  blockedDates: string[];
  vibeMatches: VibeMatch[];
  isHighlyBooked: boolean;
  dynamicBasePrice: number;
  yieldRules: string[];
  reviews: Review[];

  bookingData?: {
    booking: Booking;
    verification: GuestVerification | null;
    knowledge: HostKnowledge | null;
  };
}

export const handler: Handlers<PropertyPageData> = {
  GET: async (req, ctx) => {
    const { propId } = ctx.params;
    const url = new URL(req.url);
    const bookingId = url.searchParams.get("bookingId");
    const property = await getPropertyById(propId);

    if (!property || property.status !== "active") {
      return ctx.renderNotFound();
    }

    recordPropertyView(propId).catch(console.error);

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

    // Dynamic Pricing (Yield Management)
    const todayStr = today.toISOString().slice(0, 10);
    const pricingRes = await getDynamicPrice(
      propId,
      property.basePrice,
      todayStr,
    );
    const dynamicBasePrice = pricingRes.finalPrice;
    const yieldRules = pricingRes.appliedRules;

    // If highly booked, fetch Vibe Match recommendations (availability-aware)
    let vibeMatches: VibeMatch[] = [];
    if (isHighlyBooked) {
      try {
        const checkIn = url.searchParams.get("checkIn");
        const checkOut = url.searchParams.get("checkOut");
        vibeMatches = await getVibeMatches(
          propId,
          checkIn || undefined,
          checkOut || undefined,
        );
      } catch (err) {
        console.error("[propPage] Vibe match error:", err);
      }
    }

    let bookingData;
    if (bookingId) {
      const booking = await getBookingById(bookingId);
      if (booking && booking.propertyId === propId) {
        const [verification, knowledge] = await Promise.all([
          getGuestVerification(bookingId),
          getKnowledgeByPropId(propId),
        ]);
        bookingData = { booking, verification, knowledge };
      }
    }

    const reviews = await listReviews(propId);

    return ctx.render({
      property,
      blockedDates,
      vibeMatches,
      isHighlyBooked,
      dynamicBasePrice,
      yieldRules,
      bookingData,
      reviews,
    });
  },
};

export default function PropertyPage(
  { data }: PageProps<PropertyPageData>,
) {
  const { property, blockedDates, vibeMatches, isHighlyBooked, bookingData, reviews } =
    data;

  return (
    <>
      <SEOMeta 
        title={`${property.name} | istay`}
        description={property.description?.substring(0, 160)}
        image={property.imageUrl}
        type="website"
      />
      <Head>
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 640px) {
            .mobile-sticky-bar {
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              z-index: 50;
              padding: 1rem 1.5rem;
              background: rgba(255, 255, 255, 0.9);
              backdrop-filter: blur(12px);
              border-top: 1px solid rgba(0, 0, 0, 0.05);
              display: flex;
              align-items: center;
              justify-content: space-between;
              box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.05);
            }
          }
          @media (min-width: 641px) {
            .mobile-sticky-bar { display: none; }
          }
        `}} />
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
                <HomeIcon class="w-2.5 h-2.5 text-white" />
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
                <MapPinIcon class="w-4 h-4" />
                {property.address}
              </p>
            )}
          </div>
        </div>

        {/* ── Main Content ─────────────────────────────────────── */}
        <div class="max-w-6xl mx-auto px-6 py-6 md:py-12 pb-32 sm:pb-12">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" class="mb-6">
            <ol class="flex items-center space-x-2 text-sm text-gray-500 font-500">
              <li>
                <a href="/" class="hover:text-mint-600 transition-colors">Home</a>
              </li>
              <li>
                <svg class="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                <div class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint-50 text-mint-700 text-[10px] font-800 uppercase tracking-widest border border-mint-100">
                  <CheckIcon class="w-2.5 h-2.5" strokeWidth="3" />
                  Verified Host
                </div>
              </li>
              <li>
                <div class="w-1 h-1 rounded-full bg-gray-300" />
              </li>
              <li>
                <a href="/search" class="hover:text-mint-600 transition-colors">Search</a>
              </li>
              {property.address && (
                <>
                  <li>
                    <svg class="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </li>
                  <li class="capitalize">
                    <a 
                      href={`/search?q=${encodeURIComponent(property.address.split(',').slice(-3, -2)[0]?.trim() || property.address.split(',').slice(-2, -1)[0]?.trim() || "India")}`} 
                      class="hover:text-mint-600 transition-colors"
                    >
                      {property.address.split(',').slice(-3, -2)[0]?.trim() || property.address.split(',').slice(-2, -1)[0]?.trim() || "India"}
                    </a>
                  </li>
                </>
              )}
              <li>
                <svg class="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li class="text-gray-900 font-600 truncate max-w-[200px] sm:max-w-xs" aria-current="page">
                {property.name}
              </li>
            </ol>
          </nav>

          <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left column: info */}
            <div class="lg:col-span-3 space-y-10">
              {/* Price + trust badges */}
              <div class="flex items-center justify-between pb-6 border-b border-gray-100">
                <div>
                  <span class="text-4xl font-900 text-mint-600">
                    {formatINR(data.dynamicBasePrice)}
                  </span>

                  <span class="text-gray-400 text-base ml-1 font-500">
                    / night
                  </span>
                </div>
                <div class="flex items-center gap-3">
                  {data.yieldRules.map((rule) => (
                    <span
                      key={rule}
                      class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-800 uppercase tracking-tight"
                    >
                      ⚡ {rule}
                    </span>
                  ))}
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
                    By booking through istay, you avoid platform fees and help
                    the host earn 100% of their nightly rate. Better service,
                    lower prices.
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
                          {match.imageUrl
                            ? (
                              <img
                                src={match.imageUrl}
                                alt={match.propertyName}
                                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            )
                            : (
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
                              <span class="text-xs font-500 text-gray-400 ml-1">
                                /NIGHT
                              </span>
                            </span>
                            <div class="w-10 h-10 rounded-full bg-mint-50 flex items-center justify-center group-hover:bg-mint-500 group-hover:text-white transition-all">
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 16 16"
                                fill="none"
                                stroke="currentColor"
                              >
                                <path
                                  d="M6 12L10 8L6 4"
                                  stroke-width="2.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Reviews Section ──────────────────────────── */}
              <div class="pt-10 border-t border-gray-100" id="reviews">
                <div class="flex items-center justify-between mb-8">
                  <div>
                    <h2 class="text-2xl font-900 text-gray-900 tracking-tight">
                      Guest Reviews
                    </h2>
                    <div class="flex items-center gap-2 mt-1">
                      <div class="flex items-center text-amber-400">
                        <StarIcon class="w-4 h-4 fill-current" />
                        <StarIcon class="w-4 h-4 fill-current" />
                        <StarIcon class="w-4 h-4 fill-current" />
                        <StarIcon class="w-4 h-4 fill-current" />
                        <StarIcon class="w-4 h-4 fill-current" />
                      </div>
                      <span class="text-xs font-700 text-gray-400 uppercase tracking-wider">
                        {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
                      </span>
                    </div>
                  </div>
                </div>

                {reviews.length === 0 ? (
                  <div class="p-8 rounded-3xl bg-gray-50 border border-gray-100 text-center">
                    <p class="text-sm text-gray-400 font-500 italic">
                      No reviews yet for this property.
                    </p>
                  </div>
                ) : (
                  <div class="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} class="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div class="flex items-center justify-between mb-4">
                          <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-istay-900 flex items-center justify-center text-white text-sm font-800">
                              {review.guestName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p class="text-sm font-800 text-gray-900">{review.guestName}</p>
                              <p class="text-[10px] text-gray-400 font-500 uppercase tracking-widest">
                                {new Date(review.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                              </p>
                            </div>
                          </div>
                          
                          {/* Badge based on source */}
                          <div class={`px-3 py-1 rounded-full text-[9px] font-900 uppercase tracking-wider border ${
                            review.source === "direct" 
                              ? "bg-mint-50 text-mint-700 border-mint-100" 
                              : "bg-orange-50 text-orange-700 border-orange-100"
                          }`}>
                            {review.source === "direct" ? "✓ Verified Guest" : review.sourceLabel}
                          </div>
                        </div>
                        
                        <div class="flex items-center gap-1 mb-3 text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <StarIcon key={i} class={`w-3 h-3 ${i < review.rating ? "fill-current" : "text-gray-200"}`} />
                          ))}
                        </div>
                        
                        <p class="text-sm text-gray-600 leading-relaxed italic">
                          "{review.comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Trust Footer */}
              <div class="pt-10 border-t border-gray-100 space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="p-4 rounded-2xl bg-gray-50 flex items-center gap-3">
                    <span class="text-xl">💳</span>
                    <div>
                      <p class="text-xs font-800 text-gray-900">
                        Secure Payments
                      </p>
                      <p class="text-[10px] text-gray-500">
                        Processed via Easebuzz Slices API
                      </p>
                    </div>
                  </div>
                  <div class="p-4 rounded-2xl bg-gray-50 flex items-center gap-3">
                    <span class="text-xl">⚖️</span>
                    <div>
                      <p class="text-xs font-800 text-gray-900">
                        Refund Policy
                      </p>
                      <p class="text-[10px] text-gray-500">
                        Standard istay Cancellation Rules
                      </p>
                    </div>
                  </div>
                </div>
                <p class="text-[11px] text-gray-400 text-center px-4 leading-relaxed">
                  istay | Ghaffar Manzil, Okhla, New Delhi, India.<br />
                  All payments are processed securely. By booking, you agree to
                  our{" "}
                  <a
                    href="/legal/terms"
                    class="underline hover:text-mint-600 transition-colors"
                  >
                    Terms of Service
                  </a>.
                </p>
              </div>
            </div>

            {/* Right column: calendar sticky OR Booking Flow */}
            <div class="lg:col-span-2" id="booking-section">
              <div class="lg:sticky lg:top-10">
                {bookingData
                  ? (
                    <BookingFlow
                      bookingId={bookingData.booking.id}
                      guestName={bookingData.booking.guestName}
                      checkIn={bookingData.booking.checkIn}
                      checkOut={bookingData.booking.checkOut}
                      status={bookingData.booking.status}
                      verificationStatus={bookingData.verification?.status ||
                        "pending"}
                      instructionsContent={bookingData.knowledge?.content}
                      propertyName={property.name}
                      propertyImage={property.imageUrl}
                    />
                  )
                  : (
                    <BookingCalendar
                      blockedDates={blockedDates}
                      basePrice={data.dynamicBasePrice}
                      propId={property.id}
                    />
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Booking Bar */}
      <div class="mobile-sticky-bar">
        <div class="flex flex-col">
          <span class="text-xl font-900 text-mint-600">
            {formatINR(data.dynamicBasePrice)}
          </span>
          <span class="text-[10px] font-700 text-gray-400 uppercase tracking-widest">
            per night
          </span>
        </div>
        <button 
          onClick={() => {
            const el = document.getElementById("booking-section");
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          class="px-8 py-3 rounded-full bg-mint-500 text-istay-900 font-900 text-sm shadow-lg shadow-mint-500/20 active:scale-95 transition-all"
        >
          Check Availability
        </button>
      </div>

      {/* AI Concierge Chat Bubble */}
      <GuestChat
        propId={property.id}
        propertyName={property.name}
        propertyImage={property.imageUrl}
      />
    </>
  );
}
