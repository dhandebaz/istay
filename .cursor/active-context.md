> **BrainSync Context Pumper** 🧠
> Dynamically loaded for active file: `utils\db.ts` (Domain: **Generic Logic**)

### 📐 Generic Logic Conventions & Fixes
- **[what-changed] Replaced auth Review**: - export interface Review {
+ export async function saveReview(review: Review): Promise<void> {
-   id: string;
+   const kv = await getKv();
-   bookingId: string;
+   await kv.set(["reviews", review.propertyId, review.id], review);
-   propertyId: string;
+ }
-   rating: number; // 1-5
+ 
-   comment?: string;
+ export async function listReviews(propertyId: string): Promise<Review[]> {
-   createdAt: string;
+   const kv = await getKv();
- }
+   const iter = kv.list<Review>({ prefix: ["reviews", propertyId] });
- 
+   const reviews: Review[] = [];
- export async function saveReview(review: Review): Promise<void> {
+   for await (const entry of iter) {
-   const kv = await getKv();
+     reviews.push(entry.value);
-   await kv.set(["reviews", review.propertyId, review.id], review);
+   }
- }
+   return reviews.sort((a, b) =>
- 
+     new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
- export async function listReviews(propertyId: string): Promise<Review[]> {
+   );
-   const kv = await getKv();
+ }
-   const iter = kv.list<Review>({ prefix: ["reviews", propertyId] });
+ 
-   const reviews: Review[] = [];
+ export async function saveSurveyToken(
-   for await (const entry of iter) {
+   token: string,
-     reviews.push(entry.value);
+   bookingId: string,
-   }
+ ): Promise<void> {
-   return reviews;
+   const kv = await getKv();
- }
+   await kv.set(["survey_tokens", token], {
- 
+     bookingId,
- export async function saveSurveyToken(
+     createdAt: new Date().toISOString(),
-   token: string,
+   }, { expireIn: 7 * 24 * 60 * 60 * 1000 }); // 7 days
-   bookingId: string,
+ }
- ): Promise<void> {
+ 
-   const kv = await getKv();
+ export async function getSurveyToken(
-   await kv.set(["survey_tokens", token], {
+   token: string,
-     bookingId,
+ ): Promise<{ bookingId: string } | null> {
-     createdAt: new Date().toISOString(),
+   const kv = await getKv();
-   }, { expireIn: 7 * 24 * 60 * 60 * 1000 }); // 7 days
+   const res = await kv
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [_kv, _kv, getKv, getKv, ENCRYPTION_KEY]
- **[problem-fix] Patched security issue Export**: - /**
+ // Export as alias for broader compatibility across the codebase
-  * Generates a pre-filled wa.me link for manual host actions.
+ export { sendWhatsAppText as sendWhatsAppMessage };
-  * Used when the automated API is not needed or for quick overrides.
+ 
-  */
+ /**
- export function getWhatsAppLink(phone: string, message: string): string {
+  * Generates a pre-filled wa.me link for manual host actions.
-   const cleanPhone = phone.replace(/\D/g, "");
+  * Used when the automated API is not needed or for quick overrides.
-   const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
+  */
-   return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
+ export function getWhatsAppLink(phone: string, message: string): string {
- }
+   const cleanPhone = phone.replace(/\D/g, "");
- 
+   const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
- /**
+   return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
-  * Standard message text for manual WhatsApp links.
+ }
-  */
+ 
- export const WHATSAPP_MANUAL_TEMPLATES = {
+ /**
-   REVIEW_REQUEST: (guestName: string, propertyName: string, reviewUrl: string) =>
+  * Standard message text for manual WhatsApp links.
-     `Hi ${guestName}! Hope you enjoyed your stay at ${propertyName}. Would you mind leaving us a quick review? It takes less than a minute: ${reviewUrl}`,
+  */
-   BOOKING_CONFIRMED: (guestName: string, propertyName: string, guideUrl: string) =>
+ export const WHATSAPP_MANUAL_TEMPLATES = {
-     `Hi ${guestName}, your booking at ${propertyName} is confirmed! View your check-in guide here: ${guideUrl}`,
+   REVIEW_REQUEST: (guestName: string, propertyName: string, reviewUrl: string) =>
- };
+     `Hi ${guestName}! Hope you enjoyed your stay at ${propertyName}. Would you mind leaving us a quick review? It takes less than a minute: ${reviewUrl}`,
- 
+   BOOKING_CONFIRMED: (guestName: string, propertyName: string, guid
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [WHATSAPP_TOKEN, WHATSAPP_TOKEN, WHATSAPP_PHONE_ID, WHATSAPP_PHONE_ID, sendWhatsApp]
- **[what-changed] Added session cookies authentication — formalizes the data contract with expl...**: -   /** OCR match score (0-100) */
+   /** Extracted for Form C compliance */
-   matchScore: number;
+   gender?: "male" | "female" | "other" | "not_visible";
-   /** AI confidence flags */
+   nationality?: string;
-   flags: string[];
+   idExpiry?: string;
-   /** Raw Gemini response (for debugging/audit) */
+   /** Specifically for foreign guest compliance */
-   rawResponse?: string;
+   visaDetails?: {
-   createdAt: string;
+     number?: string;
- }
+     expiry?: string;
- 
+     entryDate?: string;
- // ── AI / CONCIERGE ────────────────────────────────────────────
+   };
- 
+   /** OCR match score (0-100) */
- /**
+   matchScore: number;
-  * HostKnowledge — Markdown knowledge base written by hosts.
+   /** AI confidence flags */
-  * Injected as system context for the AI concierge.
+   flags: string[];
-  */
+   /** Raw Gemini response (for debugging/audit) */
- export interface HostKnowledge {
+   rawResponse?: string;
-   hostId: string;
+   createdAt: string;
-   propertyId: string;
+ }
-   /** Markdown content with WiFi, rules, check-in instructions, etc. */
+ 
-   content: string;
+ // ── AI / CONCIERGE ────────────────────────────────────────────
-   updatedAt: string;
+ 
- }
+ /**
- 
+  * HostKnowledge — Markdown knowledge base written by hosts.
- /** A single message in a guest chat session */
+  * Injected as system context for the AI concierge.
- export interface ChatMessage {
+  */
-   role: "user" | "model" | "function";
+ export interface HostKnowledge {
-   content: string;
+   hostId: string;
-   /** Gemini-compatible parts (for tool calls/results) */
+   propertyId: string;
-   parts?: any[];
+   /** Markdown content with WiFi, rules, check-in instructions, etc. */
-   timestamp: string;
+   content: string;
- }
+   updatedAt: string;
- 
+ }
- /**
+ 
-  * ChatSession — Persisted in KV for multi-turn conversation.
+ /** A single message in a guest chat session */
-  * Expires/soft-deleted after 24 hours for KV hygiene.
+ export interface 
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [Host, Host, WebhookConfig, WebhookConfig, AuthRecord]
- **[convention] Added session cookies authentication — formalizes the data contract with expl... — confirmed 3x**: -   createdAt: string;
+   /** Dynamic pricing rules defined by the host */
-   updatedAt: string;
+   pricingSettings?: {
- }
+     weekendSurcharge?: number; // decimal e.g. 0.15 for 15%
- 
+     seasonalAdjustments?: Array<{
- export interface Booking {
+       startDate: string; // MM-DD
-   id: string;
+       endDate: string; // MM-DD
-   propertyId: string;
+       adjustment: number; // decimal e.g. 0.20 for +20%
-   hostId: string;
+       label: string;
-   guestName: string;
+     }>;
-   guestEmail: string;
+     minPrice?: number;
-   guestPhone?: string;
+     maxPrice?: number;
-   /** Government ID reference (last 4 digits, from OCR) */
+   };
-   guestIdRef?: string;
+   createdAt: string;
-   checkIn: string; // YYYY-MM-DD
+   updatedAt: string;
-   checkOut: string; // YYYY-MM-DD
+ }
-   checkoutChecklist?: Record<string, boolean>;
+ 
-   cleanProofUrl?: string;
+ export interface Booking {
-   nights: number;
+   id: string;
-   /** Total gross booking amount in INR */
+   propertyId: string;
-   amount: number;
+   hostId: string;
-   status:
+   guestName: string;
-     | "pending"
+   guestEmail: string;
-     | "confirmed"
+   guestPhone?: string;
-     | "room_ready"
+   /** Government ID reference (last 4 digits, from OCR) */
-     | "cancelled"
+   guestIdRef?: string;
-     | "refunded"
+   checkIn: string; // YYYY-MM-DD
-     | "needs_review";
+   checkOut: string; // YYYY-MM-DD
-   /** Gateway Order ID (txnid) */
+   checkoutChecklist?: Record<string, boolean>;
-   gatewayOrderId?: string;
+   cleanProofUrl?: string;
-   /** Gateway Payment Session / Access Key */
+   nights: number;
-   paymentSessionId?: string;
+   /** Total gross booking amount in INR */
-   /** Whether guest ID has been verified */
+   amount: number;
-   idVerified?: boolean;
+   status:
-   caretakerPhone?: string;
+     | "pending"
-   caretakerName?: string;
+     | "confirmed"
-   createdAt: string;
+     | "room_ready"
-   updatedAt: string;
+     | "cancelle
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [Host, Host, WebhookConfig, WebhookConfig, AuthRecord]
- **[convention] Added API key auth authentication — improves module reusability — confirmed 4x**: - import * as $OtaSavingsChart from "./islands/OtaSavingsChart.tsx";
+ import * as $OfflineNotice from "./islands/OfflineNotice.tsx";
- import * as $PricingCheckout from "./islands/PricingCheckout.tsx";
+ import * as $OtaSavingsChart from "./islands/OtaSavingsChart.tsx";
- import * as $ProofOfCleanUploader from "./islands/ProofOfCleanUploader.tsx";
+ import * as $PricingCheckout from "./islands/PricingCheckout.tsx";
- import * as $PropertyGrid from "./islands/PropertyGrid.tsx";
+ import * as $ProofOfCleanUploader from "./islands/ProofOfCleanUploader.tsx";
- import * as $RegisterForm from "./islands/RegisterForm.tsx";
+ import * as $PropertyGrid from "./islands/PropertyGrid.tsx";
- import * as $ResendVerificationBtn from "./islands/ResendVerificationBtn.tsx";
+ import * as $RegisterForm from "./islands/RegisterForm.tsx";
- import * as $ScraperPreview from "./islands/ScraperPreview.tsx";
+ import * as $ResendVerificationBtn from "./islands/ResendVerificationBtn.tsx";
- import * as $ScrollToTop from "./islands/ScrollToTop.tsx";
+ import * as $ScraperPreview from "./islands/ScraperPreview.tsx";
- import * as $SettingsTabs from "./islands/SettingsTabs.tsx";
+ import * as $ScrollToTop from "./islands/ScrollToTop.tsx";
- import * as $SupplyRequest from "./islands/SupplyRequest.tsx";
+ import * as $SettingsTabs from "./islands/SettingsTabs.tsx";
- import * as $TeamManagement from "./islands/TeamManagement.tsx";
+ import * as $SupplyRequest from "./islands/SupplyRequest.tsx";
- import type { Manifest } from "$fresh/server.ts";
+ import * as $TeamManagement from "./islands/TeamManagement.tsx";
- 
+ import type { Manifest } from "$fresh/server.ts";
- const manifest = {
+ 
-   routes: {
+ const manifest = {
-     "./routes/_404.tsx": $_404,
+   routes: {
-     "./routes/_app.tsx": $_app,
+     "./routes/_404.tsx": $_404,
-     "./routes/_middleware.ts": $_middleware,
+     "./routes/_app.tsx": $_app,
-     "./routes/api/auth/forgot.ts": $api_auth_forgot,
+     "./routes/_middle
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [manifest, manifest, default, default]
- **[convention] Fixed null crash in JSON — prevents null/undefined runtime crashes — confirmed 4x**: -       address: ocrResult.address !== "not visible"
+       address: ocrResult.address !== "not visible" ? ocrResult.address : undefined,
-         ? ocrResult.address
+       gender: (ocrResult.gender as any) || "not_visible",
-         : undefined,
+       nationality: ocrResult.nationality,
-       matchScore,
+       idExpiry: ocrResult.id_expiry,
-       flags,
+       visaDetails: ocrResult.visa_details ? {
-       rawResponse: JSON.stringify(ocrResult),
+         number: ocrResult.visa_details.number,
-       createdAt: now,
+         expiry: ocrResult.visa_details.expiry,
-     };
+         entryDate: ocrResult.visa_details.entry_date,
-     await savePrivateVerification(privateData);
+       } : undefined,
- 
+       matchScore,
-     // ── Update booking if verified ─────────────────────────────
+       flags,
-     if (isVerified) {
+       rawResponse: JSON.stringify(ocrResult),
-       await saveBooking({
+       createdAt: now,
-         ...booking,
+     };
-         guestIdRef: updatedVerification.extractedData?.idLast4,
+     await savePrivateVerification(privateData);
-         idVerified: true,
+ 
-         updatedAt: now,
+     // ── Update booking if verified ─────────────────────────────
-       });
+     if (isVerified) {
-     }
+       await saveBooking({
- 
+         ...booking,
-     // If not verified, notify the host to review manually
+         guestIdRef: updatedVerification.extractedData?.idLast4,
-     if (!isVerified) {
+         idVerified: true,
-       const reviewNotification: Notification = {
+         updatedAt: now,
-         id: crypto.randomUUID().replace(/-/g, "").slice(0, 12),
+       });
-         hostId: booking.hostId,
+     }
-         type: "verification_complete" as Notification["type"],
+ 
-         title: matchScore >= 70 ? "ID Partial Match" : "ID Verification Failed",
+     // If not verified, notify the host to review manually
-         message: `Guest ${guestName.trim()} (booking #${
+     if (!isVerified) {

… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [ALLOWED_ID_TYPES, ALLOWED_ID_TYPES, IdType, IdType, MATCH_THRESHOLD]
- **[convention] Added API key auth authentication — improves module reusability — confirmed 3x**: - import * as $api_scrape from "./routes/api/scrape.ts";
+ import * as $api_public_search from "./routes/api/public/search.ts";
- import * as $api_verify_index from "./routes/api/verify/index.ts";
+ import * as $api_scrape from "./routes/api/scrape.ts";
- import * as $api_verify_status from "./routes/api/verify/status.ts";
+ import * as $api_verify_index from "./routes/api/verify/index.ts";
- import * as $api_webhooks_payment from "./routes/api/webhooks/payment.ts";
+ import * as $api_verify_status from "./routes/api/verify/status.ts";
- import * as $api_webhooks_whatsapp from "./routes/api/webhooks/whatsapp.ts";
+ import * as $api_webhooks_payment from "./routes/api/webhooks/payment.ts";
- import * as $blog_slug_ from "./routes/blog/[slug].tsx";
+ import * as $api_webhooks_whatsapp from "./routes/api/webhooks/whatsapp.ts";
- import * as $blog_index from "./routes/blog/index.tsx";
+ import * as $blog_slug_ from "./routes/blog/[slug].tsx";
- import * as $care_token_ from "./routes/care/[token].tsx";
+ import * as $blog_index from "./routes/blog/index.tsx";
- import * as $contact from "./routes/contact.tsx";
+ import * as $care_token_ from "./routes/care/[token].tsx";
- import * as $dashboard_layout from "./routes/dashboard/_layout.tsx";
+ import * as $contact from "./routes/contact.tsx";
- import * as $dashboard_middleware from "./routes/dashboard/_middleware.ts";
+ import * as $dashboard_layout from "./routes/dashboard/_layout.tsx";
- import * as $dashboard_bookings from "./routes/dashboard/bookings.tsx";
+ import * as $dashboard_middleware from "./routes/dashboard/_middleware.ts";
- import * as $dashboard_guests from "./routes/dashboard/guests.tsx";
+ import * as $dashboard_bookings from "./routes/dashboard/bookings.tsx";
- import * as $dashboard_index from "./routes/dashboard/index.tsx";
+ import * as $dashboard_guests from "./routes/dashboard/guests.tsx";
- import * as $dashboard_knowledge from "./routes/dashboard/knowledge.tsx";
+ import * as $dashboard_index fr
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [manifest, manifest, default, default]
