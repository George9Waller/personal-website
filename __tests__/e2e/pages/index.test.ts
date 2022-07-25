import { test, expect } from "@playwright/test";

test("page metadata", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("title")).toHaveCount(1);
  await expect(page.locator("meta[name='description']")).toHaveCount(1);
});

test("should load page content", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("George Waller");
});

test("text should have a link to projects page", async ({ page }) => {
  await page.goto("/");
  await page.click(".container a:has-text('projects')");
  await expect(page).toHaveURL("/projects");
});

test("text should have a link to cv page", async ({ page }) => {
  await page.goto("/");
  await page.click(".container a:has-text('my CV')");
  await expect(page).toHaveURL("/cv");
});

test("text should have a link to contact page", async ({ page }) => {
  await page.goto("/");
  await page.click(".container a:has-text('contact me')");
  await expect(page).toHaveURL("/contact-me");
});

test("text should have a link to email me", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.locator(".container a:has-text('george@georgewaller.com')")
  ).toHaveAttribute("href", "mailto:george@georgewaller.com");
});

test("should render the 3 most recent projects", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h2.text-2xl")).toContainText("Recent Projects");
  await expect(page.locator(".container .project-card")).toHaveCount(3);
});
