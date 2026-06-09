import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xsszibolefixfjbqmbql.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/covers/**",
      },
    ],
  },
};

export default nextConfig;
