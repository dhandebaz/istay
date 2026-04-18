import { Handlers } from "$fresh/server.ts";
import { listAllPropertyIndices } from "../utils/db.ts";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    const indices = await listAllPropertyIndices();
    const baseUrl = "https://istay.space";

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/search</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/pricing</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <changefreq>monthly</priority>
    <priority>0.3</priority>
  </url>
  ${indices
    .map(
      (idx) => `
  <url>
    <loc>${baseUrl}/p/${idx.propId}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`,
    )
    .join("")}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  },
};
