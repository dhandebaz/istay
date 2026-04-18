import { type Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET: () => {
    const headers = new Headers();
    // Overwrite the cookie with an expired date to clear it
    headers.set(
      "Set-Cookie",
      `host_session=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    );
    headers.set("Location", "/");

    return new Response(null, {
      status: 302,
      headers,
    });
  },
};
