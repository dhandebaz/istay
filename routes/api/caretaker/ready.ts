import { type Handlers } from "$fresh/server.ts";
import {
  getBookingById,
  getPropertyById,
  saveBooking,
  saveNotification,
} from "../../../utils/db.ts";
import type { Notification } from "../../../utils/types.ts";

export const handler: Handlers = {
  POST: async (req) => {
    try {
      const { bookingId, checklist, photoBase64 } = await req.json();

      if (!bookingId) {
        return Response.json({ error: "Booking ID is required" }, {
          status: 400,
        });
      }

      const booking = await getBookingById(bookingId);
      if (!booking) {
        return Response.json({ error: "Booking not found" }, { status: 404 });
      }

      const property = await getPropertyById(booking.propertyId);

      // 1. Upload Clean Proof to R2
      let cleanProofUrl = "";
      let auditResult = {
        isReady: true,
        score: 100,
        reasoning: "Manual bypass (no photo)",
      };

      if (photoBase64) {
        try {
          const { stripDataUri, callGeminiVision } = await import(
            "../../../utils/gemini.ts"
          );
          const { uploadToR2 } = await import("../../../utils/storage.ts");

          const { data: imageData } = stripDataUri(photoBase64);
          const binaryData = Uint8Array.from(
            atob(imageData),
            (c) => c.charCodeAt(0),
          );
          const fileName =
            `audit/${booking.propertyId}/${bookingId}/clean_${Date.now()}.jpg`;

          cleanProofUrl = await uploadToR2(
            binaryData,
            fileName,
            "image/jpeg",
            true,
          );

          // ─ Phase 11: AI Vision Audit ─
          const auditResponse = await callGeminiVision({
            imageBase64: imageData,
            prompt:
              `You are a professional housekeeping inspector for iStay.space. 
            Analyze this room photo. Is it guest-ready? 
            Check for: bed is neatly made, no visible trash, surfaces are clean, towels (if any) are folded.
            
            Respond strictly in JSON format:
            {
              "isReady": boolean,
              "score": number (0-100),
              "reasoning": "Short explanation of the score"
            }`,
            jsonMode: true,
          });

          try {
            auditResult = JSON.parse(auditResponse.text);
          } catch {
            console.error(
              "[ready] Failed to parse Gemini JSON:",
              auditResponse.text,
            );
            auditResult = {
              isReady: false,
              score: 50,
              reasoning: "AI audit failed to respond correctly.",
            };
          }
        } catch (err) {
          console.error("[ready] Audit/R2 process failed:", err);
          auditResult = {
            isReady: false,
            score: 0,
            reasoning: "Technical error during audit.",
          };
        }
      }

      // 2. Update Booking Status & Metadata
      const passesAudit = auditResult.score >= 80;

      booking.status = passesAudit ? "room_ready" : "needs_review";
      booking.checkoutChecklist = checklist;
      booking.cleanProofUrl = cleanProofUrl || undefined;
      booking.updatedAt = new Date().toISOString();

      await saveBooking(booking);

      // 3. Create Host Notification
      const notification: Notification = {
        id: crypto.randomUUID(),
        hostId: booking.hostId,
        type: passesAudit ? "housekeeping_ready" : "housekeeping_issue",
        title: passesAudit
          ? "Room Ready ✨"
          : "Housekeeping Review Required ⚠️",
        message: passesAudit
          ? `Caretaker marked "${booking.guestName}"'s room as clean. AI Audit: ${auditResult.score}/100.`
          : `AI flagged possible issues in "${booking.guestName}"'s room. Score: ${auditResult.score}. Reason: ${auditResult.reasoning}`,
        propertyName: property?.name || "Property",
        meta: {
          bookingId: booking.id,
          imageUrl: booking.cleanProofUrl || "",
          checklist: JSON.stringify(checklist),
          aiScore: String(auditResult.score),
          aiReasoning: auditResult.reasoning,
        },
        read: false,
        createdAt: new Date().toISOString(),
      };

      await saveNotification(notification);

      // 4. Dispatch Event (triggers Webhooks + WhatsApp)
      const { dispatchWebhook } = await import("../../../utils/events.ts");
      await dispatchWebhook(
        booking.hostId,
        passesAudit ? "room_ready" : "notification_created",
        {
          bookingId: booking.id,
          propertyId: booking.propertyId,
          propertyName: property?.name,
          cleanProofUrl: booking.cleanProofUrl,
          aiScore: auditResult.score,
          aiReasoning: auditResult.reasoning,
        },
      );

      return Response.json({
        ok: true,
        audit: auditResult,
        status: booking.status,
      });
    } catch (error: any) {
      console.error("[api/caretaker/ready] Error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }
  },
};
