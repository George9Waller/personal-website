import { test, expect, Page } from "@playwright/test";

export const contactRoute = (page: Page) =>
  page.route("**/contact", (route) => {
    route.fulfill({});
  });

test.describe("ContactMe", () => {
  test.beforeEach(async ({ page }) => {
    await contactRoute(page);
    await page.goto("/contact-me");
  });

  test("has links", async ({ page }) => {
    await expect(page.locator("a:has-text('+44 7894 846744')")).toHaveAttribute(
      "href",
      "tel:+447894846744"
    );
    await expect(
      page.locator("a:has-text('george@georgewaller.com')")
    ).toHaveAttribute(
      "href",
      "mailto:george@georgewaller.com,george.waller3@gmail.com"
    );
  });

  test("form submits", async ({ page }) => {
    await page.locator("input[name='name']").fill("George Waller");
    await page.locator("input[name='email']").fill("george@georgewaller.com");
    await page.locator("input[name='subject']").fill("Inquiry");
    await page
      .locator("textarea[name='message']")
      .fill("Some information about an important proposition");

    await page.locator("button[type='submit']").click();
    await expect(
      page.locator("div:has-text('Your message has been successfully sent')")
    ).toBeTruthy();
  });
});
