import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/db";
import { withSentry } from "@sentry/nextjs";
import { BlogEntry } from "@prisma/client";
import { checkUserPermission } from "../../../../utils/api";

export type ProjectAdminDetails = Pick<
  BlogEntry,
  "id" | "date" | "draft" | "title"
>;

export interface AdminProjectsListData {
  projects: ProjectAdminDetails[];
  totalCount: number;
}

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AdminProjectsListData>
) {
  await checkUserPermission(req, res, (user) => user.isAdmin);

  const {
    query: { take, skip },
  } = req;

  const [projects, totalCount] = await prisma.$transaction([
    prisma.blogEntry.findMany({
      take: take ? parseInt(take.toString()) : undefined,
      skip: skip ? parseInt(skip.toString()) : undefined,
      where: {
        archieved: false,
      },
      select: {
        id: true,
        date: true,
        draft: true,
        title: true,
      },
      orderBy: {
        date: "desc",
      },
    }),
    prisma.blogEntry.count({
      where: {
        archieved: false,
      },
    }),
  ]);
  res.status(200).json({ projects, totalCount });
}

export default withSentry(handler);
