import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../prisma/db";
import { withSentry } from "@sentry/nextjs";
import { constructTranslations } from "../../../../../utils/common";
import { checkUserPermission } from "../../../../../utils/api";
import { BlogImage } from "@prisma/client";

export interface BlogImageCreateData {
  blogEntryId: number;
  "title-en": string;
  "title-fr": string;
  "alt-en": string;
  "alt-fr": string;
  cover: boolean;
  s3ImageUrl: string;
  width: number;
  height: number;
}

export interface BlogImageCreateResponse {
  image?: BlogImage;
  error?: string;
}

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BlogImageCreateResponse>
) {
  if (req.method === "POST") {
    await checkUserPermission(req, res, (user) => user.isAdmin);

    const body = req.body as BlogImageCreateData;

    const image = await prisma.blogImage.create({
      data: {
        title: constructTranslations(body["title-en"], body["title-fr"]),
        altText: constructTranslations(body["alt-en"], body["alt-fr"]),
        imageUrl: body.s3ImageUrl,
        width: body.width,
        height: body.height,
        isCover: body.cover,
        blogEntryId: body.blogEntryId,
      },
    });
    return res.status(201).json({ image });
  } else {
    return res.status(405).send({ error: "method not permitted" });
  }
}

export default withSentry(handler);
