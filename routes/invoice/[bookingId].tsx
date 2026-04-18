import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getBookingById, getPropertyById, getLedgerEntry } from "../../utils/db.ts";
import type { Booking, Property, LedgerEntry } from "../../utils/types.ts";

interface InvoiceData {
  booking: Booking;
  property: Property | null;
  ledger: LedgerEntry | null;
}

export const handler: Handlers<InvoiceData> = {
  async GET(_req, ctx) {
    const { bookingId } = ctx.params;
    const booking = await getBookingById(bookingId);
    if (!booking) return ctx.renderNotFound();

    const [property, ledger] = await Promise.all([
      getPropertyById(booking.propertyId),
      getLedgerEntry(bookingId)
    ]);

    return ctx.render({ booking, property, ledger });
  },
};

export default function InvoicePage({ data, url }: PageProps<InvoiceData>) {
  const { booking, property, ledger } = data;
  
  const grossAmount = ledger?.grossAmount || booking.amount;
  const istayFee = ledger?.istayAmount || (booking.amount * 0.05);
  const hostEarnings = ledger?.hostAmount || (booking.amount * 0.95);
  const gstAmount = Math.round(grossAmount * 0.18);
  const totalWithGst = grossAmount + gstAmount;
  const invoiceNumber = `INV-${new Date(booking.createdAt).toISOString().slice(0, 10).replace(/-/g, "")}-${booking.id.slice(0, 6).toUpperCase()}`;

  const formatINR = (n: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n);

  // Auto-print logic
  const shouldPrint = url.searchParams.has("download");

  return (
    <>
      <Head>
        <title>Invoice - {invoiceNumber}</title>
        <meta name="robots" content="noindex, nofollow" />
        <style>{`
          @media print {
            .no-print { display: none !important; }
            body { background: white !important; }
            .invoice-card { box-shadow: none !important; border: none !important; margin: 0 !important; width: 100% !important; }
            @page { margin: 1cm; }
          }
        `}</style>
        {shouldPrint && <script>{'window.onload = () => setTimeout(() => window.print(), 500);'}</script>}
      </Head>

      <div class="min-h-screen bg-gray-50 py-10 px-4">
        <div class="max-w-3xl mx-auto">
          {/* Header Actions */}
          <div class="no-print flex flex-wrap justify-between items-center mb-8 gap-3">
            <a href="/" class="text-xs font-800 text-teal-600 uppercase tracking-widest flex items-center gap-2">
               ← Back to istay
            </a>
            <div class="flex items-center gap-3">
              <a
                href={`/api/invoice/${booking.id}?format=json`}
                target="_blank"
                class="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-700 text-xs transition-all hover:bg-gray-200"
              >
                Export JSON ↗
              </a>
              <a
                href={`/invoice/${booking.id}?download=1`}
                class="px-6 py-2.5 bg-teal-600 text-white rounded-xl font-800 text-sm shadow-lg shadow-teal-600/20 transition-all hover:bg-teal-700"
              >
                Download PDF
              </a>
            </div>
          </div>

          {/* Invoice Card */}
          <div class="invoice-card bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden p-12 sm:p-16 relative">
            {/* Watermark Logo */}
            <div class="absolute top-10 right-10 opacity-[0.03] select-none pointer-events-none">
                <h1 class="text-9xl font-900 tracking-tighter">istay</h1>
            </div>

            <div class="flex flex-col sm:flex-row justify-between items-start gap-8 mb-16 border-b border-gray-100 pb-12">
              <div>
                <h1 class="text-3xl font-900 text-teal-600 mb-2">istay</h1>
                <p class="text-sm text-gray-500 font-500 leading-relaxed">
                  Ghaffar Manzil, Okhla<br />
                  New Delhi, Delhi 110025<br />
                  India
                </p>
              </div>
              <div class="sm:text-right">
                <h2 class="text-xl font-900 text-gray-900 mb-1">TAX INVOICE</h2>
                <p class="text-xs font-700 text-gray-400 uppercase tracking-widest mb-4">CONFIRMED RESERVATION</p>
                <div class="space-y-1">
                  <p class="text-sm font-600 text-gray-500">Invoice: <span class="text-gray-900 font-700">{invoiceNumber}</span></p>
                  <p class="text-sm font-600 text-gray-500">Date: <span class="text-gray-900">{new Date(booking.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span></p>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16">
              <div>
                <h3 class="text-xs font-800 text-gray-400 uppercase tracking-[0.2em] mb-4">Billed To</h3>
                <p class="text-lg font-800 text-gray-900">{booking.guestName}</p>
                <p class="text-sm text-gray-500 mt-1 font-500">{booking.guestEmail}</p>
              </div>
              <div class="sm:text-right">
                <h3 class="text-xs font-800 text-gray-400 uppercase tracking-[0.2em] mb-4">Property Host</h3>
                <p class="text-lg font-800 text-gray-900">{property?.name || "istay Property"}</p>
                <p class="text-sm text-gray-500 mt-1 font-500">{property?.address || "Location Details in Dashboard"}</p>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left mb-12">
                <thead>
                  <tr class="border-b-2 border-gray-900">
                    <th class="py-4 text-xs font-900 text-gray-900 uppercase tracking-widest">Description</th>
                    <th class="py-4 text-xs font-900 text-gray-900 uppercase tracking-widest">Nights</th>
                    <th class="py-4 text-xs font-900 text-gray-900 uppercase tracking-widest text-right">Amount</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr>
                    <td class="py-6">
                      <p class="font-800 text-gray-900">Hospitality Services</p>
                      <p class="text-xs text-gray-400 font-600 mt-1 uppercase tracking-widest">
                        Check-in: {booking.checkIn} → Check-out: {booking.checkOut}
                      </p>
                    </td>
                    <td class="py-6 font-800 text-gray-900">{booking.nights}</td>
                    <td class="py-6 font-800 text-gray-900 text-right">{formatINR(grossAmount)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="flex justify-end p-8 bg-gray-50 rounded-3xl">
              <table class="w-full sm:w-72">
                <tr class="text-sm font-600 text-gray-500">
                  <td class="py-2">Subtotal</td>
                  <td class="text-right py-2">{formatINR(grossAmount)}</td>
                </tr>
                <tr class="text-sm font-600 text-gray-500">
                  <td class="py-2">Host Earnings (95%)</td>
                  <td class="text-right py-2">{formatINR(hostEarnings)}</td>
                </tr>
                <tr class="text-sm font-600 text-gray-500">
                  <td class="py-2">Platform Fee (5%)</td>
                  <td class="text-right py-2">{formatINR(istayFee)}</td>
                </tr>
                <tr class="text-sm font-600 text-gray-500">
                  <td class="py-2">GST @ 18%</td>
                  <td class="text-right py-2">{formatINR(gstAmount)}</td>
                </tr>
                <tr class="border-t border-gray-200">
                  <td class="py-4 font-900 text-teal-600 text-lg">Total Payable</td>
                  <td class="text-right py-4 font-900 text-teal-600 text-lg">{formatINR(totalWithGst)}</td>
                </tr>
              </table>
            </div>

            <div class="mt-20 pt-10 border-t border-gray-100 text-center">
               <p class="text-xs text-gray-400 font-500 leading-relaxed">
                 This is a system-generated tax invoice issued by istay on behalf of the host. <br/>
                 istay is operated at Ghaffar Manzil, Okhla, New Delhi 110025.
               </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
