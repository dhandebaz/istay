import { PrismaClient } from "npm:@prisma/client@6.4.1";
import "https://deno.land/x/dotenv@v3.2.2/load.ts";

const prisma = new PrismaClient();

async function test() {
  try {
    console.log("Connecting to database...");
    const host = await prisma.host.findFirst();
    console.log("Success! Found host:", host?.name || "None");
  } catch (e) {
    console.error("Connection failed:", e);
  } finally {
    await prisma.$disconnect();
  }
}

test();
