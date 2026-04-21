import { PrismaClient } from "https://esm.sh/@prisma/client@6.4.1";
import { PrismaPg } from "https://esm.sh/@prisma/adapter-pg@6.4.1";
import pg from "https://esm.sh/pg@8.13.3";

const url = Deno.readTextFileSync(".env").split("\n").find(l => l.startsWith("DATABASE_URL="))?.split("=")[1].replace(/"/g, "").trim();

if (!url) {
    console.error("DATABASE_URL not found in .env");
    Deno.exit(1);
}

// In esm.sh, pg might need a default import
const pool = new pg.Pool({ connectionString: url });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function test() {
  try {
    console.log("Connecting using ESM.sh imports...");
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
