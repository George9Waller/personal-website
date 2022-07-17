import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/db";
import { withSentry } from "@sentry/nextjs";
import { constructTranslations } from "../../../../utils/common";
import { checkUserPermission } from "../../../../utils/api";

export interface BlogEntryUpdateData {
  "title-en": string;
  "title-fr": string;
  "short-description-en": string;
  "short-description-fr": string;
  "content-en": string;
  "content-fr": string;
  draft: boolean;
  categories: string[];
}

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  if (req.method === 'PATCH') {
    await checkUserPermission(req, res, (user) => (user.isAdmin))

    const body = req.body as BlogEntryUpdateData;
    prisma.blogEntry
      .update({
        where: {
          id: parseInt(id.toString()),
        },
        data: {
          title: constructTranslations(body["title-en"], body["title-fr"]),
          shortDescription: constructTranslations(
            body["short-description-en"],
            body["short-description-fr"]
          ),
          content: constructTranslations(
            body["content-en"],
            body["content-fr"]
          ),
          draft: body.draft,
          category: body.categories,
        },
      })
      .then(() => {
        return res.status(200).send({});
      })
      .catch(() => {
        return res.status(400).send({ error: "an error occurred" });
      });
  } else if (req.method === 'DELETE') {
    await checkUserPermission(req, res, (user) => (user.isAdmin));

    prisma.blogEntry.update({
      where: {
        id: parseInt(id.toString())
      },
      data: {
        archieved: true
      }
    }).then(() => {
      return res.status(200).send({})
    }).catch(() => {
      return res.status(400).send({ error: 'an error occurred' })
    })
  } else {
    return res.status(405).send({ error: "method not permitted" });
  }
}

export default withSentry(handler);
