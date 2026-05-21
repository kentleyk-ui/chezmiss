import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
  },
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      // Redirect non-www to www
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "chezmiss.ca",
          },
        ],
        destination: "https://www.chezmiss.ca/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default config;

