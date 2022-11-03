import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../prisma/db";
import { withSentry } from "@sentry/nextjs";
import { getUserDetails } from "../../../../../utils/api";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  const user = await getUserDetails(req, res);
  const asset = await prisma.asset.findUnique({
    where: { id: id?.toString() },
  });
  if (user && asset && asset.userId === user.id) {
    user && (await prisma.asset.delete({ where: { id: asset.id } }));
    return res.status(200).send({});
  } else {
    return res.status(403).send({});
  }
}

export default withSentry(handler);
