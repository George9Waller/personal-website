import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { withSentry } from "@sentry/nextjs";
import { BlogImage } from "@prisma/client";
import { ProjectCategories } from "../../../utils/projects";
import {
  BlogImageOrdering,
  BLOG_IMAGE_ORDERING,
} from "../../../utils/constants";

export interface GalleryListData {
  images: BlogImage[];
  totalCount: number;
}

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GalleryListData>
) {
  const {
    query: { take, skip, order_by },
  } = req;

  const ordering =
    typeof order_by === "string" &&
    Object.keys(BLOG_IMAGE_ORDERING).indexOf(order_by) !== -1
      ? BLOG_IMAGE_ORDERING[order_by as keyof BlogImageOrdering]
      : BLOG_IMAGE_ORDERING.VIEWS_DESC;

  const [images, totalCount] = await prisma.$transaction([
    prisma.blogImage.findMany({
      take: take ? parseInt(take.toString()) : undefined,
      skip: skip ? parseInt(skip.toString()) : undefined,
      where: {
        blogEntry: {
          draft: false,
          archieved: false,
          category: { hasSome: ProjectCategories.FINE_ART },
        },
      },
      orderBy: [
        ordering,
        {
          id: "desc",
        },
      ],
    }),
    prisma.blogImage.count({
      where: {
        blogEntry: {
          draft: false,
          archieved: false,
          category: { hasSome: ProjectCategories.FINE_ART },
        },
      },
    }),
  ]);
  res.status(200).json({ images, totalCount });
}

export default withSentry(handler);
