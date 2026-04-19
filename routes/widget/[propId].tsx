import { type Handlers, type PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getPropertyById, listBlockedDates } from "../../utils/db.ts";
import { getDynamicPrice } from "../../utils/pricing.ts";
import type { Property } from "../../utils/types.ts";
import BookingCalendar from "../../islands/BookingCalendar.tsx";

interface WidgetData {
  property: Property;
  blockedDates: string[];
  dynamicBasePrice: number;
}

export const handler: Handlers<WidgetData> = {
  async GET(_req, ctx) {
    const { propId } = ctx.params;
    const property = await getPropertyById(propId);

    if (!property || property.status !== "active") {
      return new Response("Property not found", { status: 404 });
    }

    const blocks = await listBlockedDates(propId);
    const blockedDates = blocks.map((b) => b.date);

    const today = new Date().toISOString().slice(0, 10);
    const pricingRes = await getDynamicPrice(propId, property.basePrice, today);

    return ctx.render({
      property,
      blockedDates,
      dynamicBasePrice: pricingRes.finalPrice,
    });
  },
};

export default function WidgetPage({ data }: PageProps<WidgetData>) {
  const { property, blockedDates, dynamicBasePrice } = data;

  return (
    <div class="bg-transparent p-0 m-0 font-sans selection:bg-mint-100 selection:text-mint-900">
      <Head>
        <title>Book {property.name} | istay Widget</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/styles.css" />
        <style dangerouslySetInnerHTML={{ __html: `
          body { background: transparent !important; }
          ::-webkit-scrollbar { display: none; }
          * { -ms-overflow-style: none; scrollbar-width: none; }
        ` }} />
        <script dangerouslySetInnerHTML={{ __html: `
          function reportHeight() {
            const height = document.body.scrollHeight;
            window.parent.postMessage({ type: 'istay-widget-resize', height }, '*');
          }
          window.addEventListener('load', reportHeight);
          window.addEventListener('resize', reportHeight);
          const observer = new MutationObserver(reportHeight);
          observer.observe(document.body, { childList: true, subtree: true });
        ` }} />
      </Head>

      <div class="max-w-[400px] mx-auto p-4">
        {/* Minimal Hero for Widget */}
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
            <img src={property.imageUrl} alt="" class="w-full h-full object-cover" />
          </div>
          <div>
            <h1 class="text-sm font-800 text-gray-900 line-clamp-1">{property.name}</h1>
            <p class="text-[10px] text-gray-500 font-500 uppercase tracking-wider">{property.type}</p>
          </div>
        </div>

        <BookingCalendar 
          propId={property.id}
          basePrice={dynamicBasePrice}
          blockedDates={blockedDates}
          isWidget={true}
        />

        <div class="mt-4 flex items-center justify-between px-1">
          <div class="flex items-center gap-1">
            <span class="text-[10px] text-gray-400">Powered by</span>
            <span class="text-[10px] font-900 text-mint-600 tracking-tighter">istay.space</span>
          </div>
          <a 
            href={`/p/${property.id}`} 
            target="_parent"
            class="text-[10px] text-mint-600 font-600 hover:underline"
          >
            View Full Details →
          </a>
        </div>
      </div>
    </div>
  );
}
