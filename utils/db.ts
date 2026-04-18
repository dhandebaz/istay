// ================================================================
// utils/db.ts — Deno KV database layer for istay.space
//
// KV Key Schema:
//   ["host", hostId]                          → Host
//   ["host_index", hostId]                    → true  (for full-scan)
//   ["property", hostId, propId]              → Property
//   ["prop_index", propId]                    → { hostId }  (secondary index)
//   ["booking", hostId, bookingId]            → Booking
//   ["booking_index", bookingId]              → { hostId, propertyId }
//   ["booking_checkout", YYYY-MM-DD, bookId]  → { hostId, propertyId }
//   ["calendar", propId, "YYYY-MM-DD"]        → CalendarBlock
//   ["earnings_month", hostId, "YYYY-MM"]     → number (net earnings)
//   ["ledger", bookingId]                     → LedgerEntry
//   ["ledger_host", hostId, bookingId]        → LedgerEntry  (secondary index)
//   ["notification", hostId, notifId]         → Notification
//   ["caretaker_token", token]                → CaretakerToken
//   ["verification", bookingId]               → GuestVerification
//   ["private_verification", bookingId]       → PrivateVerification (host-only)
//   ["knowledge", hostId, propId]             → HostKnowledge
//   ["chat_session", sessionId]               → ChatSession
//   ["guest_profile", phone]                  → GuestProfile
//   ["rate_limit", ip, windowMinute]           → number  (auto-expiring)
// ================================================================

import type {
  AuthRecord,
  Booking,
  CalendarBlock,
  CaretakerToken,
  ChatSession,
  DashboardStats,
  GuestProfile,
  GuestVerification,
  Host,
  HostKnowledge,
  LedgerEntry,
  Notification,
  PrivateVerification,
  Property,
  WebhookConfig,
} from "./types.ts";

// ── KV Singleton ──────────────────────────────────────────────

let _kv: Deno.Kv | null = null;

export async function getKv(): Promise<Deno.Kv> {
  if (!_kv) {
    _kv = await Deno.openKv();
  }
  return _kv;
}

// ── ENCRYPTION HELPERS ────────────────────────────────────────
// CryptoKey is cached in memory (same pattern as _kv singleton).
// crypto.subtle.importKey() is expensive — no need to call it
// on every field encrypt/decrypt. One import per process lifetime.

const ENCRYPTION_KEY = () => Deno.env.get("ENCRYPTION_KEY") || "";

let _cryptoKey: CryptoKey | null = null;

async function getCryptoKey(): Promise<CryptoKey> {
  if (_cryptoKey) return _cryptoKey;

  const keyStr = ENCRYPTION_KEY();
  if (!keyStr) {
    console.error("[db] ENCRYPTION_KEY not set. Using fallback (INSECURE).");
  }
  const enc = new TextEncoder();
  // Pad or truncate to 32 bytes for AES-256
  const keyData = enc.encode(
    (keyStr || "istay-default-secret-key-32-chars").padEnd(32, "0").slice(
      0,
      32,
    ),
  );
  _cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"],
  );
  return _cryptoKey;
}

async function encryptField(
  text: string | undefined,
): Promise<string | undefined> {
  if (!text) return undefined;
  try {
    const key = await getCryptoKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const enc = new TextEncoder();
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      enc.encode(text),
    );

    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);

    return btoa(String.fromCharCode(...combined));
  } catch (err) {
    console.error("[db] Encryption failed:", err);
    throw new Error("Encryption failed");
  }
}

async function decryptField(
  base64: string | undefined,
): Promise<string | undefined> {
  if (!base64) return undefined;
  try {
    const key = await getCryptoKey();
    const combined = new Uint8Array(
      atob(base64).split("").map((c) => c.charCodeAt(0)),
    );
    const iv = combined.slice(0, 12);
    const data = combined.slice(12);

    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      data,
    );
    return new TextDecoder().decode(decrypted);
  } catch (_err) {
    // If decryption fails, it might be plaintext (legacy)
    return base64;
  }
}

// ── HOST ──────────────────────────────────────────────────────

export async function getHost(id: string): Promise<Host | null> {
  const kv = await getKv();
  const entry = await kv.get<Host>(["host", id]);
  return entry.value;
}

