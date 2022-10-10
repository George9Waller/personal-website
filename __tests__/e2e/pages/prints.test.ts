import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  page.goto("/prints");
});

test("should load the prints page", async ({ page }) => {
  await expect(page.locator("title")).toHaveCount(1);
  await expect(page.locator("meta[name='description']")).toHaveCount(1);
  await expect(page.locator("meta[name='keywords']")).toHaveCount(1);

  await expect(page.locator("h1")).toContainText("Prints");
  await expect(page.locator(".gallery-photo")).toHaveCount(6);

  const firstImage = await page.locator(":nth-match(.gallery-photo, 1)");
  await expect(firstImage.locator("p")).toHaveText("Image d");

  const secondImage = await page.locator(":nth-match(.gallery-photo, 2)");
  await expect(secondImage.locator("p")).toHaveText("Image a");

  const thirdImage = await page.locator(":nth-match(.gallery-photo, 3)");
  await expect(thirdImage.locator("p")).toHaveText("Image c");

  const fourthImage = await page.locator(":nth-match(.gallery-photo, 4)");
  await expect(fourthImage.locator("p")).toHaveText("Image b");

  const fifthImage = await page.locator(":nth-match(.gallery-photo, 5)");
  await expect(fifthImage.locator("p")).toHaveText("Image g");

  const sixthImage = await page.locator(":nth-match(.gallery-photo, 6)");
  await expect(sixthImage.locator("p")).toHaveText("Image e");
});
