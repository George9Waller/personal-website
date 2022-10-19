import { test, expect } from "@playwright/test";

test.describe("GalleryPage", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/gallery");
  });

  test("it should render the most popular images by default", async ({
    page,
  }) => {
    expect(page.locator("button:has-text('Popularity')")).toHaveClass(
      "btn-active"
    );
    expect(page.locator("button:has-text('Newest first')")).not.toHaveClass(
      "btn-active"
    );
    expect(page.locator("button:has-text('Oldest first')")).not.toHaveClass(
      "btn-active"
    );

    expect(page.locator(".gallery-photo")).toHaveLength(8);

    const firstImage = await page.locator(":nth-match(.gallery-photo, 1)");
    await expect(firstImage.locator("p")).toHaveText("Image d");

    const secondImage = await page.locator(":nth-match(.gallery-photo, 2)");
    await expect(secondImage.locator("p")).toHaveText("Image a");

    const thirdImage = await page.locator(":nth-match(.gallery-photo, 3)");
    await expect(thirdImage.locator("p")).toHaveText("Image B 1");
  });

  test("it should render the newest images", async ({ page }) => {
    page.locator("button:has-text('Newest first')").click();
    expect(page.locator("button:has-text('Popularity')")).not.toHaveClass(
      "btn-active"
    );
    expect(page.locator("button:has-text('Newest first')")).toHaveClass(
      "btn-active"
    );
    expect(page.locator("button:has-text('Oldest first')")).not.toHaveClass(
      "btn-active"
    );

    expect(page.locator(".gallery-photo")).toHaveLength(8);

    const firstImage = await page.locator(":nth-match(.gallery-photo, 1)");
    await expect(firstImage.locator("p")).toHaveText("Image g");

    const secondImage = await page.locator(":nth-match(.gallery-photo, 2)");
    await expect(secondImage.locator("p")).toHaveText("Image f");

    const eighthImage = await page.locator(":nth-match(.gallery-photo, 8)");
    await expect(eighthImage.locator("p")).toHaveText("Image B 1");
  });

  test("it should render the oldest images", async ({ page }) => {
    page.locator("button:has-text('Oldest first')").click();
    expect(page.locator("button:has-text('Popularity')")).not.toHaveClass(
      "btn-active"
    );
    expect(page.locator("button:has-text('Newest first')")).not.toHaveClass(
      "btn-active"
    );
    expect(page.locator("button:has-text('Oldest first')")).toHaveClass(
      "btn-active"
    );

    expect(page.locator(".gallery-photo")).toHaveLength(8);

    const firstImage = await page.locator(":nth-match(.gallery-photo, 1)");
    await expect(firstImage.locator("p")).toHaveText("Image B 1");

    const secondImage = await page.locator(":nth-match(.gallery-photo, 2)");
    await expect(secondImage.locator("p")).toHaveText("Image g");

    const thirdImage = await page.locator(":nth-match(.gallery-photo, 3)");
    await expect(thirdImage.locator("p")).toHaveText("Image f");
  });
});
