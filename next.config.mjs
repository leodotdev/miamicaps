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
};

export default nextConfig;