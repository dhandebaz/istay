import pkg from "npm:@prisma/client@6.4.1";
const { PrismaClient } = pkg;

async function test() {
  console.log("PrismaClient:", PrismaClient ? "Found" : "Missing");
  const prisma = new PrismaClient();
  console.log("Testing...");
  try {
    const count = await prisma.host.count();
    console.log("Count:", count);
  } catch (err) {
    console.error("Failed:", err.message);
  }
}

test();
