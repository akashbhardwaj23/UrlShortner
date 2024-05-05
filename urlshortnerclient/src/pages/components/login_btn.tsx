import { Avatar,AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signIn, signOut } from "next-auth/react"

export default function LoginBtn({session} : any) {
    console.log(session.user.image)
 
  if (session) {
    return (
        <div className="flex relative top-[-.5rem]">
            <Avatar>
                <AvatarImage src={session.user.image} alt="User avatar" />
                <AvatarFallback>{session.user.name}</AvatarFallback>
            </Avatar>

            <button className="mx-4 border border-[#1F89DB] px-4 py-2 rounded-md" onClick={() => signOut()}>
                SignOut
            </button>
        </div>
    )
  }
  return (
    <div>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  )
}