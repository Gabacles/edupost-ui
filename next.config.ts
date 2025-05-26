import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    NEXT_PUBLIC_SERVICES_BASE_URL: process.env.NEXT_PUBLIC_SERVICES_BASE_URL,
  },
};

export default nextConfig;
