// ================================================================
// routes/api/contact.ts — Contact Form Handler
//
// POST /api/contact (form submission)
// Stores inquiries in Deno KV and logs them.
// ================================================================

import { type Handlers } from "$fresh/server.ts";

const getKv = (() => {
  let kv: Deno.Kv | null = null;
  return async () => {
    if (!kv) kv = await Deno.openKv();
    return kv;
  };
})();

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  propertyLink: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
}

export const handler: Handlers = {
  POST: async (req) => {
    const form = await req.formData();
    const name = (form.get("name") as string || "").trim();
    const email = (form.get("email") as string || "").trim();
    const propertyLink = (form.get("propertyLink") as string || "").trim();
    const message = (form.get("message") as string || "").trim();

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(null, {
        status: 303,
        headers: { Location: "/contact?error=missing_fields" },
      });
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(null, {
        status: 303,
        headers: { Location: "/contact?error=invalid_email" },
      });
    }

    const now = new Date().toISOString();
    const id = crypto.randomUUID().replace(/-/g, "").slice(0, 12);

    const inquiry: ContactInquiry = {
      id,
      name,
      email,
      propertyLink,
      message,
      status: "new",
      createdAt: now,
    };

    // Store in Deno KV
    const kv = await getKv();
    await kv.set(["contact_inquiry", id], inquiry);

    console.log(
      `[contact] New inquiry from ${name} <${email}> id=${id}`,
    );

    // Redirect back with success
    return new Response(null, {
      status: 303,
      headers: { Location: "/contact?sent=1" },
    });
  },
};
