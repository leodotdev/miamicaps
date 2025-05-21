import NextAuth from "next-auth";
import { authOptions } from "./auth-options";

export const { auth, handlers: { GET, POST } } = NextAuth(authOptions);

export { register } from "./auth-options";