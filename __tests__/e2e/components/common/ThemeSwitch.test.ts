import { test, expect } from "@playwright/test";

test.describe("ThemeSwitch", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator(".navbar-end .dropdown label.btn-ghost").click();
  });

  test("light", async ({ page }) => {
    await page.locator("div[data-theme='light']").click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });

  test("cmyk", async ({ page }) => {
    await page.locator("div[data-theme='cmyk']").click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "cmyk");
  });

  test("lofi", async ({ page }) => {
    await page.locator("div[data-theme='lofi']").click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "lofi");
  });

  test("dark", async ({ page }) => {
    await page.locator("div[data-theme='dark']").click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("high-contrast", async ({ page }) => {
    await page.locator("div[data-theme='high-contrast']").click();
    await expect(page.locator("html")).toHaveAttribute(
      "data-theme",
      "high-contrast"
    );
  });
});
