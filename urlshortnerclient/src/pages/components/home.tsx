import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Error from "./error";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "../../config";
import { useSession } from "next-auth/react";

function HomePage() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [changeIcon, setChangeIcon] = useState(false);
  const [error, setError] = useState(false);
  const [shortCode, setShortCode] = useState("");
  const session = useSession();

  const getData = async () => {
    if (!session.data) return alert("Please Sign In to use this feature");
    setLoading(true);
    try {
      const result = await axios.post(`${BACKEND_URL}/api/url`, {
        longUrl: url,
        shortCode,
      });

      // For next js Only

      setError(false);
      setLoading(false);
      setShortUrl(result.data.message);
      console.log(result.data.message);

      // Thats it
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };

  const handleCopy = useCallback(async() => {
   await navigator.clipboard.writeText(shortUrl);
    setChangeIcon(true);
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
          setShortCode(data.shortCode);
        });
        // // setShortCode(result);
      } catch (error) {
        console.log(error);
      }
    };

    generateShortCode();
  }, [url]);

  if (error) {
    return <Error handleErrorButton={handleErrorButton} />;
  }

  if (loading)
    return (
      <div className="flex items-center justify-center p-20">
    <div className="relative">
        <div className="h-32 w-32 rounded-full border-t-8 border-b-8 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-32 w-32 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
        </div>
    </div>
</div>
    );

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
        readOnly={session.data ? false : true}
        placeholder="Enter the URL"
        className="p-4 w-1/2 text-white bg-[#181E29] mb-4 rounded-md focus:outline focus:outline-[3px] focus:outline-orange-600"
        onChange={(e) => setUrl(e.target.value)}
      />

      {
        !session.data && (
          <div className="w-1/2 font-mono text-sm font-bold text-blue-600/90">
          Please Login To Shorten The url
        </div>
        )
      }

      <div className="flex items-center">
        <div className="h-2 w-2 bg-[#144EE3] rounded-full mr-2"></div>

        <div className="text-sm text-[#C9CED6]">Auto Paste from Clipboard</div>
      </div>
      <Button
        variant={"ghost"}
        className="border-2 border-blue-600 border-solid mt-6 font-semibold"
        onClick={getData}
      >
        SHORT
      </Button>
      {shortUrl && (
        <div className="mt-8 bg-white p-4 pr-6 flex items-center rounded-sm">
          <p className="text-2xl text-black mr-4">{shortUrl}</p>
          <Button variant={"secondary"} onClick={handleCopy}>
            {changeIcon ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                />
              </svg>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
