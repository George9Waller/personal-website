import { devices, PlaywrightTestConfig } from "@playwright/test";
const config: PlaywrightTestConfig = {
  webServer: {
    command: "dotenv -e .env.test -- next start",
    url: process.env.NEXT_PUBLIC_SITE_URL,
  },
  use: {
    headless: false,
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
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'safari',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'] }
    },
    {
      name: 'android',
      use: { ...devices['Pixel 5'] }
    },
    {
      name: "iphone",
      use: { ...devices["iPhone 13"] },
    },
    {
      name: 'ipad',
      use: { ...devices['iPad (gen 7)'] }
    }
  ],
};
export default config;
