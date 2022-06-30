const { env } = require('process')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-GB', 'fr-FR'],
    defaultLocale: 'en-GB',
  },
  images: {
    domains: ['georgewaller.s3.amazonaws.com'],
  },
}

module.exports = nextConfig
