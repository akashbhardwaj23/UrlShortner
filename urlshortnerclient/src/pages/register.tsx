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
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
            <div className="w-full max-w-md">
                <div className="bg-gray-800 shadow-2xl rounded-3xl overflow-hidden">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-extrabold mb-2">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1F89DB] via-[#F42A8B] to-[#1F89DB]">
                                    Url Shortner
                                </span>
                            </h1>
                            <p className="text-gray-400">Create your account</p>
                        </div>

                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    placeholder="Enter your name"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    placeholder="Enter your email"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    placeholder="Enter your password"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-1">
                                    Profile Image
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setImage(e.target?.files?.[0])}
                                />
                            </div>

                            <div>
                                <button
                                    type="button"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                                    onClick={handleRequest}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-600"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-gray-800 text-gray-400">Or sign up with</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    onClick={() => signIn('google', { callbackUrl: "/" })}
                                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 transition duration-200"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
                                    </svg>
                                    Sign up with Google
                                </button>
                            </div>
                        </div>

                        <p className="mt-8 text-sm text-center text-gray-400">
                            Already have an account?{" "}
                            <Link href="/signin" className="font-medium text-blue-400 hover:text-blue-300 transition duration-200">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;