export async function saveHost(data: Host): Promise<void> {
  const kv = await getKv();
  await kv.atomic()
    .set(["host", data.id], data)
    .set(["host_index", data.id], true)
    // Email index mapping email (lowercased) -> hostId
    .set(["host_email", data.email.toLowerCase()], data.id)
    .commit();
}

export async function listAllHosts(): Promise<Host[]> {
  const kv = await getKv();
  const iter = kv.list<Host>({ prefix: ["host"] });
  const hosts: Host[] = [];
  for await (const entry of iter) {
    hosts.push(entry.value);
  }
  return hosts;
}

// ── AUTH & CRYPTO ─────────────────────────────────────────────

export async function hashPassword(password: string, saltHex?: string) {
  // Generate a salt if not provided
  const salt = saltHex
    ? new Uint8Array(
      saltHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)),
    )
    : crypto.getRandomValues(new Uint8Array(16));

  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"],
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"],
  );

  const exportedKey = await crypto.subtle.exportKey("raw", key);
  const hashBuffer = new Uint8Array(exportedKey);
  const hashArray = Array.from(hashBuffer);
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(
    "",
  );
  const thisSaltHex = Array.from(salt).map((b) =>
    b.toString(16).padStart(2, "0")
  ).join("");

  return { hash: hashHex, salt: thisSaltHex };
}

export async function getAuthRecord(email: string): Promise<AuthRecord | null> {
  const kv = await getKv();
  const entry = await kv.get<AuthRecord>(["auth", email.toLowerCase()]);
  return entry.value;
}

export async function saveAuthRecord(data: AuthRecord): Promise<void> {
  const kv = await getKv();
  await kv.set(["auth", data.email.toLowerCase()], data);
}

// ── PROPERTIES ────────────────────────────────────────────────

export async function getProperty(
  hostId: string,
  propId: string,
): Promise<Property | null> {
  const kv = await getKv();
  const entry = await kv.get<Property>(["property", hostId, propId]);
  return entry.value;
}

/**
 * Looks up a property using only its ID (no hostId required).
 * Uses the ["prop_index", propId] secondary index.
 */
export async function getPropertyById(
  propId: string,
): Promise<Property | null> {
  const kv = await getKv();
  const idx = await kv.get<{ hostId: string }>(["prop_index", propId]);
  if (!idx.value) return null;
  return getProperty(idx.value.hostId, propId);
}

export async function saveProperty(data: Property): Promise<void> {
  const kv = await getKv();
  await kv.atomic()
    .set(["property", data.hostId, data.id], data)
    .set(["prop_index", data.id], { hostId: data.hostId })
    .commit();
}

