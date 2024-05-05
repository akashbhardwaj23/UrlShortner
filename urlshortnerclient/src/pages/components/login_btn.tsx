import { signIn, signOut } from "next-auth/react"

export default function LoginBtn({session} : any) {
 
  if (session) {
    return (
      
       <div className="flex justify-center ">
         Signed in as {session?.user?.email || "undefined"}
        <button className="relative top-[-0.4rem] px-4 py-2 bg-transparent rounded-md border border-[#1F89DB] ml-2" onClick={() => signOut()}>Sign out</button>
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