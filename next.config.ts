import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  allowedDevOrigins: [
    "localhost",
    "192.168.0.106",
    "local-origin.dev",
    "*.local-origin.dev",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "external-content.duckduckgo.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
    ],
  },
};

export default nextConfig;
