import NextAuth from "next-auth";
import { authOptions } from "./auth-options";

// Convert to .js file to avoid Edge Runtime issues
const handler = NextAuth(authOptions);

export const GET = handler.GET;
export const POST = handler.POST;

// Re-export register function for use in register route
export { register } from "./auth-options";