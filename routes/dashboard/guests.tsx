// ================================================================
// routes/dashboard/guests.tsx — Guest Directory
// ================================================================

import { type Handlers, type PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import type { Booking, DashboardState } from "../../utils/types.ts";

import { getKv } from "../../utils/db.ts";

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

import { getWhatsAppLink } from "../../utils/whatsapp.ts";

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
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 class="text-xl font-800 text-gray-900">Guest Intelligence</h1>
            <p class="text-sm text-gray-400 mt-0.5">
              Refined directory of {guests.length} unique traveler{guests.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100">
            <span class="text-xs font-800 text-emerald-700 uppercase tracking-wider">Loyalty Lift</span>
            <span class="text-sm font-900 text-emerald-800">
              {formatINR(guests.reduce((acc, g) => acc + (g.bookingCount > 1 ? g.totalSpent * 0.15 : 0), 0))}
            </span>
          </div>
        </div>

        {/* Empty State */}
        {guests.length === 0 && (
          <div class="flex flex-col items-center justify-center py-16 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <span class="text-5xl mb-4 opacity-50">👥</span>
            <p class="text-base font-700 text-gray-900 mb-1">
              Your guest list is empty
            </p>
            <p class="text-sm text-gray-400">
              Profiles are automatically created when you receive direct bookings.
            </p>
          </div>
        )}

        {/* Guest Cards */}
        {guests.length > 0 && (
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {guests.map((g) => {
              const otaCommission = g.totalSpent * 0.15;
              const isRepeat = g.bookingCount > 1;
              
              const loyaltyMsg = `Hi ${g.name}! Noticed you've stayed with us ${g.bookingCount} times. As a repeat guest, book direct at istay.space for 10% off your next visit!`;

              return (
                <div
                  key={g.email}
                  class={`relative bg-white rounded-2xl border ${isRepeat ? "border-mint-200 ring-2 ring-mint-50 ring-offset-0" : "border-gray-100"} shadow-sm p-5 hover:shadow-md transition-all overflow-hidden`}
                >
                  {isRepeat && (
                    <div class="absolute -right-12 top-6 bg-mint-500 text-istay-900 text-[9px] font-900 uppercase tracking-widest py-1 px-14 rotate-45 shadow-sm">
                      Repeat
                    </div>
                  )}

                  {/* Avatar + Name */}
                  <div class="flex items-center gap-3 mb-5">
                    <div class={`w-11 h-11 rounded-full ${isRepeat ? "bg-mint-500 text-istay-900" : "bg-istay-900 text-white"} flex items-center justify-center text-sm font-950 shadow-inner`}>
                      {g.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm font-800 text-gray-900 truncate">
                        {g.name}
                      </p>
                      <p class="text-[11px] text-gray-400 font-500 truncate leading-tight">
                        {g.email}
                      </p>
                    </div>
                    {g.verified && (
                      <span class="flex-shrink-0 inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-800">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4.5 7.5L8 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Verified
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div class="grid grid-cols-3 gap-2 mb-5">
                    <div class="text-center p-2 rounded-xl bg-gray-50/50 border border-gray-100/50">
                      <p class="text-[9px] text-gray-400 font-700 uppercase tracking-tighter">Stays</p>
                      <p class="text-sm font-900 text-gray-900">{g.bookingCount}</p>
                    </div>
                    <div class="text-center p-2 rounded-xl bg-gray-50/50 border border-gray-100/50">
                      <p class="text-[9px] text-gray-400 font-700 uppercase tracking-tighter">Spent</p>
                      <p class="text-sm font-900 text-gray-900">{formatINR(g.totalSpent)}</p>
                    </div>
                    <div class="text-center p-2 rounded-xl bg-istay-900/5 border border-istay-900/10">
                      <p class="text-[9px] text-istay-700 font-700 uppercase tracking-tighter">OTA Tax</p>
                      <p class="text-[11px] font-900 text-red-600">-{formatINR(otaCommission)}</p>
                    </div>
                  </div>

                  {/* Loyalty Section */}
                  {isRepeat && (
                    <div class="mb-4 p-3 rounded-xl bg-mint-50/50 border border-mint-100/50">
                      <p class="text-[10px] font-800 text-mint-700 mb-1 uppercase tracking-wider">Direct Perk Potential</p>
                      <p class="text-[11px] text-mint-800 leading-snug">
                        By booking direct, you could have saved <span class="font-900">{formatINR(otaCommission)}</span> in fees.
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div class="flex gap-2">
                    {g.phone && (
                      <a
                        href={getWhatsAppLink(g.phone, isRepeat ? loyaltyMsg : "")}
                        target="_blank"
                        rel="noopener"
                        class={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-800 transition-all ${
                          isRepeat ? "bg-mint-500 text-istay-900 hover:bg-mint-400 shadow-sm" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        }`}
                      >
                        <WhatsAppIcon class="w-3.5 h-3.5" />
                        {isRepeat ? "Send Loyalty Invite" : "WhatsApp"}
                      </a>
                    )}
                    <a
                      href={`mailto:${g.email}`}
                      class="px-3 flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors"
                      title="Email Guest"
                    >
                      <MailIcon class="w-4 h-4" />
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
