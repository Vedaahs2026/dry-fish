import { db } from "../src/db";
import { sql } from "drizzle-orm";

async function main() {
  try {
    const tableInfo = await db.run(sql`PRAGMA table_info(site_settings)`);
    console.log("site_settings table info:", tableInfo);
  } catch (error) {
    console.error("Failed to query site_settings schema:", error);
  }
}

main();
