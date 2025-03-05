import type { NextConfig } from "next";
module.exports = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000', // localhost
        'organic-carnival-666v5qx76pgf4996-3000.app.github.dev', // Codespaces
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yvvfrwitzsrbkezfqggx.supabase.co",
        port: "",
        pathname: "*/**"
      }
    ]
  }
};