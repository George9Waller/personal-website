import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { withSentry } from "@sentry/nextjs";

export interface MeData {
  isAdmin: boolean;
  secureInfoPasswordHash: string | null;
  secureInfoPasswordSalt: string | null;
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
          secureInfoPasswordHash: true,
          secureInfoPasswordSalt: true,
        },
      })
      .then((user) => {
        return user && res.json(user);
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
