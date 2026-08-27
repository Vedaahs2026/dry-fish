import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { db } from "../src/db";
import { sql } from "drizzle-orm";

async function main() {
  try {
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    const tables = await db.run(sql`SELECT name, sql FROM sqlite_master WHERE type='table'`);
    console.log("Database tables and their SQL schemas:");
    const rows = tables.rows;
    for (const row of rows) {
      console.log(`Table: ${row.name}`);
      console.log(`Schema: ${row.sql}`);
      console.log("------------------------");
    }
  } catch (error) {
    console.error("Failed to query tables:", error);
  }
}

main();
