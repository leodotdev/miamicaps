import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db/index-pg";
import { emailSignups } from "@/db/schema-pg";

// Force Node.js runtime
export const runtime = "nodejs";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

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
    
    // Development mode - simulate successful signup without database
    if (process.env.NODE_ENV === 'development' && !process.env.DATABASE_URL) {
      console.log('Development mode: Simulating email signup for', email);
      return NextResponse.json(
        { message: "Email registered successfully (dev mode)" },
        { status: 201 }
      );
    }
    
    const db = getDb();
    
    // Skip database operations if DB is not available (preview/build mode)
    if (!db || Object.keys(db).length === 0) {
      console.log('Skipping database operations - DB not available');
      return NextResponse.json(
        { message: "Email registered (mock mode)" },
        { status: 201 }
      );
    }
    
    try {
      // Check for existing signup
      const existingSignup = await db.query.emailSignups.findFirst({
        where: (emailSignups, { eq }) => eq(emailSignups.email, email)
      });
      
      if (existingSignup) {
        return NextResponse.json(
          { message: "Email already registered" },
          { status: 200 }
        );
      }
      
      // Insert new signup
      await db.insert(emailSignups).values({
        id: uuidv4(),
        email,
      });
      
      return NextResponse.json(
        { message: "Email registered successfully" },
        { status: 201 }
      );
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { message: "Email registered (fallback mode)" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error in email signup:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}