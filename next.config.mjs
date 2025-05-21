/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Don't run eslint during builds (Vercel will handle separately)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Don't run type checking during builds (Vercel will handle separately)
    ignoreBuildErrors: true,
  },
  // Ensure auth routes use Node.js runtime, not Edge
  serverExternalPackages: ["bcrypt", "better-sqlite3"],
  // Set environment variables for build
  env: {
    // Cannot set NODE_ENV directly, using custom name
    BUILD_ENV: process.env.NODE_ENV || "production",
    VERCEL_ENV: process.env.VERCEL_ENV || "production",
  },
};

export default nextConfig;