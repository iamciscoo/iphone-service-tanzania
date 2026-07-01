import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "*.ngrok-free.app"],
  compress: true,
  devIndicators: false,
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 2678400,
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  async headers() {
    const immutableMediaCache = [
      { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
    ];

    const galleryHeaders = ["videos", "images", "posters"].map((directory) => ({
      source: `/gallery/${directory}/:path*`,
      headers: immutableMediaCache,
    }));

    return [
      ...galleryHeaders,
      { source: "/testimonials/:path*", headers: immutableMediaCache },
    ];
  },
};

export default nextConfig;
