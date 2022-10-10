import { test, expect } from "@playwright/test";

test.describe("NavBar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const dropDownVisible = await page
      .locator(":nth-match(.dropdown label, 1)")
      .isVisible();
    if (dropDownVisible) {
      await page.locator(":nth-match(.dropdown label, 1)").click();
    }
  });

  test("should link to the home page on the name", async ({ page }) => {
    const nameHomeButton = await page.locator(
      ".navbar-start a:has-text('George Waller')"
    );
    await expect(nameHomeButton).toHaveAttribute("href", "/");
  });

  test("should link to the about page", async ({ page }) => {
    const aboutMeButton = await page.locator(
      ".navbar a:has-text('About Me'):visible"
    );
    await expect(aboutMeButton).toHaveAttribute("href", "/");
    await expect(aboutMeButton).toHaveClass(/btn-outline/);
  });

  test("should link to the cv page", async ({ page }) => {
    const cvButton = await page.locator(".navbar a:has-text('CV'):visible");
    await expect(cvButton).toHaveAttribute("href", "/cv");
    await expect(cvButton).not.toHaveClass(/btn-outline/);

    await cvButton.click();
    await expect(page).toHaveURL("/cv");
    await expect(cvButton).toHaveClass(/btn-outline/);
  });

  test("should link to the projects page", async ({ page }) => {
    const projectsButton = await page.locator(
      ".navbar a:has-text('Projects'):visible"
    );
    await expect(projectsButton).toHaveAttribute("href", "/projects");
    await expect(projectsButton).not.toHaveClass(/btn-outline/);

    await projectsButton.click();
    await expect(page).toHaveURL("/projects");
    await expect(projectsButton).toHaveClass(/btn-outline/);
  });

  test("should link to the contact page", async ({ page }) => {
    const contactButton = await page.locator(
      ".navbar-end a:has-text('Contact Me'):visible"
    );
    await expect(contactButton).toHaveAttribute("href", "/contact-me");

    await contactButton.click();
    await expect(page).toHaveURL("/contact-me");
  });

  test("should link to the prints page", async ({ page }) => {
    const contactButton = await page.locator(
      ".navbar-end a:has-text('Prints'):visible"
    );
    await expect(contactButton).toHaveAttribute("href", "/prints");

    await contactButton.click();
    await expect(page).toHaveURL("/prints");
  });
});
