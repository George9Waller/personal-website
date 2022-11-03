import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/db";
import { withSentry } from "@sentry/nextjs";
import { getUserDetails } from "../../../../utils/api";
import { AssetType, Password, Asset } from "@prisma/client";

export interface EditAssetData {
  asset: Asset;
  password?: Password;
}

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await getUserDetails(req, res);
  const body = req.body as EditAssetData;

  if (user && body.asset.userId === user.id) {
    const asset = await prisma.asset.update({
      where: { id: body.asset.id },
      data: {
        name: body.asset.name,
        tags: body.asset.tags,
      },
    });

    switch (body.asset.assetType) {
      case AssetType.password:
        body.password &&
          (await prisma.password.update({
            where: { id: body.password.id },
            data: {
              url: body.password.url,
              email: body.password.email,
              username: body.password.username,
              passwordHash: body.password.passwordHash,
              additionalInfo: body.password.additionalInfo,
            },
          }));
        break;
      default:
        await prisma.asset.delete({ where: { id: asset.id } });
        return res.status(400);
    }

    const assetWithDetail = prisma.asset.findUnique({
      where: { id: asset.id },
      include: {
        password: true,
        card: true,
        link: true,
        document: true,
        note: true,
        contact: true,
      },
    });
    return res.status(201).send({ asset: assetWithDetail });
  } else {
    return res.status(403).send({});
  }
}

export default withSentry(handler);
