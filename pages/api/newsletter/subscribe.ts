import { NewsletterSubscriber } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../prisma/db'
import nodemailer from 'nodemailer';
import { emailDefaults, getNewsletterVerificationEmailData } from "../../../utils/emails";

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
    const subscription = await prisma.newsletterSubscriber.upsert({
      where: {
        email,
      },
      update: {},
      create: {
        email
      },
    });
    const transporter = nodemailer.createTransport(emailDefaults)
    transporter.sendMail(getNewsletterVerificationEmailData(email, subscription.id), (err, info) => {
      if (err) {
        return res.status(400).send({ error: 'There was an error sending the verification email' })
      } else {
        return res.status(200).send({})
      }
    })
  } else {
    return res.status(400).send({ error: "Method not allowed" });
  }
}

export default withSentry(handler);
