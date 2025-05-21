import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema-pg.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  verbose: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;