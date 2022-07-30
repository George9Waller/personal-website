import { test, expect } from "@playwright/test";

test("should serve a sitemap", async ({ page }, testInfo) => {
  testInfo.snapshotSuffix = "";
  await page.goto("/sitemap.xml");
  await expect(await page.content()).toMatchSnapshot();
});
