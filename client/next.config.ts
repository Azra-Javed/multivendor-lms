import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "randomuser.me"],
  },

  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
