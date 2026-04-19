import { Handlers } from "$fresh/server.ts";
import { getBookingById, getPrivateVerification, getPropertyById } from "../../../../utils/db.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const { bookingId } = ctx.params;

    const [booking, verification] = await Promise.all([
      getBookingById(bookingId),
      getPrivateVerification(bookingId),
    ]);

    if (!booking) {
      return new Response("Booking not found", { status: 404 });
    }

    if (!verification) {
      return new Response("Verification data not found for this booking", { status: 404 });
    }

    const property = await getPropertyById(booking.propertyId);

    // Form C (Standard Layout for Indian Bureau of Immigration)
    // We provide a text-based summary that is easy to copy or save as a report.
    const report = `
================================================================
FORM C - GUEST ARRIVAL REPORT (Regulatory Compliance)
================================================================
GENERATED AT: ${new Date().toISOString()}
BOOKING ID  : ${booking.id.toUpperCase()}
PROPERTY    : ${property?.name || "Unknown"}
ADDRESS     : ${property?.address || "N/A"}

----------------------------------------------------------------
GUEST INFORMATION
----------------------------------------------------------------
FULL NAME   : ${verification.fullName || booking.guestName}
GENDER      : ${verification.gender || "Not Available"}
DATE OF BIRTH: ${verification.dob || "Not Available"}
NATIONALITY : ${verification.nationality || "Indian"}
PHONE       : ${booking.guestPhone || "N/A"}
EMAIL       : ${booking.guestEmail}

----------------------------------------------------------------
ID & TRAVEL DOCUMENTS
----------------------------------------------------------------
ID TYPE      : ${verification.idNumber ? "Government ID" : "N/A"}
ID NUMBER    : ${verification.idNumber || "N/A"}
ID EXPIRY    : ${verification.idExpiry || "N/A"}

${verification.visaDetails ? `
VISA NUMBER  : ${verification.visaDetails.number || "N/A"}
VISA EXPIRY  : ${verification.visaDetails.expiry || "N/A"}
ENTRY DATE   : ${verification.visaDetails.entryDate || "N/A"}
` : "VISA DETAILS: N/A (Domestic Guest)"}

----------------------------------------------------------------
STAY DETAILS
----------------------------------------------------------------
CHECK-IN     : ${booking.checkIn}
CHECK-OUT    : ${booking.checkOut}
DURATION     : ${booking.nights} nights
ADDR (STAY)  : ${verification.address || "N/A"}

================================================================
LEGAL NOTICE:
This data is generated from verified guest identity documents and is 
intended for official reporting purposes only. Store securely.
================================================================
`;

    return new Response(report.trim(), {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": `attachment; filename=form_c_${bookingId}.txt`,
      },
    });
  },
};
