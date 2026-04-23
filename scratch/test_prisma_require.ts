import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const PrismaPkg = require("../generated/client/index.js");
const { PrismaClient } = PrismaPkg;

console.log("PrismaClient:", PrismaClient ? "Found" : "Missing");

import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

async function test() {
  const url = Deno.env.get("DATABASE_URL") || "";
  console.log("URL:", url);
  const pool = new pg.Pool({ connectionString: url });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });
  
  console.log("Testing query...");
  try {
    const count = await prisma.host.count();
    console.log("Count:", count);
  } catch (err) {
    console.error("Query Failed:", err.message);
  }
}

test();
