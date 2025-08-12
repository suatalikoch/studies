import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "external-content.duckduckgo.com",
      },
    ],
  },
};

export default nextConfig;
