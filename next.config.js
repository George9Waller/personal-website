/* eslint-disable @typescript-eslint/no-var-requires */
const { withSentryConfig } = require("@sentry/nextjs");
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
      process.env.NODE_ENV === "production"
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: ".next",
          ignore: ["node_modules"],
          urlPrefix: "~/_next",
          configFile: "sentry.properties",
          setCommits: {
            repo: "George9Waller/personal-website",
            auto: true,
          },
          authToken: process.env.SENTRY_AUTH_TOKEN,
        })
      );
    }
    return config;
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

module.exports =
  process.env.NODE_ENV === "production"
    ? withSentryConfig(nextConfig, sentryWebpackPluginOptions)
    : nextConfig;
