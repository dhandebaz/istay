> **BrainSync Context Pumper** 🧠
> Dynamically loaded for active file: `routes\dashboard\_middleware.ts` (Domain: **Generic Logic**)

### 📐 Generic Logic Conventions & Fixes
- **[problem-fix] Fixed null crash in System — prevents null/undefined runtime crashes**: -   /** The user prompt */
+   // The user prompt
-   /** System instruction (injected as systemInstruction) */
+   // System instruction (injected as systemInstruction)
-   /** Conversation history (for multi-turn chat) */
+   // Conversation history (for multi-turn chat)
-   /** Controls randomness. 0=deterministic, 1=creative. Default: 0.3 */
+   // Controls randomness. 0=deterministic, 1=creative. Default: 0.3
-   /** Max output tokens. Default: 1024 */
+   // Max output tokens. Default: 1024
-   /** If true, forces Gemini to return valid JSON */
+   // If true, forces Gemini to return valid JSON
-   /** The text prompt accompanying the image */
+   // The text prompt accompanying the image
-   /** System instruction */
+   // System instruction
-   /** Base64-encoded image data (without data:image/... prefix) */
+   // Base64-encoded image data (without data:image/... prefix)
-   /** MIME type of the image. Default: "image/jpeg" */
+   // MIME type of the image. Default: "image/jpeg"
-   /** The generated text */
+   // The generated text
-   /** Estimated input token count */
+   // Estimated input token count
-   /** Estimated output token count */
+   // Estimated output token count
-   /** Whether the response was truncated */
+   // Whether the response was truncated
-   /** Raw finish reason from API */
+   // Raw finish reason from API
- /**
+ // Strip data-URI prefix from base64 strings.
-  * Strip data-URI prefix from base64 strings.
+ // "data:image/jpeg;base64,/9j/4A..." → "/9j/4A..."
-  * "data:image/jpeg;base64,/9j/4A..." → "/9j/4A..."
+ export function stripDataUri(b64: string): { data: string; mime: string } {
-  */
+   const match = b64.match(/^data:([^;]+);base64,(.+)$/s);
- export function stripDataUri(b64: string): { data: string; mime: string } {
+   if (match) {
-   const match = b64.match(/^data:([^;]+);base64,(.+)$/s);
+     return { data: match[2], mime: match[1] };
-   if (match) {
+   }
-     return { data: match[2], mime: match[1] };

… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [GEMINI_API_KEY, MODEL, BASE_URL, GeminiTextOptions, GeminiVisionOptions]
- **[problem-fix] Fixed null crash in Guest — prevents null/undefined runtime crashes**: - // routes/api/verify.ts — Guest ID Verification (OCR Stub)
+ // routes/api/verify.ts — Guest ID Verification (Gemini Vision OCR)
- // Body: { bookingId, idType, imageB64 }
+ // Body: { bookingId, idType, guestName, imageB64 }
- // Returns: { status: "processing", verificationId }
+ // Returns: { status, matchScore, verified, flags }
- // This stub stores a preview of the image in KV and marks the
+ // Uses Gemini Flash-Lite vision to extract KYC data from
- // verification as "processing". The actual OCR AI will be plugged
+ // government IDs and compare against the guest's booking name.
- // in here later (e.g. Google Vision API, AWS Textract, or Sarvam).
+ // ================================================================
- // ================================================================
+ 
- 
+ import { type Handlers } from "$fresh/server.ts";
- import { type Handlers } from "$fresh/server.ts";
+ import {
- import {
+   getBookingById,
-   getBookingById,
+   saveBooking,
- } from "../../utils/db.ts";
+   savePrivateVerification,
- import type { GuestVerification } from "../../utils/types.ts";
+ } from "../../utils/db.ts";
- 
+ import { callGeminiVision } from "../../utils/gemini.ts";
- const ALLOWED_ID_TYPES = [
+ import type { GuestVerification, OcrResult, PrivateVerification } from "../../utils/types.ts";
-   "aadhaar",
+ 
-   "passport",
+ const ALLOWED_ID_TYPES = [
-   "driving_licence",
+   "aadhaar",
-   "voter_id",
+   "passport",
-   "other",
+   "driving_licence",
- ] as const;
+   "voter_id",
- 
+   "other",
- type IdType = typeof ALLOWED_ID_TYPES[number];
+ ] as const;
- export const handler: Handlers = {
+ type IdType = typeof ALLOWED_ID_TYPES[number];
-   async POST(req) {
+ 
-     let body: {
+ const MATCH_THRESHOLD = 90; // matchScore above this → auto-verified
-       bookingId?: string;
+ 
-       idType?: string;
+ /**
-       guestName?: string;
+  * Builds the one-shot OCR + KYC verification prompt for Gemini Vision.
-       imageB64?: 
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [ALLOWED_ID_TYPES, IdType, MATCH_THRESHOLD, buildOcrPrompt, handler]
- **[decision] Optimized Property — parallelizes async operations for speed**: - //   ["property", hostId, propId]              → Property
+ //   ["host_index", hostId]                    → true  (for full-scan)
- //   ["booking", hostId, bookingId]            → Booking
+ //   ["property", hostId, propId]              → Property
- //   ["calendar", propId, "YYYY-MM-DD"]        → CalendarBlock
+ //   ["prop_index", propId]                    → { hostId }  (secondary index)
- //   ["earnings_month", hostId, "YYYY-MM"]     → number (net earnings)
+ //   ["booking", hostId, bookingId]            → Booking
- // ================================================================
+ //   ["booking_index", bookingId]              → { hostId, propertyId }
- 
+ //   ["calendar", propId, "YYYY-MM-DD"]        → CalendarBlock
- import type {
+ //   ["earnings_month", hostId, "YYYY-MM"]     → number (net earnings)
-   Booking,
+ //   ["ledger", bookingId]                     → LedgerEntry
-   CalendarBlock,
+ //   ["notification", hostId, notifId]         → Notification
-   DashboardStats,
+ //   ["caretaker_token", token]                → CaretakerToken
-   Host,
+ //   ["verification", bookingId]               → GuestVerification
-   Property,
+ // ================================================================
- } from "./types.ts";
+ 
- 
+ import type {
- // ── KV Singleton ──────────────────────────────────────────────
+   Booking,
- 
+   CalendarBlock,
- let _kv: Deno.Kv | null = null;
+   CaretakerToken,
- 
+   DashboardStats,
- async function getKv(): Promise<Deno.Kv> {
+   GuestVerification,
-   if (!_kv) {
+   Host,
-     _kv = await Deno.openKv();
+   LedgerEntry,
-   }
+   Notification,
-   return _kv;
+   Property,
- }
+ } from "./types.ts";
- // ── HOST ──────────────────────────────────────────────────────
+ // ── KV Singleton ──────────────────────────────────────────────
- export async function getHost(id: string): Promise<Host | null> {
+ let _kv: Deno.Kv | null = null;
-   const kv = await getKv();
+ 
-   const entry = await kv.get<Host>(["h
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [_kv, getKv, getHost, saveHost, getProperty]
- **[what-changed] Updated API endpoint EarningsCalculator — improves module reusability**: - import * as $EarningsCalculator from "./islands/EarningsCalculator.tsx";
+ import * as $api_scrape from "./routes/api/scrape.ts";
- import * as $MobileMenu from "./islands/MobileMenu.tsx";
+ import * as $api_properties from "./routes/api/properties.ts";
- import { type Manifest } from "$fresh/server.ts";
+ import * as $api_pay from "./routes/api/pay.ts";
- 
+ import * as $dashboard_middleware from "./routes/dashboard/_middleware.ts";
- const manifest = {
+ import * as $dashboard_layout from "./routes/dashboard/_layout.tsx";
-   routes: {
+ import * as $dashboard_index from "./routes/dashboard/index.tsx";
-     "./routes/_app.tsx": $_app,
+ import * as $dashboard_properties from "./routes/dashboard/properties.tsx";
-     "./routes/index.tsx": $index,
+ import * as $EarningsCalculator from "./islands/EarningsCalculator.tsx";
-     "./routes/contact.tsx": $contact,
+ import * as $MobileMenu from "./islands/MobileMenu.tsx";
-     "./routes/pricing.tsx": $pricing,
+ import * as $DashboardSidebar from "./islands/DashboardSidebar.tsx";
-     "./routes/legal/terms.tsx": $legal_terms,
+ import * as $AddProperty from "./islands/AddProperty.tsx";
-     "./routes/legal/privacy.tsx": $legal_privacy,
+ import { type Manifest } from "$fresh/server.ts";
-     "./routes/legal/cancellation.tsx": $legal_cancellation,
+ 
-     "./routes/legal/shipping.tsx": $legal_shipping,
+ const manifest = {
-     "./routes/api/contact.ts": $api_contact,
+   routes: {
-   },
+     "./routes/_app.tsx": $_app,
-   islands: {
+     "./routes/index.tsx": $index,
-     "./islands/EarningsCalculator.tsx": $EarningsCalculator,
+     "./routes/contact.tsx": $contact,
-     "./islands/MobileMenu.tsx": $MobileMenu,
+     "./routes/pricing.tsx": $pricing,
-   },
+     "./routes/legal/terms.tsx": $legal_terms,
-   baseUrl: import.meta.url,
+     "./routes/legal/privacy.tsx": $legal_privacy,
- } satisfies Manifest;
+     "./routes/legal/cancellation.tsx": $legal_cancellation,
- 
+     "./routes/legal/shipping.
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [manifest, default]
