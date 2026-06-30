import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  devIndicators: false,
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 2678400,
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  async headers() {
    return [{
      source: "/gallery/:path*",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    }];
  },
};

export default nextConfig;
