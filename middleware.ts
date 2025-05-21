import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./app/api/auth/[...nextauth]/route";

export default auth((req) => {
  // This middleware ensures NextAuth session is properly initialized
  // on all pages, preventing client-side errors
  return NextResponse.next();
});

// Configure protected and public routes
export const config = {
  // Protect all routes, including the API ones
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};