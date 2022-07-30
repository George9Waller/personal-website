/* eslint-disable @typescript-eslint/no-var-requires */
const SentryWebpackPlugin = require("@sentry/webpack-plugin");
/* eslint-enable @typescript-eslint/no-var-requires */

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  images: {
    domains: [
      "georgewaller.s3.amazonaws.com",
      "georgewaller.s3.eu-west-2.amazonaws.com",
    ],
  },
  webpack: (config, _options) => {
    if (
      process.env.SENTRY_DSN &&
      process.env.SENTRY_ORG &&
      process.env.SENTRY_PROJECT &&
      process.env.NODE_ENV === "production" &&
      process.env.APP_ENV !== "test"
    ) {
      const setCommits =
        process.env.NODE_ENV === "production"
          ? null
          : {
              repo: "George9Waller/personal-website",
              auto: true,
            };
      config.plugins.push(
        new SentryWebpackPlugin({
          include: ".next",
          ignore: ["node_modules"],
          urlPrefix: "~/_next",
          configFile: "sentry.properties",
          setCommits: setCommits,
          authToken: process.env.SENTRY_AUTH_TOKEN,
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig;
