
import prisma from "@/db";

export async function signUp(email : string, password : string, name : string, image:File){
    try {
        const user = await prisma.user.findFirst({
            where : {
                email
            }
        });

        if(user){
            return null;
        }   

        const newUser = await prisma.user.create({
            data : {
                email,
                password,
                name
            }
        })
    } catch (error) {
        console.log(error)
    }
}   