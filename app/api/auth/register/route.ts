import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { register } from "../[...nextauth]/route";

// Force Node.js runtime
export const runtime = "nodejs";

const registerSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input data
    const validatedData = registerSchema.safeParse(body);
    
    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Invalid input data", details: validatedData.error.flatten() },
        { status: 400 }
      );
    }
    
    const { email, password, name } = validatedData.data;
    
    try {
      // Register the user
      const user = await register(email, password, name);
      
      return NextResponse.json(
        { success: true, user: { id: user.id, email: user.email, name: user.name } },
        { status: 201 }
      );
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error("Error in user registration:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}