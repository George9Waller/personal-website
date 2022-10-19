import { test, expect } from "@playwright/test";
import { prisma } from "../../../../prisma/db";
import { constructTranslations } from "../../../../utils/common";

test("should render a card with an image", async ({ page }) => {
  await page.goto("/");
  const firstCard = await page.locator(
    ":nth-match(.container .project-card, 1)"
  );
  await expect(firstCard.locator(".card-title")).toContainText("A");
  await expect(firstCard.locator("h3 div")).toHaveCount(1);
  await expect(firstCard.locator("h3 span")).toContainText("Jul 2022");
  await expect(firstCard.locator("h3 div")).toContainText("Fine-art");
  await expect(firstCard.locator("p")).toContainText("A short");
  const img = await firstCard.locator("figure img >> nth=1");
  await expect(img).toHaveAttribute("alt", "A kitten 2");
});

test("should render a card with multiple category tags", async ({ page }) => {
  await page.goto("/");
  const secondCard = await page.locator(
    ":nth-match(.container .project-card, 2)"
  );
  await expect(secondCard.locator(".card-title")).toContainText("B");
  await expect(secondCard.locator("figure")).toHaveCount(1);
  await expect(secondCard.locator("h3 div")).toHaveCount(2);
  await expect(secondCard.locator("h3 span")).toContainText("Jun 2022");
  await expect(secondCard.locator(":nth-match(h3 div, 1)")).toContainText(
    "Photography"
  );
  await expect(secondCard.locator(":nth-match(h3 div, 2)")).toContainText(
    "Fine-art"
  );
  await expect(secondCard.locator("p")).toContainText("B short");
});

test("should render a card with no tags and go to the detail page", async ({
  page,
}) => {
  const project = await prisma.blogEntry.findFirst({
    where: {
      title: {
        equals: constructTranslations("E"),
      },
    },
  });
  await page.goto("/");

  const thirdCard = await page.locator(
    ":nth-match(.container .project-card, 3)"
  );
  await expect(thirdCard.locator(".card-title")).toContainText("E");
  await expect(thirdCard.locator("figure")).toHaveCount(0);
  await expect(thirdCard.locator("h3 div")).toHaveCount(0);
  await expect(thirdCard.locator("h3 span")).toContainText("May 2022");
  await expect(thirdCard.locator("p")).toContainText("E short");

  await thirdCard.locator("a.btn").click();
  await expect(page).toHaveURL(`/projects/${project?.id}`);
});
