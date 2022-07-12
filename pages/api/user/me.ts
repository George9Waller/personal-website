import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../prisma/db'
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { User } from '@prisma/client';

export interface MeData {
  isAdmin: Boolean;
}

export interface ErrorData {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<User> | ErrorData>
) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user?.id
    },
    select: {
      isAdmin: true
    }
  })
  res.status(200).json({ isAdmin: user?.isAdmin })
}
