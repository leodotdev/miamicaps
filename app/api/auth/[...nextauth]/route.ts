import NextAuth from "next-auth";
import { authOptions } from "./auth-options";
import { runtime } from "../../route-config";

/**
 * Force Node.js runtime for NextAuth
 */
export { runtime };

/**
 * Using traditional export pattern for compatibility
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export { register } from "./auth-options";