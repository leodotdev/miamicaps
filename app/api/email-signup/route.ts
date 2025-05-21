import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db/index-pg";
import { emailSignups } from "@/db/schema";
import { runtime } from "../route-config";

// Force Node.js runtime
export { runtime };
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
    
    const db = getDb();
    
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
  } catch (error) {
    console.error("Error in email signup:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}