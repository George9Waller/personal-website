import { Prisma } from "@prisma/client";

export const PAGINATION_COUNT = 6;
export const IMAGE_PAGINATION_COUNT = 30;
export const RECENT_ITEMS_COUNT = 3;
export const LINKEDIN_URL = "https://www.linkedin.com/in/georgewaller/";
export const GITHUB_URL = "https://github.com/George9Waller";

export interface BlogImageOrdering {
  DATE_DESC: Prisma.BlogImageOrderByWithRelationInput;
  DATE_ASC: Prisma.BlogImageOrderByWithRelationInput;
  VIEWS_DESC: Prisma.BlogImageOrderByWithRelationInput;
}

export const BLOG_IMAGE_ORDERING: BlogImageOrdering = {
  DATE_DESC: { blogEntry: { date: "desc" } },
  DATE_ASC: { blogEntry: { date: "asc" } },
  VIEWS_DESC: { views: "desc" },
};
