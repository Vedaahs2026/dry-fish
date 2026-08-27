import { db } from "../src/db";
import { siteSettings } from "../src/db/schema";
import { eq } from "drizzle-orm";

async function main() {
  const query = db.select().from(siteSettings).where(eq(siteSettings.key, "founder_promo")).limit(1);
  console.log("Generated SQL:", query.toSQL());
}

main();
