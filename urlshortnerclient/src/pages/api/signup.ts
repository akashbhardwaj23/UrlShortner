import prisma from "@/db";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const stringData = req.body;
    const data = JSON.parse(stringData);

    try {
      const user = await prisma.user.findFirst({
        where : {
          email : data.email
        }
      });

      if(user) return res.status(400).json({name : "User already exists"});

      const newUser = await prisma.user.create({
        data : {
          email : data.email,
          name : data.name,
          password : data.password,
          Image : data.image
        }
    })

    console.log("User is Created")

    return res.status(200).json({ user: newUser });
    } catch (error) {
      console.error()
    }
}
