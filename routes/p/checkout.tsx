import { type Handlers, type PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getPropertyById } from "../../utils/db.ts";
import type { Property } from "../../utils/types.ts";
import CheckoutForm from "../../islands/CheckoutForm.tsx";

interface CheckoutData {
  property: Property;
  checkIn: string;
  checkOut: string;
  nights: number;
  amount: number;
}

export const handler: Handlers<CheckoutData> = {
  GET: async (req, ctx) => {
    const url = new URL(req.url);
    const propId = url.searchParams.get("propId") ?? "";
    const checkIn = url.searchParams.get("checkIn") ?? "";
    const checkOut = url.searchParams.get("checkOut") ?? "";
    const nights = Math.max(1, Number(url.searchParams.get("nights") ?? "1"));

    if (!propId || !checkIn || !checkOut) {
      return new Response(null, {
        status: 302,
        headers: { Location: "/" },
      });
    }

    const property = await getPropertyById(propId);
    if (!property || property.status !== "active") {
      return ctx.renderNotFound();
    }

    const amount = nights * property.basePrice;
    return ctx.render({ property, checkIn, checkOut, nights, amount });
  },
};

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function CheckoutPage({ data }: PageProps<CheckoutData>) {
  const { property, checkIn, checkOut, nights, amount } = data;

  return (
    <>
      <Head>
        <title>Complete Booking — {property.name} | istay</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div class="min-h-screen bg-gray-50">
        {/* Top Bar */}
        <header class="bg-white border-b border-gray-100 py-4 px-4 sm:px-6">
          <div class="max-w-3xl mx-auto flex items-center justify-between">
            <a href="/" class="flex items-center gap-2 group transition-transform hover:scale-[1.02] active:scale-95">
              <img src="/logo.svg" alt="istay logo" class="h-6 w-auto" />
            </a>
            <div class="flex items-center gap-1.5 text-xs text-gray-400">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <rect x="1" y="1" width="11" height="11" rx="2" stroke="#d1d5db" stroke-width="1.25" />
                <path d="M4 6.5L5.5 8L9 4.5" stroke="#00E676" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Secure Checkout
            </div>
          </div>
        </header>

        <div class="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* ── Booking Summary ────────────────────────────── */}
            <div class="md:col-span-2 order-2 md:order-1">
              <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-6">
                {/* Property image */}
                {property.imageUrl && (
                  <img
                    src={property.imageUrl}
                    alt={property.name}
                    class="w-full h-36 object-cover"
                  />
                )}
                <div class="p-5 space-y-4">
                  <div>
                    <h2 class="font-700 text-gray-900 text-base leading-tight">
                      {property.name}
                    </h2>
                    {property.address && (
                      <p class="text-xs text-gray-400 mt-0.5">
                        📍 {property.address}
                      </p>
                    )}
                  </div>

                  {/* Date range */}
                  <div class="flex items-center gap-2 p-3 rounded-xl bg-gray-50 text-sm">
                    <div class="flex-1">
                      <p class="text-xs text-gray-400 font-500">Check-in</p>
                      <p class="font-700 text-gray-900">
                        {formatDate(checkIn)}
                      </p>
                    </div>
                    <div class="text-gray-300 text-lg">→</div>
                    <div class="flex-1 text-right">
                      <p class="text-xs text-gray-400 font-500">Check-out</p>
                      <p class="font-700 text-gray-900">
                        {formatDate(checkOut)}
                      </p>
                    </div>
                  </div>

                  {/* Price breakdown */}
                  <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-500">
                        {formatINR(property.basePrice)} × {nights} night
                        {nights > 1 ? "s" : ""}
                      </span>
                      <span class="font-600 text-gray-900">
                        {formatINR(amount)}
                      </span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-400">Platform fee (5%)</span>
                      <span class="text-gray-400">Included</span>
                    </div>
                    <div class="border-t border-gray-100 pt-2 flex justify-between">
                      <span class="font-700 text-gray-900">Total</span>
                      <span class="font-800 text-istay-900 text-lg">
                        {formatINR(amount)}
                      </span>
                    </div>
                  </div>

                  {/* Change dates */}
                  <a
                    href={`/p/${property.id}`}
                    class="block text-center text-xs text-istay-900 hover:text-istay-800 font-500 transition-colors"
                  >
                    ← Change dates
                  </a>
                </div>
              </div>
            </div>

            {/* ── Checkout Form ──────────────────────────────── */}
            <div class="md:col-span-3 order-1 md:order-2">
              <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h1 class="text-xl font-800 text-gray-900 mb-1">
                  Guest Details
                </h1>
                <p class="text-sm text-gray-400 mb-6">
                  Enter your details to secure your stay.
                </p>

                <CheckoutForm
                  propId={property.id}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  nights={nights}
                  amount={amount}
                  propertyName={property.name}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
