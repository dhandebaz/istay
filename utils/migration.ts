// ================================================================
// utils/migration.ts — KV to Postgres Migration Utility
// ================================================================

import {
  getKv,
  saveHost,
  saveProperty,
  saveBooking,
  saveAuthRecord,
  saveLedgerEntry,
  saveGuestVerification,
  saveNotification,
  saveGuestProfile,
  saveKnowledge,
  saveReview,
} from "./db.ts";
import type {
  Host,
  Property,
  Booking,
  AuthRecord,
  LedgerEntry,
  Notification,
  GuestVerification,
  GuestProfile,
  HostKnowledge,
  Review,
} from "./types.ts";

export async function migrateKvToPostgres() {
  console.log("🚀 Starting KV to Postgres Migration...");
  const kv = await getKv();

  // 1. Hosts
  console.log("📦 Migrating Hosts...");
  const hostIter = kv.list<Host>({ prefix: ["host"] });
  for await (const entry of hostIter) {
    if (entry.key.length === 2 && entry.key[0] === "host") {
      console.log(`  - Migrating Host: ${entry.value.id}`);
      await saveHost(entry.value);
    }
  }

  // 2. Auth Records
  console.log("🔑 Migrating Auth Records...");
  const authIter = kv.list<AuthRecord>({ prefix: ["auth"] });
  for await (const entry of authIter) {
    console.log(`  - Migrating Auth: ${entry.value.email}`);
    await saveAuthRecord(entry.value);
  }

  // 3. Properties
  console.log("🏠 Migrating Properties...");
  const propIter = kv.list<Property>({ prefix: ["property"] });
  for await (const entry of propIter) {
    console.log(`  - Migrating Property: ${entry.value.id}`);
    await saveProperty(entry.value);
  }

  // 4. Bookings
  console.log("📅 Migrating Bookings...");
  const bookingIter = kv.list<Booking>({ prefix: ["booking"] });
  for await (const entry of bookingIter) {
    if (entry.key.length === 3 && entry.key[0] === "booking") {
       console.log(`  - Migrating Booking: ${entry.value.id}`);
       await saveBooking(entry.value);
    }
  }

  // 5. Ledger Entries
  console.log("💰 Migrating Ledger Entries...");
  const ledgerIter = kv.list<LedgerEntry>({ prefix: ["ledger"] });
  for await (const entry of ledgerIter) {
    console.log(`  - Migrating Ledger: ${entry.value.id}`);
    await saveLedgerEntry(entry.value);
  }

  // 6. Guest Verifications
  console.log("🆔 Migrating Guest Verifications...");
  const verifyIter = kv.list<GuestVerification>({ prefix: ["verification"] });
  for await (const entry of verifyIter) {
    console.log(`  - Migrating Verification for: ${entry.value.bookingId}`);
    await saveGuestVerification(entry.value);
  }

  // 7. Notifications
  console.log("🔔 Migrating Notifications...");
  const notifIter = kv.list<Notification>({ prefix: ["notification"] });
  for await (const entry of notifIter) {
    console.log(`  - Migrating Notification: ${entry.value.id}`);
    await saveNotification(entry.value);
  }

  // 8. Guest Profiles
  console.log("👤 Migrating Guest Profiles...");
  const profileIter = kv.list<GuestProfile>({ prefix: ["guest_profile"] });
  for await (const entry of profileIter) {
    console.log(`  - Migrating Profile: ${entry.value.phone}`);
    await saveGuestProfile(entry.value);
  }

  // 9. Knowledge Base
  console.log("📖 Migrating Knowledge Base...");
  const knowledgeIter = kv.list<HostKnowledge>({ prefix: ["knowledge"] });
  for await (const entry of knowledgeIter) {
    console.log(`  - Migrating Knowledge for Prop: ${entry.value.propertyId}`);
    await saveKnowledge(entry.value);
  }

  // 10. Reviews
  console.log("⭐ Migrating Reviews...");
  const reviewIter = kv.list<Review>({ prefix: ["reviews"] });
  for await (const entry of reviewIter) {
    console.log(`  - Migrating Review: ${entry.value.id}`);
    await saveReview(entry.value);
  }

  console.log("✅ Migration Complete!");
}

if (import.meta.main) {
  await migrateKvToPostgres();
  Deno.exit(0);
}
