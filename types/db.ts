import { Prisma } from "@prisma/client";

export type BlogEntryWithImages = Prisma.BlogEntryGetPayload<{
  include: { images: true };
}>;

export type AssetWithDetail = Prisma.AssetGetPayload<{
  include: {
    password: true;
    card: true;
    contact: true;
    note: true;
    document: true;
    link: true;
  };
}>;

export interface LanguageOptionsJson {
  "en-GB": string;
  fr: string;
}
