/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/w40/**',
      },
    ],
  },
  // Configure server to use Railway PORT environment variable
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0', // Listen on all network interfaces
  },
}

module.exports = nextConfig
