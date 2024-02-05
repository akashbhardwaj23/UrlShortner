"use client";
import axios from "axios";
import React, { useCallback, useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState(false);


  const getTheData = async () => {
    try {
      const result = await axios.post("http://localhost:3001/api/url", {
        longUrl: url,
      });

      console.log(result);
      console.log(result.data.shorturl);
      setError(false);
      setShortUrl(result.data.shorturl);
      console.log(shortUrl);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const handleCopy = useCallback(() => {
   
    navigator.clipboard.writeText(shortUrl);
  }, [shortUrl]);

  const handleErrorButton = useCallback(() => {
    setError(false)
  },[error])

  // const handleMe = async () => {
  //   const data = await axios.get("http://localhost:3001/")
  //   console.log(data)
  // }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-between">
        <h1 className="text-5xl mb-14">Error</h1>
        <button className="p-4 bg-green-600 rounded-md text-xl font-semibold" onClick={handleErrorButton}>Go to Url Page</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-5xl mb-6">URL SHORTNER</h1>

      <input
        type="text"
        id=""
        placeholder="Enter the URL"
        className="p-4 w-1/2 text-black rounded-sm focus:outline focus:outline-[3px] focus:outline-orange-600"
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        className="p-4 mt-6 bg-green-600 rounded-md uppercase font-semibold"
        onClick={getTheData}
      >
        SHORT
      </button>
      {shortUrl && (<div className="mt-8 bg-white p-4 pr-12 flex">
        <p className="text-2xl text-black mr-4">{shortUrl}</p>
        <button className="p-4 bg-green-600" onClick={handleCopy}>
          copy
        </button>
      </div>)}

      {/* <button onClick={handleMe}>
        Me
      </button> */}
    </div>
  );
}
