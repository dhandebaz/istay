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
//   ["calendar", propId, "YYYY-MM-DD"]        → CalendarBlock
//   ["earnings_month", hostId, "YYYY-MM"]     → number (net earnings)
//   ["ledger", bookingId]                     → LedgerEntry
//   ["notification", hostId, notifId]         → Notification
//   ["caretaker_token", token]                → CaretakerToken
//   ["verification", bookingId]               → GuestVerification
//   ["private_verification", bookingId]       → PrivateVerification (host-only)
//   ["knowledge", hostId, propId]             → HostKnowledge
//   ["chat_session", sessionId]               → ChatSession
// ================================================================

import type {
  Booking,
  CalendarBlock,
  CaretakerToken,
  ChatSession,
  DashboardStats,
  GuestVerification,
  Host,
  HostKnowledge,
  LedgerEntry,
  Notification,
  PrivateVerification,
  Property,
} from "./types.ts";

// ── KV Singleton ──────────────────────────────────────────────

let _kv: Deno.Kv | null = null;

export async function getKv(): Promise<Deno.Kv> {
  if (!_kv) {
    _kv = await Deno.openKv();
  }
  return _kv;
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
    .commit();
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
export async function getPropertyById(propId: string): Promise<Property | null> {
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
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
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
    results.push({ propId: entry.key[1] as string, hostId: entry.value.hostId });
  }
  return results;
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
export async function getBookingById(bookingId: string): Promise<Booking | null> {
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

export async function listBookings(hostId: string): Promise<Booking[]> {
  const kv = await getKv();
  const iter = kv.list<Booking>({ prefix: ["booking", hostId] });
  const bookings: Booking[] = [];
  for await (const entry of iter) {
    bookings.push(entry.value);
  }
  return bookings.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
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
  await kv.set(["ledger", entry.bookingId], entry);
}

export async function getLedgerEntry(
  bookingId: string,
): Promise<LedgerEntry | null> {
  const kv = await getKv();
  const entry = await kv.get<LedgerEntry>(["ledger", bookingId]);
  return entry.value;
}

// ── NOTIFICATIONS ─────────────────────────────────────────────

export async function saveNotification(notif: Notification): Promise<void> {
  const kv = await getKv();
  await kv.set(["notification", notif.hostId, notif.id], notif);
}

export async function listNotifications(
  hostId: string,
  unreadOnly = false,
): Promise<Notification[]> {
  const kv = await getKv();
  const iter = kv.list<Notification>({ prefix: ["notification", hostId] });
  const items: Notification[] = [];
  for await (const entry of iter) {
    if (unreadOnly && entry.value.read) continue;
    items.push(entry.value);
  }
  return items.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
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

  return {
    activeBookings,
    monthlyEarnings,
    blockedDates,
    totalProperties: properties.length,
  };
}

// ── HOST KNOWLEDGE BASE ───────────────────────────────────────

export async function saveKnowledge(data: HostKnowledge): Promise<void> {
  const kv = await getKv();
  await kv.set(["knowledge", data.hostId, data.propertyId], data);
}

export async function getKnowledge(
  hostId: string,
  propertyId: string,
): Promise<HostKnowledge | null> {
  const kv = await getKv();
  const entry = await kv.get<HostKnowledge>(["knowledge", hostId, propertyId]);
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
  return getKnowledge(idx.value.hostId, propertyId);
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

// ── PRIVATE VERIFICATION (HOST-ONLY) ──────────────────────────

/**
 * Stores full OCR data in a host-only namespace.
 * Never exposed to guest-facing APIs.
 */
export async function savePrivateVerification(
  data: PrivateVerification,
): Promise<void> {
  const kv = await getKv();
  await kv.set(["private_verification", data.bookingId], data);
}

export async function getPrivateVerification(
  bookingId: string,
): Promise<PrivateVerification | null> {
  const kv = await getKv();
  const entry = await kv.get<PrivateVerification>(
    ["private_verification", bookingId],
  );
  return entry.value;
}
