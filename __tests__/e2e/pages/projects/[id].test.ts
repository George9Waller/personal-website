import { test, expect } from "@playwright/test";
import { prisma } from "../../../../prisma/db";
import { constructTranslations } from "../../../../utils/common";

test.describe("ProjectDetail", () => {
  test.beforeEach(async ({ page }) => {
    const project = await prisma.blogEntry.findFirst({
      where: {
        title: {
          equals: constructTranslations("A"),
        },
      },
    });
    await page.goto(`/projects/${project?.id}`);
  });

  test("page metadata", async ({ page }) => {
    await expect(page.locator("title")).toHaveCount(1);
    await expect(page.locator("meta[name='description']")).toBeTruthy();
    await expect(
      page.locator("script[type='application/ld+json']")
    ).toBeTruthy();
  });

  test("Should render project content", async ({ page }) => {
    await expect(page.locator("figure img")).toHaveAttribute(
      "alt",
      "A kitten 2"
    );
    await expect(page.locator(".card-title h1")).toHaveText("A");
    await expect(page.locator(".card-title span")).toHaveText("Jul 2022");
    await expect(page.locator(".card-title div.badge")).toHaveText("Fine-art");

    await expect(page.locator(".rendered-markdown h1")).toHaveText("Hello");
    await expect(
      page.locator(":nth-match(.rendered-markdown p, 1)")
    ).toHaveText("This is an example blog post");
    await expect(page.locator(".rendered-markdown h2")).toHaveText(
      "With multiple levels of headings"
    );
    await expect(page.locator(".rendered-markdown h3")).toHaveText(
      "Even smaller ones"
    );
    await expect(
      page.locator(":nth-match(.rendered-markdown p, 2)")
    ).toHaveText("Maybe you want to link to another site.");
    await expect(page.locator(".rendered-markdown a")).toHaveAttribute(
      "href",
      "https://www.google.com"
    );
    await expect(page.locator(".rendered-markdown blockquote p")).toHaveText(
      "Block quotes are allowed too"
    );
    await expect(
      page.locator(":nth-match(.rendered-markdown ul, 1) li")
    ).toContainText("As well as dash");
    await expect(
      page.locator(":nth-match(.rendered-markdown ul, 2) li")
    ).toContainText("and bullet point lists");
    await expect(page.locator(".rendered-markdown pre code")).toContainText(`
      def do_something():
        print('Function just does nothing')
    `);
    await expect(page.locator(".gallery-photo")).toHaveCount(4);
    const firstImage = await page.locator(":nth-match(.gallery-photo, 1)");
    await expect(firstImage.locator("p")).toHaveText("Image a");
    await expect(firstImage.locator("img[alt='A kitten 1']")).toHaveCount(1);

    await expect(page.locator(".prints-banner")).toHaveCount(1);
    await page.click(".prints-banner");
    await expect(page).toHaveURL("/prints");
  });

  test("Should be able to navigate image previews", async ({ page }) => {
    await page
      .locator(':nth-match(.gallery-photo, 1) img[alt="A kitten 1"]')
      .click();
    await expect(page.locator("p.text-neutral").first()).toHaveText("Image a");

    // Click right
    await page.locator("button:has(svg[data-icon='angle-right'])").click();
    await expect(page.locator("p.text-neutral").first()).toHaveText("Image b");

    // Click right
    await page.press(".MuiModal-root", "ArrowRight");
    await expect(page.locator("p.text-neutral").first()).toHaveText("Image c");

    // Click left
    await page.locator("button:has(svg.fa-angle-left)").click();
    await expect(page.locator("p.text-neutral").first()).toHaveText("Image b");

    // Click left
    await page.press(".MuiModal-root", "ArrowLeft");
    await expect(page.locator("p.text-neutral").first()).toHaveText("Image a");

    // Click close
    await page.locator("button:has(svg.fa-xmark)").first().click();

    await page.locator(":nth-match(.gallery-photo, 1) svg").click();
    await expect(page.locator("p.text-neutral").first()).toHaveText("Image a");

    await page.press(".MuiModal-root", "Escape");
    await expect(page.locator(".card-title")).toHaveCount(1);
  });

  test("Should not show prints information on non-fine-art", async ({
    page,
  }) => {
    const codingProject = await prisma.blogEntry.findFirst({
      where: {
        title: {
          equals: constructTranslations("G"),
        },
      },
    });
    await page.goto(`/projects/${codingProject?.id}`);
    await expect(page.locator(".prints-banner")).toHaveCount(0);
  });
});
