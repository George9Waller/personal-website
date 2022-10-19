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

test.only("should render the 6 most popular images", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".container .gallery-photo")).toHaveCount(6);

  const firstImage = await page.locator(":nth-match(.gallery-photo, 1)");
  await expect(firstImage.locator("p")).toHaveText("Image d");

  const secondImage = await page.locator(":nth-match(.gallery-photo, 2)");
  await expect(secondImage.locator("p")).toHaveText("Image a");

  const thirdImage = await page.locator(":nth-match(.gallery-photo, 3)");
  await expect(thirdImage.locator("p")).toHaveText("Image B 1");

  const fourthImage = await page.locator(":nth-match(.gallery-photo, 4)");
  await expect(fourthImage.locator("p")).toHaveText("Image c");

  const fifthImage = await page.locator(":nth-match(.gallery-photo, 5)");
  await expect(fifthImage.locator("p")).toHaveText("Image b");

  const sixthImage = await page.locator(":nth-match(.gallery-photo, 6)");
  await expect(sixthImage.locator("p")).toHaveText("Image g");
});
