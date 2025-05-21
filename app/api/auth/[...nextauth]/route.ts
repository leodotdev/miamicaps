import NextAuth from "next-auth";
import { authOptions } from "./auth-options";

/**
 * Note: We're using the more traditional export pattern rather than the
 * newer { auth, handlers } pattern to ensure compatibility with middleware and Edge runtimes
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export { register } from "./auth-options";