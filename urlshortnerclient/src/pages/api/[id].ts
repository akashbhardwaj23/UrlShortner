import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {

    console.log("Reached here")

    const { id } = req.query;
  res.status(304).redirect(`http://localhost:3001/${id}`)
}
