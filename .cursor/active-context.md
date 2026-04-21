> **BrainSync Context Pumper** 🧠
> Dynamically loaded for active file: `routes\api\host\team.ts` (Domain: **Generic Logic**)

### 📐 Generic Logic Conventions & Fixes
- **[problem-fix] Fixed null crash in Error — parallelizes async operations for speed**: -   const entry = await kv.get<Host>(["host", hostId]);
+   if (!kv) throw new Error("KV database is unavailable.");
-   if (!entry.value) throw new Error(`Host not found: ${hostId}`);
+   const entry = await kv.get<Host>(["host", hostId]);
- 
+   if (!entry.value) throw new Error(`Host not found: ${hostId}`);
-   const host = entry.value;
+ 
-   const webhooks = [...(host.webhooks || []), webhook];
+   const host = entry.value;
-   const updated: Host = { ...host, webhooks };
+   const webhooks = [...(host.webhooks || []), webhook];
- 
+   const updated: Host = { ...host, webhooks };
-   const result = await kv.atomic()
+ 
-     .check(entry) // version guard — fails if host was modified since read
+   const result = await kv.atomic()
-     .set(["host", hostId], updated)
+     .check(entry) // version guard — fails if host was modified since read
-     .commit();
+     .set(["host", hostId], updated)
- 
+     .commit();
-   if (!result.ok) {
+ 
-     throw new Error("Concurrent modification detected. Please retry.");
+   if (!result.ok) {
-   }
+     throw new Error("Concurrent modification detected. Please retry.");
- }
+   }
- 
+ }
- /**
+ 
-  * Atomically removes a webhook by ID from the Host's webhooks array.
+ /**
-  * Uses version check to prevent race conditions on concurrent writes.
+  * Atomically removes a webhook by ID from the Host's webhooks array.
-  */
+  * Uses version check to prevent race conditions on concurrent writes.
- export async function removeWebhook(
+  */
-   hostId: string,
+ export async function removeWebhook(
-   webhookId: string,
+   hostId: string,
- ): Promise<void> {
+   webhookId: string,
-   const kv = await getKv();
+ ): Promise<void> {
-   const entry = await kv.get<Host>(["host", hostId]);
+   const kv = await getKv();
-   if (!entry.value) throw new Error(`Host not found: ${hostId}`);
+   if (!kv) throw new Error("KV database is unavailable.");
- 
+   const entry = await kv.get<Host>(["host", hostId]);
-   const host = en
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [_kv, _kv, getKv, getKv, _prisma]
- **[problem-fix] Fixed null crash in Encrypt — parallelizes async operations for speed**: - 
+   if (!kv) return;
-   // Encrypt sensitive fields before saving
+ 
-   const encrypted = {
+   // Encrypt sensitive fields before saving
-     ...data,
+   const encrypted = {
-     idNumber: await encryptField(data.idNumber),
+     ...data,
-     address: await encryptField(data.address),
+     idNumber: await encryptField(data.idNumber),
-     fullName: await encryptField(data.fullName),
+     address: await encryptField(data.address),
-   };
+     fullName: await encryptField(data.fullName),
- 
+   };
-   await kv.set(["private_verification", data.bookingId], encrypted);
+ 
- }
+   await kv.set(["private_verification", data.bookingId], encrypted);
- 
+ }
- export async function getPrivateVerification(
+ 
-   bookingId: string,
+ export async function getPrivateVerification(
- ): Promise<PrivateVerification | null> {
+   bookingId: string,
-   const kv = await getKv();
+ ): Promise<PrivateVerification | null> {
-   const entry = await kv.get<PrivateVerification>(
+   const kv = await getKv();
-     ["private_verification", bookingId],
+   if (!kv) return null;
-   );
+   const entry = await kv.get<PrivateVerification>(
-   if (!entry.value) return null;
+     ["private_verification", bookingId],
- 
+   );
-   // Decrypt sensitive fields
+   if (!entry.value) return null;
-   return {
+ 
-     ...entry.value,
+   // Decrypt sensitive fields
-     idNumber: await decryptField(entry.value.idNumber),
+   return {
-     address: await decryptField(entry.value.address),
+     ...entry.value,
-     fullName: await decryptField(entry.value.fullName),
+     idNumber: await decryptField(entry.value.idNumber),
-   };
+     address: await decryptField(entry.value.address),
- }
+     fullName: await decryptField(entry.value.fullName),
- 
+   };
- // ── COMPLIANCE: PII SCRUBBING (DPDP & GDPR) ──────────────────
+ }
- /**
+ // ── COMPLIANCE: PII SCRUBBING (DPDP & GDPR) ──────────────────
-  * Autonomous scrubbing logic for guest PII in Postgres.
+ 
-  * Targets bookings wh
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [_kv, _kv, getKv, getKv, _prisma]
- **[problem-fix] Fixed null crash in YYYY — parallelizes async operations for speed**: -     const month = data.createdAt.slice(0, 7); // YYYY-MM
+     if (kv) {
-     const tallyKey = ["earnings_month", data.hostId, month];
+       const month = data.createdAt.slice(0, 7); // YYYY-MM
-     const current = await kv.get<number>(tallyKey);
+       const tallyKey = ["earnings_month", data.hostId, month];
-     const prev = current.value ?? 0;
+       const current = await kv.get<number>(tallyKey);
-     await kv.set(
+       const prev = current.value ?? 0;
-       tallyKey,
+       await kv.set(
-       Math.round((prev + data.amount * 0.95) * 100) / 100,
+         tallyKey,
-     );
+         Math.round((prev + data.amount * 0.95) * 100) / 100,
-   }
+       );
- }
+     }
- 
+   }
- /**
+ }
-  * Looks up the latest booking by guest phone number.
+ 
-  * Used by WhatsApp Concierge webhook to route messages to properties.
+ /**
-  */
+  * Looks up the latest booking by guest phone number.
- export async function getBookingByPhone(
+  * Used by WhatsApp Concierge webhook to route messages to properties.
-   phone: string,
+  */
- ): Promise<Booking | null> {
+ export async function getBookingByPhone(
-   const kv = await getKv();
+   phone: string,
-   const idx = await kv.get<string>(["booking_phone", phone]);
+ ): Promise<Booking | null> {
-   if (!idx.value) return null;
+   const kv = await getKv();
-   return getBookingById(idx.value);
+   if (!kv) return null;
- }
+   const idx = await kv.get<string>(["booking_phone", phone]);
- 
+   if (!idx.value) return null;
- export async function listBookings(hostId: string): Promise<Booking[]> {
+   return getBookingById(idx.value);
-   const kv = await getKv();
+ }
-   const iter = kv.list<Booking>({ prefix: ["booking", hostId] });
+ 
-   const bookings: Booking[] = [];
+ export async function listBookings(hostId: string): Promise<Booking[]> {
-   for await (const entry of iter) {
+   const kv = await getKv();
-     bookings.push(entry.value);
+   const bookings: Booking[] = [];
-   }
+   if (kv) {
-   retu
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [_kv, _kv, getKv, getKv, _prisma]
- **[convention] Added API key auth authentication — improves module reusability — confirmed 6x**: - import * as $api_bookings from "./routes/api/bookings.ts";
+ import * as $api_billing_pay from "./routes/api/billing/pay.ts";
- import * as $api_caretaker_ready from "./routes/api/caretaker/ready.ts";
+ import * as $api_billing_subscription from "./routes/api/billing/subscription.ts";
- import * as $api_caretaker_supply from "./routes/api/caretaker/supply.ts";
+ import * as $api_billing_verify from "./routes/api/billing/verify.ts";
- import * as $api_chat from "./routes/api/chat.ts";
+ import * as $api_bookings from "./routes/api/bookings.ts";
- import * as $api_contact from "./routes/api/contact.ts";
+ import * as $api_caretaker_ready from "./routes/api/caretaker/ready.ts";
- import * as $api_cron_reviews from "./routes/api/cron/reviews.ts";
+ import * as $api_caretaker_supply from "./routes/api/caretaker/supply.ts";
- import * as $api_cron_sync from "./routes/api/cron/sync.ts";
+ import * as $api_chat from "./routes/api/chat.ts";
- import * as $api_host_api_key_rotate from "./routes/api/host/api-key/rotate.ts";
+ import * as $api_contact from "./routes/api/contact.ts";
- import * as $api_host_form_c_bookingId_ from "./routes/api/host/form-c/[bookingId].ts";
+ import * as $api_cron_reviews from "./routes/api/cron/reviews.ts";
- import * as $api_host_team from "./routes/api/host/team.ts";
+ import * as $api_cron_sync from "./routes/api/cron/sync.ts";
- import * as $api_host_team_invite from "./routes/api/host/team/invite.ts";
+ import * as $api_host_api_key_rotate from "./routes/api/host/api-key/rotate.ts";
- import * as $api_host_webhooks_add from "./routes/api/host/webhooks/add.ts";
+ import * as $api_host_form_c_bookingId_ from "./routes/api/host/form-c/[bookingId].ts";
- import * as $api_host_webhooks_remove from "./routes/api/host/webhooks/remove.ts";
+ import * as $api_host_team from "./routes/api/host/team.ts";
- import * as $api_ical_propId_ from "./routes/api/ical/[propId].ts";
+ import * as $api_host_team_invite from "./routes/api/host/team/invite.ts";
-
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [manifest, manifest, default, default]
- **[convention] Fixed null crash in Notifies — reduces initial bundle size with code splitting — confirmed 4x**: + /**
+  * Notifies the host via WhatsApp when balance is low.
+  * Includes a Razorpay Payment Link for instant top-up.
+  */
+ export async function notifyHostLowBalance(
+   hostId: string,
+   phone: string,
+   critical = false,
+ ): Promise<void> {
+   const prisma = getPrisma();
+   const host = await prisma.host.findUnique({ where: { id: hostId } });
+   if (!host) return;
+ 
+   const now = new Date();
+   const lastAlert = host.lastLowBalanceAlert;
+ 
+   // Rate limit: 24 hours
+   if (lastAlert && (now.getTime() - new Date(lastAlert).getTime()) < 24 * 60 * 60 * 1000) {
+     return;
+   }
+ 
+   try {
+     const { createPaymentLink } = await import("./razorpay.ts");
+     const { sendWhatsAppText } = await import("./whatsapp.ts");
+ 
+     // Setting a default top-up amount for the link (₹500 as discussed)
+     const paymentLink = await createPaymentLink(hostId, 500, "AI Wallet Emergency Top-up");
+     
+     const message = critical
+       ? `🚨 *CRITICAL:* Your istay AI Wallet is empty. AI Concierge is currently disabled for your guests. Top up now to resume: ${paymentLink}`
+       : `⚠️ *Low Balance:* Your istay AI Wallet balance is below ₹20. Top up now to avoid interruption: ${paymentLink}`;
+ 
+     await sendWhatsAppText(phone, message);
+ 
+     await prisma.host.update({
+       where: { id: hostId },
+       data: { lastLowBalanceAlert: now },
+     });
+   } catch (err) {
+     console.error("[db] notifyHostLowBalance failed:", err);
+   }
+ }
+ 

📌 IDE AST Context: Modified symbols likely include [_kv, _kv, getKv, getKv, _prisma]
- **[what-changed] Replaced auth Pricing — ensures atomic multi-step database operations**: -  * Pricing: ₹50 per 1M tokens (combined in/out).
+  * Pricing: ₹200 per 1M tokens (combined in/out).
-   const totalTokens = usageMeta.prompt + usageMeta.completion;
+   const prisma = getPrisma();
-     const roundedCost = Math.max(0.01, Math.round(inrCost * 100) / 100);
+   
- 
+   const totalTokens = usageMeta.prompt + usageMeta.completion;
-     // ── Check Current Balance ──
+   const inrCost = (totalTokens / 1_000_000) * 200; 
-     const host = await prisma.host.findUnique({ where: { id: hostId } });
+   const roundedCost = Math.max(0.01, Math.round(inrCost * 100) / 100);
-     if (!host) return;
+ 
- 
+   // ── Check Current Balance ──
-     if (host.walletBalance < roundedCost) {
+   const host = await prisma.host.findUnique({ where: { id: hostId } });
-       console.warn(`[db] Host ${hostId} has insufficient balance. Cost: ${roundedCost}, Balance: ${host.walletBalance}`);
+   if (!host) return;
-       // Send a critical alert if balance is already 0
+ 
-       if (host.walletBalance <= 0) {
+   if (host.walletBalance < roundedCost) {
-         await notifyHostLowBalance(hostId, host.phone, true);
+     console.warn(`[db] Host ${hostId} has insufficient balance. Cost: ${roundedCost}, Balance: ${host.walletBalance}`);
-       }
+     if (host.walletBalance <= 0) {
-       throw new Error("Insufficient AI wallet balance");
+       await notifyHostLowBalance(hostId, host.phone, true);
- 
+     throw new Error("Insufficient AI wallet balance");
-     // ── Perform Deduction ──
+   }
-     const updatedHost = await prisma.host.update({
+ 
-       where: { id: hostId },
+   // ── Perform Deduction ──
-       data: { walletBalance: { decrement: roundedCost } },
+   await prisma.$transaction([
-     });
+     prisma.host.update({
- 
+       where: { id: hostId },
-     // ── Threshold Check (₹20) ──
+       data: { walletBalance: { decrement: roundedCost } },
-     if (updatedHost.walletBalance < 20) {
+     }),
-       await notifyHostLowBalance(hostId, update
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [_kv, _kv, getKv, getKv, _prisma]
- **[what-changed] Replaced auth Math — ensures atomic multi-step database operations**: -   const inrCost = (totalTokens / 1_000_000) * 100; // Proposed ₹100 per 1M tokens (from plan)
+     const roundedCost = Math.max(0.01, Math.round(inrCost * 100) / 100);
-   const roundedCost = Math.max(0.01, Math.round(inrCost * 100) / 100);
+ 
- 
+     // ── Check Current Balance ──
-   const prisma = getPrisma();
+     const host = await prisma.host.findUnique({ where: { id: hostId } });
-   await prisma.$transaction([
+     if (!host) return;
-     prisma.host.update({
+ 
-       where: { id: hostId },
+     if (host.walletBalance < roundedCost) {
-       data: { walletBalance: { decrement: roundedCost } },
+       console.warn(`[db] Host ${hostId} has insufficient balance. Cost: ${roundedCost}, Balance: ${host.walletBalance}`);
-     }),
+       // Send a critical alert if balance is already 0
-     prisma.walletTransaction.create({
+       if (host.walletBalance <= 0) {
-       data: {
+         await notifyHostLowBalance(hostId, host.phone, true);
-         hostId,
+       }
-         amount: -roundedCost,
+       throw new Error("Insufficient AI wallet balance");
-         type: "ai_usage",
+     }
-         description: `AI Usage: ${usageMeta.useCase}`,
+ 
-         meta: {
+     // ── Perform Deduction ──
-           tokens: usageMeta,
+     const updatedHost = await prisma.host.update({
-           model: usageMeta.model,
+       where: { id: hostId },
-           rate: 100, // INR per 1M tokens
+       data: { walletBalance: { decrement: roundedCost } },
-         },
+     });
-       },
+ 
-     }),
+     // ── Threshold Check (₹20) ──
-   ]);
+     if (updatedHost.walletBalance < 20) {
- }
+       await notifyHostLowBalance(hostId, updatedHost.phone);
- 
+     }
- /**
+ 
-  * Renews or starts a monthly subscription.
+   const prisma = getPrisma();
-  */
+   await prisma.$transaction([
- export async function updateSubscription(
+     prisma.host.update({
-   hostId: string,
+       where: { id: hostId },
-   months = 1,
+       data: { walletBalance: 
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [_kv, _kv, getKv, getKv, _prisma]
- **[what-changed] what-changed in db.ts**: + /**
+  * Retrieves the wallet transaction history for a host.
+  */
+ export async function listWalletTransactions(
+   hostId: string,
+ ): Promise<WalletTransaction[]> {
+   const prisma = getPrisma();
+   const transactions = await prisma.walletTransaction.findMany({
+     where: { hostId },
+     orderBy: { createdAt: "desc" },
+   });
+   return transactions as WalletTransaction[];
+ }
+ 

📌 IDE AST Context: Modified symbols likely include [_kv, _kv, getKv, getKv, _prisma]
- **[what-changed] Replaced auth Wallet — reduces initial bundle size with code splitting**: -     // 2. Upsert Profile
+     // 2. Wallet Deduction
-     const names = existingProfile?.names || [];
+     const { deductAiWalletCost } = await import("./db.ts");
-     if (intelligence.name && !names.includes(intelligence.name)) {
+     await deductAiWalletCost(hostId, {
-       names.push(intelligence.name);
+       prompt: res.inputTokens || 0,
-     }
+       completion: res.outputTokens || 0,
- 
+       model: "gemini-1.5-flash",
-     const preferences = new Set([
+       useCase: "autonomous_reflection",
-       ...(existingProfile?.preferences || []),
+     });
-       ...(intelligence.new_preferences || []),
+ 
-     ]);
+     // 3. Upsert Profile
- 
+     const names = existingProfile?.names || [];
-     const updatedProfile: GuestProfile = {
+     if (intelligence.name && !names.includes(intelligence.name)) {
-       phone,
+       names.push(intelligence.name);
-       names,
+     }
-       emails: existingProfile?.emails || [],
+ 
-       preferences: Array.from(preferences),
+     const preferences = new Set([
-       stayHistory: existingProfile?.stayHistory || [],
+       ...(existingProfile?.preferences || []),
-       summary: intelligence.summary || existingProfile?.summary,
+       ...(intelligence.new_preferences || []),
-       createdAt: existingProfile?.createdAt || new Date().toISOString(),
+     ]);
-       updatedAt: new Date().toISOString(),
+ 
-     };
+     const updatedProfile: GuestProfile = {
- 
+       phone,
-     await saveGuestProfile(updatedProfile);
+       names,
-     console.log(`[intelligence] Reflected on guest=${phone}. Profile updated.`);
+       emails: existingProfile?.emails || [],
-   } catch (err) {
+       preferences: Array.from(preferences),
-     console.error("[intelligence] Reflection failed:", err);
+       stayHistory: existingProfile?.stayHistory || [],
-   }
+       summary: intelligence.summary || existingProfile?.summary,
- }
+       createdAt: existingProfile?.createdAt || new Date().toISOString()
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [sanitizeLLMJson, sanitizeLLMJson, reflectOnGuestSession, reflectOnGuestSession]
- **[what-changed] what-changed in edge.ts**: File updated (external): generated/client/deno/edge.ts

Content summary (4 lines):

import './polyfill.js'
// @deno-types="./index.d.ts"
export * from './edge.js'
- **[convention] Fixed null crash in Promise — parallelizes async operations for speed — confirmed 5x**: -   await kv.set(["calendar", block.propertyId, block.date], block);
+   if (!kv) return;
- }
+   await kv.set(["calendar", block.propertyId, block.date], block);
- 
+ }
- export async function unblockDate(
+ 
-   propertyId: string,
+ export async function unblockDate(
-   date: string,
+   propertyId: string,
- ): Promise<void> {
+   date: string,
-   const kv = await getKv();
+ ): Promise<void> {
-   await kv.delete(["calendar", propertyId, date]);
+   const kv = await getKv();
- }
+   if (!kv) return;
- 
+   await kv.delete(["calendar", propertyId, date]);
- export async function listBlockedDates(
+ }
-   propertyId: string,
+ 
- ): Promise<CalendarBlock[]> {
+ export async function listBlockedDates(
-   const kv = await getKv();
+   propertyId: string,
-   if (!kv) return [];
+ ): Promise<CalendarBlock[]> {
-   const iter = kv.list<CalendarBlock>({ prefix: ["calendar", propertyId] });
+   const kv = await getKv();
-   const blocks: CalendarBlock[] = [];
+   if (!kv) return [];
-   for await (const entry of iter) {
+   const iter = kv.list<CalendarBlock>({ prefix: ["calendar", propertyId] });
-     blocks.push(entry.value);
+   const blocks: CalendarBlock[] = [];
-   }
+   for await (const entry of iter) {
-   return blocks;
+     blocks.push(entry.value);
- }
+   }
- 
+   return blocks;
- // ── LEDGER ────────────────────────────────────────────────────
+ }
- export async function saveLedgerEntry(entry: LedgerEntry): Promise<void> {
+ // ── LEDGER ────────────────────────────────────────────────────
-   const prisma = getPrisma();
+ 
-   await prisma.ledgerEntry.upsert({
+ export async function saveLedgerEntry(entry: LedgerEntry): Promise<void> {
-     where: { id: entry.id },
+   const prisma = getPrisma();
-     update: {
+   await prisma.ledgerEntry.upsert({
-       status: entry.status as any,
+     where: { id: entry.id },
-       settledAt: entry.settledAt ? new Date(entry.settledAt) : null,
+     update: {
-     },
+       status: entry.status as any,
- 
… [diff truncated]

📌 IDE AST Context: Modified symbols likely include [_kv, _kv, getKv, getKv, _prisma]
