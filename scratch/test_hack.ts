import { PrismaClient } from "../generated/client/deno/edge.ts";

const env = Deno.readTextFileSync(".env");
let dbUrl = env.split("\n").find(l => l.startsWith("DATABASE_URL="))?.split("=")[1].replace(/"/g, "").trim();

if (dbUrl) {
  // Hack: replace prisma+postgres with prisma
  dbUrl = dbUrl.replace("prisma+postgres://", "prisma://");
  Deno.env.set("DATABASE_URL", dbUrl);
  console.log("Set DATABASE_URL as prisma:// for testing edge client");
}

const prisma = new PrismaClient();

async function test() {
  try {
    console.log("Connecting to database using edge client with prisma:// protocol...");
    const host = await prisma.host.findFirst();
    console.log("Success! Found host:", host?.name || "None");
  } catch (e) {
    console.error("Connection failed:", e);
  } finally {
    await prisma.$disconnect();
  }
}

test();
