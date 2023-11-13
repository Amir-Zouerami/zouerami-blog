/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [{ protocol: 'http', hostname: '127.0.0.1', port: '8090' }],
  },
  // experimental: {
  //   serverActions: true,
  //   serverActionsBodySizeLimit: '3mb',
  // },
};

module.exports = nextConfig;
