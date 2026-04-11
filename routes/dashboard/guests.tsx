// ================================================================
// routes/dashboard/guests.tsx — Guest Directory
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

interface GuestRecord {
  name: string;
  email: string;
  phone: string;
  bookingCount: number;
  totalSpent: number;
  lastStay: string;
  verified: boolean;
}

interface GuestsPageData {
  guests: GuestRecord[];
}

export const handler: Handlers<GuestsPageData, DashboardState> = {
  GET: async (_req, ctx) => {
    const { hostId } = ctx.state;
    const kv = await getKv();

    // Load all bookings and aggregate by guest email
    const guestMap = new Map<string, GuestRecord>();
    const iter = kv.list<Booking>({ prefix: ["booking", hostId] });

    for await (const entry of iter) {
      const b = entry.value;
      if (!b) continue;

      const existing = guestMap.get(b.guestEmail);
      if (existing) {
        existing.bookingCount++;
        existing.totalSpent += b.amount;
        if (b.checkOut > existing.lastStay) {
          existing.lastStay = b.checkOut;
        }
        if (b.idVerified) existing.verified = true;
      } else {
        guestMap.set(b.guestEmail, {
          name: b.guestName,
          email: b.guestEmail,
          phone: b.guestPhone ?? "",
          bookingCount: 1,
          totalSpent: b.amount,
          lastStay: b.checkOut,
          verified: b.idVerified ?? false,
        });
      }
    }

    const guests = Array.from(guestMap.values())
      .sort((a, b) => b.lastStay.localeCompare(a.lastStay));

    return ctx.render({ guests });
  },
};

export default function GuestsPage(
  { data }: PageProps<GuestsPageData>,
) {
  const { guests } = data;

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <>
      <Head>
        <title>Guests | istay Dashboard</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div class="space-y-6">
        {/* Header */}
        <div>
          <h1 class="text-xl font-800 text-gray-900">Guests</h1>
          <p class="text-sm text-gray-400 mt-0.5">
            {guests.length} unique guest{guests.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Empty State */}
        {guests.length === 0 && (
          <div class="flex flex-col items-center justify-center py-16 text-center">
            <span class="text-5xl mb-4">👥</span>
            <p class="text-base font-700 text-gray-900 mb-1">
              No guests yet
            </p>
            <p class="text-sm text-gray-400">
              Guest information will appear here once you receive bookings.
            </p>
          </div>
        )}

        {/* Guest Cards */}
        {guests.length > 0 && (
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {guests.map((g) => (
              <div
                key={g.email}
                class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
              >
                {/* Avatar + Name */}
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-istay-900 to-istay-700 flex items-center justify-center text-white text-sm font-700">
                    {g.name.charAt(0).toUpperCase()}
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-700 text-gray-900 truncate">
                      {g.name}
                    </p>
                    <p class="text-xs text-gray-400 truncate">{g.email}</p>
                  </div>
                  {g.verified && (
                    <span class="flex-shrink-0 inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-700">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <path d="M2 5L4.5 7.5L8 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      ID Verified
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div class="grid grid-cols-3 gap-2">
                  <div class="text-center p-2 rounded-xl bg-gray-50">
                    <p class="text-xs text-gray-400 font-500">Stays</p>
                    <p class="text-sm font-800 text-gray-900">{g.bookingCount}</p>
                  </div>
                  <div class="text-center p-2 rounded-xl bg-gray-50">
                    <p class="text-xs text-gray-400 font-500">Spent</p>
                    <p class="text-sm font-800 text-gray-900">{formatINR(g.totalSpent)}</p>
                  </div>
                  <div class="text-center p-2 rounded-xl bg-gray-50">
                    <p class="text-xs text-gray-400 font-500">Last Stay</p>
                    <p class="text-xs font-600 text-gray-700">{g.lastStay}</p>
                  </div>
                </div>

                {/* Actions */}
                {g.phone && (
                  <div class="mt-3 flex gap-2">
                    <a
                      href={`tel:${g.phone}`}
                      class="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gray-50 text-xs font-600 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      📞 Call
                    </a>
                    <a
                      href={`https://wa.me/91${g.phone}`}
                      target="_blank"
                      rel="noopener"
                      class="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-50 text-xs font-600 text-emerald-700 hover:bg-emerald-100 transition-colors"
                    >
                      💬 WhatsApp
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
