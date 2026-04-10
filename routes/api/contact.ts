import { type Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req) {
    // TODO: Implement actual contact form handling (email/Deno KV storage)
    const form = await req.formData();
    const data = {
      name: form.get("name"),
      email: form.get("email"),
      propertyLink: form.get("propertyLink"),
      message: form.get("message"),
      timestamp: new Date().toISOString(),
    };

    // Stub: log to console for now
    console.log("[Contact Form] Received submission:", data);

    // Redirect back with a success param
    return new Response(null, {
      status: 303,
      headers: { Location: "/contact?sent=1" },
    });
  },
};
