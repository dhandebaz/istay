// ================================================================
// routes/api/properties.ts — Save approved property to Deno KV
//
// POST /api/properties
// Auth: requires host_session cookie
// Body: CreatePropertyPayload
// Returns: { ok: true, property: Property } | { error: string }
// ================================================================

import { type Handlers } from "$fresh/server.ts";
import { saveProperty } from "../../utils/db.ts";
import type { CreatePropertyPayload, Property } from "../../utils/types.ts";

function parseCookies(header: string | null): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!header) return cookies;
  for (const part of header.split(";")) {
    const [key, ...vals] = part.trim().split("=");
    if (key) cookies[key.trim()] = vals.join("=").trim();
  }
  return cookies;
}

function getHostId(req: Request): string | null {
  const cookies = parseCookies(req.headers.get("cookie"));
  return cookies["host_session"] || null;
}

export const handler: Handlers = {
  async POST(req) {
    const hostId = getHostId(req);
    if (!hostId) {
      return Response.json({ error: "Unauthorized — no active session" }, {
        status: 401,
      });
    }

    let body: Partial<CreatePropertyPayload>;
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { name, description, imageUrl, basePrice, airbnbUrl, address } =
      body;

    if (!name || typeof name !== "string" || name.trim().length < 3) {
      return Response.json(
        { error: "name is required and must be at least 3 characters" },
        { status: 400 },
      );
    }

    if (
      !description || typeof description !== "string" ||
      description.trim().length < 10
    ) {
      return Response.json(
        { error: "description is required and must be at least 10 characters" },
        { status: 400 },
      );
    }

    const price = Number(basePrice);
    if (isNaN(price) || price < 0) {
      return Response.json(
        { error: "basePrice must be a non-negative number" },
        { status: 400 },
      );
    }

    const now = new Date().toISOString();
    const property: Property = {
      id: crypto.randomUUID().replace(/-/g, "").slice(0, 16),
      hostId,
      name: name.trim(),
      description: description.trim(),
      imageUrl: typeof imageUrl === "string" ? imageUrl.trim() : "",
      basePrice: price,
      airbnbUrl: typeof airbnbUrl === "string" ? airbnbUrl.trim() : undefined,
      address: typeof address === "string" ? address.trim() : undefined,
      status: "active",
      createdAt: now,
      updatedAt: now,
    };

    try {
      await saveProperty(property);
      return Response.json({ ok: true, property }, { status: 201 });
    } catch (err) {
      console.error("[api/properties] KV save error:", err);
      return Response.json(
        { error: "Failed to save property. Please try again." },
        { status: 500 },
      );
    }
  },
};
