import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Error from "./error";
import { Button } from "@/components/ui/button";

function IntroPage() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState(false);
  const [shortCode, setShortCode] = useState("");

  const getTheData = async () => {
    try {
      const result = await axios.post("http://localhost:3001/api/url", {
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
      setShortUrl(result.data.message);
      console.log(result.data.message);

      // Thats it
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(shortUrl);
  }, [shortUrl]);

  const handleErrorButton = useCallback(() => {
    setError(false);
  }, [error]);

  useEffect(() => {
    const generateShortCode = async () => {
      try {
        const result = await fetch("http://localhost:3001/shortCode", {
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
{/* 
      <button
        className="p-4 mt-6 bg-green-600 rounded-md uppercase font-semibold"
        onClick={getTheData}
      >
        SHORT
      </button> */}
      <Button variant={"ghost"} className="border-2 border-blue-600 border-solid mt-6 font-semibold" onClick={getTheData}>SHORT</Button>
      {shortUrl && (
        <div className="mt-8 bg-white p-4 pr-6 flex items-center rounded-sm">
          <p className="text-2xl text-black mr-4">{shortUrl}</p>
          {/* <button
            className="p-4 bg-green-600 rounded-md uppercase"
            onClick={handleCopy}
          >
            copy
          </button> */}
          <Button variant={"secondary"} onClick={handleCopy}> copy </Button>
        </div>
      )}

      {/* <button onClick={handleMe}>
      Me
    </button> */}
    </div>
  );
}

export default IntroPage;
