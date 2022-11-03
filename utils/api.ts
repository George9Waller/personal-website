import { unstable_getServerSession } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { prisma } from "../prisma/db";
import { User } from "@prisma/client";

export const getUser = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const checkUserPermission = async (
  req: NextApiRequest,
  res: NextApiResponse,
  validatorFunc: (user: User) => boolean
) => {
  await unstable_getServerSession(req, res, authOptions).then((session) => {
    if (session?.user) {
      getUser(session.user.id).then((user) => {
        if (!user || (user && !validatorFunc(user))) {
          return res.status(404).send({});
        }
      });
    } else {
      return res.status(404).send({});
    }
  });
};

export const getUserDetails = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  return await unstable_getServerSession(req, res, authOptions).then(
    async (session) => {
      if (session?.user) {
        return await getUser(session?.user?.id).then((user) => {
          return user;
        });
      }
      return undefined;
    }
  );
};
