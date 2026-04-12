> **BrainSync Context Pumper** 🧠
> Dynamically loaded for active file: `utils\db.ts` (Domain: **Generic Logic**)

### 🔴 Generic Logic Gotchas
- **⚠️ GOTCHA: Replaced auth Crucial — prevents null/undefined runtime crashes**: -   try {
+   let hostEmail = "";
-     const kv = await getKv();
+   try {
-     const hostEntry = await kv.get(["host", hostId]);
+     const kv = await getKv();
-     if (hostEntry.value) {
+     const hostEntry = await kv.get(["host", hostId]);
-       const host = hostEntry.value as { email: string; name?: string; setupFeePaid?: boolean };
+     if (hostEntry.value) {
-       hostName = host.name ?? hostName;
+       const host = hostEntry.value as { email: string; name?: string; setupFeePaid?: boolean };
-       
+       hostName = host.name ?? hostName;
-       // Crucial part of Onboarding sync: if not paid, route them out of dashboard to pricing
+       hostEmail = host.email;
-       if (host.setupFeePaid === false) {
+       
-           const redirectTo = new URL(req.url).pathname;
+       // Crucial part of Onboarding sync: if not paid, route them out of dashboard to pricing
-           return new Response(null, {
+       if (host.setupFeePaid === false) {
-             status: 302,
+           const redirectTo = new URL(req.url).pathname;
-             headers: {
+           return new Response(null, {
-               Location: `/pricing?auth=onboarding_incomplete&redirect=${encodeURIComponent(redirectTo)}`,
+             status: 302,
-             },
+             headers: {
-           });
+               Location: `/pricing?auth=onboarding_incomplete&redirect=${encodeURIComponent(redirectTo)}`,
-       }
+             },
- 
+           });
-       // Check Email Verification
+       }
-       const authEntry = await kv.get(["auth", host.email.toLowerCase()]);
+ 
-       if (authEntry.value) {
+       // Check Email Verification
-         const authRecord = authEntry.value as { emailVerified?: boolean };
+       const authEntry = await kv.get(["auth", host.email.toLowerCase()]);
-         emailVerified = authRecord.emailVerified ?? true; // if missing, assume old account which is verified
+       if (authEntry.value) {
-       }
+         const authR
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [getKv, parseCookies, handler]
- **⚠️ GOTCHA: Fixed null crash in LedgerEntry — parallelizes async operations for speed**: -   saveBooking,
+   getPropertyById,
-   saveLedgerEntry,
+   saveBooking,
-   saveNotification,
+   saveLedgerEntry,
- } from "../../../utils/db.ts";
+   saveNotification,
- import type { LedgerEntry, Notification } from "../../../utils/types.ts";
+ } from "../../../utils/db.ts";
- 
+ import { sendBookingConfirmation } from "../../../utils/email.ts";
- const EASEBUZZ_SALT = Deno.env.get("EASEBUZZ_SALT");
+ import type { LedgerEntry, Notification } from "../../../utils/types.ts";
- const EASEBUZZ_KEY = Deno.env.get("EASEBUZZ_KEY");
+ 
- const ISTAY_COMMISSION = 0.05;
+ const EASEBUZZ_SALT = Deno.env.get("EASEBUZZ_SALT");
- 
+ const EASEBUZZ_KEY = Deno.env.get("EASEBUZZ_KEY");
- /**
+ const ISTAY_COMMISSION = 0.05;
-  * Verifies Easebuzz response hash.
+ 
-  * Hash Format: salt|status|udf10|udf9|udf8|udf7|udf6|udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key
+ /**
-  */
+  * Verifies Easebuzz response hash.
- async function verifyResponseHash(params: Record<string, string>, salt: string) {
+  * Hash Format: salt|status|udf10|udf9|udf8|udf7|udf6|udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key
-   const hashString = [
+  */
-     salt,
+ async function verifyResponseHash(params: Record<string, string>, salt: string) {
-     params.status,
+   const hashString = [
-     params.udf10 || "",
+     salt,
-     params.udf9 || "",
+     params.status,
-     params.udf8 || "",
+     params.udf10 || "",
-     params.udf7 || "",
+     params.udf9 || "",
-     params.udf6 || "",
+     params.udf8 || "",
-     params.udf5 || "",
+     params.udf7 || "",
-     params.udf4 || "",
+     params.udf6 || "",
-     params.udf3 || "",
+     params.udf5 || "",
-     params.udf2 || "",
+     params.udf4 || "",
-     params.udf1 || "",
+     params.udf3 || "",
-     params.email,
+     params.udf2 || "",
-     params.firstname,
+     params.udf1 || "",
-     params.productinfo,
+     params.email,
-     params.amount,
+     params.firstname,
-    
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [EASEBUZZ_SALT, EASEBUZZ_KEY, ISTAY_COMMISSION, verifyResponseHash, enumerateDates]

### 📐 Generic Logic Conventions & Fixes
- **[discovery] discovery in db.ts**: File updated (external): utils/db.ts

Content summary (593 lines):
// ========================[REDACTED]
// utils/db.ts — Deno KV database layer for istay.space
//
// KV Key Schema:
//   ["host", hostId]                          → Host
//   ["host_index", hostId]                    → true  (for full-scan)
//   ["property", hostId, propId]              → Property
//   ["prop_index", propId]                    → { hostId }  (secondary index)
//   ["booking", hostId, bookingId]            → Booking
//   ["booking_index", bookingId]   
- **[convention] Added session cookies authentication — prevents null/undefined runtime crashes — confirmed 4x**: -   return {
+   let linkViews7Days = 0;
-     activeBookings,
+   for (const p of properties) {
-     monthlyEarnings,
+     linkViews7Days += await getPropertyViewsLast7Days(p.id);
-     blockedDates,
+   }
-     totalProperties: properties.length,
+ 
-   };
+   return {
- }
+     activeBookings,
- 
+     monthlyEarnings,
- // ── HOST KNOWLEDGE BASE ───────────────────────────────────────
+     blockedDates,
- 
+     totalProperties: properties.length,
- export async function saveKnowledge(data: HostKnowledge): Promise<void> {
+     linkViews7Days,
-   const kv = await getKv();
+   };
-   await kv.set(["knowledge", data.hostId, data.propertyId], data);
+ }
- }
+ 
- 
+ // ── HOST KNOWLEDGE BASE ───────────────────────────────────────
- export async function getKnowledge(
+ 
-   hostId: string,
+ export async function saveKnowledge(data: HostKnowledge): Promise<void> {
-   propertyId: string,
+   const kv = await getKv();
- ): Promise<HostKnowledge | null> {
+   await kv.set(["knowledge", data.hostId, data.propertyId], data);
-   const kv = await getKv();
+ }
-   const entry = await kv.get<HostKnowledge>(["knowledge", hostId, propertyId]);
+ 
-   return entry.value;
+ export async function getKnowledge(
- }
+   hostId: string,
- 
+   propertyId: string,
- /**
+ ): Promise<HostKnowledge | null> {
-  * Looks up knowledge base for a property without needing hostId.
+   const kv = await getKv();
-  * Uses prop_index to resolve hostId first.
+   const entry = await kv.get<HostKnowledge>(["knowledge", hostId, propertyId]);
-  */
+   return entry.value;
- export async function getKnowledgeByPropId(
+ }
-   propertyId: string,
+ 
- ): Promise<HostKnowledge | null> {
+ /**
-   const kv = await getKv();
+  * Looks up knowledge base for a property without needing hostId.
-   const idx = await kv.get<{ hostId: string }>(["prop_index", propertyId]);
+  * Uses prop_index to resolve hostId first.
-   if (!idx.value) return null;
+  */
-   return getKnowledge(idx.value.hostId, prop
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [_kv, getKv, getHost, saveHost, hashPassword]
- **[discovery] discovery in email.ts**: File updated (external): utils/email.ts

Content summary (185 lines):
// ========================[REDACTED]
// utils/email.ts — Centralized Email Dispatcher (Brevo API)
// ========================[REDACTED]

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
const BREVO_EMAIL = Deno.env.get("BREVO_EMAIL") || "no-reply@istay.space";
const APP_BASE_URL = Deno.env.get("APP_BASE_URL") || "https://istay.space";

/**
 * Core send routine for Brevo REST API.
 */
async function sendBrevoEmail(
  toEmail: string
- **[discovery] discovery in types.ts**: File updated (external): utils/types.ts

Content summary (309 lines):
// ========================[REDACTED]
// utils/types.ts — Shared type definitions for istay.space
// ========================[REDACTED]

// ── CORE ENTITIES ─────────────────────────────────────────────

export interface Host {
  id: string;
  email: string;
  name: string;
  phone: string;
  /** Always "lifetime" — one-time ₹1,000 setup */
  plan: "lifetime";
  setupFeePaid: boolean;
  /** Payment gateway vendor/sub-merchant ID (Easebu
- **[convention] what-changed in types.ts — confirmed 3x**: - }
+   linkViews7Days: number;
- 
+ }
- // ── MIDDLEWARE STATE ───────────────────────────────────────────
+ 
- 
+ // ── MIDDLEWARE STATE ───────────────────────────────────────────
- export interface DashboardState {
+ 
-   hostId: string;
+ export interface DashboardState {
-   hostName: string;
+   hostId: string;
-   hostEmail: string;
+   hostName: string;
-   emailVerified: boolean;
+   hostEmail: string;
- }
+   emailVerified: boolean;
- 
+ }
+ 

📌 IDE AST Context: Modified symbols likely include [Host, AuthRecord, Property, Booking, CalendarBlock]
- **[what-changed] Replaced auth AddProperty — improves module reusability**: - import * as $api_pay from "./routes/api/pay.ts";
+ import * as $api_ical_propId_ from "./routes/api/ical/[propId].ts";
- import * as $api_properties from "./routes/api/properties.ts";
+ import * as $api_pay from "./routes/api/pay.ts";
- import * as $api_scrape from "./routes/api/scrape.ts";
+ import * as $api_properties from "./routes/api/properties.ts";
- import * as $api_verify from "./routes/api/verify.ts";
+ import * as $api_scrape from "./routes/api/scrape.ts";
- import * as $blog_slug from "./routes/blog/[slug].tsx";
+ import * as $api_verify from "./routes/api/verify.ts";
- import * as $blog_index from "./routes/blog/index.tsx";
+ import * as $blog_slug from "./routes/blog/[slug].tsx";
- import * as $api_webhooks_payment from "./routes/api/webhooks/payment.ts";
+ import * as $blog_index from "./routes/blog/index.tsx";
- import * as $api_webhooks_whatsapp from "./routes/api/webhooks/whatsapp.ts";
+ import * as $api_webhooks_payment from "./routes/api/webhooks/payment.ts";
- import * as $care_token_ from "./routes/care/[token].tsx";
+ import * as $api_webhooks_whatsapp from "./routes/api/webhooks/whatsapp.ts";
- import * as $feedback_token_ from "./routes/feedback/[token].tsx";
+ import * as $care_token_ from "./routes/care/[token].tsx";
- import * as $contact from "./routes/contact.tsx";
+ import * as $feedback_token_ from "./routes/feedback/[token].tsx";
- import * as $dashboard_layout from "./routes/dashboard/_layout.tsx";
+ import * as $contact from "./routes/contact.tsx";
- import * as $dashboard_middleware from "./routes/dashboard/_middleware.ts";
+ import * as $dashboard_layout from "./routes/dashboard/_layout.tsx";
- import * as $dashboard_bookings from "./routes/dashboard/bookings.tsx";
+ import * as $dashboard_middleware from "./routes/dashboard/_middleware.ts";
- import * as $dashboard_guests from "./routes/dashboard/guests.tsx";
+ import * as $dashboard_bookings from "./routes/dashboard/bookings.tsx";
- import * as $dashboard_index from "./routes/
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [manifest, manifest, default, default]
- **[convention] Replaced auth AddProperty — improves module reusability — confirmed 3x**: - import * as $contact from "./routes/contact.tsx";
+ import * as $feedback_token_ from "./routes/feedback/[token].tsx";
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
+ import * as $dashboard_index from "./routes/dashboard/index.tsx";
- import * as $dashboard_properties from "./routes/dashboard/properties.tsx";
+ import * as $dashboard_knowledge from "./routes/dashboard/knowledge.tsx";
- import * as $dashboard_settings from "./routes/dashboard/settings.tsx";
+ import * as $dashboard_properties from "./routes/dashboard/properties.tsx";
- import * as $forgot_password from "./routes/forgot-password.tsx";
+ import * as $dashboard_settings from "./routes/dashboard/settings.tsx";
- import * as $index from "./routes/index.tsx";
+ import * as $forgot_password from "./routes/forgot-password.tsx";
- import * as $legal_cancellation from "./routes/legal/cancellation.tsx";
+ import * as $index from "./routes/index.tsx";
- import * as $legal_privacy from "./routes/legal/privacy.tsx";
+ import * as $legal_cancellation from "./routes/legal/cancellation.tsx";
- import * as $legal_shipping from "./routes/legal/shipping.tsx";
+ import * as $legal_privacy from "./routes/legal/privacy.tsx";
- import * as $legal_terms from "./routes/legal/terms.tsx";
+ import * as $
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [manifest, manifest, default, default]
- **[what-changed] Replaced auth CaretakerChecklist — improves module reusability**: - import * as $CheckoutForm from "./islands/CheckoutForm.tsx";
+ import * as $CaretakerChecklist from "./islands/CaretakerChecklist.tsx";
- import * as $DashboardSidebar from "./islands/DashboardSidebar.tsx";
+ import * as $CheckoutForm from "./islands/CheckoutForm.tsx";
- import * as $EarningsCalculator from "./islands/EarningsCalculator.tsx";
+ import * as $DashboardSidebar from "./islands/DashboardSidebar.tsx";
- import * as $EarningsComparison from "./islands/EarningsComparison.tsx";
+ import * as $EarningsCalculator from "./islands/EarningsCalculator.tsx";
- import * as $ForgotPasswordForm from "./islands/ForgotPasswordForm.tsx";
+ import * as $EarningsComparison from "./islands/EarningsComparison.tsx";
- import * as $GuestChat from "./islands/GuestChat.tsx";
+ import * as $ForgotPasswordForm from "./islands/ForgotPasswordForm.tsx";
- import * as $IdVerification from "./islands/IdVerification.tsx";
+ import * as $GuestChat from "./islands/GuestChat.tsx";
- import * as $KnowledgeEditor from "./islands/KnowledgeEditor.tsx";
+ import * as $IdVerification from "./islands/IdVerification.tsx";
- import * as $KnowledgeUploader from "./islands/KnowledgeUploader.tsx";
+ import * as $KnowledgeEditor from "./islands/KnowledgeEditor.tsx";
- import * as $LinkPerformanceChart from "./islands/LinkPerformanceChart.tsx";
+ import * as $KnowledgeUploader from "./islands/KnowledgeUploader.tsx";
- import * as $LoginForm from "./islands/LoginForm.tsx";
+ import * as $LinkPerformanceChart from "./islands/LinkPerformanceChart.tsx";
- import * as $MagicScraperAnimation from "./islands/MagicScraperAnimation.tsx";
+ import * as $LoginForm from "./islands/LoginForm.tsx";
- import * as $MobileMenu from "./islands/MobileMenu.tsx";
+ import * as $MagicScraperAnimation from "./islands/MagicScraperAnimation.tsx";
- import * as $PricingCheckout from "./islands/PricingCheckout.tsx";
+ import * as $MobileMenu from "./islands/MobileMenu.tsx";
- import * as $ProofOfCleanUploader from "./islands/Pr
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [manifest, manifest, default, default]
- **[what-changed] Replaced auth EarningsComparison — improves module reusability**: - import * as $ForgotPasswordForm from "./islands/ForgotPasswordForm.tsx";
+ import * as $EarningsComparison from "./islands/EarningsComparison.tsx";
- import * as $GuestChat from "./islands/GuestChat.tsx";
+ import * as $ForgotPasswordForm from "./islands/ForgotPasswordForm.tsx";
- import * as $IdVerification from "./islands/IdVerification.tsx";
+ import * as $GuestChat from "./islands/GuestChat.tsx";
- import * as $KnowledgeEditor from "./islands/KnowledgeEditor.tsx";
+ import * as $IdVerification from "./islands/IdVerification.tsx";
- import * as $KnowledgeUploader from "./islands/KnowledgeUploader.tsx";
+ import * as $KnowledgeEditor from "./islands/KnowledgeEditor.tsx";
- import * as $LinkPerformanceChart from "./islands/LinkPerformanceChart.tsx";
+ import * as $KnowledgeUploader from "./islands/KnowledgeUploader.tsx";
- import * as $LoginForm from "./islands/LoginForm.tsx";
+ import * as $LinkPerformanceChart from "./islands/LinkPerformanceChart.tsx";
- import * as $MagicScraperAnimation from "./islands/MagicScraperAnimation.tsx";
+ import * as $LoginForm from "./islands/LoginForm.tsx";
- import * as $MobileMenu from "./islands/MobileMenu.tsx";
+ import * as $MagicScraperAnimation from "./islands/MagicScraperAnimation.tsx";
- import * as $PricingCheckout from "./islands/PricingCheckout.tsx";
+ import * as $MobileMenu from "./islands/MobileMenu.tsx";
- import * as $ProofOfCleanUploader from "./islands/ProofOfCleanUploader.tsx";
+ import * as $PricingCheckout from "./islands/PricingCheckout.tsx";
- import * as $RegisterForm from "./islands/RegisterForm.tsx";
+ import * as $ProofOfCleanUploader from "./islands/ProofOfCleanUploader.tsx";
- import * as $ResendVerificationBtn from "./islands/ResendVerificationBtn.tsx";
+ import * as $RegisterForm from "./islands/RegisterForm.tsx";
- import * as $ScraperPreview from "./islands/ScraperPreview.tsx";
+ import * as $ResendVerificationBtn from "./islands/ResendVerificationBtn.tsx";
- import * as $SupplyRequest from "./isl
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [manifest, manifest, default, default]
- **[what-changed] what-changed in payment.ts**: File updated (external): routes/api/webhooks/payment.ts

Content summary (206 lines):
// ========================[REDACTED]
// routes/api/webhooks/payment.ts — Easebuzz Payment Webhook
//
// POST /api/webhooks/payment
// Called by Easebuzz after a payment attempt.
//
// Logic:
//   1. Verify SHA-512 Response Hash
//   2. If status === "success":
//      a. Update Booking status → "confirmed"
//      b. Block booked dates in KV
//      c. Create LedgerEntry (95/5 split logic)
//      d. Notify host
// ==========[REDACTED]
- **[what-changed] Replaced auth ScraperPreview — improves module reusability**: - import * as $SupplyRequest from "./islands/SupplyRequest.tsx";
+ import * as $ScraperPreview from "./islands/ScraperPreview.tsx";
- import type { Manifest } from "$fresh/server.ts";
+ import * as $SupplyRequest from "./islands/SupplyRequest.tsx";
- 
+ import type { Manifest } from "$fresh/server.ts";
- const manifest = {
+ 
-   routes: {
+ const manifest = {
-     "./routes/_app.tsx": $_app,
+   routes: {
-     "./routes/api/auth/forgot.ts": $api_auth_forgot,
+     "./routes/_app.tsx": $_app,
-     "./routes/api/auth/login.ts": $api_auth_login,
+     "./routes/api/auth/forgot.ts": $api_auth_forgot,
-     "./routes/api/auth/logout.ts": $api_auth_logout,
+     "./routes/api/auth/login.ts": $api_auth_login,
-     "./routes/api/auth/register.ts": $api_auth_register,
+     "./routes/api/auth/logout.ts": $api_auth_logout,
-     "./routes/api/auth/resend-verification.ts": $api_auth_resend_verification,
+     "./routes/api/auth/register.ts": $api_auth_register,
-     "./routes/api/bookings.ts": $api_bookings,
+     "./routes/api/auth/resend-verification.ts": $api_auth_resend_verification,
-     "./routes/api/caretaker/ready.ts": $api_caretaker_ready,
+     "./routes/api/bookings.ts": $api_bookings,
-     "./routes/api/caretaker/supply.ts": $api_caretaker_supply,
+     "./routes/api/caretaker/ready.ts": $api_caretaker_ready,
-     "./routes/api/chat.ts": $api_chat,
+     "./routes/api/caretaker/supply.ts": $api_caretaker_supply,
-     "./routes/api/contact.ts": $api_contact,
+     "./routes/api/chat.ts": $api_chat,
-     "./routes/api/cron/sync.ts": $api_cron_sync,
+     "./routes/api/contact.ts": $api_contact,
-     "./routes/api/invoice/[bookingId].ts": $api_invoice_bookingId,
+     "./routes/api/cron/sync.ts": $api_cron_sync,
-     "./routes/api/knowledge.ts": $api_knowledge,
+     "./routes/api/invoice/[bookingId].ts": $api_invoice_bookingId,
-     "./routes/api/knowledge/ocr.ts": $api_knowledge_ocr,
+     "./routes/api/knowledge.ts": $api_knowledge,
-     "./routes/ap
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [manifest, manifest, default, default]
- **[convention] Replaced auth AddProperty — improves module reusability — confirmed 6x**: -     "./routes/api/auth/verify.ts": $api_auth_verify,
+     "./routes/api/bookings.ts": $api_bookings,
-     "./routes/api/bookings.ts": $api_bookings,
+     "./routes/api/caretaker/ready.ts": $api_caretaker_ready,
-     "./routes/api/caretaker/ready.ts": $api_caretaker_ready,
+     "./routes/api/caretaker/supply.ts": $api_caretaker_supply,
-     "./routes/api/caretaker/supply.ts": $api_caretaker_supply,
+     "./routes/api/chat.ts": $api_chat,
-     "./routes/api/chat.ts": $api_chat,
+     "./routes/api/contact.ts": $api_contact,
-     "./routes/api/contact.ts": $api_contact,
+     "./routes/api/cron/sync.ts": $api_cron_sync,
-     "./routes/api/cron/sync.ts": $api_cron_sync,
+     "./routes/api/invoice/[bookingId].ts": $api_invoice_bookingId,
-     "./routes/api/invoice/[bookingId].ts": $api_invoice_bookingId,
+     "./routes/api/knowledge.ts": $api_knowledge,
-     "./routes/api/knowledge.ts": $api_knowledge,
+     "./routes/api/knowledge/ocr.ts": $api_knowledge_ocr,
-     "./routes/api/knowledge/ocr.ts": $api_knowledge_ocr,
+     "./routes/api/onboard/pay.ts": $api_onboard_pay,
-     "./routes/api/onboard/pay.ts": $api_onboard_pay,
+     "./routes/api/onboard/verify.ts": $api_onboard_verify,
-     "./routes/api/onboard/verify.ts": $api_onboard_verify,
+     "./routes/api/pay.ts": $api_pay,
-     "./routes/api/pay.ts": $api_pay,
+     "./routes/api/properties.ts": $api_properties,
-     "./routes/api/properties.ts": $api_properties,
+     "./routes/api/scrape.ts": $api_scrape,
-     "./routes/api/scrape.ts": $api_scrape,
+     "./routes/api/verify.ts": $api_verify,
-     "./routes/api/verify.ts": $api_verify,
+     "./routes/api/webhooks/payment.ts": $api_webhooks_payment,
-     "./routes/api/webhooks/payment.ts": $api_webhooks_payment,
+     "./routes/api/webhooks/whatsapp.ts": $api_webhooks_whatsapp,
-     "./routes/api/webhooks/whatsapp.ts": $api_webhooks_whatsapp,
+     "./routes/care/[token].tsx": $care_token_,
-     "./routes/care/[token].tsx": $care_token
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [manifest, manifest, default, default]
- **[what-changed] Replaced auth ProofOfCleanUploader — improves module reusability**: - import * as $RegisterForm from "./islands/RegisterForm.tsx";
+ import * as $ProofOfCleanUploader from "./islands/ProofOfCleanUploader.tsx";
- import * as $ResendVerificationBtn from "./islands/ResendVerificationBtn.tsx";
+ import * as $RegisterForm from "./islands/RegisterForm.tsx";
- import * as $SupplyRequest from "./islands/SupplyRequest.tsx";
+ import * as $ResendVerificationBtn from "./islands/ResendVerificationBtn.tsx";
- import type { Manifest } from "$fresh/server.ts";
+ import * as $SupplyRequest from "./islands/SupplyRequest.tsx";
- 
+ import type { Manifest } from "$fresh/server.ts";
- const manifest = {
+ 
-   routes: {
+ const manifest = {
-     "./routes/_app.tsx": $_app,
+   routes: {
-     "./routes/api/auth/forgot.ts": $api_auth_forgot,
+     "./routes/_app.tsx": $_app,
-     "./routes/api/auth/login.ts": $api_auth_login,
+     "./routes/api/auth/forgot.ts": $api_auth_forgot,
-     "./routes/api/auth/logout.ts": $api_auth_logout,
+     "./routes/api/auth/login.ts": $api_auth_login,
-     "./routes/api/auth/register.ts": $api_auth_register,
+     "./routes/api/auth/logout.ts": $api_auth_logout,
-     "./routes/api/auth/resend-verification.ts": $api_auth_resend_verification,
+     "./routes/api/auth/register.ts": $api_auth_register,
-     "./routes/api/bookings.ts": $api_bookings,
+     "./routes/api/auth/resend-verification.ts": $api_auth_resend_verification,
-     "./routes/api/caretaker/supply.ts": $api_caretaker_supply,
+     "./routes/api/bookings.ts": $api_bookings,
-     "./routes/api/chat.ts": $api_chat,
+     "./routes/api/caretaker/supply.ts": $api_caretaker_supply,
-     "./routes/api/contact.ts": $api_contact,
+     "./routes/api/chat.ts": $api_chat,
-     "./routes/api/cron/sync.ts": $api_cron_sync,
+     "./routes/api/contact.ts": $api_contact,
-     "./routes/api/knowledge.ts": $api_knowledge,
+     "./routes/api/cron/sync.ts": $api_cron_sync,
-     "./routes/api/knowledge/ocr.ts": $api_knowledge_ocr,
+     "./routes/api/knowledge.ts"
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [manifest, manifest, default, default]
