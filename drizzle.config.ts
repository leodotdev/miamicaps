import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default {
  schema: "./db/schema-supabase.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  verbose: true,
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
} satisfies Config;