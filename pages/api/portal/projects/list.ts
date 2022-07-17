import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../prisma/db'
import { withSentry } from '@sentry/nextjs';
import { BlogEntry } from '@prisma/client';
import { checkUserPermission } from '../../../../utils/api';

export type ProjectAdminDetails = Pick<BlogEntry, "id" | "date" | "draft" | "title">

export interface AdminProjectsListData {
  projects: ProjectAdminDetails[],
}

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AdminProjectsListData>
) {
  await checkUserPermission(req, res, (user) => (user.isAdmin))

  const projects = await prisma.blogEntry.findMany({
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
      date: 'desc'
    }
  })
  res.status(200).json({ projects })
}

export default withSentry(handler);
