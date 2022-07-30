import { devices, PlaywrightTestConfig } from "@playwright/test";
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
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "safari",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 5"] },
    },
  ],
};
export default config;
