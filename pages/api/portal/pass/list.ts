import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/db";
import { withSentry } from "@sentry/nextjs";
import { checkUserPermission, getUserDetails } from "../../../../utils/api";
import { AssetWithDetail } from "../../../../types/db";

export interface PasswordListData {
  assets: AssetWithDetail[];
  totalCount: number;
}

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PasswordListData | Record<string, never>>
) {
  await checkUserPermission(req, res, (user) => user.isAdmin);

  const {
    query: { take, skip, search, tag },
  } = req;

  const user = await getUserDetails(req, res);
  if (!user) {
    return res.status(403).send({});
  }

  const [assets, totalCount] = await prisma.$transaction([
    prisma.asset.findMany({
      take: take ? parseInt(take.toString()) : undefined,
      skip: skip ? parseInt(skip.toString()) : undefined,
      where: {
        userId: user.id,
        name: {
          contains: search ? search?.toString() : undefined,
          mode: "insensitive",
        },
        tags: tag ? { hasSome: tag } : undefined,
      },
      include: {
        password: true,
        card: true,
        contact: true,
        note: true,
        document: true,
        link: true,
      },
      orderBy: [{ accessed: "desc" }, { updated: "desc" }],
    }),
    prisma.asset.count({
      where: {
        userId: user.id,
        name: {
          contains: search ? search?.toString() : undefined,
          mode: "insensitive",
        },
        tags: tag ? { hasSome: tag } : undefined,
      },
    }),
  ]);
  res.status(200).json({ assets, totalCount });
}

export default withSentry(handler);
