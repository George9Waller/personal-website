import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/db";
import { withSentry } from "@sentry/nextjs";
import { NewsletterSubscriber } from "@prisma/client";

export interface VerifyNewsletterSubscriptionResponse {
  subscription?: NewsletterSubscriber;
}

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifyNewsletterSubscriptionResponse>
) {
  const {
    query: { id },
  } = req;

  await prisma.newsletterSubscriber
    .update({
      where: {
        id: id?.toString(),
      },
      data: {
        emailVerified: true,
      },
    })
    .then((subscription) => {
      res.status(200).send({ subscription });
    })
    .catch(() => {
      res.status(400).send({});
    });
}

export default withSentry(handler);
