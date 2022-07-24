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

  const subscription = await prisma.newsletterSubscriber.update({
    where: {
      id: id.toString(),
    },
    data: {
      emailVerified: true,
    },
  });
  subscription ? res.status(200).send({ subscription }) : res.status(400);
}

export default withSentry(handler);
