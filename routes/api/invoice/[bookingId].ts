import { type Handlers } from "$fresh/server.ts";
import { getBookingById, getLedgerEntry, getPropertyById } from "../../../utils/db.ts";

export const handler: Handlers = {
  GET: async (req, ctx) => {
    const { bookingId } = ctx.params;
    
    if (!bookingId) return new Response("Missing bookingId", { status: 400 });

    const booking = await getBookingById(bookingId);
    if (!booking) return new Response("Booking not found", { status: 404 });

    const property = await getPropertyById(booking.propertyId);
    const ledger = await getLedgerEntry(bookingId);

    const url = new URL(req.url);
    const format = url.searchParams.get("format");

    const grossAmount = ledger?.grossAmount || booking.amount;
    const istayFee = ledger?.istayAmount || (booking.amount * 0.05);
    const hostEarnings = ledger?.hostAmount || (booking.amount * 0.95);
    const gstAmount = Math.round(grossAmount * 0.18);
    const totalWithGst = grossAmount + gstAmount;

    const invoiceNumber = `INV-${new Date(booking.createdAt).toISOString().slice(0, 10).replace(/-/g, "")}-${booking.id.slice(0, 6).toUpperCase()}`;

    // ── JSON Export ──────────────────────────────────────
    if (format === "json") {
      return Response.json({
        invoice: {
          number: invoiceNumber,
          date: booking.createdAt,
          booking: {
            id: booking.id,
            guestName: booking.guestName,
            guestEmail: booking.guestEmail,
            guestPhone: booking.guestPhone || null,
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
            nights: booking.nights,
          },
          property: {
            name: property?.name || "istay Property",
            address: property?.address || "",
          },
          amounts: {
            grossAmount,
            istayFee,
            hostEarnings,
            gst: gstAmount,
            totalWithGst,
          },
          status: ledger?.status || "pending",
        },
      });
    }

    const formatINR = (n: number) => 
      new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n);

    // ── HTML Invoice ────────────────────────────────────
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Invoice - ${invoiceNumber}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', system-ui, sans-serif;
      background: #f9fafb;
      color: #1f2937;
      padding: 40px 20px;
    }
    .invoice-box {
      max-width: 800px;
      margin: auto;
      padding: 48px;
      background: #fff;
      border-radius: 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 10px 40px rgba(0,0,0,0.04);
      border: 1px solid #f3f4f6;
      position: relative;
      overflow: hidden;
    }
    .watermark {
      position: absolute;
      top: 40px;
      right: 40px;
      font-size: 120px;
      font-weight: 900;
      color: rgba(0,0,0,0.02);
      pointer-events: none;
      letter-spacing: -4px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #0d9488;
      padding-bottom: 24px;
      margin-bottom: 32px;
      position: relative;
    }
    .brand h1 { color: #0d9488; font-size: 28px; font-weight: 900; letter-spacing: -0.5px; }
    .brand p { color: #9ca3af; font-size: 13px; line-height: 1.6; margin-top: 4px; }
    .meta { text-align: right; }
    .meta h2 { font-size: 20px; font-weight: 900; color: #1f2937; letter-spacing: 2px; }
    .meta .label { font-size: 10px; font-weight: 800; color: #9ca3af; text-transform: uppercase; letter-spacing: 2px; margin-top: 12px; }
    .meta .value { font-size: 14px; font-weight: 600; color: #374151; margin-top: 2px; }
    .addresses {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
      gap: 32px;
    }
    .address-block h3 {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 3px;
      color: #9ca3af;
      margin-bottom: 12px;
    }
    .address-block .name { font-size: 16px; font-weight: 800; color: #1f2937; }
    .address-block .detail { font-size: 13px; color: #6b7280; margin-top: 4px; }
    .details-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 32px;
    }
    .details-table th {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #6b7280;
      padding: 12px 16px;
      border-bottom: 2px solid #1f2937;
      text-align: left;
    }
    .details-table th:last-child { text-align: right; }
    .details-table td {
      padding: 16px;
      border-bottom: 1px solid #f3f4f6;
      font-size: 14px;
    }
    .details-table td:last-child { text-align: right; font-weight: 700; }
    .totals { display: flex; justify-content: flex-end; }
    .totals-table { width: 300px; border-collapse: collapse; }
    .totals-table td { padding: 10px 16px; font-size: 14px; border-bottom: 1px solid #f3f4f6; }
    .totals-table .label { color: #6b7280; font-weight: 500; }
    .totals-table .amount { text-align: right; font-weight: 700; color: #374151; }
    .totals-table .total-row td { border-top: 2px solid #1f2937; border-bottom: none; font-size: 18px; font-weight: 900; color: #0d9488; padding-top: 16px; }
    .footer {
      margin-top: 48px;
      padding-top: 24px;
      border-top: 1px solid #f3f4f6;
      text-align: center;
      font-size: 11px;
      color: #9ca3af;
      line-height: 1.8;
    }
    .actions {
      text-align: center;
      margin-bottom: 24px;
    }
    .actions button {
      background: #0d9488;
      color: white;
      padding: 12px 28px;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      font-weight: 800;
      font-size: 14px;
      font-family: 'Inter', system-ui, sans-serif;
      transition: all 0.2s;
    }
    .actions button:hover { background: #0f766e; transform: translateY(-1px); }
    @media print {
      body { background: #fff; padding: 0; }
      .invoice-box { box-shadow: none; border: none; padding: 24px; border-radius: 0; }
      .no-print { display: none !important; }
      @page { margin: 1cm; }
    }
    @media (max-width: 640px) {
      .header, .addresses { flex-direction: column; gap: 16px; }
      .meta { text-align: left; }
      .invoice-box { padding: 24px; }
    }
  </style>
</head>
<body>
  <div class="no-print actions">
    <button onclick="window.print()">Print / Save as PDF</button>
  </div>
  
  <div class="invoice-box">
    <div class="watermark">istay</div>
    
    <div class="header">
      <div class="brand">
        <h1>istay</h1>
        <p>Ghaffar Manzil, Okhla<br>New Delhi, Delhi 110025<br>India</p>
      </div>
      <div class="meta">
        <h2>TAX INVOICE</h2>
        <div class="label">Invoice Number</div>
        <div class="value">${invoiceNumber}</div>
        <div class="label" style="margin-top: 8px;">Date</div>
        <div class="value">${new Date(booking.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</div>
      </div>
    </div>

    <div class="addresses">
      <div class="address-block">
        <h3>Billed To</h3>
        <p class="name">${booking.guestName}</p>
        <p class="detail">${booking.guestEmail}</p>
        ${booking.guestPhone ? `<p class="detail">${booking.guestPhone}</p>` : ""}
      </div>
      <div class="address-block" style="text-align: right;">
        <h3>Property Host</h3>
        <p class="name">${property?.name || "istay Property"}</p>
        <p class="detail">${property?.address || ""}</p>
      </div>
    </div>

    <table class="details-table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Stay Dates</th>
          <th>Nights</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Hospitality Services</strong></td>
          <td>${booking.checkIn} → ${booking.checkOut}</td>
          <td>${booking.nights}</td>
          <td>${formatINR(grossAmount)}</td>
        </tr>
      </tbody>
    </table>

    <div class="totals">
      <table class="totals-table">
        <tr>
          <td class="label">Subtotal</td>
          <td class="amount">${formatINR(grossAmount)}</td>
        </tr>
        <tr>
          <td class="label">Host Earnings (95%)</td>
          <td class="amount">${formatINR(hostEarnings)}</td>
        </tr>
        <tr>
          <td class="label">iStay Platform Fee (5%)</td>
          <td class="amount">${formatINR(istayFee)}</td>
        </tr>
        <tr>
          <td class="label">GST @ 18%</td>
          <td class="amount">${formatINR(gstAmount)}</td>
        </tr>
        <tr class="total-row">
          <td>Total Payable</td>
          <td style="text-align: right;">${formatINR(totalWithGst)}</td>
        </tr>
      </table>
    </div>

    <div class="footer">
      This is a system-generated tax invoice issued by istay on behalf of the property host.<br>
      istay is operated at Ghaffar Manzil, Okhla, New Delhi 110025.<br>
      For queries, contact support@istay.space
    </div>
  </div>
</body>
</html>`;

    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  },
};
