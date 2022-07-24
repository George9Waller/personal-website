import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../prisma/db";
import { withSentry } from "@sentry/nextjs";
import { constructTranslations } from "../../../../../utils/common";
import { checkUserPermission } from "../../../../../utils/api";
import { BlogImage } from "@prisma/client";
import { S3 } from "aws-sdk";

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

const s3Client = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_UPLOAD_REGION,
});

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BlogImageUpdateResponse>
) {
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
  } else if (req.method === "DELETE") {
    await checkUserPermission(req, res, (user) => user.isAdmin);

    const imageSelector = {
      where: {
        id: parseInt(id.toString()),
      },
    };

    const image = await prisma.blogImage.findUnique(imageSelector).catch(() => {
      return res
        .status(400)
        .send({ error: "there was an error fetching the blog image" });
    });

    await s3Client.deleteObject(
      {
        Bucket: process.env.AWS_STORAGE_BUCKET_NAME || "",
        Key: image?.imageUrl.split("/").slice(3).join("/") || "",
      },
      (err, _data) => {
        if (err) {
          return res.status(400).send({
            error: "there was an error deleting the corresponding image in s3",
          });
        }
      }
    );

    await prisma.blogImage
      .delete(imageSelector)
      .then(() => {
        return res.status(200).send({});
      })
      .catch(() => {
        return res
          .status(400)
          .send({ error: "there was an error deleting the blog image" });
      });
  } else {
    return res.status(405).send({ error: "method not permitted" });
  }
}

export default withSentry(handler);
