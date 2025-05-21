import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

// Initialize SQLite database
const sqlite = new Database("./db/sqlite.db");
export const db = drizzle(sqlite, { schema });

// Helper function to ensure the database is properly initialized
export function initializeDatabase() {
  // Create tables if they don't exist (minimal migration)
  const createTables = [
    `
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT NOT NULL UNIQUE,
      email_verified INTEGER,
      password TEXT,
      image TEXT,
      created_at INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      session_token TEXT NOT NULL UNIQUE,
      expires INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS accounts (
      provider TEXT NOT NULL,
      provider_account_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL,
      refresh_token TEXT,
      access_token TEXT,
      expires_at INTEGER,
      token_type TEXT,
      scope TEXT,
      id_token TEXT,
      session_state TEXT,
      PRIMARY KEY (provider, provider_account_id),
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS verification_tokens (
      identifier TEXT NOT NULL,
      token TEXT NOT NULL,
      expires INTEGER NOT NULL,
      PRIMARY KEY (identifier, token)
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS email_signups (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      created_at INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
    `,
  ];

  // Execute each creation statement
  for (const statement of createTables) {
    sqlite.exec(statement);
  }

  return db;
}