import { test, expect } from "@playwright/test";

test.describe("ProjectsList", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects");
  });

  test("page metadata", async ({ page }) => {
    await expect(page.locator("title")).toHaveCount(1);
    await expect(page.locator("meta[name='description']")).toHaveCount(1);
    await expect(
      page.locator("script[type='application/ld+json']")
    ).toHaveCount(1);
  });

  test("Loads all projects and more on request", async ({ page }) => {
    await expect(
      page.locator(".container button:has-text('Photography')")
    ).toHaveCount(1);
    await expect(
      page.locator(".container button:has-text('Fine-art')")
    ).toHaveCount(1);
    await expect(
      page.locator(".container button:has-text('Coding')")
    ).toHaveCount(1);

    await expect(page.locator(".project-card")).toHaveCount(6);
    await expect(
      page.locator(":nth-match(.project-card, 1) .card-title")
    ).toHaveText("A");
    await expect(
      page.locator(":nth-match(.project-card, 2) .card-title")
    ).toHaveText("B");
    await expect(
      page.locator(":nth-match(.project-card, 3) .card-title")
    ).toHaveText("F");

    await expect(page.locator("progress")).toHaveAttribute("value", "6");
    await expect(page.locator("progress")).toHaveAttribute("max", "7");
    await page.locator("a:has-text('Load More')").click();

    await expect(page.locator("a:has-text('Load More')")).toHaveCount(0);
    await expect(page.locator("progress")).toHaveAttribute("value", "7");
    await expect(page.locator("progress")).toHaveAttribute("max", "7");
    await expect(page.locator(".project-card")).toHaveCount(7);
  });

  test("Filters to a multiple categories", async ({ page }) => {
    await page.locator("button:has-text('Photography')").click();
    await page.locator("button:has-text('Coding')").click();

    await expect(page.locator(".project-card")).toHaveCount(5);
    await expect(
      page.locator(":nth-match(.project-card, 1) .card-title")
    ).toHaveText("B");
    await expect(
      page.locator(":nth-match(.project-card, 2) .card-title")
    ).toHaveText("G");
    await expect(
      page.locator(":nth-match(.project-card, 3) .card-title")
    ).toHaveText("H");
  });

  test("Filters to a single category when all shown", async ({ page }) => {
    await page.locator("button:has-text('Coding')").click();
    await expect(page.locator(".project-card")).toHaveCount(3);
    await expect(
      page.locator(":nth-match(.project-card, 1) .card-title")
    ).toHaveText("G");
    await expect(
      page.locator(":nth-match(.project-card, 2) .card-title")
    ).toHaveText("H");
    await expect(
      page.locator(":nth-match(.project-card, 3) .card-title")
    ).toHaveText("J");
  });

  test("Filters to all categories when all hidden", async ({ page }) => {
    await page.locator("button:has-text('Fine-art')").click();
    await page.locator("button:has-text('Fine-art')").click();

    await expect(page.locator(".project-card")).toHaveCount(6);
  });
});
