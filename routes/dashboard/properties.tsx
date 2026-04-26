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
  active: { label: "Active", dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" },
  inactive: { label: "Inactive", dot: "bg-gray-400", text: "text-gray-500", bg: "bg-gray-50" },
  pending: { label: "Pending", dot: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50" },
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
        <title>Your Portfolio | iStay</title>
      </Head>

      <div class="space-y-16 pb-20">
        {/* Page Header */}
        <section class="flex flex-col lg:flex-row items-end justify-between gap-8">
          <div>
            <div class="flex items-center gap-4 mb-6">
              <span class="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-widest rounded-full border border-emerald-100">Property Management</span>
              <div class="h-px w-24 bg-gray-100" />
            </div>
            <h2 class="text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Your <br/> <span class="text-emerald-500 font-serif italic">Portfolio.</span>
            </h2>
            <p class="mt-8 text-sm font-medium text-gray-400 leading-relaxed max-w-sm">
              {properties.length === 0
                ? "Your portfolio is currently empty. Add your first property to start accepting direct bookings."
                : `Managing ${properties.length} active properties across your portfolio.`}
            </p>
          </div>
          <AddProperty />
        </section>

        {/* ── Properties Grid ───────────────────────────────────── */}
        {properties.length === 0 ? (
          <div class="bg-white border border-gray-100 shadow-premium p-32 flex flex-col items-center justify-center text-center rounded-[3rem]">
            <span class="text-8xl mb-8">🏠</span>
            <h3 class="text-2xl font-bold text-gray-900 tracking-tight">No properties yet</h3>
            <p class="text-sm font-medium text-gray-400 mt-4 max-w-xs">Add your first property to initialize your direct booking engine.</p>
          </div>
        ) : (
          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {properties.map((property) => {
              const statusCfg = STATUS_CONFIG[property.status];
              return (
                <div
                  key={property.id}
                  class="group bg-white rounded-[2.5rem] border border-gray-100 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-all overflow-hidden relative"
                >
                  {/* Property Image */}
                  <div class="relative h-64 bg-gray-50 overflow-hidden border-b border-gray-100">
                    {property.imageUrl ? (
                      <img
                        src={property.imageUrl}
                        alt={property.name}
                        class="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                      />
                    ) : (
                      <div class="w-full h-full flex items-center justify-center text-8xl bg-emerald-50/30">
                        🏠
                      </div>
                    )}
                    {/* Status badge */}
                    <div class={`absolute top-6 right-6 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-md bg-white/90 shadow-sm text-[10px] font-bold uppercase tracking-widest flex items-center gap-2.5 ${statusCfg.text}`}>
                      <span class={`w-2 h-2 rounded-full ${statusCfg.dot} animate-pulse`} />
                      {statusCfg.label}
                    </div>
                  </div>

                  {/* Property Info */}
                  <div class="p-8 space-y-8">
                    <div>
                      <div class="flex items-center gap-3 mb-4">
                         <p class="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Property Details</p>
                         <div class="h-px flex-1 bg-gray-50" />
                      </div>
                      <h3 class="text-2xl font-bold text-gray-900 tracking-tight leading-none mb-3">{property.name}</h3>
                      <p class="text-xs font-medium text-gray-400 flex items-center gap-2">
                         <span class="text-gray-900 opacity-60">📍</span> {property.location}
                      </p>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                      <div class="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nightly Rate</p>
                        <p class="text-lg font-bold text-gray-900 tracking-tight">{formatINR(property.basePrice)}</p>
                      </div>
                      <div class="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Units</p>
                        <p class="text-lg font-bold text-gray-900 tracking-tight">4 Units</p>
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
                          // Using a more subtle notification if possible, but keep simple for now
                          alert("Booking link copied to clipboard!");
                        }}
                        class="w-full py-4 bg-gray-900 text-white text-sm font-bold text-center rounded-2xl shadow-premium hover:bg-emerald-500 hover:shadow-premium-hover transition-all"
                      >
                        Copy Booking Link
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
