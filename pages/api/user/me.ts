import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { withSentry } from "@sentry/nextjs";

export interface MeData {
  isAdmin: boolean;
}

export interface ErrorData {
  error: string;
}

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<MeData> | ErrorData>
) {
  if (req.method === "GET") {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(400).json({ error: "You must be logged in" });
    }
    await prisma.user
      .findUnique({
        where: {
          id: session.user?.id,
        },
        select: {
          isAdmin: true,
        },
      })
      .then((user) => {
        return res.json({ isAdmin: user?.isAdmin });
      })
      .catch(() => {
        return res
          .status(400)
          .send({ error: "An error occurred fetching user details" });
      });
  } else {
    return res.status(400).send({ error: "Method not allowed" });
  }
}

export default withSentry(handler);
