import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../prisma/db";
import { withSentry } from "@sentry/nextjs";
import { constructTranslations } from "../../../../../utils/common";
import { checkUserPermission, getUser } from "../../../../../utils/api";
import { BlogImage } from "@prisma/client";

export interface BlogImageUpdateData {
  "title-en": string;
  "title-fr": string;
  "alt-en": string;
  "alt-fr": string;
  cover: boolean;
}

export interface BlogImageUpdateResponse {
  image?: BlogImage;
  error?: string;
}

export async function handler(req: NextApiRequest, res: NextApiResponse<BlogImageUpdateResponse>) {
  const {
    query: { id },
  } = req;

  if (req.method === "PATCH") {
    await checkUserPermission(req, res, (user) => user.isAdmin);

    const body = req.body as BlogImageUpdateData;
    prisma.blogImage
      .update({
        where: {
          id: parseInt(id.toString()),
        },
        data: {
          title: constructTranslations(body["title-en"], body["title-fr"]),
          altText: constructTranslations(body["alt-en"], body["alt-fr"]),
          isCover: body.cover,
        },
      })
      .then((image) => {
        return res.status(200).json({ image });
      })
      .catch(() => {
        return res.status(400).send({ error: "an error occurred" });
      });
  } else {
    return res.status(405).send({ error: "method not permitted" });
  }
}

export default withSentry(handler);
