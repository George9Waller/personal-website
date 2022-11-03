import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/db";
import { withSentry } from "@sentry/nextjs";
import { getUserDetails } from "../../../../utils/api";
import {
  AssetCreateUpdateData,
  PasswordCreateData,
} from "../../../../utils/pass";
import { AssetType } from "@prisma/client";

export interface CreateAssetData {
  asset: AssetCreateUpdateData;
  password?: PasswordCreateData;
}

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await getUserDetails(req, res);

  if (user) {
    const body = req.body as CreateAssetData;
    const asset = await prisma.asset.create({
      data: {
        userId: user.id,
        name: body.asset.name,
        tags: body.asset.tags,
        assetType: body.asset.assetType,
      },
    });

    switch (body.asset.assetType) {
      case AssetType.password:
        body.password &&
          (await prisma.password.create({
            data: {
              assetId: asset.id,
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
