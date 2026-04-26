// ================================================================
// routes/dashboard/guests.tsx — Guest Directory
// ================================================================

import { type Handlers, type PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import type { DashboardState } from "../../utils/types.ts";
import { listGuestsByHost } from "../../utils/db.ts";
import { getWhatsAppLink } from "../../utils/whatsapp.ts";

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
    const state = ctx.state as DashboardState;
    const { hostId } = state;
    const guests = await listGuestsByHost(hostId);
    return ctx.render({ guests });
  },
};

export default function GuestsPage({ data }: PageProps<GuestsPageData>) {
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
        <title>Guest Intelligence | iStay</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div class="space-y-16 pb-20">
        {/* Header */}
        <section class="flex flex-col lg:flex-row items-end justify-between gap-8">
          <div>
            <div class="flex items-center gap-4 mb-4">
              <div class="px-3 py-1 bg-white border border-gray-100 text-[11px] font-bold text-emerald-600 uppercase tracking-widest rounded-full shadow-sm">
                Guest Directory
              </div>
              <div class="h-px w-24 bg-gray-100" />
            </div>
            <h2 class="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[0.9]">
              Guest <br/> <span class="text-emerald-500">Intelligence.</span>
            </h2>
          </div>
          <div class="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-premium flex items-center gap-8 group hover:-translate-y-1 transition-all">
            <div>
              <p class="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Repeat Value</p>
              <p class="text-4xl font-bold text-gray-900 tracking-tight">
                {formatINR(guests.reduce((acc, g) => acc + (g.bookingCount > 1 ? g.totalSpent * 0.15 : 0), 0))}
              </p>
            </div>
            <div class="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">
              📈
            </div>
          </div>
        </section>

        {/* Guest Content */}
        {guests.length === 0 ? (
          <div class="bg-white border border-gray-100 shadow-premium p-32 flex flex-col items-center justify-center text-center rounded-[3rem]">
            <span class="text-8xl mb-8">👥</span>
            <h3 class="text-3xl font-bold text-gray-900 tracking-tight">No guests yet</h3>
            <p class="text-sm font-medium text-gray-400 mt-4 max-w-sm">Your guest directory will build automatically as bookings come in.</p>
          </div>
        ) : (
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {guests.map((g) => {
              const isRepeat = g.bookingCount > 1;
              const loyaltyMsg = `Hi ${g.name}! Noticed you've stayed with us ${g.bookingCount} times. As a repeat guest, book direct at istay.space for 10% off your next visit!`;

              return (
                <div
                  key={g.email}
                  class="bg-white rounded-[2.5rem] border border-gray-100 shadow-premium p-10 hover:-translate-y-2 hover:shadow-premium-hover transition-all overflow-hidden relative group"
                >
                  {isRepeat && (
                    <div class="absolute top-10 right-10 w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center shadow-sm rotate-12 group-hover:rotate-0 transition-all z-10">
                      <span class="text-2xl">👑</span>
                    </div>
                  )}

                  <div class="mb-10 relative">
                    <p class="text-[11px] font-bold text-emerald-500 uppercase tracking-widest mb-4">Guest Information</p>
                    <h3 class="text-2xl font-bold text-gray-900 tracking-tight leading-none mb-2">{g.name}</h3>
                    <p class="text-xs font-medium text-gray-400">{g.email}</p>
                  </div>

                  <div class="grid grid-cols-2 gap-4 mb-10">
                    <div class="p-5 bg-gray-50 border border-gray-100 rounded-2xl">
                      <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Stays</p>
                      <p class="text-xl font-bold text-gray-900 tracking-tight">{g.bookingCount}</p>
                    </div>
                    <div class="p-5 bg-gray-50 border border-gray-100 rounded-2xl">
                      <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Spent</p>
                      <p class="text-xl font-bold text-gray-900 tracking-tight">{formatINR(g.totalSpent)}</p>
                    </div>
                  </div>

                  <div class="space-y-4">
                    <a
                      href={getWhatsAppLink(g.phone, loyaltyMsg)}
                      target="_blank"
                      class="block w-full py-4 bg-emerald-500 text-white text-[11px] font-bold uppercase tracking-widest text-center rounded-2xl shadow-premium hover:bg-emerald-600 transition-all"
                    >
                      Send Loyalty Offer
                    </a>
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
