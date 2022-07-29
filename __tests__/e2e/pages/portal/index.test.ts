import { test, expect } from "@playwright/test";

test.describe("Portal no-auth", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/portal");
  });

  test("should redirect to login", async ({ page }) => {
    await expect(page).toHaveURL("/api/auth/signin?callbackUrl=%2Fportal");
  });
});

test.describe("Portal normal-user", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/api/auth/signin");
    await page.locator("input[type=password]").fill("user");
    await page
      .locator("button:has-text('Sign in with Email & Password')")
      .click();
    await page.goto("/portal");
  });

  test("should present newsletter", async ({ page }) => {
    await expect(page.locator(".container .grid div")).toHaveCount(1);
    await expect(
      page.locator(":nth-match(.container .grid div, 1) h2")
    ).toHaveText("Newsletter");
  });
});

test.describe("Portal admin-user", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/api/auth/signin");
    await page.locator("input[type=password]").fill("admin");
    await page
      .locator("button:has-text('Sign in with Email & Password')")
      .click();
    await page.goto("/portal");
  });

  test("should present projects and newsletter", async ({ page }) => {
    await expect(page.locator(".container .grid div")).toHaveCount(2);
    await expect(
      page.locator(":nth-match(.container .grid div, 1) h2")
    ).toHaveText("Newsletter");
    await expect(
      page.locator(":nth-match(.container .grid div, 2) h2")
    ).toHaveText("Projects");
  });
});
