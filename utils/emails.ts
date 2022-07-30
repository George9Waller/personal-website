export const FROM_EMAIL = "george@georgewaller.com";

export const emailDefaults = {
  port: 465,
  host: "smtppro.zoho.eu",
  auth: {
    user: process.env.EMAIL_SEND_ACCOUNT,
    pass: process.env.EMAIL_SEND_ACCOUNT_PASS,
  },
  secure: true,
};

export const getNewsletterVerificationEmailData = (
  to: string,
  subscriberId: string
) => ({
  from: FROM_EMAIL,
  to,
  subject: "George Waller Newsletter | verify email",
  text: `Thank you for subscribing to updates from georgewaller.com\n\nTo receive these please verify your email using the link below:\n\n${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/verify/${subscriberId}`,
});
