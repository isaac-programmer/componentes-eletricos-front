import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true
  },
  async rewrites() {
    if (process.env.INTERNAL_API_URL) {
      return [
        {
          source: '/api-interno/:path*',
          destination: `${process.env.INTERNAL_API_URL}/:path*`, 
        },
      ]
    }

    return []
  },
};

export default nextConfig;
