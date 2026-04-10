// ================================================================
// utils/types.ts — Shared type definitions for istay.space
// ================================================================

// ── CORE ENTITIES ─────────────────────────────────────────────

export interface Host {
  id: string;
  email: string;
  name: string;
  phone: string;
  /** Always "lifetime" — one-time ₹1,000 setup */
  plan: "lifetime";
  setupFeePaid: boolean;
  /** Cashfree sub-merchant vendor ID (set after onboarding) */
  cashfreeVendorId?: string;
  createdAt: string; // ISO 8601
  updatedAt: string;
}

export interface Property {
  id: string;
  hostId: string;
  name: string;
  description: string;
  imageUrl: string;
  /** Original Airbnb listing URL used for scraping */
  airbnbUrl?: string;
  /** Nightly rate in INR */
  basePrice: number;
  status: "active" | "inactive" | "pending";
  address?: string;
  amenities?: string[];
  /** iCal URL for calendar sync (e.g. from Airbnb export) */
  icalUrl?: string;
  /**
   * Long UUID used as the /care/[caretakerToken] URL.
   * Provides "unauthenticated-but-secure" access for staff.
   */
  caretakerToken?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  hostId: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  /** Government ID reference (last 4 digits, from OCR) */
  guestIdRef?: string;
  checkIn: string;  // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  nights: number;
  /** Total gross booking amount in INR */
  amount: number;
  status: "pending" | "confirmed" | "cancelled" | "refunded";
  /** Cashfree order ID */
  cashfreeOrderId?: string;
  /** Cashfree payment session ID */
  paymentSessionId?: string;
  /** Whether guest ID has been verified */
  idVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarBlock {
  propertyId: string;
  /** YYYY-MM-DD */
  date: string;
  reason: "booked" | "manual_block" | "ical";
  bookingId?: string;
}

// ── FINANCIAL ─────────────────────────────────────────────────

export interface LedgerEntry {
  id: string;
  bookingId: string;
  hostId: string;
  propertyId: string;
  cashfreeOrderId: string;
  grossAmount: number;
  hostAmount: number;
  istayAmount: number;
  status: "settled" | "pending" | "disputed";
  settledAt?: string;
  createdAt: string;
}

// ── NOTIFICATIONS ─────────────────────────────────────────────

export interface Notification {
  id: string;
  hostId: string;
  type:
    | "supply_request"
    | "booking_confirmed"
    | "checkin_reminder"
    | "verification_complete"
    | "ical_sync_error";
  title: string;
  message: string;
  propertyName: string;
  meta?: Record<string, string>;
  read: boolean;
  createdAt: string;
}

// ── CARETAKER ─────────────────────────────────────────────────

export interface CaretakerToken {
  token: string;
  hostId: string;
  propertyId: string;
  createdAt: string;
}

// ── GUEST VERIFICATION ────────────────────────────────────────

export interface GuestVerification {
  bookingId: string;
  guestName: string;
  idType: "aadhaar" | "passport" | "driving_licence" | "voter_id" | "other";
  /** Base64 preview of the uploaded ID (truncated to ~2KB for KV) */
  idPreviewB64?: string;
  status: "pending" | "processing" | "verified" | "failed";
  /** Extracted data from OCR */
  extractedData?: {
    name?: string;
    idLast4?: string;
    dob?: string;
  };
  /** Gemini match score (0-100) comparing extracted name vs guest name */
  matchScore?: number;
  /** Flags from AI (e.g. "blurred", "edited", "low_quality") */
  flags?: string[];
  createdAt: string;
  verifiedAt?: string;
}

/**
 * PrivateVerification — Full OCR output stored in host-only namespace.
 * Never exposed to guests. Contains raw extracted data for compliance.
 * KV Key: ["private_verification", bookingId]
 */
export interface PrivateVerification {
  bookingId: string;
  hostId: string;
  /** Full name from ID (not truncated) */
  fullName?: string;
  /** Full date of birth */
  dob?: string;
  /** Full ID number (stored securely, host-only access) */
  idNumber?: string;
  /** Full address from ID */
  address?: string;
  /** OCR match score (0-100) */
  matchScore: number;
  /** AI confidence flags */
  flags: string[];
  /** Raw Gemini response (for debugging/audit) */
  rawResponse?: string;
  createdAt: string;
}

// ── AI / CONCIERGE ────────────────────────────────────────────

/**
 * HostKnowledge — Markdown knowledge base written by hosts.
 * Injected as system context for the AI concierge.
 */
export interface HostKnowledge {
  hostId: string;
  propertyId: string;
  /** Markdown content with WiFi, rules, check-in instructions, etc. */
  content: string;
  updatedAt: string;
}

/** A single message in a guest chat session */
export interface ChatMessage {
  role: "user" | "model";
  content: string;
  timestamp: string;
}

/**
 * ChatSession — Persisted in KV for multi-turn conversation.
 * Expires/soft-deleted after 24 hours for KV hygiene.
 */
export interface ChatSession {
  sessionId: string;
  propertyId: string;
  messages: ChatMessage[];
  createdAt: string;
  lastActivity: string;
}

/**
 * OcrResult — Structured output from Gemini Vision OCR.
 * Parsed from the JSON response.
 */
export interface OcrResult {
  name: string;
  dob: string;
  id_number: string;
  address: string;
  match_score: number;
  flags: string[];
}

/**
 * VibeMatch — Result from the recommendation engine.
 * Returned when a property is fully booked.
 */
export interface VibeMatch {
  propId: string;
  propertyName: string;
  imageUrl: string;
  basePrice: number;
  score: number;
  reason: string;
}

// ── API CONTRACTS ─────────────────────────────────────────────

export interface ScrapedListing {
  name: string;
  imageUrl: string;
  description: string;
  sourceUrl: string;
}

export interface CreatePropertyPayload {
  name: string;
  description: string;
  imageUrl: string;
  basePrice: number;
  airbnbUrl?: string;
  address?: string;
}

export interface CreateBookingPayload {
  propId: string;
  checkIn: string;
  checkOut: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
}

export interface PaymentOrder {
  orderId: string;
  bookingId: string;
  amount: number;
  hostAmount: number;
  istayAmount: number;
  paymentSessionId?: string;
  paymentLink?: string;
  status: "created" | "paid" | "failed";
  createdAt: string;
}

export interface PayRequestBody {
  bookingId: string;
  amount: number;
  hostVendorId: string;
  guestEmail: string;
  guestName: string;
  guestPhone?: string;
}

// ── DASHBOARD ─────────────────────────────────────────────────

export interface DashboardStats {
  activeBookings: number;
  monthlyEarnings: number;
  blockedDates: number;
  totalProperties: number;
}

// ── MIDDLEWARE STATE ───────────────────────────────────────────

export interface DashboardState {
  hostId: string;
  hostName: string;
}
