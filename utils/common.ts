import { ThemeOptions } from "@mui/material";
import { Prisma } from "@prisma/client";
import axios from "axios";
import _ from "underscore";
import { PAGINATION_COUNT } from "./constants";

export const selectTranslation = (
  translations: Prisma.JsonValue,
  langCode?: string
) => {
  const translationsObj = translations as Prisma.JsonObject;
  return translationsObj[langCode || "en-GB"]?.toString() || "";
};

export const maybeSelectTranslation = (
  translations?: Prisma.JsonValue,
  langCode?: string
) => {
  if (translations) {
    return selectTranslation(translations, langCode);
  } else {
    return "";
  }
};

// Remember to reflect any updates in ./prisma/seed.mjs
export const constructTranslations = (en?: string, fr?: string) => {
  return {
    "en-GB": en || "",
    fr: fr || "",
  };
};

export const getPaginationUrl = (
  base: string,
  pageNumber?: number,
  zeroIndexed?: boolean,
  paginationCount: number = PAGINATION_COUNT
) => {
  const firstPage = zeroIndexed ? 0 : 1;
  return `${base}?take=${paginationCount}${
    pageNumber && pageNumber > firstPage
      ? `&skip=${(pageNumber - firstPage) * paginationCount}`
      : ""
  }`;
};

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const arrayToHex = (rgb: number[]) => {
  const hexArray = rgb.map((num) => num.toString(16));
  const hex = hexArray.join("");
  return `#${hex}`;
};

export const getMuiThemeOptions = (theme: string | undefined) => {
  // If editing themes returned here make sure they match the themes in daisyUi / tailwind in ./tailwind.config.js
  switch (theme) {
    case "light":
      return {
        palette: {
          mode: "light",
          primary: {
            main: "#570DF8",
          },
          secondary: {
            main: "#F000B8",
          },
        },
      } as ThemeOptions;
    case "cmyk":
      return {
        palette: {
          mode: "light",
          primary: {
            main: "#44ADEE",
          },
          secondary: {
            main: "#E9498C",
          },
        },
      } as ThemeOptions;
    case "lofi":
      return {
        palette: {
          mode: "light",
          primary: {
            main: "#0D0D0D",
          },
          secondary: {
            main: "#1A1919",
          },
        },
      } as ThemeOptions;
    case "dark":
      return {
        palette: {
          mode: "dark",
          primary: {
            main: "#6419E6",
          },
          secondary: {
            main: "#D926A9",
          },
        },
      } as ThemeOptions;
    case "high-contrast":
      return {
        palette: {
          mode: "light",
          primary: {
            main: "#1D498B",
          },
          secondary: {
            main: "#003947",
          },
        },
      } as ThemeOptions;
    default:
      return {
        palette: { mode: "light" },
      } as ThemeOptions;
  }
};
