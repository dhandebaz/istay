import { type Handlers, type PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getPropertyById, listBlockedDates } from "../../utils/db.ts";
import type { Property } from "../../utils/types.ts";
import BookingCalendar from "../../islands/BookingCalendar.tsx";
import GuestChat from "../../islands/GuestChat.tsx";

interface PropertyPageData {
  property: Property;
  blockedDates: string[];
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

    return ctx.render({ property, blockedDates });
  },
};

export default function PropertyPage(
  { data }: PageProps<PropertyPageData>,
) {
  const { property, blockedDates } = data;

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
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
      </Head>

      <div class="min-h-screen bg-white">
        {/* ── Hero Image ──────────────────────────────────────── */}
        <div class="relative h-72 sm:h-96 lg:h-[420px] overflow-hidden bg-gray-100">
          {property.imageUrl
            ? (
              <img
                src={property.imageUrl}
                alt={property.name}
                class="w-full h-full object-cover"
              />
            )
            : (
              <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-50 to-emerald-100">
                <span class="text-8xl opacity-40">🏠</span>
              </div>
            )}

          {/* Gradient overlay */}
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* istay branding on top */}
          <div class="absolute top-4 left-4">
            <a
              href="/"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-700 text-teal-600 shadow-sm hover:bg-white transition-colors"
            >
              <span class="w-4 h-4 rounded bg-teal-500 flex items-center justify-center">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="white"
                  aria-hidden="true"
                >
                  <path
                    d="M5 0.5L0.5 4V9.5H3.5V6.5H6.5V9.5H9.5V4L5 0.5Z"
                    stroke-width="0.3"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              Direct Booking via istay
            </a>
          </div>

          {/* Property name on hero */}
          <div class="absolute bottom-6 left-4 right-4">
            <h1 class="text-2xl sm:text-3xl font-800 text-white leading-tight drop-shadow-lg">
              {property.name}
            </h1>
            {property.address && (
              <p class="mt-1 text-sm text-white/80 flex items-center gap-1">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M6 0.5C4.07 0.5 2.5 2.07 2.5 4C2.5 6.75 6 11.5 6 11.5C6 11.5 9.5 6.75 9.5 4C9.5 2.07 7.93 0.5 6 0.5ZM6 5.5C5.17 5.5 4.5 4.83 4.5 4C4.5 3.17 5.17 2.5 6 2.5C6.83 2.5 7.5 3.17 7.5 4C7.5 4.83 6.83 5.5 6 5.5Z" />
                </svg>
                {property.address}
              </p>
            )}
          </div>
        </div>

        {/* ── Main Content ─────────────────────────────────────── */}
        <div class="max-w-5xl mx-auto px-4 sm:px-6 py-8 lg:py-10">
          <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left column: info */}
            <div class="lg:col-span-3 space-y-7">
              {/* Price + trust badges */}
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-3xl font-800 text-teal-600">
                    {formatINR(property.basePrice)}
                  </span>
                  <span class="text-gray-400 text-sm ml-1">/ night</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-600">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M1 5.5L4 8.5L10 2.5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    No OTA commission
                  </span>
                  <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-600">
                    🔒 Secure
                  </span>
                </div>
              </div>

              {/* Why istay callout */}
              <div class="flex items-start gap-3 p-4 rounded-2xl bg-teal-50 border border-teal-100">
                <span class="text-xl mt-0.5">💡</span>
                <div>
                  <p class="text-sm font-700 text-teal-800">
                    Book directly and save
                  </p>
                  <p class="text-xs text-teal-600 mt-0.5 leading-relaxed">
                    By booking through istay instead of Airbnb, the host earns more and you save on platform fees.
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 class="text-lg font-700 text-gray-900 mb-2">
                  About this property
                </h2>
                <p class="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div>
                  <h2 class="text-lg font-700 text-gray-900 mb-3">
                    Amenities
                  </h2>
                  <div class="grid grid-cols-2 gap-2">
                    {property.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        class="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          aria-hidden="true"
                        >
                          <circle cx="7" cy="7" r="6" stroke="#14b8a6" stroke-width="1.5" />
                          <path d="M4 7L6.5 9.5L10 5" stroke="#14b8a6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust + legal */}
              <div class="flex flex-col gap-2 pt-2 border-t border-gray-100">
                <p class="text-xs text-gray-400">
                  Payments handled securely by{" "}
                  <span class="font-600 text-gray-500">Cashfree Payments</span>.
                  5% platform fee applies (included in nightly rate).
                  By booking, you agree to our{" "}
                  <a href="/legal/terms" class="underline hover:text-teal-600">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a
                    href="/legal/cancellation"
                    class="underline hover:text-teal-600"
                  >
                    Cancellation Policy
                  </a>.
                </p>
                <p class="text-xs text-gray-400">
                  Operated by{" "}
                  <span class="font-500 text-gray-500">
                    Chishti Ventures Pvt. Ltd.
                  </span>
                  , Mumbai.
                </p>
              </div>
            </div>

            {/* Right column: calendar sticky */}
            <div class="lg:col-span-2">
              <div class="lg:sticky lg:top-6">
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
}
