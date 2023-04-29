// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const serverData = [{ name: "John Doe" }];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof serverData>
) {
  res.status(200).json(serverData);
}
