import { test, expect } from "@playwright/test";

test("should serve a sitemap", async ({ page }) => {
  await page.goto("/sitemap.xml");
  await expect(page.locator("urlset")).toHaveCount(1);
});
