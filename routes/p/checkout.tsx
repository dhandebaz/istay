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
        <title>Initialize Residency Request — {property.name} | istay</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div class="min-h-screen bg-gray-50/50">
        {/* Top Bar */}
        <header class="bg-white border-b border-gray-50 py-6 px-6 sm:px-10 sticky top-0 z-50 backdrop-blur-xl bg-white/80">
          <div class="max-w-5xl mx-auto flex items-center justify-between">
            <a
              href="/"
              class="flex items-center gap-3 group transition-all hover:scale-[1.02] active:scale-95"
            >
              <img src="/logo.svg" alt="istay logo" class="h-7 w-auto" />
            </a>
            <div class="flex items-center gap-3 px-4 py-2 rounded-2xl bg-gray-50 border border-gray-100 shadow-inner">
              <div class="relative w-2 h-2">
                 <div class="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                 <div class="absolute inset-0 rounded-full bg-emerald-500" />
              </div>
              <span class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Secure Protocol Active</span>
            </div>
          </div>
        </header>

        <div class="max-w-5xl mx-auto px-6 sm:px-10 py-12">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* ── Residency Valuation ────────────────────────────── */}
            <div class="lg:col-span-5 order-2 lg:order-1 lg:sticky lg:top-32">
              <div class="bg-white rounded-[3rem] border border-gray-50 shadow-premium-lg overflow-hidden transition-all duration-700 hover:shadow-premium-xl group animate-fade-in">
                {/* Property image */}
                {property.imageUrl && (
                  <div class="relative h-48 overflow-hidden">
                    <img
                      src={property.imageUrl}
                      alt={property.name}
                      class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
                  </div>
                )}
                <div class="p-8 space-y-8">
                  <div class="space-y-2">
                    <h2 class="text-2xl font-bold text-gray-900 tracking-tighter leading-tight">
                      {property.name}
                    </h2>
                    {property.address && (
                      <p class="text-[11px] font-bold text-gray-400 uppercase tracking-widest opacity-60 italic">
                        📍 {property.address}
                      </p>
                    )}
                  </div>

                  {/* Date range */}
                  <div class="grid grid-cols-2 gap-4 p-6 rounded-[2rem] bg-gray-50/50 border border-gray-100 relative group/dates">
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-300 shadow-premium group-hover/dates:rotate-180 transition-all duration-700">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    
                    <div class="space-y-1">
                      <p class="text-[10px] font-bold text-gray-300 uppercase tracking-widest italic">Arrival</p>
                      <p class="text-[15px] font-bold text-gray-900 tracking-tight">
                        {formatDate(checkIn)}
                      </p>
                    </div>
                    <div class="text-right space-y-1">
                      <p class="text-[10px] font-bold text-gray-300 uppercase tracking-widest italic">Departure</p>
                      <p class="text-[15px] font-bold text-gray-900 tracking-tight">
                        {formatDate(checkOut)}
                      </p>
                    </div>
                  </div>

                  {/* Price breakdown */}
                  <div class="space-y-4">
                    <div class="flex justify-between items-center text-[13px] font-medium text-gray-500">
                      <span class="italic opacity-60">
                        {formatINR(property.basePrice)} × {nights} Operational Night{nights > 1 ? "s" : ""}
                      </span>
                      <span class="font-bold text-gray-900">
                        {formatINR(amount)}
                      </span>
                    </div>
                    <div class="flex justify-between items-center text-[13px] font-medium text-gray-400">
                      <span class="italic opacity-60 underline decoration-gray-100 underline-offset-4">Sync Fee (5%)</span>
                      <span class="font-bold">Included</span>
                    </div>
                    <div class="pt-6 border-t border-gray-100 flex justify-between items-baseline">
                      <span class="text-[12px] font-bold text-gray-900 uppercase tracking-[0.4em]">Residency Valuation</span>
                      <span class="text-3xl font-bold text-gray-900 tracking-tighter transition-all group-hover:text-emerald-600">
                        {formatINR(amount)}
                      </span>
                    </div>
                  </div>

                  {/* Change dates */}
                  <a
                    href={`/p/${property.id}`}
                    class="block text-center text-[10px] font-bold text-gray-300 hover:text-gray-900 uppercase tracking-widest transition-all hover:tracking-[0.2em] opacity-60 hover:opacity-100 pt-4"
                  >
                    ← Modify Synchronization
                  </a>
                </div>
              </div>
            </div>

            {/* ── Residency Principal Form ──────────────────────────────── */}
            <div class="lg:col-span-7 order-1 lg:order-2">
              <div class="bg-white rounded-[3rem] border border-gray-50 shadow-premium-lg p-10 sm:p-14 space-y-10 animate-slide-up">
                <div class="space-y-4">
                  <h1 class="text-3xl font-bold text-gray-900 tracking-tighter">
                    Residency Principal
                  </h1>
                  <p class="text-[14px] text-gray-500 font-medium leading-relaxed opacity-80 italic">
                    Define the primary operational credentials to initialize your secure residency request.
                  </p>
                </div>

                <CheckoutForm
                  propId={property.id}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  nights={nights}
                  amount={amount}
                  propertyName={property.name}
                />
              </div>
              
              <div class="mt-10 flex items-center justify-center gap-4 text-[10px] font-bold text-gray-300 uppercase tracking-[0.4em] opacity-40 italic">
                 <div class="w-1.5 h-px bg-gray-300" />
                 Professional Residency Protocol
                 <div class="w-1.5 h-px bg-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

