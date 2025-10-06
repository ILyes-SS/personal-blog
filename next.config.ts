import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ueajslgngxizmdfcuiak.supabase.co",
        port: "", // usually empty if default 443
        pathname: "/storage/v1/object/public/covers/**",
      },
    ],
  },
};

export default nextConfig;
