// ================================================================
// routes/api/knowledge.ts — Save Host Knowledge Base
//
// POST /api/knowledge
// Body: { hostId, propertyId, content }
// Returns: { ok: true }
//
// Protected by host session validation (same as dashboard middleware).
// ================================================================

import { type Handlers } from "$fresh/server.ts";
import { getProperty, saveKnowledge } from "../../utils/db.ts";
import type { HostKnowledge } from "../../utils/types.ts";

const MAX_CONTENT_LENGTH = 10_000;

/**
 * Extracts the host_session cookie value.
 * The dashboard middleware sets this as "{hostId}|{hostName}".
 */
function getHostIdFromCookie(req: Request): string | null {
  const cookies = req.headers.get("cookie") ?? "";
  const match = cookies.match(/host_session=([^;]+)/);
  if (!match) return null;
  try {
    const sessionVal = decodeURIComponent(match[1]);
    return sessionVal.split("|")[0] ?? null;
  } catch {
    return null;
  }
}

export const handler: Handlers = {
  async POST(req) {
    let body: {
      hostId?: string;
      propertyId?: string;
      content?: string;
    };

    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { hostId, propertyId, content } = body;

    if (!hostId || !propertyId || typeof content !== "string") {
      return Response.json(
        { error: "Required: hostId, propertyId, content" },
        { status: 400 },
      );
    }

    // ── Auth: verify the session cookie matches the hostId ─────
    const sessionHostId = getHostIdFromCookie(req);
    if (sessionHostId && sessionHostId !== hostId) {
      return Response.json(
        { error: "Unauthorized — host mismatch" },
        { status: 403 },
      );
    }

    // ── Validate content length ────────────────────────────────
    if (content.length > MAX_CONTENT_LENGTH) {
      return Response.json(
        { error: `Content too long. Maximum ${MAX_CONTENT_LENGTH} characters.` },
        { status: 400 },
      );
    }

    // ── Verify property belongs to host ────────────────────────
    const property = await getProperty(hostId, propertyId);
    if (!property) {
      return Response.json(
        { error: "Property not found or doesn't belong to this host" },
        { status: 404 },
      );
    }

    // ── Save knowledge ─────────────────────────────────────────
    const knowledge: HostKnowledge = {
      hostId,
      propertyId,
      content: content.trim(),
      updatedAt: new Date().toISOString(),
    };

    await saveKnowledge(knowledge);

    console.log(
      `[knowledge] Saved KB for host=${hostId} prop=${propertyId} (${content.length} chars)`,
    );

    return Response.json({ ok: true });
  },
};
