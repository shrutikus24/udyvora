
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow local network access during development
  allowedDevOrigins: ["192.168.1.33"],

  experimental: {
    agentFeedback: true,
  },

  cacheComponents: true,
  partialPrefetching: true,

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
