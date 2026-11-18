import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (dev) config.cache = false;
    return config;
  },
  async headers() {
    return [
      {
        source: "/:path*(\.mp4|\.webm|\.mov)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
