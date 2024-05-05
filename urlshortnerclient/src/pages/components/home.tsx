import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Error from "./error";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "../../config";

function IntroPage() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [shortCode, setShortCode] = useState("");

  const getTheData = async () => {
    setLoading(true)

    try {
      const result = await axios.post(`${BACKEND_URL}/api/url`, {
        longUrl: url,
        shortCode,
      });

      // console.log(result);
      // console.log(result.data.shortUrl);
      // setError(false);
      // setShortUrl(result.data.shortUrl);
      // console.log(shortUrl);

      // For next js Only

      setError(false);
      setLoading(false);
      setShortUrl(result.data.message);
      console.log(result.data.message);

      // Thats it
    } catch (error) {
      setLoading(false)
      setError(true);
      console.log(error);
    }
  };

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(shortUrl);
  }, [shortUrl]);

  const handleErrorButton = useCallback(() => {
    setError(false);
  }, []);

  useEffect(() => {
    const generateShortCode = async () => {
      try {
        const result = await fetch(`${BACKEND_URL}/shortCode`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        result.json().then((data): any => {
          console.log(data);
          setShortCode(data.shortCode);
        });
        // // setShortCode(result);
      } catch (error) {
        console.log(error);
      }
    };

    generateShortCode();
  }, [url]);

  // const handleMe = async () => {
  //   const data = await axios.get("http://localhost:3001/")
  //   console.log(data)
  // }

  if (error) {
    return <Error handleErrorButton={handleErrorButton} />;
  }

  if(loading) return (
    <div className="h-screen flex justify-center items-center">
      <h1>Loading...</h1>
    </div>
  )

  return (
    <div className="p-8 pt-36 min-h-full flex flex-col justify-start items-center h-full overflow-x-hidden">
      <h1 className="text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#1F89DB] via-[#F42A8B] to-[#1F89DB] font-bold">
       Shortens Your Links
      </h1>

      <h2 className="text-sm text-[#C9CED6] mb-10 text-wrap">
        UrlShortner is an efficient and easy-to-use URL shortening service that
        streamlines your online experience.
      </h2>

      <input
        type="text"
        id=""
        placeholder="Enter the URL"
        className="p-4 w-1/2 text-white bg-[#181E29] mb-4 rounded-md focus:outline focus:outline-[3px] focus:outline-orange-600"
        onChange={(e) => setUrl(e.target.value)}
      />

      <div className="flex items-center">
        <div className="h-2 w-2 bg-[#144EE3] rounded-full mr-2"></div>

        <div className="text-sm text-[#C9CED6]">Auto Paste from Clipboard</div>
      </div>
      {/* 
<button
  className="p-4 mt-6 bg-green-600 rounded-md uppercase font-semibold"
  onClick={getTheData}
>
  SHORT
</button> */}
      <Button
        variant={"ghost"}
        className="border-2 border-blue-600 border-solid mt-6 font-semibold"
        onClick={getTheData}
      >
        SHORT
      </Button>
      {shortUrl && (
        <div className="mt-8 bg-white p-4 pr-6 flex items-center rounded-sm">
          <p className="text-2xl text-black mr-4">{shortUrl}</p>
          {/* <button
      className="p-4 bg-green-600 rounded-md uppercase"
      onClick={handleCopy}
    >
      copy
    </button> */}
          <Button variant={"secondary"} onClick={handleCopy}>
            {" "}
            copy{" "}
          </Button>
        </div>
      )}

      {/* <button onClick={handleMe}>
Me
</button> */}
    </div>
  );
}

export default IntroPage;
