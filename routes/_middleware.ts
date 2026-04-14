import { FreshContext } from "$fresh/server.ts";

export async function handler(
  req: Request,
  ctx: FreshContext,
) {
  const url = new URL(req.url);
  
  // Exclude static files from logging to keep logs clean
  if (url.pathname.includes(".") || url.pathname.startsWith("/_frsh")) {
    return await ctx.next();
  }

  console.log(`[request] ${req.method} ${url.pathname}`);
  
  try {
    const resp = await ctx.next();
    
    if (resp.status === 403) {
      console.warn(`[403-DEBUG] Forbidden access to ${url.pathname}`);
    }
    
    return resp;
  } catch (err) {
    console.error(`[request-error] ${url.pathname}:`, err);
    throw err;
  }
}
