import type { NextApiRequest, NextApiResponse } from "next";
import { BACKEND_URL } from "../config";

type Data = {
  id: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {

    console.log("Reached here")

    const { id } = req.query;
  res.status(304).redirect(`${BACKEND_URL}/${id}`)
}
