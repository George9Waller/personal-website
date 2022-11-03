import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../prisma/db";
import { withSentry } from "@sentry/nextjs";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  await prisma.asset.update({
    where: { id: id?.toString() },
    data: { accessed: new Date() },
  });
  return res.status(200).send({});
}

export default withSentry(handler);
