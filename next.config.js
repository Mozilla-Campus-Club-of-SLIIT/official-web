/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed `output: 'export'` to allow dynamic Route Handlers (API endpoints) and server runtime.
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/join-us",
        destination: "/apply",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
