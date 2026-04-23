import { type Handlers, type PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { listProperties } from "../../utils/db.ts";
import type { DashboardState, Property } from "../../utils/types.ts";
import AddProperty from "../../islands/AddProperty.tsx";
import EmbedWidgetModal from "../../islands/EmbedWidgetModal.tsx";

interface PropertiesData {
  properties: Property[];
}

export const handler: Handlers<PropertiesData, DashboardState> = {
  GET: async (_req, ctx) => {
    const state = ctx.state as DashboardState;
    const properties = await listProperties(state.hostId);
    return ctx.render({ properties });
  },
};

const STATUS_CONFIG: Record<
  Property["status"],
  { label: string; dot: string; text: string; bg: string }
> = {
  active: { label: "ACTIVE", dot: "bg-emerald-400", text: "text-emerald-700", bg: "bg-emerald-50" },
  inactive: { label: "INACTIVE", dot: "bg-gray-300", text: "text-gray-500", bg: "bg-gray-50" },
  pending: { label: "PENDING", dot: "bg-amber-400", text: "text-amber-700", bg: "bg-amber-50" },
};

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function PropertiesPage({ data }: PageProps<PropertiesData>) {
  const { properties } = data;

  return (
    <>
      <Head>
        <title>Portfolio Engine | iStay</title>
      </Head>

      <div class="space-y-16 pb-20">
        {/* Page Header */}
        <section class="flex flex-col lg:flex-row items-end justify-between gap-8">
          <div>
            <div class="flex items-center gap-4 mb-4">
              <div class="px-3 py-1 bg-gray-900 text-mint-400 text-[10px] font-950 uppercase tracking-[0.2em] rounded-full border-[2px] border-gray-900 shadow-[3px_3px_0px_0px_#4ade80]">
                PORTFOLIO_ENGINE
              </div>
              <div class="h-[2px] w-24 bg-gray-100" />
            </div>
            <h2 class="text-4xl sm:text-7xl font-950 text-gray-900 tracking-tighter uppercase leading-[0.8]">
              Asset <br/> <span class="text-mint-500">Registry.</span>
            </h2>
            <p class="mt-8 text-xs text-gray-400 font-800 uppercase tracking-widest leading-relaxed max-w-sm">
              {properties.length === 0
                ? "PORTFOLIO_EMPTY: Initialize your first listing to activate the direct booking engine."
                : `${properties.length} ASSETS_LIVE: Tracking real-time performance across your inventory.`}
            </p>
          </div>
          <AddProperty />
        </section>

        {/* ── Properties Grid ───────────────────────────────────── */}
        {properties.length === 0 ? (
          <div class="bg-white border-[4px] border-gray-900 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-32 flex flex-col items-center justify-center text-center rounded-[3rem]">
            <span class="text-8xl mb-8">🏠</span>
            <h3 class="text-3xl font-950 text-gray-900 uppercase tracking-tighter">System_Idle</h3>
            <p class="text-[10px] font-950 text-gray-400 uppercase tracking-[0.3em] mt-4">Add a property to initialize your direct booking ecosystem.</p>
          </div>
        ) : (
          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12">
            {properties.map((property) => {
              const statusCfg = STATUS_CONFIG[property.status];
              return (
                <div
                  key={property.id}
                  class="group bg-white rounded-[3rem] border-[4px] border-gray-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden relative"
                >
                  {/* Property Image */}
                  <div class="relative h-72 bg-gray-100 overflow-hidden border-b-[4px] border-gray-900">
                    {property.imageUrl ? (
                      <img
                        src={property.imageUrl}
                        alt={property.name}
                        class="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                      />
                    ) : (
                      <div class="w-full h-full flex items-center justify-center text-8xl bg-mint-50">
                        🏠
                      </div>
                    )}
                    {/* Status badge */}
                    <div class={`absolute top-8 right-8 px-5 py-2 rounded-xl border-[3px] border-gray-900 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-[10px] font-950 uppercase tracking-widest flex items-center gap-3 ${statusCfg.text}`}>
                      <span class={`w-2.5 h-2.5 rounded-full ${statusCfg.dot} animate-pulse`} />
                      {statusCfg.label}
                    </div>
                  </div>

                  {/* Property Info */}
                  <div class="p-10 space-y-10">
                    <div>
                      <div class="flex items-center gap-3 mb-4">
                         <p class="text-[10px] font-950 text-mint-500 uppercase tracking-[0.3em]">ASSET_ID</p>
                         <div class="h-[2px] flex-1 bg-gray-50" />
                      </div>
                      <h3 class="text-3xl font-950 text-gray-900 uppercase tracking-tighter leading-none mb-3">{property.name}</h3>
                      <p class="text-[11px] font-800 text-gray-400 uppercase tracking-widest flex items-center gap-2">
                         <span class="text-gray-900">📍</span> {property.location}
                      </p>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                      <div class="p-5 bg-gray-50 border-[3px] border-gray-900 rounded-2xl">
                        <p class="text-[8px] font-950 text-gray-400 uppercase tracking-widest mb-1">BASE_RATE</p>
                        <p class="text-xl font-950 text-gray-900 tracking-tighter">{formatINR(property.basePrice)}</p>
                      </div>
                      <div class="p-5 bg-gray-50 border-[3px] border-gray-900 rounded-2xl">
                        <p class="text-[8px] font-950 text-gray-400 uppercase tracking-widest mb-1">ROOMS</p>
                        <p class="text-xl font-950 text-gray-900 tracking-tighter">04_UNIT</p>
                      </div>
                    </div>

                    <div class="space-y-4">
                      <EmbedWidgetModal
                        propId={property.id}
                        propertyName={property.name}
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`https://istay.space/book/${property.id}`);
                          alert("System: Booking link copied to clipboard.");
                        }}
                        class="w-full py-4 bg-gray-900 text-white text-[10px] font-950 uppercase text-center rounded-2xl border-[3px] border-gray-900 shadow-[4px_4px_0px_0px_#4ade80] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                      >
                        COPY_DIRECT_LINK
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
