import { NewsletterSubscriber } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

export interface NewsletterResponse {
  error?: string;
  subscription?: NewsletterSubscriber | null;
}

export interface NewsletterRequest {
  email: string;
}

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NewsletterResponse>
) {
  if (req.method === "POST") {
    const { email } = req.body;
    const subscription = await prisma.newsletterSubscriber.findUnique({
      where: {
        email: email,
      },
    });
    return res.status(200).send({ subscription });
  } else {
    return res.status(400).send({ error: "Method not allowed" });
  }
}

export default withSentry(handler);
