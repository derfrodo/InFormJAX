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
  if (req.method === "POST") {
    serverData.push({ name: "DDD" });
    res.status(201).json(serverData);
  }

  if (req.method === "GET") {
    res.status(200).json(serverData);
  }

  res.status(200).json(serverData);
}
