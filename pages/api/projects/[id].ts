import type { NextApiRequest, NextApiResponse } from "next";
import { BlogEntryWithImages } from "../../../types/db";
import { prisma } from "../../../prisma/db";
import { withSentry } from "@sentry/nextjs";

export interface ProjectDetailData {
  project: BlogEntryWithImages;
}

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProjectDetailData>
) {
  const {
    query: { id },
  } = req;

  const project = await prisma.blogEntry.findUnique({
    where: {
      id: parseInt(id.toString()),
    },
    include: {
      images: true,
    },
  });
  project && (!project.draft || !project.archieved)
    ? res.status(200).json({ project })
    : res.status(400);
}

export default withSentry(handler);
