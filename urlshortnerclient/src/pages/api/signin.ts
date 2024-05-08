// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
    const stringData = req.body;
    const data = JSON.parse(stringData);

    const user = await prisma.user.create({
        data : {
          email : data.username,
          name : "nAME",
          password : data.password
        }
    })

    console.log("User is Created")

    return res.status(200).json({ user: user } as unknown as Data);
}
