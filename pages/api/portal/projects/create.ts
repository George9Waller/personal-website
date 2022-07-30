import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/db";
import { withSentry } from "@sentry/nextjs";
import { BlogEntry } from "@prisma/client";
import { checkUserPermission } from "../../../../utils/api";
import { constructTranslations } from "../../../../utils/common";

export type ProjectAdminDetails = Pick<
  BlogEntry,
  "id" | "date" | "draft" | "title"
>;

export interface CreatedProjectData {
  id: number;
}

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreatedProjectData>
) {
  await checkUserPermission(req, res, (user) => user.isAdmin);

  const project = await prisma.blogEntry.create({
    data: {
      draft: true,
      title: constructTranslations(),
      shortDescription: constructTranslations(),
      content: constructTranslations(),
    },
  });
  return res.status(201).send({ id: project.id });
}

export default withSentry(handler);
