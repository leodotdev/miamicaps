import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db/supabase";
import { emailSignups } from "@/db/schema-supabase";
import { eq } from "drizzle-orm";

// Force Node.js runtime
export const runtime = "nodejs";

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
    
    // Check if email already exists
    const existingSignup = await db
      .select()
      .from(emailSignups)
      .where(eq(emailSignups.email, email))
      .limit(1);
    
    if (existingSignup.length > 0) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 200 }
      );
    }
    
    // Add email to database
    const [newSignup] = await db
      .insert(emailSignups)
      .values({ email })
      .returning();
    
    console.log(`Email signup: ${email} at ${newSignup.createdAt.toISOString()}`);
    
    return NextResponse.json(
      { message: "Email registered successfully" },
      { status: 201 }
    );
    
  } catch (error) {
    console.error("Error in email signup API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve all signups (for admin purposes)
export async function GET(req: NextRequest) {
  try {
    // Simple security check - only allow in development or with a secret key
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret');
    
    if (process.env.NODE_ENV === 'production' && secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Fetch all signups from database
    const allSignups = await db.select().from(emailSignups);
    
    // Transform the data to match the expected format
    const transformedSignups = allSignups.map(signup => ({
      id: signup.id,
      email: signup.email,
      timestamp: signup.createdAt.toISOString()
    }));
    
    return NextResponse.json({
      signups: transformedSignups,
      total: transformedSignups.length,
      lastUpdated: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("Error retrieving email signups:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Add OPTIONS handler for CORS if needed
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}