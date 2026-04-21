import pkg from "npm:@prisma/client@6.4.1/wasm";
const { PrismaClient } = pkg;
import { PrismaPg } from "npm:@prisma/adapter-pg";
import pg from "npm:pg";

const env = Deno.readTextFileSync(".env");
const dbUrl = env.split("\n").find(l => l.startsWith("DATABASE_URL="))?.split("=")[1].replace(/"/g, "").trim();

const pool = new pg.Pool({ connectionString: dbUrl });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function test() {
  try {
    console.log("Connecting using npm:@prisma/client/wasm and adapter...");
    const host = await prisma.host.findFirst();
    console.log("Success! Found host:", host?.name || "None");
  } catch (e) {
    console.error("Connection failed:", e);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

test();
