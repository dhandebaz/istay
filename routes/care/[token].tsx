import { type Handlers, type PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import {
  getCaretakerToken,
  getHost,
  getProperty,
  getTodayCheckIns,
} from "../../utils/db.ts";
import type { Booking, Host, Property } from "../../utils/types.ts";
import SupplyRequest from "../../islands/SupplyRequest.tsx";
import ProofOfCleanUploader from "../../islands/ProofOfCleanUploader.tsx";

interface CaretakerData {
  property: Property;
  host: Host | null;
  todayCheckIns: Booking[];
  token: string;
}

export const handler: Handlers<CaretakerData> = {
  GET: async (_req, ctx) => {
    const { token } = ctx.params;

    const caretakerData = await getCaretakerToken(token);
    if (!caretakerData) {
      return new Response("Access link is invalid or has been revoked.", {
        status: 404,
        headers: { "Content-Type": "text/plain" },
      });
    }

    const [property, host, todayCheckIns] = await Promise.all([
      getProperty(caretakerData.hostId, caretakerData.propertyId),
      getHost(caretakerData.hostId),
      getTodayCheckIns(caretakerData.hostId),
    ]);

    if (!property) {
      return new Response("Property not found.", { status: 404 });
    }

    // Filter check-ins to just this property
    const filteredCheckIns = todayCheckIns.filter(
      (b) => b.propertyId === caretakerData.propertyId,
    );

    return ctx.render({
      property,
      host,
      todayCheckIns: filteredCheckIns,
      token,
    });
  },
};

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getTodayFormattedIST(): string {
  const now = new Date();
  const istDate = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  return istDate.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function CaretakerPortal({ data }: PageProps<CaretakerData>) {
  const { property, host, todayCheckIns, token } = data;

  const whatsappMessage = encodeURIComponent(
    `Hello! I'm the caretaker at "${property.name}". I wanted to update you about today's guests:` +
      (todayCheckIns.length > 0
        ? `\n\nToday's check-ins:\n` +
          todayCheckIns.map((b) =>
            `• ${b.guestName} (${b.nights} nights)`
          ).join("\n")
        : "\n\nNo check-ins today."),
  );

  const hostPhone = host?.phone?.replace(/[^0-9]/g, "") ?? "";
  const whatsappUrl = hostPhone
    ? `https://wa.me/91${hostPhone}?text=${whatsappMessage}`
    : `https://wa.me/?text=${whatsappMessage}`;

  return (
    <>
      <Head>
        <title>Caretaker — {property.name}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <div
        class="min-h-screen bg-gray-950 text-white"
        style="font-family: 'Inter', system-ui, sans-serif;"
      >
        {/* ── Header ───────────────────────────────────────────── */}
        <div class="bg-gradient-to-b from-istay-900/60 to-transparent px-4 pt-6 pb-4">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-istay-900/40 border border-istay-400/30 flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M10 1.5L2 7.5V18H7V12H13V18H18V7.5L10 1.5Z"
                  stroke="#0C4D4D"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div>
              <h1 class="text-base font-700 text-white leading-tight">
                {property.name}
              </h1>
              <p class="text-xs text-istay-400 font-600 uppercase tracking-tight">Caretaker Access</p>
            </div>
          </div>

          {/* Date banner */}
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-gray-500 uppercase tracking-wider font-600">
                Today
              </p>
              <p class="text-sm font-600 text-gray-300">
                {getTodayFormattedIST()}
              </p>
            </div>
            <div class="text-right">
              <p class="text-xs text-gray-500">Arrivals</p>
              <p class="text-2xl font-800 text-istay-400">
                {todayCheckIns.length}
              </p>
            </div>
          </div>
        </div>

        <div class="px-4 pb-8 space-y-6">
          {/* ── Today's Check-ins ─────────────────────────────── */}
          <section aria-labelledby="checkins-heading">
            <h2
              id="checkins-heading"
              class="text-xs font-700 uppercase tracking-wider text-gray-500 mb-3"
            >
              Today's Check-ins
            </h2>

            {todayCheckIns.length === 0
              ? (
                <div class="flex items-center gap-3 p-4 rounded-2xl bg-gray-900 border border-gray-800">
                  <span class="text-2xl">📭</span>
                  <div>
                    <p class="text-sm font-600 text-gray-300">No arrivals today</p>
                    <p class="text-xs text-gray-500">
                      Enjoy a quiet day!
                    </p>
                  </div>
                </div>
              )
              : (
                <div class="space-y-3">
                  {todayCheckIns.map((booking) => (
                    <div
                      key={booking.id}
                      class="p-4 rounded-2xl bg-gray-900 border border-gray-800"
                    >
                      <div class="flex items-start justify-between mb-3">
                        <div>
                          <p class="text-base font-700 text-white">
                            {booking.guestName}
                          </p>
                          <p class="text-xs text-gray-500 mt-0.5">
                            {booking.nights} night{booking.nights > 1 ? "s" : ""}{" "}
                            · Checks out {booking.checkOut}
                          </p>
                        </div>
                        <span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-600 border border-emerald-500/20">
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M1.5 5L4 7.5L8.5 2"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          Confirmed
                        </span>
                      </div>

                      {/* Contact actions */}
                      <div class="flex gap-2">
                        {booking.guestPhone && (
                          <a
                            href={`tel:${booking.guestPhone}`}
                            class="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-xs font-600 text-gray-300 hover:bg-gray-700 transition-colors active:scale-95"
                          >
                            📞 Call Guest
                          </a>
                        )}
                        {booking.guestPhone && (
                          <a
                            href={`https://wa.me/91${booking.guestPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${booking.guestName}! Your room at "${property.name}" is ready. Welcome!`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#25d366]/10 border border-[#25d366]/20 text-xs font-600 text-[#25d366] hover:bg-[#25d366]/20 transition-colors active:scale-95"
                          >
                            💬 WhatsApp
                          </a>
                        )}
                      </div>
                      
                      <ProofOfCleanUploader bookingId={booking.id} guestName={booking.guestName} />
                    </div>
                  ))}
                </div>
              )}
          </section>

          {/* ── Supply Request ────────────────────────────────── */}
          <section aria-labelledby="supply-heading">
            <h2
              id="supply-heading"
              class="text-xs font-700 uppercase tracking-wider text-gray-500 mb-3"
            >
              Request Supplies
            </h2>
            <SupplyRequest token={token} propertyName={property.name} />
          </section>

          {/* ── WhatsApp Host Button ──────────────────────────── */}
          <section>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#25d366]/10 border-2 border-[#25d366]/30 text-[#25d366] font-700 hover:bg-[#25d366]/20 transition-all duration-200 active:scale-95"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Host
            </a>
            {!host?.phone && (
              <p class="text-center text-xs text-gray-600 mt-2">
                Host phone not configured — link will open WhatsApp app.
              </p>
            )}
          </section>

          {/* Footer */}
          <div class="pt-4 border-t border-gray-900 text-center">
            <p class="text-xs text-gray-700">
              istay Caretaker Portal
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
