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
              <div class="px-3 py-1 bg-gray-900 text-mint-400 text-[10px] font-950 uppercase tracking-[0.2em] rounded-full border-[2px] border-gray-900 shadow-[3px_3px_0px_0px_#4ade80]">
                RELATIONSHIP_ENGINE
              </div>
              <div class="h-[2px] w-24 bg-gray-100" />
            </div>
            <h2 class="text-4xl sm:text-7xl font-950 text-gray-900 tracking-tighter uppercase leading-[0.8]">
              Guest <br/> <span class="text-mint-500">Intelligence.</span>
            </h2>
          </div>
          <div class="bg-white p-8 rounded-[2.5rem] border-[4px] border-gray-900 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex items-center gap-8 group hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
            <div>
              <p class="text-[9px] font-950 text-gray-400 uppercase tracking-[0.3em] mb-2">LOYALTY_LIFT</p>
              <p class="text-4xl font-950 text-gray-900 tracking-tighter">
                {formatINR(guests.reduce((acc, g) => acc + (g.bookingCount > 1 ? g.totalSpent * 0.15 : 0), 0))}
              </p>
            </div>
            <div class="w-16 h-16 rounded-2xl bg-mint-400 border-[3px] border-gray-900 flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-[-5deg] transition-transform">
              📈
            </div>
          </div>
        </section>

        {/* Guest Content */}
        {guests.length === 0 ? (
          <div class="bg-white border-[4px] border-gray-900 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-32 flex flex-col items-center justify-center text-center rounded-[3rem]">
            <span class="text-8xl mb-8">👥</span>
            <h3 class="text-3xl font-950 text-gray-900 uppercase tracking-tighter">Database_Idle</h3>
            <p class="text-[10px] font-950 text-gray-400 uppercase tracking-[0.3em] mt-4">Profiles generate automatically upon reservation entry.</p>
          </div>
        ) : (
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {guests.map((g) => {
              const isRepeat = g.bookingCount > 1;
              const loyaltyMsg = `Hi ${g.name}! Noticed you've stayed with us ${g.bookingCount} times. As a repeat guest, book direct at istay.space for 10% off your next visit!`;

              return (
                <div
                  key={g.email}
                  class="bg-white rounded-[2.5rem] border-[4px] border-gray-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-10 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden relative group"
                >
                  {isRepeat && (
                    <div class="absolute top-10 right-10 w-14 h-14 bg-mint-400 border-[3px] border-gray-900 rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-12 group-hover:rotate-0 transition-all z-10">
                      <span class="text-2xl">👑</span>
                    </div>
                  )}

                  <div class="mb-10 relative">
                    <p class="text-[10px] font-950 text-mint-500 uppercase tracking-[0.3em] mb-4">GUEST_ID</p>
                    <h3 class="text-2xl font-950 text-gray-900 uppercase tracking-tighter leading-none mb-2">{g.name}</h3>
                    <p class="text-[11px] font-800 text-gray-400 uppercase tracking-widest">{g.email}</p>
                  </div>

                  <div class="grid grid-cols-2 gap-4 mb-10">
                    <div class="p-5 bg-gray-50 border-[3px] border-gray-900 rounded-2xl">
                      <p class="text-[8px] font-950 text-gray-400 uppercase tracking-widest mb-1">STAYS</p>
                      <p class="text-xl font-950 text-gray-900 tracking-tighter">{g.bookingCount}</p>
                    </div>
                    <div class="p-5 bg-gray-50 border-[3px] border-gray-900 rounded-2xl">
                      <p class="text-[8px] font-950 text-gray-400 uppercase tracking-widest mb-1">VOLUME</p>
                      <p class="text-xl font-950 text-gray-900 tracking-tighter">{formatINR(g.totalSpent)}</p>
                    </div>
                  </div>

                  <div class="space-y-4">
                    <a
                      href={getWhatsAppLink(g.phone, loyaltyMsg)}
                      target="_blank"
                      class="block w-full py-4 bg-emerald-500 text-white text-[10px] font-950 uppercase text-center rounded-2xl border-[3px] border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                    >
                      ENGAGE_LOYALTY_WHATSAPP
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
