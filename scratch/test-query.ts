import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { db } from "../src/db";
import { siteSettings } from "../src/db/schema";
import { eq } from "drizzle-orm";

async function main() {
  try {
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    console.log("Running query on siteSettings with remote Turso DB...");
    const res = await db.select().from(siteSettings).where(eq(siteSettings.key, "founder_promo")).limit(1);
    console.log("Query success! Result:", res);
  } catch (error: any) {
    console.error("Query failed with error:", error);
    if (error.message) console.error("Error message:", error.message);
    if (error.cause) console.error("Error cause:", error.cause);
  }
}

main();
