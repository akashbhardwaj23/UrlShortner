import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";


const Register = () => {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [image, setImage] = useState<File>();

    const handleRequest = async() => {
        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("password", password);
        formData.append("image", image as Blob);

        try {
            const res = await axios.post("/api/signup", formData);
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="min-h-screen h-full flex justify-center items-center">
            <div className="w-full max-w-lg p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-[#0c121d]">
        <div className="flex justify-center items-center mx-auto">
           <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#1F89DB] via-[#F42A8B] to-[#1F89DB] font-extrabold ">Url Shortner</h1>
        </div>
    
        <div className="mt-6">
             <div>
                <label htmlFor="email" className="block text-sm text-gray-800 dark:text-gray-200 font-bold">Email</label>
                <input type="email" className="block w-full px-4 py-2 mt-2 border rounded-md bg-gray-800 text-gray-100 border-gray-600 focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
            </div>

            <div className="mt-4">
                <label htmlFor="Name" className="block text-sm text-gray-800 dark:text-gray-200 font-bold">Name</label>
                <input type="text" className="block w-full px-4 py-2 mt-2 border rounded-md bg-gray-800 text-gray-100 border-gray-600 focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e:ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
            </div>
            <div className="mt-4">
                <label htmlFor="image" className="block text-sm text-gray-800 dark:text-gray-200 font-bold">Image</label>
                <input type="file" className="block w-full px-4 py-2 mt-2 border rounded-md bg-gray-800 text-gray-100 border-gray-600 focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e:ChangeEvent<HTMLInputElement>) => (
                    //@ts-ignore
                    setImage(e.target?.files[0]
                ))} />
            </div>
    
            <div className="mt-4">
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm text-gray-800 dark:text-gray-200 font-bold">Password</label>
                    <Link href="" className="text-xs text-gray-600 dark:text-gray-400 hover:underline">Forget Password?</Link>
                </div>
    
                <input type="password" className="block w-full px-4 py-2 mt-2 border rounded-md bg-gray-800 text-gray-100 border-gray-600 focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
            </div>


    
            <div className="mt-6">
                <button className="w-full px-6 py-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50" onClick={handleRequest}>
                    Sign In
                </button>
            </div>
        </div>
    
        <div className="flex items-center mt-6 -mx-2">
            <button type="button" className="flex items-center justify-center w-full px-6 py-3 mx-2 text-lg font-medium text-white transition-colors duration-300 transform bg-blue-700 rounded-md hover:bg-blue-400 focus:bg-blue-400 focus:outline-none" onClick={() => signIn('google', {callbackUrl : "/"})}>
                <svg className="w-5 h-5 mx-2 fill-current" viewBox="0 0 24 24">
                    <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z">
                    </path>
                </svg>
    
                <span className="hidden mx-2 sm:inline">Sign in with Google</span>
            </button>
        </div>
    
        <p className="mt-8 text-xs font-medium text-center text-gray-400"> Already have an account? <Link href="/signin" className="font-medium text-gray-700 dark:text-gray-200 hover:underline">Sign In</Link></p>
    </div>
        </div>
    )
}

export default Register;    