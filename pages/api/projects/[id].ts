import type { NextApiRequest, NextApiResponse } from 'next'
import { BlogEntryWithImages } from '../../../types/db'
import { prisma } from '../../../prisma/db'

export interface ProjectDetailData {
  project: BlogEntryWithImages
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProjectDetailData>
) {
  const {
    query: { id }
  } = req;

  const project = await prisma.blogEntry.findUnique({
    where: {
      id: parseInt(id.toString())
    },
    include: {
      images: true
    }
  })
  project ? res.status(200).json({ project }) : res.status(400)
}
