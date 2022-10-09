import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../prisma/db";
import { withSentry } from "@sentry/nextjs";

export interface ViewsData {
  views: number;
}

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ViewsData>
) {
  const {
    query: { id },
  } = req;

  const image = await prisma.blogImage.update({
    where: {
      id: parseInt(id.toString()),
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });
  image ? res.status(200).json({ views: image.views }) : res.status(400);
}

export default withSentry(handler);
