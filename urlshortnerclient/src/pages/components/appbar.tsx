import Link from "next/link";
import LoginBtn from "./login_btn";
import { useSession } from "next-auth/react";

export default function AppBar() {
  const { data: session } = useSession();
  return (
    <nav>
      <div className="flex justify-between mx-6 mt-6 p-2">
        <Link
          href={"/"}
          className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1F89DB] via-[#F42A8B] to-[#1F89DB]"
        >
          URL Shortner
        </Link>
        <ul id="nav-mobile" className="flex gap-6 text-lg font-semibold">
          {!session ? (
            <>
              <li>
                <Link href="/signin">Login</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
            </>
          ) : (
            <li>
              <LoginBtn session={session} />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
