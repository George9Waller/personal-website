import { BlogImage } from "@prisma/client";
import classNames from "classnames";
import { selectTranslation } from "./common";

export enum ProjectCategories {
  PHOTOGRAPHY = "Photography",
  FINE_ART = "Fine-art",
  CODING = "Coding",
}

export const getCategoryClasses = (category: string, hover?: boolean) => {
  switch (category) {
    case ProjectCategories.PHOTOGRAPHY:
      return classNames(
        "bg-pink-200 border-pink-200 text-black",
        hover && "hover:bg-pink-100 hover:border-pink-100"
      );
    case ProjectCategories.FINE_ART:
      return classNames(
        "bg-lime-400 border-lime-400 text-black",
        hover && "hover:bg-lime-200 hover:border-lime-200"
      );
    case ProjectCategories.CODING:
      return classNames(
        "bg-blue-700 border-blue-700",
        hover && "hover:bg-blue-500 hover:border-blue-500"
      );
    default:
      return classNames(
        "bg-slate-500 border-slate-500",
        hover && "hover:bg-slate-300 hover:border-slate-300"
      );
  }
};

export const getProjectDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en", {
    // FIXME: translate
    month: "short",
    year: "numeric",
  });
};

export const getCategoryQueryParam = (categories: string[]) => {
  if (categories.length > 0) {
    return `categories=${categories.join("&categories=")}`;
  } else {
    return "categories=null";
  }
};

export const sortImagesByTitle = (images: BlogImage[]) =>
  images.sort((a, b) =>
    selectTranslation(a.title) > selectTranslation(b.title) ? 1 : -1
  );
