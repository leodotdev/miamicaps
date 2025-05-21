import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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
    
    // For now, just log the email and return success
    // This ensures the form works and can be easily extended later
    console.log(`Email signup: ${email}`);
    
    // In production, you would save to your database here
    // For development/testing, we'll just simulate success
    
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

// Add OPTIONS handler for CORS if needed
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}