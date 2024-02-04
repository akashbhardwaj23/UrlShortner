import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
 const [url, setUrl] = useState("");
 const [shortUrl, setShortUrl] = useState("");

  const getTheData = async () => {
    const result = await axios.post("http://localhost:3001/api/url", {
      longUrl: url
    })
    console.log(result.data.shorturl)
    setShortUrl(result.data.shortUrl)
  }

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-5xl mb-6">URL SHORTNER</h1>

      <input type="text"  id="" placeholder="Enter the URL" className="p-4 w-1/2 text-black rounded-sm" onChange={(e)  => setUrl(e.target.value)} />

      <button className="p-4 mt-6 bg-green-600 rounded-md uppercase font-semibold" onClick={getTheData}>
        SHORT
      </button>

      <div className="mt-8 bg-green-300">
          <p className="text-2xl text-white">
            whats up {shortUrl}
          </p>
      </div>
    
    </div>
  );
}
