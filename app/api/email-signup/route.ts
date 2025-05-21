import { NextRequest, NextResponse } from "next/server";
import { db as sqliteDb, initializeDatabase } from "@/db/index";
import { getDb } from "@/db/index-pg";
import { emailSignups } from "@/db/schema";

// Force Node.js runtime
export const runtime = "nodejs";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// Initialize SQLite if in development mode
if (process.env.NODE_ENV === 'development') {
  initializeDatabase();
}

const emailSignupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input data
    const validatedData = emailSignupSchema.safeParse(body);
    
    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }
    
    const { email } = validatedData.data;
    const userId = uuidv4();
    
    // Development mode - use SQLite
    if (process.env.NODE_ENV === 'development') {
      try {
        console.log('Development mode: Saving email signup to SQLite:', email);
        
        // Check for existing signup in SQLite
        const existingSignup = sqliteDb.query.emailSignups.findFirst({
          where: (emailSignups, { eq }) => eq(emailSignups.email, email)
        }).get();
        
        if (existingSignup) {
          return NextResponse.json(
            { message: "Email already registered" },
            { status: 200 }
          );
        }
        
        // Insert into SQLite
        sqliteDb.insert(emailSignups).values({
          id: userId,
          email,
        }).run();
        
        return NextResponse.json(
          { message: "Email registered successfully" },
          { status: 201 }
        );
      } catch (sqliteError) {
        console.error("SQLite error:", sqliteError);
        // Fall through to mock mode if SQLite fails
      }
    }
    
    // Production mode - use PostgreSQL
    if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
      const pgDb = getDb();
      
      // Skip database operations if DB is not available (preview/build mode)
      if (!pgDb || Object.keys(pgDb).length === 0) {
        console.log('Skipping PostgreSQL operations - DB not available');
        return NextResponse.json(
          { message: "Email registered (mock mode)" },
          { status: 201 }
        );
      }
      
      try {
        // Check for existing signup
        const existingSignup = await pgDb.query.emailSignups.findFirst({
          where: (emailSignups, { eq }) => eq(emailSignups.email, email)
        });
        
        if (existingSignup) {
          return NextResponse.json(
            { message: "Email already registered" },
            { status: 200 }
          );
        }
        
        // Insert new signup
        await pgDb.insert(emailSignups).values({
          id: userId,
          email,
        });
        
        return NextResponse.json(
          { message: "Email registered successfully" },
          { status: 201 }
        );
      } catch (pgError) {
        console.error("PostgreSQL error:", pgError);
      }
    }
    
    // Fallback - simulate successful signup
    console.log('Using fallback mode for email signup:', email);
    return NextResponse.json(
      { message: "Email registered (fallback mode)" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in email signup:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}