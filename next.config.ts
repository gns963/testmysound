import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root: a stray package-lock.json in the home directory
  // (outside this git repo) otherwise makes Next.js guess the wrong root.
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Hostinger auto-detects this as a Next.js app and deploys its own
  // generated standalone server.js, ignoring the repo's server.js entirely —
  // so the apex -> www redirect has to live here, not in a custom server.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "testmysound.com" }],
        destination: "https://www.testmysound.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
