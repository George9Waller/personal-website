import type { NextApiRequest, NextApiResponse } from 'next'
import { BlogEntryWithImages } from '../../../types/db'
import { prisma } from '../../../prisma/db'

export interface ProjectsListData {
  projects: BlogEntryWithImages[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProjectsListData>
) {
  const {
    query: { take, skip }
  } = req;

  const projects = await prisma.blogEntry.findMany({
    take: parseInt(take.toString()),
    skip: parseInt(skip.toString()),
    where: {
      draft: false
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
  })
  res.status(200).json({ projects })
}
