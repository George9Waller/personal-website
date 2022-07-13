import type { NextApiRequest, NextApiResponse } from 'next'
import { BlogEntryWithImages } from '../../../types/db'
import { prisma } from '../../../prisma/db'
import { withSentry } from '@sentry/nextjs';

export interface ProjectsListData {
  projects: BlogEntryWithImages[],
  totalCount: number;
}

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProjectsListData>
) {
  const {
    query: { take, skip, categories }
  } = req;

  const [projects, totalCount] = await prisma.$transaction([
    prisma.blogEntry.findMany({
      take: take ? parseInt(take.toString()) : undefined,
      skip: skip ? parseInt(skip.toString()) : undefined,
      where: {
        draft: false,
        category: categories ? { hasSome: categories } : undefined
      },
      orderBy: {
        date: 'desc'
      },
      include: {
        images: {
          where: {
            isCover: true
          }
        }
      }
    }),
    prisma.blogEntry.count({
      where: {
        draft: false,
        category: categories ? { hasSome: categories } : undefined
      }
    })
  ])
  res.status(200).json({ projects, totalCount })
}

export default withSentry(handler);
