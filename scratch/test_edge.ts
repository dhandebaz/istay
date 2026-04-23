import { PrismaClient } from "../generated/client/deno/edge.ts";

async function test() {
  const url = Deno.env.get("DATABASE_URL") || "";
  console.log("URL:", url);
  
  // No adapter for prisma:// or prisma+postgres://
  const prisma = new PrismaClient();
  
  console.log("Testing query...");
  try {
    const count = await prisma.host.count();
    console.log("Count:", count);
  } catch (err) {
    console.error("Query Failed:", err.message);
  }
}

test();
