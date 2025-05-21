import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { promises as fs } from "fs";
import path from "path";

// Force Node.js runtime
export const runtime = "nodejs";

// Data file path
const DATA_FILE = path.join(process.cwd(), "data", "email-signups.json");

// Email validation schema
const emailSignupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

// Helper function to ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Helper function to read email signups from file
async function readEmailSignups() {
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist or is invalid, return empty array
    return [];
  }
}

// Helper function to write email signups to file
async function writeEmailSignups(signups: any[]) {
  await ensureDataDirectory();
  await fs.writeFile(DATA_FILE, JSON.stringify(signups, null, 2));
}

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
    
    // Read existing signups
    const existingSignups = await readEmailSignups();
    
    // Check if email already exists
    const existingSignup = existingSignups.find((signup: any) => signup.email === email);
    if (existingSignup) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 200 }
      );
    }
    
    // Add new signup
    const newSignup = {
      id: Date.now().toString(),
      email,
      timestamp: new Date().toISOString(),
    };
    
    existingSignups.push(newSignup);
    await writeEmailSignups(existingSignups);
    
    console.log(`Email signup: ${email} at ${newSignup.timestamp}`);
    console.log(`Total signups: ${existingSignups.length}`);
    
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
    
    // Read all signups from file
    const allSignups = await readEmailSignups();
    
    return NextResponse.json({
      signups: allSignups,
      total: allSignups.length,
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