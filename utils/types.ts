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
  /** Payment gateway vendor/sub-merchant ID (Easebuzz/Cashfree) */
  gatewayVendorId?: string;
  /** Cashfree sub-merchant ID for split payments */
  cashfreeVendorId?: string;
  createdAt: string; // ISO 8601
  updatedAt: string;
  /** Encrypted Agency API key for Open API access */
  apiKey?: string;
  /** Previous API key kept valid during 24-hour grace period after rotation */
  legacyApiKey?: string;
  /** ISO 8601 expiry timestamp for the legacy API key */
  legacyApiKeyExpires?: string;
  /** Active webhook subscriptions for this agency */
  webhooks?: WebhookConfig[];
  /** Custom branding and compliance settings */
  settings?: {
    logoUrl?: string;
    gstin?: string;
    businessName?: string;
    phone?: string;
  };
}

export interface WebhookConfig {
  id: string;
  url: string;
  /** Webhook secret for HMAC signing (encrypted) */
  secret: string;
  event: "booking_confirmed" | "verification_complete" | "room_ready" | "all";
  active: boolean;
}

export interface AuthRecord {
  hostId: string;
  email: string;
  passwordHash: string;
  salt: string;
  /** Role in the host organization */
  role: "owner" | "manager" | "staff" | "accountant";
  emailVerified?: boolean;
  verifyToken?: string;
  resetToken?: string;
  resetTokenExpires?: string;
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
  caretakerPhone?: string;
  caretakerName?: string;
  /** Dynamic pricing rules defined by the host */
  pricingSettings?: {
    weekendSurcharge?: number; // decimal e.g. 0.15 for 15%
    seasonalAdjustments?: Array<{
      startDate: string; // MM-DD
      endDate: string; // MM-DD
      adjustment: number; // decimal e.g. 0.20 for +20%
      label: string;
    }>;
    minPrice?: number;
    maxPrice?: number;
  };
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
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  checkoutChecklist?: Record<string, boolean>;
  cleanProofUrl?: string;
  nights: number;
  /** Total gross booking amount in INR */
  amount: number;
  status:
    | "pending"
    | "confirmed"
    | "room_ready"
    | "cancelled"
    | "refunded"
    | "needs_review";
  /** Gateway Order ID (txnid) */
  gatewayOrderId?: string;
  /** Gateway Payment Session / Access Key */
  paymentSessionId?: string;
  /** Whether guest ID has been verified */
  idVerified?: boolean;
  caretakerPhone?: string;
  caretakerName?: string;
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
  gatewayOrderId: string;
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
    | "housekeeping_ready"
    | "housekeeping_issue"
    | "booking_confirmed"
    | "confirmed"
    | "checkin_reminder"
    | "verification_complete"
    | "verification_failed"
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
  /** R2 object key for the uploaded ID */
  idObjectKey?: string;
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
  /** R2 object key for full resolution audit */
  idObjectKey?: string;
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
  role: "user" | "model" | "function";
  content: string;
  /** Gemini-compatible parts (for tool calls/results) */
  parts?: any[];
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

/**
 * GuestProfile — Hyper-persistent global intelligence across the entire iStay ecosystem.
 * Indexed by phone number. Enables cross-stay recognition and preference memory.
 */
export interface GuestProfile {
  /** Primary identifier (WhatsApp Source Number) */
  phone: string;
  /** Recognized names (may vary across bookings) */
  names: string[];
  /** Email addresses associated with this guest */
  emails: string[];
  /** Unified preferences learned by AI (e.g. "prefers extra water", "high floor") */
  preferences: string[];
  /** Cumulative tracking of stays */
  stayHistory: Array<{
    propertyId: string;
    propertyName: string;
    checkIn: string;
    checkOut: string;
  }>;
  /** Short AI-generated summary of guest type (e.g. "Business traveler, very quiet") */
  summary?: string;
  createdAt: string;
  updatedAt: string;
}

// ── API CONTRACTS ─────────────────────────────────────────────

export interface ScrapedListing {
  name: string;
  imageUrl: string;
  description: string;
  sourceUrl: string;
  locationName?: string;
  amenities?: string[];
  aiKnowledge?: string;
}

export interface CreatePropertyPayload {
  name: string;
  description: string;
  imageUrl: string;
  basePrice: number;
  airbnbUrl?: string;
  address?: string;
  amenities?: string[];
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
  type?: "setup_fee" | "booking";
}

// ── DASHBOARD ─────────────────────────────────────────────────

export interface DashboardStats {
  activeBookings: number;
  monthlyEarnings: number;
  blockedDates: number;
  totalProperties: number;
  linkViews7Days: number;
}

// ── MIDDLEWARE STATE ───────────────────────────────────────────

export interface DashboardState {
  hostId: string;
  hostName: string;
  hostEmail: string;
  role: "owner" | "manager" | "staff" | "accountant";
  emailVerified: boolean;
}

// ── REVIEWS ───────────────────────────────────────────────────

export interface Review {
  id: string;
  propertyId: string;
  bookingId?: string; // Optional if imported
  guestName: string;
  rating: number; // 1-5
  comment: string;
  /** "direct" (istay) or "imported" (Airbnb/MMT) */
  source: "direct" | "imported";
  /** platform badge label e.g. "Verified Guest" or "Airbnb" */
  sourceLabel: string;
  createdAt: string;
}
