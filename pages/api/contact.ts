import { withSentry } from "@sentry/nextjs";
import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import { emailDefaults, FROM_EMAIL } from "../../utils/emails";

export interface ContactResponse {
  error?: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContactResponse>
) {
  if (req.method === "POST") {
    const { name, email, subject, message } = req.body;
    const transporter = nodemailer.createTransport(emailDefaults);
    const mailData = {
      from: FROM_EMAIL,
      to: ["george@georgewaller.com", "george.waller3@gmail.com"],
      subject: subject,
      text: `Email: ${email}\nName: ${name}\n\n${message}`,
    };
    transporter.sendMail(mailData, (err, _info) => {
      if (err) {
        res
          .status(400)
          .send({ error: "An error occurred sending the message" });
      } else {
        res.status(200).send({});
      }
    });
  } else {
    return res.status(400).send({ error: "Method not allowed" });
  }
}

export default withSentry(handler);
