// ================================================================
// routes/dashboard/bookings.tsx — Host Bookings Management
// ================================================================

import { type Handlers, type PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import type { Booking, DashboardState } from "../../utils/types.ts";

const getKv = (() => {
  let kv: Deno.Kv | null = null;
  return async () => {
    if (!kv) kv = await Deno.openKv();
    return kv;
  };
})();

interface BookingsPageData {
  bookings: Booking[];
}

export const handler: Handlers<BookingsPageData, DashboardState> = {
  async GET(_req, ctx) {
    const { hostId } = ctx.state;
    const kv = await getKv();

    // Load all bookings for this host
    const bookings: Booking[] = [];
    const iter = kv.list<Booking>({ prefix: ["booking", hostId] });
    for await (const entry of iter) {
      if (entry.value) bookings.push(entry.value);
    }

    // Sort by creation date descending
    bookings.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    return ctx.render({ bookings });
  },
};

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    cancelled: "bg-rose-50 text-rose-700 border-rose-200",
    refunded: "bg-gray-50 text-gray-500 border-gray-200",
  };

  return (
    <span
      class={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-600 border ${
        styles[status] ?? styles.pending
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function BookingsPage(
  { data }: PageProps<BookingsPageData>,
) {
  const { bookings } = data;

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <Head>
        <title>Bookings | istay Dashboard</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div class="space-y-6">
        {/* Header */}
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-800 text-gray-900">Bookings</h1>
            <p class="text-sm text-gray-400 mt-0.5">
              {bookings.length} total booking{bookings.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Empty State */}
        {bookings.length === 0 && (
          <div class="flex flex-col items-center justify-center py-16 text-center">
            <span class="text-5xl mb-4">📅</span>
            <p class="text-base font-700 text-gray-900 mb-1">
              No bookings yet
            </p>
            <p class="text-sm text-gray-400">
              When guests book your properties, they'll appear here.
            </p>
          </div>
        )}

        {/* Bookings Table */}
        {bookings.length > 0 && (
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="border-b border-gray-100">
                    <th class="px-5 py-3.5 text-xs font-700 text-gray-500 uppercase tracking-wider">
                      Guest
                    </th>
                    <th class="px-5 py-3.5 text-xs font-700 text-gray-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th class="px-5 py-3.5 text-xs font-700 text-gray-500 uppercase tracking-wider">
                      Nights
                    </th>
                    <th class="px-5 py-3.5 text-xs font-700 text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th class="px-5 py-3.5 text-xs font-700 text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th class="px-5 py-3.5 text-xs font-700 text-gray-500 uppercase tracking-wider">
                      ID Verified
                    </th>
                    <th class="px-5 py-3.5 text-xs font-700 text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  {bookings.map((b) => (
                    <tr
                      key={b.id}
                      class="hover:bg-gray-50/50 transition-colors"
                    >
                      <td class="px-5 py-4">
                        <div>
                          <p class="text-sm font-600 text-gray-900">
                            {b.guestName}
                          </p>
                          <p class="text-xs text-gray-400">{b.guestEmail}</p>
                        </div>
                      </td>
                      <td class="px-5 py-4 text-sm text-gray-600">
                        <span class="font-500">{b.checkIn}</span>
                        <span class="text-gray-300 mx-1">→</span>
                        <span class="font-500">{b.checkOut}</span>
                      </td>
                      <td class="px-5 py-4 text-sm font-600 text-gray-700">
                        {b.nights}
                      </td>
                      <td class="px-5 py-4 text-sm font-700 text-gray-900">
                        {formatINR(b.amount)}
                      </td>
                      <td class="px-5 py-4">
                        <StatusBadge status={b.status} />
                      </td>
                      <td class="px-5 py-4">
                        {b.idVerified ? (
                          <span class="inline-flex items-center gap-1 text-xs font-600 text-emerald-600">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                              <path d="M2 6L5 9L10 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Verified
                          </span>
                        ) : (
                          <span class="text-xs text-gray-400">—</span>
                        )}
                      </td>
                      <td class="px-5 py-4 text-xs text-gray-400">
                        {formatDate(b.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
