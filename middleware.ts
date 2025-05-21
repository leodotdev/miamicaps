import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple middleware that doesn't depend on auth or oidc-token-hash
export function middleware(request: NextRequest) {
  // Just pass through all requests
  return NextResponse.next();
}

// Configure which routes the middleware applies to
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};