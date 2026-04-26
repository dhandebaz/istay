import { type Handlers, type PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
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

    const today = new Date();
    const next30 = new Set<string>();
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      next30.add(d.toISOString().slice(0, 10));
    }
    const blockedNext30 = blockedDates.filter((d) => next30.has(d)).length;
    const isHighlyBooked = blockedNext30 >= 18;

    const todayStr = today.toISOString().slice(0, 10);
    const pricingRes = await getDynamicPrice(
      propId,
      property.basePrice,
      todayStr,
    );
    const dynamicBasePrice = pricingRes.finalPrice;
    const yieldRules = pricingRes.appliedRules;

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

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n || 0);

  return (
    <>
      <SEOMeta 
        title={`${property.name} | iStay Professional Residency`}
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
              padding: 1.5rem 2rem;
              background: rgba(255, 255, 255, 0.9);
              backdrop-filter: blur(24px);
              border-top: 1px solid rgba(0, 0, 0, 0.03);
              display: flex;
              align-items: center;
              justify-content: space-between;
              box-shadow: 0 -15px 50px rgba(0, 0, 0, 0.1);
              border-radius: 2.5rem 2.5rem 0 0;
            }
          }
          @media (min-width: 641px) {
            .mobile-sticky-bar { display: none; }
          }
        `}} />
      </Head>

      <div class="min-h-screen bg-white font-sans selection:bg-emerald-100">
        {/* ── Property Hero ──────────────────────────────────────── */}
        <div class="relative h-[450px] sm:h-[600px] lg:h-[750px] overflow-hidden bg-gray-50 lg:rounded-b-[4rem] shadow-premium-lg">
          {property.imageUrl
            ? (
              <img
                src={property.imageUrl}
                alt={property.name}
                class="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[3000ms] ease-out"
              />
            )
            : (
              <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100/30">
                <span class="text-[10rem] opacity-20 filter grayscale">🏠</span>
              </div>
            )}

          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div class="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent hidden lg:block" />

          <div class="absolute top-10 left-10 right-10 flex items-center justify-between z-20">
            <a
              href="/"
              class="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-[10px] font-bold text-white uppercase tracking-[0.2em] hover:bg-white hover:text-gray-900 transition-all duration-500 shadow-premium group"
            >
              <div class="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center shadow-premium transition-transform group-hover:rotate-12">
                <HomeIcon class="w-4 h-4 text-white" />
              </div>
              Direct Residency Protocol
            </a>

            {isHighlyBooked && (
              <span class="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-premium-lg border border-emerald-400/30 animate-fade-in">
                <span class="w-2 h-2 rounded-full bg-white animate-pulse" />
                High Occupancy Threshold
              </span>
            )}
          </div>

          <div class="absolute bottom-16 left-10 right-10 max-w-7xl mx-auto z-10">
            <div class="max-w-5xl space-y-8">
              <h1 class="text-5xl sm:text-7xl lg:text-9xl font-bold text-white leading-[0.9] tracking-tighter drop-shadow-premium animate-slide-up">
                {property.name}
              </h1>
              {property.address && (
                <div class="flex flex-wrap items-center gap-8 animate-slide-up delay-100">
                  <p class="text-xl text-white/90 flex items-center gap-3 font-bold uppercase tracking-[0.2em] text-[13px]">
                    <MapPinIcon class="w-6 h-6 text-emerald-400" />
                    {property.address}
                  </p>
                  <div class="h-1.5 w-1.5 rounded-full bg-white/40 hidden sm:block" />
                  <div class="flex items-center gap-4">
                    <div class="flex items-center text-emerald-400 gap-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <StarIcon key={i} class="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <span class="text-white/60 text-[11px] font-bold uppercase tracking-[0.3em]">
                      Professional Curation
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Main Residency Details ──────────────────────────────── */}
        <div class="max-w-7xl mx-auto px-10 py-16 lg:py-28 pb-48 sm:pb-28">
          <nav aria-label="Breadcrumb" class="mb-20">
            <ol class="flex flex-wrap items-center gap-4 text-[11px] font-bold text-gray-300 uppercase tracking-[0.2em]">
              <li>
                <a href="/" class="hover:text-emerald-600 transition-colors">Network</a>
              </li>
              <li class="opacity-20">/</li>
              <li>
                <div class="flex items-center gap-2.5 px-4 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
                  <CheckIcon class="w-3.5 h-3.5" strokeWidth="4" />
                  Bespoke Authenticated
                </div>
              </li>
              <li class="opacity-20">/</li>
              <li>
                <a href="/search" class="hover:text-emerald-600 transition-colors">Portfolio</a>
              </li>
              {property.address && (
                <>
                  <li class="opacity-20">/</li>
                  <li>
                    <span class="hover:text-emerald-600 transition-colors cursor-default">
                      {property.address.split(',').slice(-3, -2)[0]?.trim() || property.address.split(',').slice(-2, -1)[0]?.trim() || "India"}
                    </span>
                  </li>
                </>
              )}
              <li class="opacity-20">/</li>
              <li class="text-gray-900 truncate max-w-[150px] sm:max-w-xs" aria-current="page">
                {property.name}
              </li>
            </ol>
          </nav>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32">
            <div class="lg:col-span-7 space-y-24">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-12 pb-16 border-b border-gray-50">
                <div class="space-y-3">
                  <div class="flex items-baseline gap-3">
                    <span class="text-6xl font-bold text-gray-900 tracking-tighter">
                      {formatINR(data.dynamicBasePrice)}
                    </span>
                    <span class="text-gray-300 text-sm font-bold uppercase tracking-[0.2em]">
                      / residency
                    </span>
                  </div>
                  <div class="flex flex-wrap items-center gap-3">
                    {data.yieldRules.map((rule) => (
                      <span
                        key={rule}
                        class="px-4 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest border border-emerald-100"
                      >
                        ⚡ {rule}
                      </span>
                    ))}
                  </div>
                </div>
                <div class="flex flex-wrap items-center gap-4">
                  <div class="group relative">
                    <span class="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gray-900 text-white text-[11px] font-bold uppercase tracking-[0.2em] shadow-premium transition-all hover:bg-emerald-600 cursor-help">
                      ✨ Professional Yield Advantage
                    </span>
                    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 p-6 bg-gray-900 text-white text-[12px] font-medium rounded-3xl shadow-premium-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 leading-relaxed z-30 border border-white/10">
                      By prioritizing direct residency, you eliminate up to 20% in OTA fee volatility.
                    </div>
                  </div>
                </div>
              </div>

              <div class="relative p-12 rounded-[3.5rem] bg-emerald-50/30 border border-emerald-100 shadow-sm overflow-hidden group">
                <div class="absolute -right-16 -top-16 text-[12rem] opacity-5 filter grayscale group-hover:rotate-12 transition-transform duration-1000">🏠</div>
                <div class="relative z-10 space-y-6">
                  <h3 class="text-2xl font-bold text-emerald-900 tracking-tight flex items-center gap-4">
                    <div class="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-base shadow-premium">✓</div>
                    The Bespoke Residency Experience
                  </h3>
                  <p class="text-[15px] text-emerald-800/70 leading-relaxed font-medium">
                    Choosing an iStay synchronized residency ensures your net yield supports the professionals curating your stay. Experience a high-trust, low-overhead environment tailored for professional travelers.
                  </p>
                </div>
              </div>

              <div class="space-y-10">
                <div class="flex items-center gap-6">
                  <h2 class="text-4xl font-bold text-gray-900 tracking-tighter">
                    The Accommodations
                  </h2>
                  <div class="h-px flex-1 bg-gray-50" />
                </div>
                <p class="text-lg text-gray-400 leading-relaxed whitespace-pre-line font-medium opacity-90">
                  {property.description}
                </p>
              </div>

              {property.amenities && property.amenities.length > 0 && (
                <div class="space-y-12">
                  <div class="flex items-center gap-6">
                    <h2 class="text-4xl font-bold text-gray-900 tracking-tighter">
                      Bespoke Amenities
                    </h2>
                    <div class="h-px flex-1 bg-gray-50" />
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {property.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        class="flex items-center gap-6 p-7 rounded-[2rem] border border-gray-50 bg-white hover:border-emerald-100 hover:bg-emerald-50/10 transition-all duration-500 group"
                      >
                        <div class="w-14 h-14 rounded-2xl bg-gray-50 text-emerald-500 flex items-center justify-center text-2xl group-hover:bg-white group-hover:shadow-premium transition-all">
                          ✨
                        </div>
                        <span class="text-[15px] font-bold text-gray-700 tracking-tight">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {vibeMatches.length > 0 && (
                <div class="pt-24 border-t border-gray-50" id="vibe-match">
                  <div class="flex items-end justify-between mb-16">
                    <div class="space-y-2">
                      <h2 class="text-4xl font-bold text-gray-900 tracking-tighter">
                        Reciprocal Recommendations
                      </h2>
                      <p class="text-[11px] font-bold text-gray-300 uppercase tracking-[0.3em]">
                        Autonomous Curation for Guest Preferences
                      </p>
                    </div>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {vibeMatches.map((match) => (
                      <a
                        key={match.propId}
                        href={`/p/${match.propId}`}
                        class="group block rounded-[3rem] overflow-hidden border border-gray-50 shadow-premium hover:shadow-premium-lg transition-all duration-700 hover:-translate-y-3 bg-white"
                      >
                        <div class="relative h-64 bg-gray-50 overflow-hidden">
                          {match.imageUrl
                            ? (
                              <img
                                src={match.imageUrl}
                                alt={match.propertyName}
                                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                              />
                            )
                            : (
                              <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100/30">
                                <span class="text-7xl opacity-20 filter grayscale">🏠</span>
                              </div>
                            )}
                          <div class="absolute top-6 right-6">
                            <span class="px-5 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md shadow-premium text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em] border border-emerald-50">
                              {match.score}% Compatibility
                            </span>
                          </div>
                        </div>

                        <div class="p-10">
                          <h3 class="text-2xl font-bold text-gray-900 truncate group-hover:text-emerald-600 transition-colors tracking-tight">
                            {match.propertyName}
                          </h3>
                          <p class="text-[12px] text-gray-400 mt-4 line-clamp-2 leading-relaxed font-bold uppercase tracking-[0.15em] italic opacity-60">
                            "{match.reason}"
                          </p>
                          <div class="flex items-center justify-between mt-10 pt-8 border-t border-gray-50">
                            <div class="flex flex-col">
                              <span class="text-3xl font-bold text-gray-900 tracking-tight">
                                {formatINR(match.basePrice)}
                              </span>
                              <span class="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] mt-1">
                                Net Residency
                              </span>
                            </div>
                            <div class="w-14 h-14 rounded-[1.5rem] bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white group-hover:shadow-premium transition-all duration-500">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div class="pt-24 border-t border-gray-50" id="reviews">
                <div class="flex items-center justify-between mb-16">
                  <div class="space-y-3">
                    <h2 class="text-4xl font-bold text-gray-900 tracking-tighter">
                      Stay Testimonials
                    </h2>
                    <div class="flex items-center gap-4">
                      <div class="flex items-center text-emerald-500 gap-1">
                        {[1, 2, 3, 4, 5].map(i => (
                          <StarIcon key={i} class="w-5 h-5 fill-current" />
                        ))}
                      </div>
                      <span class="text-[11px] font-bold text-gray-300 uppercase tracking-[0.3em]">
                        {reviews.length} Synchronized Experiences
                      </span>
                    </div>
                  </div>
                </div>

                {reviews.length === 0 ? (
                  <div class="p-20 rounded-[3.5rem] bg-gray-50/50 border border-gray-50 text-center space-y-6">
                    <div class="text-6xl filter grayscale opacity-10">💬</div>
                    <p class="text-[11px] text-gray-300 font-bold uppercase tracking-[0.3em]">
                      Initial Residency Curation Pending
                    </p>
                  </div>
                ) : (
                  <div class="space-y-10">
                    {reviews.map((review) => (
                      <div key={review.id} class="p-12 rounded-[3rem] bg-white border border-gray-50 shadow-premium hover:shadow-premium-lg transition-all duration-700 group">
                        <div class="flex items-center justify-between mb-10">
                          <div class="flex items-center gap-5">
                            <div class="w-16 h-16 rounded-[1.5rem] bg-gray-900 flex items-center justify-center text-white text-2xl font-bold shadow-premium group-hover:bg-emerald-600 transition-all duration-700">
                              {review.guestName.charAt(0).toUpperCase()}
                            </div>
                            <div class="space-y-1">
                              <p class="text-xl font-bold text-gray-900 tracking-tight">{review.guestName}</p>
                              <p class="text-[11px] text-gray-300 font-bold uppercase tracking-[0.2em]">
                                {new Date(review.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                              </p>
                            </div>
                          </div>
                          
                          <div class={`px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] border transition-colors ${
                            review.source === "direct" 
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                              : "bg-gray-50 text-gray-400 border-gray-100"
                          }`}>
                            {review.source === "direct" ? "✓ Synchronized Guest" : review.sourceLabel}
                          </div>
                        </div>
                        
                        <div class="flex items-center gap-1.5 mb-6 text-emerald-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <StarIcon key={i} class={`w-5 h-5 ${i < review.rating ? "fill-current" : "text-gray-100"}`} />
                          ))}
                        </div>
                        
                        <p class="text-lg text-gray-400 leading-relaxed font-medium italic opacity-80">
                          "{review.comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div class="pt-24 border-t border-gray-50 space-y-8">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div class="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-50 flex items-center gap-6 transition-all hover:bg-white hover:shadow-premium group">
                    <div class="w-16 h-16 rounded-[1.5rem] bg-white shadow-sm border border-gray-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">💳</div>
                    <div class="space-y-1">
                      <p class="text-[12px] font-bold text-gray-900 uppercase tracking-[0.2em]">
                        Secure Protocol
                      </p>
                      <p class="text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">
                        256-Bit Synchronization
                      </p>
                    </div>
                  </div>
                  <div class="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-50 flex items-center gap-6 transition-all hover:bg-white hover:shadow-premium group">
                    <div class="w-16 h-16 rounded-[1.5rem] bg-white shadow-sm border border-gray-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">⚖️</div>
                    <div class="space-y-1">
                      <p class="text-[12px] font-bold text-gray-900 uppercase tracking-[0.2em]">
                        Host Guarantee
                      </p>
                      <p class="text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">
                        Bespoke Coverage Charter
                      </p>
                    </div>
                  </div>
                </div>
                <div class="text-center px-10 pt-8 space-y-6">
                  <p class="text-[10px] text-gray-300 font-bold uppercase tracking-[0.4em] leading-loose">
                    iStay Professional Hospitality Network | Okhla, New Delhi, India<br />
                    Proprietary Protocol for Global Residency Management
                  </p>
                  <div class="flex items-center justify-center gap-10">
                    <a href="/legal/terms" class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] hover:text-emerald-600 transition-colors">Network Terms</a>
                    <a href="/legal/privacy" class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] hover:text-emerald-600 transition-colors">Privacy Charter</a>
                  </div>
                </div>
              </div>
            </div>

            <div class="lg:col-span-5" id="booking-section">
              <div class="lg:sticky lg:top-24">
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

      {/* Mobile Sticky Action Bar */}
      <div class="mobile-sticky-bar">
        <div class="flex flex-col gap-1">
          <span class="text-3xl font-bold text-gray-900 tracking-tighter">
            {formatINR(data.dynamicBasePrice)}
          </span>
          <span class="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">
            Net Residency
          </span>
        </div>
        <button 
          onClick={() => {
            const el = document.getElementById("booking-section");
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          class="px-12 py-5 rounded-[1.5rem] bg-gray-900 text-white font-bold text-[11px] uppercase tracking-[0.2em] shadow-premium active:scale-95 transition-all duration-500"
        >
          Request Residency
        </button>
      </div>

      <GuestChat
        propId={property.id}
        propertyName={property.name}
        propertyImage={property.imageUrl}
      />

      <Footer />
    </>
  );
}

