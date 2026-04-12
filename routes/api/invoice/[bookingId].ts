import { type Handlers } from "$fresh/server.ts";
import { getBookingById, getLedgerEntry, getPropertyById } from "../../../utils/db.ts";

export const handler: Handlers = {
  GET: async (_req, ctx) => {
    const { bookingId } = ctx.params;
    
    if (!bookingId) return new Response("Missing bookingId", { status: 400 });

    const booking = await getBookingById(bookingId);
    if (!booking) return new Response("Booking not found", { status: 404 });

    const property = await getPropertyById(booking.propertyId);
    const ledger = await getLedgerEntry(bookingId);

    const istayFee = ledger?.istayAmount || (booking.amount * 0.05);
    const hostEarnings = ledger?.hostAmount || (booking.amount * 0.95);
    const totalPaid = ledger?.grossAmount || booking.amount;

    const formatINR = (n: number) => 
      new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n);

    // Dynamic HTML Generation for Invoice
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Invoice - ${booking.id}</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 40px;
      color: #333;
      background: #f9fafb;
    }
    .invoice-box {
      max-width: 800px;
      margin: auto;
      padding: 40px;
      border: 1px solid #eee;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
      background: #fff;
      border-radius: 8px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid #0d9488;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .brand-section h1 {
      margin: 0;
      color: #0d9488;
      font-size: 32px;
      font-weight: 900;
    }
    .brand-section p {
      margin: 5px 0 0;
      color: #6b7280;
      font-size: 14px;
    }
    .invoice-meta {
      text-align: right;
    }
    .invoice-meta h2 {
      margin: 0;
      color: #374151;
      font-size: 24px;
    }
    .invoice-meta p {
      margin: 5px 0 0;
      color: #6b7280;
      font-size: 14px;
    }
    .addresses {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
    }
    .address-block h3 {
      margin: 0 0 10px;
      color: #374151;
      font-size: 16px;
    }
    .address-block p {
      margin: 0;
      color: #4b5563;
      line-height: 1.5;
      font-size: 14px;
    }
    .details-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 40px;
    }
    .details-table th, .details-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #e5e7eb;
    }
    .details-table th {
      background-color: #f3f4f6;
      color: #374151;
      font-weight: 600;
    }
    .totals-wrapper {
      display: flex;
      justify-content: flex-end;
    }
    .totals-table {
      width: 300px;
      border-collapse: collapse;
    }
    .totals-table td {
      padding: 10px;
      border-bottom: 1px solid #e5e7eb;
    }
    .totals-table tr:last-child td {
      border-bottom: none;
      font-weight: 800;
      font-size: 18px;
      color: #0d9488;
    }
    .notes {
      margin-top: 50px;
      font-size: 12px;
      color: #9ca3af;
      text-align: center;
      border-top: 1px solid #eee;
      padding-top: 20px;
    }
    @media print {
      body {
        background: #fff;
        padding: 0;
      }
      .invoice-box {
        box-shadow: none;
        border: none;
        padding: 0;
      }
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="no-print" style="text-align: center; margin-bottom: 20px;">
    <button onclick="window.print()" style="background:#0d9488; color:white; padding:10px 20px; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">
      Print / Save as PDF
    </button>
  </div>
  
  <div class="invoice-box">
    <div class="header">
      <div class="brand-section">
        <h1>istay</h1>
        <p>Ghaffar Manzil, Okhla<br>New Delhi, India</p>
      </div>
      <div class="invoice-meta">
        <h2>TAX INVOICE</h2>
        <p><strong>Booking Ref:</strong> ${booking.id}</p>
        <p><strong>Date:</strong> ${new Date(booking.createdAt).toLocaleDateString()}</p>
      </div>
    </div>

    <div class="addresses">
      <div class="address-block">
        <h3>Billed To:</h3>
        <p>
          <strong>${booking.guestName}</strong><br>
          ${booking.guestEmail}<br>
          ${booking.guestPhone || ""}
        </p>
      </div>
      <div class="address-block" style="text-align: right;">
        <h3>Property Details:</h3>
        <p>
          <strong>${property?.name || "istay Property"}</strong><br>
          ${property?.address || ""}<br>
        </p>
      </div>
    </div>

    <table class="details-table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Dates</th>
          <th>Nights</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Accommodation Stay</td>
          <td>${booking.checkIn} to ${booking.checkOut}</td>
          <td>${booking.nights}</td>
          <td>${formatINR(totalPaid)}</td>
        </tr>
      </tbody>
    </table>

    <div class="totals-wrapper">
      <table class="totals-table">
        <tr>
          <td>Subtotal (Host Earnings):</td>
          <td style="text-align: right">${formatINR(hostEarnings)}</td>
        </tr>
        <tr>
          <td>Platform Fee (5%):</td>
          <td style="text-align: right">${formatINR(istayFee)}</td>
        </tr>
        <tr>
          <td><strong>Total Paid:</strong></td>
          <td style="text-align: right"><strong>${formatINR(totalPaid)}</strong></td>
        </tr>
      </table>
    </div>

    <div class="notes">
      This is a system generated invoice and does not require a physical signature.<br>
      Thank you for choosing istay!
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
