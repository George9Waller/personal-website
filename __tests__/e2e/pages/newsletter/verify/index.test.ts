import { test, expect, Page } from "@playwright/test";
import { prisma } from "../../../../../prisma/db";

export const verifyRoute = (page: Page) =>
  page.route("**/api/newsletter/verify/*", (route) => {
    route.fulfill({});
  });

export const verifyRouteBadRequest = (page: Page) =>
  page.route("**/api/newsletter/verify/**", (route) => {
    route.fulfill({
      status: 400,
    });
  });

test.describe("VerifyNewsletter", () => {
  test.beforeEach(async ({ page }) => {
    await verifyRoute(page);
  });

  test("verify un-verified", async ({ page }) => {
    const unverifiedSubscription = await prisma.newsletterSubscriber.findFirst({
      where: { emailVerified: false },
    });
    await page.goto(`/newsletter/verify/${unverifiedSubscription?.id}`);

    await expect(page.locator(".container p.badge-success")).toHaveText(
      "Email successfully verified"
    );
    await page.locator("a:has-text('Update preferences')").click();
    await expect(page).toHaveURL("/newsletter");
  });

  test("verify verified", async ({ page }) => {
    const unverifiedSubscription = await prisma.newsletterSubscriber.findFirst({
      where: { emailVerified: true },
    });
    await page.goto(`/newsletter/verify/${unverifiedSubscription?.id}`);

    await expect(page.locator(".container p.badge-success")).toHaveText(
      "Email successfully verified"
    );
    await page.locator("a:has-text('Update preferences')").click();
    await expect(page).toHaveURL("/newsletter");
  });
});

test.describe("VerifyNewsletter bad request", () => {
  test.beforeEach(async ({ page }) => {
    await verifyRouteBadRequest(page);
  });

  test("verify bad request", async ({ page }) => {
    await page.goto("/newsletter/verify/abc123");
    await expect(page.locator(".container p.badge-error")).toHaveText(
      "Email was unable to be verified"
    );
  });
});
