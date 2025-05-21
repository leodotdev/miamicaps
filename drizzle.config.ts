import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "sqlite",
  verbose: true,
  dbCredentials: {
    url: "./db/sqlite.db",
  },
} satisfies Config;