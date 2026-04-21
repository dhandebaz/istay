import { PrismaClient } from "../generated/client/index.d.ts";
// In Deno, we might need to import the JS file and cast or use standard NPM
import pkg from "../generated/client/index.js";
const { PrismaClient: PC } = pkg;

const env = Deno.readTextFileSync(".env");
const dbUrl = env.split("\n").find(l => l.startsWith("DATABASE_URL="))?.split("=")[1].replace(/"/g, "").trim();

const prisma = new PC({
  datasources: { db: { url: dbUrl } }
});

async function test() {
  try {
    console.log("Connecting using STANDARD generated client...");
    const host = await prisma.host.findFirst();
    console.log("Success! Found host:", host?.name || "None");
  } catch (e) {
    console.error("Connection failed:", e);
  } finally {
    await prisma.$disconnect();
  }
}

test();
