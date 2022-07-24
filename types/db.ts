import { Prisma } from "@prisma/client";

export type BlogEntryWithImages = Prisma.BlogEntryGetPayload<{
  include: { images: true };
}>;

export interface LanguageOptionsJson {
  "en-GB": string;
  fr: string;
}
