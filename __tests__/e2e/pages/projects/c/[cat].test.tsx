import { test, expect } from "@playwright/test";

test.describe("ProjectCategoryPage", async () => {
  test("it pre filters to an existing category", async ({ page }) => {
    await page.goto("/projects/c/fine-art");
    await expect(page.locator("button:has-text('Fine-art')")).not.toHaveClass(
      /opacity-50/
    );
    await expect(page.locator("button:has-text('Photography')")).toHaveClass(
      /opacity-50/
    );
    await expect(page.locator("button:has-text('Coding')")).toHaveClass(
      /opacity-50/
    );
  });

  test("it defaults to all categories when un-recognised", async ({ page }) => {
    await page.goto("/projects/c/all");
    await expect(page.locator("button:has-text('Fine-art')")).not.toHaveClass(
      /opacity-50/
    );
    await expect(
      page.locator("button:has-text('Photography')")
    ).not.toHaveClass(/opacity-50/);
    await expect(page.locator("button:has-text('Coding')")).not.toHaveClass(
      /opacity-50/
    );
  });
});
