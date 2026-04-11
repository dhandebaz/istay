// ================================================================
// routes/api/verify.ts — Guest ID Verification (Gemini Vision OCR)
//
// POST /api/verify
// Body: { bookingId, idType, guestName, imageB64 }
// Returns: { status, matchScore, verified, flags }
//
// Uses Gemini Flash-Lite vision to extract KYC data from
// government IDs and compare against the guest's booking name.
// ================================================================

import { type Handlers } from "$fresh/server.ts";
import {
  getBookingById,
  saveBooking,
  saveGuestVerification,
  saveNotification,
  savePrivateVerification,
} from "../../utils/db.ts";
import { callGeminiVision, GeminiError } from "../../utils/gemini.ts";
import type { GuestVerification, Notification, OcrResult, PrivateVerification } from "../../utils/types.ts";

const ALLOWED_ID_TYPES = [
  "aadhaar",
  "passport",
  "driving_licence",
  "voter_id",
  "other",
] as const;

type IdType = typeof ALLOWED_ID_TYPES[number];

const MATCH_THRESHOLD = 90; // matchScore above this → auto-verified

/**
 * Builds the one-shot OCR + KYC verification prompt for Gemini Vision.
 */
function buildOcrPrompt(guestName: string, idType: string): string {
  return `Act as an Indian KYC verification expert. You are analyzing a ${idType.replace("_", " ")} document.

TASK:
1. Extract the following fields from this ID document image:
   - "name": Full name as printed on the ID
   - "dob": Date of birth (format: YYYY-MM-DD if visible, otherwise "not visible")
   - "id_number": Full ID number as printed (Aadhaar: XXXX-XXXX-XXXX, Passport: alphanumeric, DL: state code + number)
   - "address": Full address if present, otherwise "not visible"

2. Compare the extracted name with the Guest Name: "${guestName}"
   - Calculate a "match_score" from 0 to 100:
     - 100 = exact match
     - 90-99 = minor variation (e.g., middle name present/absent, spelling difference)
     - 70-89 = partial match (first name matches but last name differs)
     - 0-69 = poor match (different person likely)
   - Be lenient with common Indian name variations (e.g., "Kumar" vs "Kumaar", initials)

3. Check for document quality issues. Add to "flags" array if any:
   - "blurred" — text is not clearly readable
   - "edited" — signs of digital manipulation or photoshop
   - "low_quality" — low resolution or poor lighting
   - "expired" — if expiry date is visible and past
   - "partial" — part of the document is cut off or missing

RESPOND WITH ONLY a JSON object in this exact format:
{
  "name": "extracted name",
  "dob": "YYYY-MM-DD or not visible",
  "id_number": "extracted ID number",
  "address": "extracted address or not visible",
  "match_score": 95,
  "flags": []
}

If the image is NOT a government ID document, return:
{
  "name": "",
  "dob": "",
  "id_number": "",
  "address": "",
  "match_score": 0,
  "flags": ["not_an_id_document"]
}`;
}

