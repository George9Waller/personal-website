import { test, expect } from "@playwright/test";

test("should serve a robots file", async ({ page }) => {
  await page.goto("/robots.txt");
  await expect(page.locator("pre")).toHaveCount(1);
});
