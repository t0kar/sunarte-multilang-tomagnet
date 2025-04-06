/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable React strict mode to avoid double rendering in development
  reactStrictMode: false,

  // Configure webpack to handle any issues
  webpack: (config, { isServer }) => {
    // Add any webpack configurations here if needed
    return config;
  },
};

module.exports = nextConfig;
