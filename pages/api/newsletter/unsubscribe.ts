import { withSentry } from "@sentry/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

export interface NewsletterResponse {
  error?: string;
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
    await prisma.newsletterSubscriber.delete({
      where: {
        email: email,
      },
    });
    return res.status(200).send({});
  } else {
    return res.status(400).send({ error: "Method not allowed" });
  }
}

export default withSentry(handler);
