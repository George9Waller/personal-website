import type { PlaywrightTestConfig } from "@playwright/test";
const config: PlaywrightTestConfig = {
  webServer: {
    command: "dotenv -e .env.test -- next start",
    url: process.env.NEXT_PUBLIC_SITE_URL,
  },
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "on-first-retry",
    screenshot: "only-on-failure",
    baseURL: process.env.NEXT_PUBLIC_SITE_URL,
  },
};
export default config;
