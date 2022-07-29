import { test, expect, Page } from "@playwright/test";

export const subscribeRoute = (page: Page) =>
  page.route("**/api/newsletter/subscribe", (route) => {
    route.fulfill({});
  });

export const unsubscribeRoute = (page: Page) =>
  page.route("**/api/newsletter/unsubscribe", (route) => {
    route.fulfill({});
  });

test.describe("Newsletter Page", () => {
  test.beforeEach(async ({ page }) => {
    await subscribeRoute(page);
    await unsubscribeRoute(page);
    await page.goto("/newsletter");
  });

  test("No existing records", async ({ page }) => {
    await page.locator("input[name='email']").fill("anyone@email.invalid");
    await page.locator("button[type='submit']").click();

    await expect(page.locator(".container p")).toHaveText(
      "You are not subscribed yet, you can update your preferences at any time from this page"
    );
    await page.locator("button:has-text('Subscribe')").click();

    await expect(page.locator(".container p")).toHaveText(
      "A verification email has been sent to anyone@email.invalid, please check your inbox"
    );
    await expect(page.locator(".container button")).toHaveText(
      "Resend verification email",
      { timeout: 12000 }
    );
    await expect(
      page.locator(
        "div:has-text('A verification email has been sent to your inbox')"
      )
    ).toBeTruthy();
  });

  test("Verify email sent", async ({ page }) => {
    await page.locator("input[name='email']").fill("unverified@email.invalid");
    await page.locator("button[type='submit']").click();

    await expect(page.locator(".container p")).toHaveText(
      "Your email still needs verifying please check your inbox"
    );
    await page.locator("button:has-text('Resend verification email')").click();

    await expect(
      page.locator(
        "div:has-text('A verification email has been sent to your inbox')"
      )
    ).toBeTruthy();
  });

  test("activate subscription", async ({ page }) => {
    await page.locator("input[name='email']").fill("verified@email.invalid");
    await page.locator("button[type='submit']").click();

    await expect(page.locator(".container p")).toHaveText(
      "You can update your preferences at any time from this page"
    );
    await page.locator("button:has-text('Unsubscribe')").click();

    await expect(page.locator(".container p")).toHaveText(
      "You are not subscribed yet, you can update your preferences at any time from this page"
    );
  });
});
