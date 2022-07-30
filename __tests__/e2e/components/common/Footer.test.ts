import { test, expect } from "@playwright/test";

test.describe("Footer Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Has an info section", async ({ page }) => {
    const navFooter = await page.locator(":nth-match(footer, 1)");
    await expect(navFooter.locator("div:has(.footer-title)")).toHaveCount(4);

    const infoSection = await navFooter.locator(":nth-match(div, 1)");
    await expect(infoSection.locator(".footer-title")).toHaveText("Info");
    await expect(infoSection.locator("a")).toHaveCount(3);
    await expect(infoSection.locator("a:has-text('About Me')")).toHaveAttribute(
      "href",
      "/"
    );
    await expect(infoSection.locator("a:has-text('CV')")).toHaveAttribute(
      "href",
      "/cv"
    );
    await expect(infoSection.locator("a:has-text('Projects')")).toHaveAttribute(
      "href",
      "/projects"
    );
  });

  test("Has a projects section", async ({ page }) => {
    const navFooter = await page.locator(":nth-match(footer, 1)");

    const projectsSection = await navFooter.locator(":nth-match(div, 2)");
    await expect(projectsSection.locator(".footer-title")).toHaveText(
      "Projects"
    );
    await expect(projectsSection.locator("a")).toHaveCount(1);
    await expect(
      projectsSection.locator("a:has-text('All Projects')")
    ).toHaveAttribute("href", "/projects");
  });

  test("Has a portal section", async ({ page }) => {
    const navFooter = await page.locator(":nth-match(footer, 1)");

    const portalSection = await navFooter.locator(":nth-match(div, 3)");
    await expect(portalSection.locator(".footer-title")).toHaveText("Portal");
    await expect(portalSection.locator("a")).toHaveCount(2);
    await expect(portalSection.locator("a:has-text('Login')")).toHaveCount(1);
    await expect(portalSection.locator("a:has-text('Status')")).toHaveAttribute(
      "href",
      "https://stats.uptimerobot.com/V9mM0t28rR"
    );
  });

  test("Has a newsletter section", async ({ page }) => {
    const navFooter = await page.locator(":nth-match(footer, 1)");

    const portalSection = await navFooter.locator(":nth-match(div, 4)");
    await expect(portalSection.locator(".footer-title")).toHaveText(
      "Stay up to date"
    );
    await expect(portalSection.locator("a")).toHaveCount(1);
    await expect(
      portalSection.locator("a:has-text('Subscribe')")
    ).toHaveAttribute("href", "/newsletter");
  });
});

test.describe("Footer Bottom", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Contains name and year", async ({ page }) => {
    const footer = await page.locator(":nth-match(footer, 2)");
    await expect(footer.locator(":nth-match(p, 1)")).toContainText(
      `George Waller ${new Date().getFullYear()}`
    );
  });

  test("Contains social links", async ({ page }) => {
    const bottomFooter = await page.locator(":nth-match(footer, 2)");
    await expect(bottomFooter.locator(":nth-match(a, 1)")).toHaveAttribute(
      "href",
      "https://github.com/George9Waller"
    );
    await expect(bottomFooter.locator(":nth-match(a, 2)")).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/georgewaller/"
    );
  });
});

test.describe("Footer auth", () => {
  test("footer links when logged in", async ({ page }) => {
    await page.goto("/api/auth/signin");
    await page.locator("input[type=password]").fill("user");
    await page
      .locator("button:has-text('Sign in with Email & Password')")
      .click();
    await page.goto("/");

    const navFooter = await page.locator(":nth-match(footer, 1)");

    const portalSection = await navFooter.locator(":nth-match(div, 3)");
    await expect(portalSection.locator(".footer-title")).toHaveText("Portal");
    await expect(portalSection.locator("a")).toHaveCount(3);
    await expect(
      portalSection.locator("a:has-text('Enter Portal')")
    ).toHaveAttribute("href", "/portal");
    await expect(portalSection.locator("a:has-text('Logout')")).toHaveAttribute(
      "href",
      "/api/auth/signout"
    );
    await expect(portalSection.locator("a:has-text('Status')")).toHaveAttribute(
      "href",
      "https://stats.uptimerobot.com/V9mM0t28rR"
    );
  });
});
