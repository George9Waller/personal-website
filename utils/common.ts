import { Prisma } from "@prisma/client";

export const selectTranslation = (translations: Prisma.JsonValue) => {
  const translationsObj = translations as Prisma.JsonObject;
  return translationsObj['en-GB']?.toString();
}
