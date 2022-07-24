import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { User } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import { createRouter } from "next-connect";
import { DEFAULT_ROUTER_HANDLER_OPTIONS } from "../../../utils/constants";

export interface MeData {
  isAdmin: boolean;
}

export interface ErrorData {
  error: string;
}

const router = createRouter<
  NextApiRequest,
  NextApiResponse<Partial<User> | ErrorData>
>();
router.get(async (req, res) => {
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
      throw new Error("An error occurred fetching user details");
    });
});

export default withSentry(router.handler(DEFAULT_ROUTER_HANDLER_OPTIONS));
