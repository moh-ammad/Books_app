import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      }
    ]
  },
allowedDevOrigins: [
    'http://192.168.29.69:3000',
    'http://192.168.29.69:*'
  ],
  experimental: {
    ppr: true,
  }
};

export default nextConfig;
