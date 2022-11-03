import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { withSentry } from "@sentry/nextjs";
import { getUserDetails } from "../../../utils/api";

export interface SetSecurePasswordData {
  hash: string;
  salt: string;
}

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await getUserDetails(req, res);

  if (user) {
    if (user.secureInfoPasswordHash || user.secureInfoPasswordSalt) {
      return res.status(400).send({});
    } else {
      const body = req.body as SetSecurePasswordData;
      await prisma.user.update({
        where: { id: user.id },
        data: {
          secureInfoPasswordHash: body.hash,
          secureInfoPasswordSalt: body.salt,
        },
      });
      return res.status(200).send({});
    }
  } else {
    return res.status(403).send({});
  }
}

export default withSentry(handler);