export const handler: Handlers = {
  POST: async (req) => {
    let body: {
      bookingId?: string;
      idType?: string;
      guestName?: string;
      imageB64?: string;
    };

    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { bookingId, idType, guestName, imageB64 } = body;

    if (!bookingId || !idType || !guestName || !imageB64) {
      return Response.json(
        { error: "Required: bookingId, idType, guestName, imageB64" },
        { status: 400 },
      );
    }

    if (!ALLOWED_ID_TYPES.includes(idType as IdType)) {
      return Response.json(
        { error: `idType must be one of: ${ALLOWED_ID_TYPES.join(", ")}` },
        { status: 400 },
      );
    }

    // Verify the booking exists
    const booking = await getBookingById(bookingId);
    if (!booking) {
      return Response.json({ error: "Booking not found" }, { status: 404 });
    }

    // ── Store initial "processing" state ────────────────────────
    const MAX_B64_PREVIEW = 2048;
    const idPreviewB64 = imageB64.slice(0, MAX_B64_PREVIEW);
    const now = new Date().toISOString();

    const verification: GuestVerification = {
      bookingId,
      guestName: guestName.trim(),
      idType: idType as IdType,
      idPreviewB64,
      status: "processing",
      createdAt: now,
    };
    await saveGuestVerification(verification);

    // ── Call Gemini Vision for OCR ──────────────────────────────
    let ocrResult: OcrResult;

    try {
      const response = await callGeminiVision({
        prompt: buildOcrPrompt(guestName.trim(), idType),
        systemPrompt:
          "You are an OCR and KYC verification AI. Extract data precisely and return only valid JSON. Be strict about document quality but lenient with Indian name variations.",
        imageBase64: imageB64,
        temperature: 0.1, // Low temperature for precise extraction
        maxOutputTokens: 512,
        jsonMode: true,
      });

      // Parse JSON from Gemini response
      try {
        ocrResult = JSON.parse(response.text) as OcrResult;
      } catch {
        console.error("[verify] Failed to parse Gemini JSON:", response.text);
        // Attempt to extract JSON from markdown code block
        const jsonMatch = response.text.match(/```json\s*([\s\S]*?)```/) ??
          response.text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          ocrResult = JSON.parse(jsonMatch[1] ?? jsonMatch[0]) as OcrResult;
        } else {
          throw new Error("Could not parse OCR response as JSON");
        }
      }
    } catch (err) {
      console.error("[verify] Gemini OCR error:", err);

      // Mark as failed but don't crash — the booking is still valid
      verification.status = "failed";
      verification.flags = ["ocr_error"];
      await saveGuestVerification(verification);

      // Notify the host about the failed verification
      const failNotification: Notification = {
        id: crypto.randomUUID().replace(/-/g, "").slice(0, 12),
        hostId: booking.hostId,
        type: "verification_failed" as Notification["type"],
        title: "ID Verification Failed",
        message: `Guest ${guestName.trim()} uploaded an ID for booking #${bookingId.slice(0, 8).toUpperCase()} but OCR processing failed. Manual review is required.`,
        propertyName: "",
        meta: { bookingId, guestName: guestName.trim() },
        read: false,
        createdAt: now,
      };
      await saveNotification(failNotification);

      return Response.json({
        ok: true,
        status: "review_needed",
        message: "ID verification encountered an error. Our team will review manually.",
        bookingId,
        matchScore: 0,
        verified: false,
        flags: ["ocr_error"],
      });
    }

    // ── Determine verification outcome ─────────────────────────
    const matchScore = Math.min(100, Math.max(0, ocrResult.match_score ?? 0));
    const flags = Array.isArray(ocrResult.flags) ? ocrResult.flags : [];
    const isVerified =
      matchScore >= MATCH_THRESHOLD &&
      !flags.includes("not_an_id_document") &&
      !flags.includes("edited");

    // ── Update public verification record ──────────────────────
    const updatedVerification: GuestVerification = {
      ...verification,
      status: isVerified ? "verified" : "failed",
      matchScore,
      flags,
      extractedData: {
        name: ocrResult.name || undefined,
        idLast4: ocrResult.id_number
          ? ocrResult.id_number.replace(/[^a-zA-Z0-9]/g, "").slice(-4)
          : undefined,
        dob: ocrResult.dob !== "not visible" ? ocrResult.dob : undefined,
      },
      verifiedAt: isVerified ? now : undefined,
    };
    await saveGuestVerification(updatedVerification);

    // ── Store full OCR data in private namespace (host-only) ───
    const privateData: PrivateVerification = {
      bookingId,
      hostId: booking.hostId,
      fullName: ocrResult.name || undefined,
      dob: ocrResult.dob !== "not visible" ? ocrResult.dob : undefined,
      idNumber: ocrResult.id_number || undefined,
      address: ocrResult.address !== "not visible" ? ocrResult.address : undefined,
      matchScore,
      flags,
      rawResponse: JSON.stringify(ocrResult),
      createdAt: now,
    };
    await savePrivateVerification(privateData);

    // ── Update booking if verified ─────────────────────────────
    if (isVerified) {
      await saveBooking({
        ...booking,
        guestIdRef: updatedVerification.extractedData?.idLast4,
        idVerified: true,
        updatedAt: now,
      });

    }

    // If not verified, notify the host to review manually
    if (!isVerified) {
      const reviewNotification: Notification = {
        id: crypto.randomUUID().replace(/-/g, "").slice(0, 12),
        hostId: booking.hostId,
        type: "verification_complete" as Notification["type"],
        title: matchScore >= 70 ? "ID Partial Match" : "ID Verification Failed",
        message: `Guest ${guestName.trim()} (booking #${bookingId.slice(0, 8).toUpperCase()}) scored ${matchScore}/100 on ID verification. ${flags.length > 0 ? `Flags: ${flags.join(", ")}` : "Manual review recommended."}`,
        propertyName: "",
        meta: { bookingId, matchScore: String(matchScore), guestName: guestName.trim() },
        read: false,
        createdAt: now,
      };
      await saveNotification(reviewNotification);
    }

    return Response.json({
      ok: true,
      status: isVerified ? "verified" : "review_needed",
      matchScore,
      verified: isVerified,
      flags,
      message: isVerified
        ? "Your identity has been verified successfully! ✅"
        : matchScore >= 70
        ? "Partial match detected. Our team will review your ID manually."
        : "Verification inconclusive. Please ensure the ID is clear and matches your booking name.",
      bookingId,
    });
  },
};
