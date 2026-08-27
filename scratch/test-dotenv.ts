import * as dotenv from "dotenv";
const res = dotenv.config({ path: ".env.local" });
console.log("Dotenv result:", res);
console.log("DATABASE_URL:", process.env.DATABASE_URL);
