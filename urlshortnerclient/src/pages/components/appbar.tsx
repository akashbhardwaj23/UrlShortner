import Link from "next/link"


export const AppBar = () => {
    return <nav>
        <div className="flex justify-between mx-4 mt-6 p-2">
            <Link href={""} className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1F89DB] via-[#F42A8B] to-[#1F89DB]">URL Shortner</Link>
            <ul id="nav-mobile" className="flex gap-6 text-lg font-semibold">
                <li className=""><Link href="/">Home</Link></li>
                <li><Link href="/login">Login</Link></li>
                <li><Link href="/register">Register</Link></li>
            </ul>
        </div>
    </nav>
}