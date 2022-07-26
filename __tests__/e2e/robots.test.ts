import { test, expect } from "@playwright/test";

test.describe("Robots", () => {
  test("should serve a robots file", async ({ page }, testInfo) => {
    testInfo.snapshotSuffix = "";
    await page.goto("/robots.txt");
    await expect(await page.content()).toMatchSnapshot("robots.txt");
  });
});
