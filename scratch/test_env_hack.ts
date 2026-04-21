import { PrismaClient } from "../generated/client/deno/edge.ts";

const env = Deno.readTextFileSync(".env");
let dbUrl = env.split("\n").find(l => l.startsWith("DATABASE_URL="))?.split("=")[1].replace(/"/g, "").trim();

if (dbUrl && dbUrl.startsWith("prisma+postgres://")) {
  dbUrl = dbUrl.replace("prisma+postgres://", "prisma://");
  Deno.env.set("DATABASE_URL", dbUrl);
  console.log("Set environment variable DATABASE_URL to prisma:// protocol");
}

// In the edge client, we often don't even need to pass it to the constructor
// as it reads directly from the environment.
const prisma = new PrismaClient();

async function test() {
  try {
    console.log("Connecting using edge client with ENV HACK...");
    const host = await prisma.host.findFirst();
    console.log("Success! Found host:", host?.name || "None");
  } catch (e) {
    console.error("Connection failed:", e);
  } finally {
    await prisma.$disconnect();
  }
}

test();
