import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/db"



export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Email Login",
      credentials : {
        username : {label: "username", type : 'text', placeholder : "Email"},
        password : {label: "password", type : 'password'} 
      },
      //@ts-ignore
      async authorize(credentials:any) {
        const {username, password} = credentials;

        const existingUser = await prisma.user.findFirst({
          where : {
            email : username
          }
        })


        if(existingUser){
          const passwordMatch = existingUser.password === password;
          if(passwordMatch){
            return {
              userId : existingUser.id.toString(),
              name : existingUser.name,
              email : existingUser.email
            }
          }
          return null;
          }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID || "",
        clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
    })

  ],

  secret : process.env.NEXTAUTH_SECRET,

  callbacks : {
    async session({session,token ,user}:any){
      if(session && session.user){
        session.user.id = token.sub;
      }


      console.log(session)
      return session;
    }
  },

  pages : {
    signIn : "/signin",
  }
}

export default NextAuth(authOptions)