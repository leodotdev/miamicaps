import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as schema from "./schema";

// Get the DATABASE_URL from env or use a fallback for builds
const connectionString = process.env.DATABASE_URL || 
  "postgresql://placeholder:placeholder@placeholder.postgres.vercel-storage.com:5432/placeholder?sslmode=require";

let client: Pool | null = null;
let db: ReturnType<typeof drizzle> | null = null;

// Get the database instance
export function getDb() {
  // Skip actual connection during build process
  if (process.env.VERCEL_ENV === 'preview') {
    // Return a mock during build
    return {} as ReturnType<typeof drizzle>;
  }

  if (!client) {
    client = new Pool({ connectionString });
  }

  if (!db) {
    db = drizzle(client, { schema });
  }

  return db;
}

// Helper to initialize the database with the schema
export function initializeDatabase() {
  // This function doesn't need to do anything for Postgres with Neon
  // since we'll use migrations or the Drizzle Studio to set up the schema
  return getDb();
}