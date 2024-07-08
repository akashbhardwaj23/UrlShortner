import prisma from "@/db";
import type { NextRequest, NextResponse } from "next/server";


export default async function handler(
  req: NextRequest,
  res: NextResponse,
) {

  console.log(await req.formData())
    const stringData = await req.formData();
    // const data = JSON.parse(stringData);

    // const data = JSON.parse(stringData);

    console.log(stringData)

    // console.log(data)
    // try {
    //   const user = await prisma.user.findFirst({
    //     where : {
    //       email : data.email
    //     }
    //   });

    //   if(user) return res.status(400).json({name : "User already exists"});

    //   const newUser = await prisma.user.create({
    //     data : {
    //       email : data.email,
    //       name : data.name,
    //       password : data.password,
    //       Image : data.image
    //     }
    // })

    // console.log("User is Created")

    // return res.status(200).json({ user: newUser });
    // } catch (error) {
    //   console.error()
    // }
}
