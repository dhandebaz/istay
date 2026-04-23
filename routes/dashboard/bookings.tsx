// ================================================================
// routes/dashboard/bookings.tsx — Host Bookings Management
// ================================================================

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
    confirmed: "bg-emerald-500 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
    pending: "bg-amber-400 text-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
    cancelled: "bg-rose-500 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
    refunded: "bg-gray-400 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
  };

  return (
    <span
      class={`inline-flex px-4 py-2 rounded-xl text-[9px] font-950 uppercase tracking-widest border-[2px] border-gray-900 ${
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
    }).toUpperCase();
  };

  return (
    <>
      <Head>
        <title>Reservations | iStay</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div class="space-y-16 pb-20">
        {/* Header */}
        <section class="flex flex-col lg:flex-row items-end justify-between gap-8">
          <div>
            <div class="flex items-center gap-4 mb-4">
              <div class="px-3 py-1 bg-gray-900 text-mint-400 text-[10px] font-950 uppercase tracking-[0.2em] rounded-full border-[2px] border-gray-900 shadow-[3px_3px_0px_0px_#4ade80]">
                LOGISTICS_ENGINE
              </div>
              <div class="h-[2px] w-24 bg-gray-100" />
            </div>
            <h2 class="text-4xl sm:text-7xl font-950 text-gray-900 tracking-tighter uppercase leading-[0.8]">
              Reservations & <br/> <span class="text-mint-500">Logistics.</span>
            </h2>
          </div>
          <div class="bg-white p-8 rounded-[2.5rem] border-[4px] border-gray-900 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex items-center gap-8 group hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
            <div>
              <p class="text-[9px] font-950 text-gray-400 uppercase tracking-[0.3em] mb-2">ACTIVE_LOAD</p>
              <p class="text-4xl font-950 text-gray-900 tracking-tighter leading-none">
                {bookings.filter(b => b.status === 'confirmed').length}
              </p>
            </div>
            <div class="w-16 h-16 rounded-2xl bg-mint-400 border-[3px] border-gray-900 flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-[-5deg] transition-transform">
              📋
            </div>
          </div>
        </section>

        {/* Bookings Content */}
        <div class="bg-white border-[4px] border-gray-900 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] rounded-[3rem] overflow-hidden">
          {bookings.length === 0 ? (
            <div class="py-40 text-center space-y-6">
              <p class="text-8xl">🏜️</p>
              <h3 class="text-3xl font-950 text-gray-900 uppercase tracking-tighter">Logistics_Zero</h3>
              <p class="text-[10px] font-950 text-gray-400 uppercase tracking-[0.3em]">No reservation signals detected in the current cycle.</p>
            </div>
          ) : (
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="bg-gray-50 border-b-[4px] border-gray-900">
                    <th class="px-10 py-8 text-[10px] font-950 text-gray-400 uppercase tracking-widest">GUEST_ID</th>
                    <th class="px-10 py-8 text-[10px] font-950 text-gray-400 uppercase tracking-widest">WINDOW</th>
                    <th class="px-10 py-8 text-[10px] font-950 text-gray-400 uppercase tracking-widest text-right">CAPITAL</th>
                    <th class="px-10 py-8 text-[10px] font-950 text-gray-400 uppercase tracking-widest text-center">INTELLIGENCE</th>
                    <th class="px-10 py-8 text-[10px] font-950 text-gray-400 uppercase tracking-widest text-center">STATUS</th>
                  </tr>
                </thead>
                <tbody class="divide-y-[3px] divide-gray-100">
                  {bookings.map((booking) => (
                    <tr key={booking.id} class="group hover:bg-gray-50 transition-colors">
                      <td class="px-10 py-8">
                        <p class="text-sm font-950 text-gray-900 uppercase tracking-tighter leading-none mb-1">{booking.guestName}</p>
                        <p class="text-[10px] font-800 text-gray-400 uppercase tracking-widest">{booking.guestEmail}</p>
                      </td>
                      <td class="px-10 py-8">
                        <p class="text-xs font-950 text-gray-900 uppercase tracking-tighter">
                          {formatDate(booking.checkIn)} — {formatDate(booking.checkOut)}
                        </p>
                        <p class="text-[10px] font-800 text-mint-500 uppercase tracking-widest mt-1">{booking.nights} NIGHTS_STAY</p>
                      </td>
                      <td class="px-10 py-8 text-right">
                        <p class="text-sm font-950 text-gray-900 tracking-tight">{formatINR(booking.amount)}</p>
                      </td>
                      <td class="px-10 py-8 text-center">
                        <div class="flex flex-col items-center gap-2">
                          {booking.kycScore ? (
                            <div class="px-3 py-1 bg-gray-900 text-mint-400 text-[9px] font-950 uppercase tracking-widest rounded-lg border-2 border-gray-900">
                              SCORE_{booking.kycScore}%
                            </div>
                          ) : (
                            <span class="text-[9px] font-950 text-gray-300 uppercase tracking-widest">NO_KYC_SIGNAL</span>
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
