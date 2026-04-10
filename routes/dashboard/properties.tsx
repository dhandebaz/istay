import { type Handlers, type PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { listProperties } from "../../utils/db.ts";
import type { DashboardState, Property } from "../../utils/types.ts";
import AddProperty from "../../islands/AddProperty.tsx";

interface PropertiesData {
  properties: Property[];
}

export const handler: Handlers<PropertiesData, DashboardState> = {
  async GET(_req, ctx) {
    const properties = await listProperties(ctx.state.hostId);
    return ctx.render({ properties });
  },
};

const STATUS_CONFIG: Record<
  Property["status"],
  { label: string; dot: string; text: string }
> = {
  active: { label: "Active", dot: "bg-emerald-400", text: "text-emerald-700" },
  inactive: { label: "Inactive", dot: "bg-gray-300", text: "text-gray-500" },
  pending: { label: "Pending", dot: "bg-amber-400", text: "text-amber-700" },
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
        <title>Properties | istay Dashboard</title>
      </Head>

      {/* Page Header */}
      <div class="flex items-start justify-between mb-8">
        <div>
          <h1 class="text-2xl sm:text-3xl font-800 text-gray-900 tracking-tight">
            Properties
          </h1>
          <p class="mt-1 text-sm text-gray-400">
            {properties.length === 0
              ? "Add your first property to start accepting direct bookings."
              : `${properties.length} propert${properties.length === 1 ? "y" : "ies"} in your portfolio.`}
          </p>
        </div>
      </div>

      {/* ── Properties Grid ───────────────────────────────────── */}
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">
        {/* Existing property cards */}
        {properties.map((property) => {
          const statusCfg = STATUS_CONFIG[property.status];
          return (
            <div
              key={property.id}
              class="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
            >
              {/* Property Image */}
              <div class="relative h-44 bg-gray-100 overflow-hidden">
                {property.imageUrl
                  ? (
                    <img
                      src={property.imageUrl}
                      alt={property.name}
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  )
                  : (
                    <div class="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-teal-50 to-emerald-50">
                      🏠
                    </div>
                  )}
                {/* Status badge */}
                <div
                  class={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-600 ${statusCfg.text} shadow-sm`}
                >
                  <span
                    class={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`}
                    aria-hidden="true"
                  />
                  {statusCfg.label}
                </div>
              </div>

              {/* Property Info */}
              <div class="p-5">
                <h3 class="font-700 text-gray-900 text-base leading-tight mb-1 truncate">
                  {property.name}
                </h3>
                <p class="text-xs text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                  {property.description}
                </p>

                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-lg font-800 text-teal-600">
                      {formatINR(property.basePrice)}
                    </span>
                    <span class="text-xs text-gray-400 ml-1">/ night</span>
                  </div>
                  <div class="flex items-center gap-2">
                    {/* Copy booking link */}
                    <button
                      class="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-teal-600 transition-colors duration-150"
                      title="Copy booking link"
                      aria-label={`Copy booking link for ${property.name}`}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M9 4.5H11.5C12.0523 4.5 12.5 4.94772 12.5 5.5V12.5C12.5 13.0523 12.0523 13.5 11.5 13.5H4.5C3.94772 13.5 3.5 13.0523 3.5 12.5V10M8.5 1.5H3.5C2.94772 1.5 2.5 1.94772 2.5 2.5V9.5C2.5 10.0523 2.94772 10.5 3.5 10.5H8.5C9.05228 10.5 9.5 10.0523 9.5 9.5V2.5C9.5 1.94772 9.05228 1.5 8.5 1.5Z"
                          stroke="currentColor"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                    {/* Airbnb source link */}
                    {property.airbnbUrl && (
                      <a
                        href={property.airbnbUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-rose-500 transition-colors duration-150"
                        title="View original Airbnb listing"
                        aria-label={`View ${property.name} on Airbnb`}
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M11 8.5V12C11 12.5523 10.5523 13 10 13H3C2.44772 13 2 12.5523 2 12V5C2 4.44772 2.44772 4 3 4H6.5M9 2H13M13 2V6M13 2L6.5 8.5"
                            stroke="currentColor"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add Property Card — always last */}
        <div
          id="add-property-card"
          class="col-span-1 sm:col-span-2 xl:col-span-1"
        >
          <AddProperty />
        </div>
      </div>

      {/* Empty state overlay message */}
      {properties.length === 0 && (
        <div class="mt-2 text-center">
          <p class="text-sm text-gray-400">
            ↑ Paste your Airbnb link in the card above to import your listing instantly.
          </p>
        </div>
      )}
    </>
  );
}
