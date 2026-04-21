import { getPrisma } from "../utils/db.ts";

async function testConnection() {
  console.log("Testing database connection...");
  try {
    const prisma = getPrisma();
    console.log("Client initialized. Fetching first host...");
    const host = await prisma.host.findFirst();
    if (host) {
      console.log("SUCCESS: Found host:", host.email);
    } else {
      console.log("SUCCESS: Connection established, but no hosts found.");
    }
  } catch (err) {
    console.error("FAILURE: Database connection failed.");
    console.error(err);
    Deno.exit(1);
  }
}

testConnection();
