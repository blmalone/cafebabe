/**
 * @type {import('next').NextConfig}
 */

/**
 * For workbox configurations:
 * https://developer.chrome.com/docs/workbox/reference/workbox-webpack-plugin/
 */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.io',
      },
    ],
  },
  // Use the output directory `out`
  distDir: 'out',
  /**
 * Enable static exports for the App Router.
 *
 * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
 */
  output: "export"
});

module.exports = nextConfig;
