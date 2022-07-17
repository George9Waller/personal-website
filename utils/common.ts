import { Prisma } from "@prisma/client";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import _ from "underscore";

export const selectTranslation = (translations: Prisma.JsonValue, langCode?: string) => {
  const translationsObj = translations as Prisma.JsonObject;
  return translationsObj[langCode || "en-GB"]?.toString() || "";
};

export const maybeSelectTranslation = (translations?: Prisma.JsonValue, langCode?: string) => {
  if (translations) {
    return selectTranslation(translations, langCode);
  } else {
    return '';
  }
}

export const constructTranslations = (en?: string, fr?: string) => {
  return {
    'en-GB': en || '',
    fr: fr || '',
  }
}

export const fetcher = (url: string) => axios.get(url).then(res => res.data)
