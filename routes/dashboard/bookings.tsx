import { type Handlers, type PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import type { Booking, DashboardState } from "../../utils/types.ts";
import { getGuestVerification, listBookings } from "../../utils/db.ts";

interface ExtendedBooking extends Booking {
  kycScore?: number;
  kycFlags?: string[];
}

interface BookingsPageData {
  bookings: ExtendedBooking[];
}

export const handler: Handlers<BookingsPageData, DashboardState> = {
  GET: async (_req, ctx) => {
    const state = ctx.state as DashboardState;
    const { hostId } = state;
    
    const bookings = await listBookings(hostId);
    const extendedBookings: ExtendedBooking[] = [];

    for (const b of bookings) {
      const extB: ExtendedBooking = { ...b };
      try {
        const verif = await getGuestVerification(b.id);
        if (verif) {
          extB.kycScore = verif.matchScore;
          extB.kycFlags = verif.flags;
        }
      } catch (e) {
        console.error("[bookings] KYC load error:", e);
      }
      extendedBookings.push(extB);
    }

    return ctx.render({ bookings: extendedBookings });
  },
};

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    confirmed: "bg-emerald-50 text-emerald-700 border-emerald-100",
    pending: "bg-amber-50 text-amber-700 border-amber-100",
    cancelled: "bg-rose-50 text-rose-600 border-rose-100",
    refunded: "bg-gray-50 text-gray-400 border-gray-100",
  };

  return (
    <span
      class={`inline-flex px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
        styles[status] ?? "bg-gray-100"
      }`}
    >
      {status}
    </span>
  );
}

export default function BookingsPage({ data }: PageProps<BookingsPageData>) {
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
    });
  };

  return (
    <>
      <Head>
        <title>Guest Reservations | iStay</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div class="space-y-16 pb-20">
        {/* Header */}
        <section class="flex flex-col lg:flex-row items-end justify-between gap-8">
          <div>
            <div class="flex items-center gap-4 mb-6">
              <span class="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-widest rounded-full border border-emerald-100">Reservations</span>
              <div class="h-px w-24 bg-gray-100" />
            </div>
            <h2 class="text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Guest <br/> <span class="text-emerald-500 font-serif italic">Reservations.</span>
            </h2>
          </div>
          <div class="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-premium flex items-center gap-8 group hover:shadow-premium-hover hover:-translate-y-1 transition-all">
            <div>
              <p class="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Confirmed</p>
              <p class="text-4xl font-bold text-gray-900 tracking-tight leading-none">
                {bookings.filter(b => b.status === 'confirmed').length}
              </p>
            </div>
            <div class="w-16 h-16 rounded-[1.5rem] bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              📋
            </div>
          </div>
        </section>

        {/* Bookings Content */}
        <div class="bg-white border border-gray-100 shadow-premium rounded-[3rem] overflow-hidden">
          {bookings.length === 0 ? (
            <div class="py-40 text-center space-y-6">
              <p class="text-8xl">🏜️</p>
              <h3 class="text-2xl font-bold text-gray-900 tracking-tight">No reservations found</h3>
              <p class="text-sm font-medium text-gray-400 max-w-xs mx-auto leading-relaxed">Your bookings will appear here once guests start making reservations.</p>
            </div>
          ) : (
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="bg-gray-50/50 border-b border-gray-100">
                    <th class="px-10 py-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Guest</th>
                    <th class="px-10 py-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Stay Dates</th>
                    <th class="px-10 py-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Revenue</th>
                    <th class="px-10 py-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Verification</th>
                    <th class="px-10 py-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  {bookings.map((booking) => (
                    <tr key={booking.id} class="group hover:bg-emerald-50/30 transition-colors">
                      <td class="px-10 py-8">
                        <p class="text-sm font-bold text-gray-900 tracking-tight mb-1">{booking.guestName}</p>
                        <p class="text-xs font-medium text-gray-400">{booking.guestEmail}</p>
                      </td>
                      <td class="px-10 py-8">
                        <p class="text-xs font-bold text-gray-900 tracking-tight">
                          {formatDate(booking.checkIn)} — {formatDate(booking.checkOut)}
                        </p>
                        <p class="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">{booking.nights} nights</p>
                      </td>
                      <td class="px-10 py-8 text-right">
                        <p class="text-sm font-bold text-gray-900 tracking-tight">{formatINR(booking.amount)}</p>
                      </td>
                      <td class="px-10 py-8 text-center">
                        <div class="flex flex-col items-center gap-2">
                          {booking.kycScore ? (
                            <div class="px-3 py-1 bg-gray-900 text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-sm">
                              Safety Score {booking.kycScore}%
                            </div>
                          ) : (
                            <span class="text-[10px] font-bold text-gray-300 uppercase tracking-widest">No verification data</span>
                          )}
                        </div>
                      </td>
                      <td class="px-10 py-8 text-center">
                        <StatusBadge status={booking.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
