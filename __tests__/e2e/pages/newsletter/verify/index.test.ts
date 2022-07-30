import { test, expect } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../../../../../prisma/db";

test.describe("VerifyNewsletter", () => {
  test("verify verified", async ({ page }) => {
    const email = `${uuidv4()}@email.invalid`;
    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email,
        emailVerified: true,
      },
    });

    await page.goto(`/newsletter/verify/${subscriber?.id}`);
    await page.goto("/");
    await page.goto(`/newsletter/verify/${subscriber?.id}`);

    await expect(page.locator(".container p.badge-success")).toHaveText(
      "Email successfully verified"
    );
    await page.locator("a:has-text('Update preferences')").click();
    await expect(page).toHaveURL("/newsletter");
  });
});

test.describe("VerifyNewsletter", () => {
  test("verify un-verified", async ({ page }) => {
    const email = `${uuidv4()}@email.invalid`;
    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email,
        emailVerified: false,
      },
    });

    await page.goto(`/newsletter/verify/${subscriber?.id}`);

    await expect(page.locator(".container p.badge-success")).toHaveText(
      "Email successfully verified"
    );
    await page.locator("a:has-text('Update preferences')").click();
    await expect(page).toHaveURL("/newsletter");
  });
});

test.describe("VerifyNewsletter bad request", () => {
  test("verify bad request", async ({ page }) => {
    await page.goto("/newsletter/verify/abc123");
    await expect(page.locator(".container p.badge-error")).toHaveText(
      "Email was unable to be verified"
    );
  });
});
