import { withSentry } from "@sentry/nextjs";
import { S3 } from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { checkUserPermission } from "../../../../utils/api";

export interface UploadFileUrlResponse {
  url?: string;
  error?: string;
  awsBaseUrl: string;
}

export interface UploadFileUrlRequest {
  fileName: string;
  fileType: string;
}

const s3Client = new S3({
  accessKeyId: process.env.GW_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.GW_AWS_SECRET_ACCESS_KEY,
  region: process.env.GW_AWS_UPLOAD_REGION,
});

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UploadFileUrlResponse>
) {
  const awsBaseUrl = `https://${process.env.GW_AWS_STORAGE_BUCKET_NAME}.s3.${process.env.GW_AWS_UPLOAD_REGION}.amazonaws.com/`;
  if (req.method === "POST") {
    await checkUserPermission(req, res, (user) => user.isAdmin);
    const { name, type } = req.body;
    const url = await s3Client.getSignedUrlPromise("putObject", {
      Bucket: process.env.GW_AWS_STORAGE_BUCKET_NAME,
      Key: name,
      Expires: 600,
      ContentType: type,
      ACL: "public-read",
    });
    return res.status(201).json({ url, awsBaseUrl });
  } else {
    return res.status(400).send({ error: "Method not allowed", awsBaseUrl });
  }
}

export default withSentry(handler);
