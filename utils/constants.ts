import { NextApiRequest, NextApiResponse } from "next";
import { HandlerOptions } from "next-connect";
import { RequestHandler } from "next-connect/dist/types/node";

export const PAGINATION_COUNT = 6;
export const RECENT_ITEMS_COUNT = 3;
export const LINKEDIN_URL = "https://www.linkedin.com/in/georgewaller/";
export const GITHUB_URL = "https://github.com/George9Waller";

export const DEFAULT_ROUTER_HANDLER_OPTIONS: HandlerOptions<
  RequestHandler<NextApiRequest, NextApiResponse<{ error: string }>>
> = {
  onError(err: unknown, req: NextApiRequest, res: NextApiResponse) {
    return res.status(500).json({ error: "an error occurred" });
  },
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    return res.status(400).json({ error: "Method not permitted" });
  },
};
