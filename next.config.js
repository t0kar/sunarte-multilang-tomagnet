/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable React strict mode to avoid double rendering in development
  reactStrictMode: false,

  // Configure webpack to handle any issues
  webpack: (config, { isServer }) => {
    // Add any webpack configurations here if needed
    return config;
  },

  // Disable Turbopack for now if it's causing issues
  experimental: {
    // Disable Turbopack
    turbo: false,
  },
};

module.exports = nextConfig;
