/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['georgewaller.s3.amazonaws.com'],
  },
}

module.exports = nextConfig
