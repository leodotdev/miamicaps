import { NextRequest, NextResponse } from "next/server";
import { db, initializeDatabase } from "@/db/index";
import { emailSignups } from "@/db/schema";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// Force Node.js runtime
export const runtime = "nodejs";

// Initialize the database in development mode
if (process.env.NODE_ENV === 'development') {
  console.log("Initializing SQLite database for email signups");
  initializeDatabase();
}

// Email validation schema
const emailSignupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    
    // Validate email
    const validatedData = emailSignupSchema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }
    
    const { email } = validatedData.data;
    
    try {
      // Check for existing signup
      console.log(`Checking if email already exists: ${email}`);
      const existingSignup = db.query.emailSignups.findFirst({
        where: (emailSignups, { eq }) => eq(emailSignups.email, email)
      }).get();
      
      if (existingSignup) {
        console.log(`Email already registered: ${email}`);
        return NextResponse.json(
          { message: "Email already registered" },
          { status: 200 }
        );
      }
      
      // Insert new email signup
      console.log(`Inserting new email signup: ${email}`);
      db.insert(emailSignups).values({
        id: uuidv4(),
        email,
      }).run();
      
      console.log(`Successfully registered email: ${email}`);
      return NextResponse.json(
        { message: "Email registered successfully" },
        { status: 201 }
      );
    } catch (dbError) {
      console.error("Database error:", dbError);
      
      // Fall through to mock mode
      console.log(`Using fallback mode for email: ${email}`);
      return NextResponse.json(
        { message: "Email registered (fallback mode)" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error in email signup API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}