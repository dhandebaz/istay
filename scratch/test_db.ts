import { getPrisma, getKv } from "../utils/db.ts";

async function test() {
  console.log("Testing KV...");
  const kv = await getKv();
  console.log("KV status:", kv ? "Connected" : "Failed");

  console.log("Testing Prisma...");
  try {
    const prisma = getPrisma();
    const count = await prisma.host.count();
    console.log("Prisma Host Count:", count);
  } catch (err) {
    console.error("Prisma Failed:", err.message);
  }
}

test();
