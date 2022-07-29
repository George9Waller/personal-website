import { test, expect } from "@playwright/test";

test.describe("CV", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/cv");
  });

  test("should have cv content", async ({ page }) => {
    await expect(page.locator(".cv-content h1").first()).toHaveText(
      "George Waller"
    );
    await expect(page.locator(".cv-content h2").first()).toHaveText(
      "Web Developer"
    );

    await expect(page.locator(".cv-content div.cv-section")).toHaveCount(3);
    await expect(
      page.locator(":nth-match(.cv-content div.cv-section, 1) >> h2")
    ).toHaveText("About");

    const experienceSection = await page.locator(
      ":nth-match(.cv-content div.cv-section, 2)"
    );
    await expect(experienceSection.locator(":nth-match(h2, 1)")).toHaveText(
      "Experience"
    );
    await expect(experienceSection.locator(":nth-match(h2, 2)")).toHaveText(
      "Dabapps"
    );
    await expect(experienceSection.locator(":nth-match(h2, 3)")).toHaveText(
      "EngineerJul 2022 - present"
    );
    await expect(experienceSection.locator(":nth-match(h2, 4)")).toHaveText(
      "Associate EngineerJul 2021 - Jul 2022"
    );
    await expect(experienceSection.locator(":nth-match(h2, 5)")).toHaveText(
      "Food Delivery Rider"
    );
    await expect(experienceSection.locator("a")).toHaveAttribute(
      "href",
      "https://dabapps.com"
    );

    const educationSection = await page.locator(
      ":nth-match(.cv-content div.cv-section, 3)"
    );
    await expect(educationSection.locator(":nth-match(h2, 1)")).toHaveText(
      "Education"
    );
    await expect(educationSection.locator(":nth-match(h2, 2)")).toHaveText(
      "University of Chichester | Software Engineering"
    );
    await expect(educationSection.locator(":nth-match(h2, 3)")).toHaveText(
      "Brighton College"
    );
    await expect(educationSection.locator(":nth-match(h2, 4)")).toHaveText(
      "A LevelsSep 2019 - Jun 2021"
    );
    await expect(educationSection.locator(":nth-match(h2, 5)")).toHaveText(
      "GCSEsSep 2016 - Jun 2019"
    );
    await expect(educationSection.locator(":nth-match(a, 1)")).toHaveAttribute(
      "href",
      "https://www.chi.ac.uk/degree-apprenticeships/course/digital-and-technology-solutions-professional-software-engineer-degree-apprenticeship/"
    );
    await expect(educationSection.locator(":nth-match(a, 2)")).toHaveAttribute(
      "href",
      "https://www.brightoncollege.org.uk/"
    );
  });

  test("should have contact links and skills", async ({ page }) => {
    await expect(page.locator(".cv-sidebar div.sidebar-section")).toHaveCount(
      3
    );
    await expect(
      page.locator(
        ":nth-match(.cv-sidebar div.sidebar-section, 1) img[alt='Headshot of George Waller']"
      )
    ).toHaveCount(1);

    const contactLinks = await page.locator(
      ":nth-match(.cv-sidebar div.sidebar-section, 2)"
    );
    await expect(contactLinks.locator("div")).toHaveCount(7);
    await expect(contactLinks.locator(":nth-match(div, 1)")).toHaveText(
      "Brighton, UK"
    );
    await expect(contactLinks.locator(":nth-match(div, 2)")).toHaveText(
      "+44 7894 846744"
    );
    await expect(contactLinks.locator(":nth-match(div, 2) a")).toHaveAttribute(
      "href",
      "tel:+447894846744"
    );
    await expect(contactLinks.locator(":nth-match(div, 3)")).toHaveText(
      "george@georgewaller.com"
    );
    await expect(contactLinks.locator(":nth-match(div, 3) a")).toHaveAttribute(
      "href",
      "mailto:george@georgewaller.com,george.waller3@gmail.com"
    );
    await expect(contactLinks.locator(":nth-match(div, 4)")).toHaveText(
      "George9Waller"
    );
    await expect(contactLinks.locator(":nth-match(div, 4) a")).toHaveAttribute(
      "href",
      "https://github.com/George9Waller"
    );
    await expect(contactLinks.locator(":nth-match(div, 5)")).toHaveText(
      "George Waller"
    );
    await expect(contactLinks.locator(":nth-match(div, 5) a")).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/georgewaller/"
    );

    await expect(
      page.locator(":nth-match(.cv-sidebar div.sidebar-section, 3) h2")
    ).toHaveText("Skills");
  });

  test("should have recent projects", async ({ page }) => {
    const recentSection = await page.locator(".recent-projects");
    await expect(recentSection.locator(":nth-match(h2, 1)")).toHaveText(
      "Recent coding projects"
    );
    await expect(recentSection.locator(".project-card")).toHaveCount(3);
    await expect(
      recentSection.locator(":nth-match(.project-card, 1) .card-title")
    ).toHaveText("G");
    await expect(
      recentSection.locator(":nth-match(.project-card, 2) .card-title")
    ).toHaveText("H");
    await expect(
      recentSection.locator(":nth-match(.project-card, 3) .card-title")
    ).toHaveText("J");
  });
});
