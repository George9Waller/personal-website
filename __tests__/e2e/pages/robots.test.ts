import { test, expect } from "@playwright/test";

test("should serve a robots file", async ({ page }) => {
  await page.goto("/robots.txt");
  await expect(await page.content()).toMatchSnapshot();
});
