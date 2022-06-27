/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-GB', 'fr-FR'],
    defaultLocale: 'en-GB',
  },
  images: {
    domains: ['catadoptionteam.org']
  }
}

module.exports = nextConfig