export async function listProperties(hostId: string): Promise<Property[]> {
  const kv = await getKv();
  const iter = kv.list<Property>({ prefix: ["property", hostId] });
  const properties: Property[] = [];
  for await (const entry of iter) {
    properties.push(entry.value);
  }
  return properties.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function deleteProperty(
  hostId: string,
  propId: string,
): Promise<void> {
  const kv = await getKv();
  await kv.atomic()
    .delete(["property", hostId, propId])
    .delete(["prop_index", propId])
    .commit();
}

/**
 * Returns all { propId, hostId } pairs across the entire platform.
 * Used by syncAllProperties() to scan all properties.
 */
export async function listAllPropertyIndices(): Promise<
  Array<{ propId: string; hostId: string }>
> {
  const kv = await getKv();
  const iter = kv.list<{ hostId: string }>({ prefix: ["prop_index"] });
  const results: Array<{ propId: string; hostId: string }> = [];
  for await (const entry of iter) {
    results.push({
      propId: entry.key[1] as string,
      hostId: entry.value.hostId,
    });
  }
  return results;
}

/**
 * Returns all active properties across the entire platform.
 * Used for the public homepage carousel to show real listings (no mocks).
 */
export async function listPublicProperties(): Promise<Property[]> {
  const kv = await getKv();
  const iter = kv.list<Property>({ prefix: ["property"] });
  const results: Property[] = [];
  for await (const entry of iter) {
    if (entry.value.status === "active") {
      results.push(entry.value);
    }
  }
  return results.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

// ── BOOKINGS ──────────────────────────────────────────────────

export async function getBooking(
  hostId: string,
  bookingId: string,
): Promise<Booking | null> {
  const kv = await getKv();
  const entry = await kv.get<Booking>(["booking", hostId, bookingId]);
  return entry.value;
}

/**
 * Looks up a booking using only its ID (no hostId needed).
 * Used by payment webhooks which only receive the bookingId.
 */
export async function getBookingById(
  bookingId: string,
): Promise<Booking | null> {
  const kv = await getKv();
  const idx = await kv.get<{ hostId: string; propertyId: string }>(
    ["booking_index", bookingId],
  );
  if (!idx.value) return null;
  return getBooking(idx.value.hostId, bookingId);
}

export async function saveBooking(data: Booking): Promise<void> {
  const kv = await getKv();

  const atomic = kv.atomic()
    .set(["booking", data.hostId, data.id], data)
    .set(["booking_index", data.id], {
      hostId: data.hostId,
      propertyId: data.propertyId,
    });

  // Chronological checkout index for efficient PII scrubbing
  if (data.checkOut) {
    atomic.set(["booking_checkout", data.checkOut, data.id], {
      hostId: data.hostId,
      propertyId: data.propertyId,
    });
  }

  if (data.guestPhone) {
    atomic.set(["booking_phone", data.guestPhone], data.id);
  }

  await atomic.commit();

  // Update running monthly net-earnings tally for confirmed bookings
  if (data.status === "confirmed") {
    const month = data.createdAt.slice(0, 7); // YYYY-MM
    const tallyKey = ["earnings_month", data.hostId, month];
    const current = await kv.get<number>(tallyKey);
    const prev = current.value ?? 0;
    await kv.set(
      tallyKey,
      Math.round((prev + data.amount * 0.95) * 100) / 100,
    );
  }
}

/**
 * Looks up the latest booking by guest phone number.
 * Used by WhatsApp Concierge webhook to route messages to properties.
 */
export async function getBookingByPhone(
  phone: string,
): Promise<Booking | null> {
  const kv = await getKv();
  const idx = await kv.get<string>(["booking_phone", phone]);
  if (!idx.value) return null;
  return getBookingById(idx.value);
}

export async function listBookings(hostId: string): Promise<Booking[]> {
  const kv = await getKv();
  const iter = kv.list<Booking>({ prefix: ["booking", hostId] });
  const bookings: Booking[] = [];
  for await (const entry of iter) {
    bookings.push(entry.value);
  }
  return bookings.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function listBookingsByProperty(
  hostId: string,
  propertyId: string,
): Promise<Booking[]> {
  const kv = await getKv();
  const iter = kv.list<Booking>({ prefix: ["booking", hostId] });
  const bookings: Booking[] = [];
  for await (const entry of iter) {
    if (entry.value.propertyId === propertyId) {
      bookings.push(entry.value);
    }
  }
  return bookings.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

/**
 * Returns confirmed bookings where checkIn equals today's date (IST).
 * Used by the Caretaker Portal to show today's arrivals.
 */
export async function getTodayCheckIns(hostId: string): Promise<Booking[]> {
  // IST = UTC+5:30
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(now.getTime() + istOffset);
  const today = istDate.toISOString().slice(0, 10);

  const all = await listBookings(hostId);
  return all.filter(
    (b) => b.status === "confirmed" && b.checkIn === today,
  );
}

// ── EARNINGS ──────────────────────────────────────────────────

export async function getMonthlyEarnings(
  hostId: string,
  month?: string,
): Promise<number> {
  const kv = await getKv();
  const target = month ?? new Date().toISOString().slice(0, 7);
  const entry = await kv.get<number>(["earnings_month", hostId, target]);
  return entry.value ?? 0;
}

// ── CALENDAR BLOCKS ───────────────────────────────────────────

export async function blockDate(block: CalendarBlock): Promise<void> {
  const kv = await getKv();
  await kv.set(["calendar", block.propertyId, block.date], block);
}

export async function unblockDate(
  propertyId: string,
  date: string,
): Promise<void> {
  const kv = await getKv();
  await kv.delete(["calendar", propertyId, date]);
}

export async function listBlockedDates(
  propertyId: string,
): Promise<CalendarBlock[]> {
  const kv = await getKv();
  const iter = kv.list<CalendarBlock>({ prefix: ["calendar", propertyId] });
  const blocks: CalendarBlock[] = [];
  for await (const entry of iter) {
    blocks.push(entry.value);
  }
  return blocks;
}

// ── LEDGER ────────────────────────────────────────────────────

export async function saveLedgerEntry(entry: LedgerEntry): Promise<void> {
  const kv = await getKv();
  await kv.atomic()
    .set(["ledger", entry.bookingId], entry)
    .set(["ledger_host", entry.hostId, entry.bookingId], entry)
    .commit();
}

export async function getLedgerEntry(
  bookingId: string,
): Promise<LedgerEntry | null> {
  const kv = await getKv();
  const entry = await kv.get<LedgerEntry>(["ledger", bookingId]);
  return entry.value;
}

export async function listLedgerEntriesByHost(
  hostId: string,
): Promise<LedgerEntry[]> {
  const kv = await getKv();
  const iter = kv.list<LedgerEntry>({ prefix: ["ledger_host", hostId] });
  const entries: LedgerEntry[] = [];
  for await (const entry of iter) {
    entries.push(entry.value);
  }
  return entries.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

// ── NOTIFICATIONS ─────────────────────────────────────────────

export async function saveNotification(notif: Notification): Promise<void> {
  const kv = await getKv();
  await kv.set(["notification", notif.hostId, notif.id], notif);
}

export async function listNotifications(
  hostId: string,
  unreadOnly = false,
  limit = 20,
): Promise<Notification[]> {
  const kv = await getKv();
  const iter = kv.list<Notification>(
    { prefix: ["notification", hostId] },
    { reverse: true, limit: unreadOnly ? undefined : limit },
  );
  const items: Notification[] = [];
  for await (const entry of iter) {
    if (unreadOnly && entry.value.read) continue;
    items.push(entry.value);
    if (unreadOnly && items.length >= limit) break;
  }
  return items;
}

export async function markNotificationRead(
  hostId: string,
  notifId: string,
): Promise<void> {
  const kv = await getKv();
  const entry = await kv.get<Notification>(["notification", hostId, notifId]);
  if (entry.value) {
    await kv.set(["notification", hostId, notifId], {
      ...entry.value,
      read: true,
    });
  }
}

// ── CARETAKER TOKENS ──────────────────────────────────────────

export async function saveCaretakerToken(data: CaretakerToken): Promise<void> {
  const kv = await getKv();
  await kv.set(["caretaker_token", data.token], data);
}

export async function getCaretakerToken(
  token: string,
): Promise<CaretakerToken | null> {
  const kv = await getKv();
  const entry = await kv.get<CaretakerToken>(["caretaker_token", token]);
  return entry.value;
}

// ── GUEST VERIFICATION ────────────────────────────────────────

export async function saveGuestVerification(
  data: GuestVerification,
): Promise<void> {
  const kv = await getKv();
  await kv.set(["verification", data.bookingId], data);
}

export async function getGuestVerification(
  bookingId: string,
): Promise<GuestVerification | null> {
  const kv = await getKv();
  const entry = await kv.get<GuestVerification>(["verification", bookingId]);
  return entry.value;
}

// ── DASHBOARD AGGREGATE ───────────────────────────────────────

export async function getDashboardStats(
  hostId: string,
): Promise<DashboardStats> {
  const [bookings, properties, monthlyEarnings] = await Promise.all([
    listBookings(hostId),
    listProperties(hostId),
    getMonthlyEarnings(hostId),
  ]);

  const now = new Date();

  const activeBookings = bookings.filter((b) => {
    if (b.status !== "confirmed") return false;
    return new Date(b.checkOut) >= now;
  }).length;

  let blockedDates = 0;
  const blockPromises = properties.map((p) => listBlockedDates(p.id));
  const allBlocks = await Promise.all(blockPromises);
  for (const blocks of allBlocks) {
    blockedDates += blocks.filter((b) => new Date(b.date) >= now).length;
  }

  let linkViews7Days = 0;
  for (const p of properties) {
    linkViews7Days += await getPropertyViewsLast7Days(p.id);
  }

  return {
    activeBookings,
    monthlyEarnings,
    blockedDates,
    totalProperties: properties.length,
    linkViews7Days,
  };
}

// ── PROPERTY KNOWLEDGE (AI CONTEXT) ──────────────────────────

// Memory cache for Edge performance (5-minute TTL)
const KNOWLEDGE_CACHE = new Map<
  string,
  { data: HostKnowledge; expiry: number }
>();
const KNOWLEDGE_TTL = 5 * 60 * 1000;

export async function saveKnowledge(data: HostKnowledge): Promise<void> {
  const kv = await getKv();
  await kv.set(["knowledge", data.propertyId], data);
  // Invalidate cache
  KNOWLEDGE_CACHE.delete(data.propertyId);
}

export async function getKnowledge(
  propertyId: string,
): Promise<HostKnowledge | null> {
  // Check memory cache first
  const cached = KNOWLEDGE_CACHE.get(propertyId);
  if (cached && cached.expiry > Date.now()) {
    return cached.data;
  }

  const kv = await getKv();
  const entry = await kv.get<HostKnowledge>(["knowledge", propertyId]);

  if (entry.value) {
    // Fill cache
    KNOWLEDGE_CACHE.set(propertyId, {
      data: entry.value,
      expiry: Date.now() + KNOWLEDGE_TTL,
    });
  }

  return entry.value;
}

/**
 * Looks up knowledge base for a property without needing hostId.
 * Uses prop_index to resolve hostId first.
 */
export async function getKnowledgeByPropId(
  propertyId: string,
): Promise<HostKnowledge | null> {
  const kv = await getKv();
  const idx = await kv.get<{ hostId: string }>(["prop_index", propertyId]);
  if (!idx.value) return null;
  return getKnowledge(propertyId);
}

// ── CHAT SESSIONS ─────────────────────────────────────────────

export async function saveChatSession(data: ChatSession): Promise<void> {
  const kv = await getKv();
  await kv.set(["chat_session", data.sessionId], data);
}

export async function getChatSession(
  sessionId: string,
): Promise<ChatSession | null> {
  const kv = await getKv();
  const entry = await kv.get<ChatSession>(["chat_session", sessionId]);
  return entry.value;
}

// ── GUEST PROFILES ────────────────────────────────────────────

export async function saveGuestProfile(data: GuestProfile): Promise<void> {
  const kv = await getKv();
  await kv.set(["guest_profile", data.phone], data);
}

export async function getGuestProfile(
  phone: string,
): Promise<GuestProfile | null> {
  const kv = await getKv();
  const entry = await kv.get<GuestProfile>(["guest_profile", phone]);
  return entry.value;
}

// ── PRIVATE VERIFICATION (HOST-ONLY) ──────────────────────────

/**
 * Stores full OCR data in a host-only namespace.
 * Never exposed to guest-facing APIs.
 */
export async function savePrivateVerification(
  data: PrivateVerification,
): Promise<void> {
  const kv = await getKv();

  // Encrypt sensitive fields before saving
  const encrypted = {
    ...data,
    idNumber: await encryptField(data.idNumber),
    address: await encryptField(data.address),
    fullName: await encryptField(data.fullName),
  };

  await kv.set(["private_verification", data.bookingId], encrypted);
}

export async function getPrivateVerification(
  bookingId: string,
): Promise<PrivateVerification | null> {
  const kv = await getKv();
  const entry = await kv.get<PrivateVerification>(
    ["private_verification", bookingId],
  );
  if (!entry.value) return null;

  // Decrypt sensitive fields
  return {
    ...entry.value,
    idNumber: await decryptField(entry.value.idNumber),
    address: await decryptField(entry.value.address),
    fullName: await decryptField(entry.value.fullName),
  };
}

// ── COMPLIANCE: PII SCRUBBING (DPDP & GDPR) ──────────────────

/**
 * Autonomous scrubbing logic for guest PII.
 * Targets bookings where checkOut < (Today - 30 Days).
 * Uses the ["booking_checkout", YYYY-MM-DD, bookingId] index for
 * efficient date-range scanning instead of iterating every booking.
 */
export async function scrubOldPii(): Promise<{ scrubbedCount: number }> {
  const kv = await getKv();
  const now = new Date();
  const scrubThreshold = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const thresholdStr = scrubThreshold.toISOString().slice(0, 10);

  console.log(
    `[compliance] Starting PII scrub for records older than ${thresholdStr}...`,
  );
  console.log(
    `[compliance] Note: Global Guest Intelligence (Profiles) are preserved for loyalty recognition.`,
  );

  let scrubbedCount = 0;

  // Scan the chronological checkout index from the beginning up to the threshold date.
  // KV list is lexicographically ordered, so ["booking_checkout", "2024-01-01", ...]
  // naturally comes before ["booking_checkout", "2025-12-31", ...].
  const iter = kv.list<{ hostId: string; propertyId: string }>({
    prefix: ["booking_checkout"],
    end: ["booking_checkout", thresholdStr],
  });

  for await (const entry of iter) {
    const bookingId = entry.key[2] as string;
    const { hostId } = entry.value;

    // Load the actual booking to verify status and run scrub
    const booking = await getBooking(hostId, bookingId);
    if (!booking) {
      // Index orphan — cleanup
      await kv.delete(entry.key);
      continue;
    }

    // Only scrub confirmed/finished bookings
    if (booking.status !== "confirmed" && booking.status !== "room_ready") {
      continue;
    }

    console.log(`[compliance] Scrubbing PII for booking=${booking.id}`);

    const atomic = kv.atomic();

    // 1. Delete Private Verification (Raw OCR Data, ID Numbers, Addresses)
    const privEntry = await kv.get<PrivateVerification>([
      "private_verification",
      booking.id,
    ]);
    if (privEntry.value?.idObjectKey) {
      try {
        const { deleteFromR2 } = await import("./storage.ts");
        await deleteFromR2(privEntry.value.idObjectKey);
      } catch (err) {
        console.warn(
          `[compliance] Failed to delete R2 ID for booking=${booking.id}`,
          err,
        );
      }
    }
    atomic.delete(["private_verification", booking.id]);

    // 2. Anonymize Guest Verification
    const gvEntry = await kv.get<GuestVerification>([
      "verification",
      booking.id,
    ]);
    if (gvEntry.value) {
      atomic.set(["verification", booking.id], {
        ...gvEntry.value,
        idObjectKey: undefined,
        extractedData: undefined,
      });
    }

    // 3. Anonymize Booking Record and Delete Clean Proof
    if (booking.cleanProofUrl) {
      try {
        const { deleteFromR2 } = await import("./storage.ts");
        const urlPath = booking.cleanProofUrl.split(".com/").pop() || "";
        if (urlPath) await deleteFromR2(urlPath);
      } catch (err) {
        console.warn(
          `[compliance] Failed to delete R2 Proof for booking=${booking.id}`,
          err,
        );
      }
    }

    atomic.set(["booking", booking.hostId, booking.id], {
      ...booking,
      guestName: "Guest (PII Scrubbed)",
      guestEmail: "scrubbed@istay.space",
      guestPhone: undefined,
      guestIdRef: undefined,
      cleanProofUrl: undefined,
    });

    // 4. Remove the checkout index entry (already processed)
    atomic.delete(entry.key);

    const result = await atomic.commit();
    if (result.ok) scrubbedCount++;
  }

  return { scrubbedCount };
}

// ── AGENCY API & WEBHOOK UTILS ────────────────────────────────

export async function generateAgencyApiKey(): Promise<string> {
  const rawKey = `istay_sk_${crypto.randomUUID().replace(/-/g, "")}`;
  return await encryptField(rawKey) || rawKey;
}

export async function generateWebhookSecret(): Promise<string> {
  const rawSecret = crypto.randomUUID().replace(/-/g, "").slice(0, 16);
  return await encryptField(rawSecret) || rawSecret;
}

/**
 * Atomically appends a webhook to the Host's webhooks array.
 * Uses version check to prevent race conditions on concurrent writes.
 */
export async function addWebhook(
  hostId: string,
  webhook: WebhookConfig,
): Promise<void> {
  const kv = await getKv();
  const entry = await kv.get<Host>(["host", hostId]);
  if (!entry.value) throw new Error(`Host not found: ${hostId}`);

  const host = entry.value;
  const webhooks = [...(host.webhooks || []), webhook];
  const updated: Host = { ...host, webhooks };

  const result = await kv.atomic()
    .check(entry) // version guard — fails if host was modified since read
    .set(["host", hostId], updated)
    .commit();

  if (!result.ok) {
    throw new Error("Concurrent modification detected. Please retry.");
  }
}

/**
 * Atomically removes a webhook by ID from the Host's webhooks array.
 * Uses version check to prevent race conditions on concurrent writes.
 */
export async function removeWebhook(
  hostId: string,
  webhookId: string,
): Promise<void> {
  const kv = await getKv();
  const entry = await kv.get<Host>(["host", hostId]);
  if (!entry.value) throw new Error(`Host not found: ${hostId}`);

  const host = entry.value;
  const webhooks = (host.webhooks || []).filter((w) => w.id !== webhookId);
  const updated: Host = { ...host, webhooks };

  const result = await kv.atomic()
    .check(entry)
    .set(["host", hostId], updated)
    .commit();

  if (!result.ok) {
    throw new Error("Concurrent modification detected. Please retry.");
  }
}

// ── INSIGHTS & ANALYTICS ──────────────────────────────────────

export async function recordPropertyView(propId: string): Promise<void> {
  const kv = await getKv();
  const dateStr = new Date().toISOString().slice(0, 10);
  const key = ["prop_view", propId, dateStr];

  const entry = await kv.get<number>(key);
  const current = entry.value ?? 0;

  await kv.set(key, current + 1);
}

export async function getPropertyViewsLast7Days(
  propId: string,
): Promise<number> {
  const kv = await getKv();
  let total = 0;
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const entry = await kv.get<number>(["prop_view", propId, dateStr]);
    if (entry.value) {
      total += entry.value;
    }
  }

  return total;
}

/**
 * Returns daily view counts for a single property over the last N days.
 * Used by the Link Performance chart on the Dashboard.
 */
export async function getPropertyViewsDaily(
  propId: string,
  days = 7,
): Promise<Array<{ date: string; views: number }>> {
  const kv = await getKv();
  const results: Array<{ date: string; views: number }> = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const entry = await kv.get<number>(["prop_view", propId, dateStr]);
    results.push({ date: dateStr, views: entry.value ?? 0 });
  }

  return results;
}

/**
 * Returns daily confirmed-booking counts for a host over the last N days.
 * Counts bookings by their `createdAt` date (not check-in date).
 */
export async function getBookingsDaily(
  hostId: string,
  days = 7,
): Promise<Array<{ date: string; count: number }>> {
  const bookings = await listBookings(hostId);
  const today = new Date();
  const buckets = new Map<string, number>();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    buckets.set(d.toISOString().slice(0, 10), 0);
  }

  for (const b of bookings) {
    if (b.status !== "confirmed") continue;
    const created = b.createdAt.slice(0, 10);
    if (buckets.has(created)) {
      buckets.set(created, (buckets.get(created) ?? 0) + 1);
    }
  }

  return Array.from(buckets.entries()).map(([date, count]) => ({
    date,
    count,
  }));
}

// ── REVIEWS & FEEDBACK ────────────────────────────────────────

export async function saveReview(review: Review): Promise<void> {
  const kv = await getKv();
  await kv.set(["reviews", review.propertyId, review.id], review);
}

export async function listReviews(propertyId: string): Promise<Review[]> {
  const kv = await getKv();
  const iter = kv.list<Review>({ prefix: ["reviews", propertyId] });
  const reviews: Review[] = [];
  for await (const entry of iter) {
    reviews.push(entry.value);
  }
  return reviews.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function saveSurveyToken(
  token: string,
  bookingId: string,
): Promise<void> {
  const kv = await getKv();
  await kv.set(["survey_tokens", token], {
    bookingId,
    createdAt: new Date().toISOString(),
  }, { expireIn: 7 * 24 * 60 * 60 * 1000 }); // 7 days
}

export async function getSurveyToken(
  token: string,
): Promise<{ bookingId: string } | null> {
  const kv = await getKv();
  const res = await kv.get<{ bookingId: string }>(["survey_tokens", token]);
  return res.value;
}

export async function getBookingsCheckingOutIn(
  date: string,
): Promise<Booking[]> {
  const kv = await getKv();
  const iter = kv.list<Booking>({ prefix: ["booking"] });
  const matches: Booking[] = [];
  for await (const entry of iter) {
    if (
      (entry.value.checkOut === date) &&
      (entry.value.status === "confirmed" ||
        entry.value.status === "room_ready")
    ) {
      matches.push(entry.value);
    }
  }
  return matches;
}
