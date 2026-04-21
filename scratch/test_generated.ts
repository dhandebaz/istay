import { PrismaClient } from "../generated/client/deno/edge.ts";

const env = Deno.readTextFileSync(".env");
const dbUrl = env.split("\n").find(l => l.startsWith("DATABASE_URL="))?.split("=")[1].replace(/"/g, "").trim();

if (dbUrl) {
  Deno.env.set("DATABASE_URL", dbUrl);
  console.log("Set DATABASE_URL from .env");
}

const prisma = new PrismaClient();

async function test() {
  try {
    console.log("Connecting to database using generated edge client...");
    const host = await prisma.host.findFirst();
    console.log("Success! Found host:", host?.name || "None");
  } catch (e) {
    console.error("Connection failed:", e);
    // Print stack trace to see if it's still P6001
    if (e.message.includes("prisma://")) {
        console.log("Verdict: Still failing with P6001 protocol error.");
    }
  } finally {
    await prisma.$disconnect();
  }
}

test();
