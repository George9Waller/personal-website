import ColorHash from "color-hash";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/db";
import { withSentry } from "@sentry/nextjs";
import { getUserDetails } from "../../../../utils/api";

export interface TagsData {
  tags: [string, number, string][];
}

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TagsData | Record<string, never>>
) {
  const user = await getUserDetails(req, res);
  if (!user) {
    return res.status(403).send({});
  }

  const tagsWithCount: { [tag: string]: number } = {};

  const assets = await prisma.asset.findMany({
    where: {
      userId: user.id,
    },
    orderBy: [{ accessed: "desc" }, { updated: "desc" }],
  });

  const sortedTags = assets.flatMap((asset) => asset.tags).sort();
  sortedTags.forEach((value, index, tags) => {
    if (index === 0 || tags[index - 1] !== tags[index]) {
      tagsWithCount[value] = 1;
    } else {
      tagsWithCount[value] = tagsWithCount[value] + 1;
    }
  });

  const tagsDesc = Object.entries(tagsWithCount).sort((a, b) => b[1] - a[1]);

  const colorHash = new ColorHash();
  const tags: [string, number, string][] = tagsDesc.map(([tag, count]) => [
    tag,
    count,
    colorHash.hex(tag),
  ]);

  res.status(200).json({ tags });
}

export default withSentry(handler);
