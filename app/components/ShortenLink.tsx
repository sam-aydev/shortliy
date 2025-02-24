"use client";

import { getUser, LinkShortener } from "@/utils/actions";
import { useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import isURL from "validator/lib/isURL";

export default function ShortenLink() {
  const [original_link, setOriginalLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLinkShortening(e: any) {
    e.preventDefault();
    if (!original_link || error) {
      toast.error("Please enter a valid link");
      return;
    }

    try {
      setIsLoading(true);

      const { data: user } = await getUser();

      const user_id = user?.id as string;

      const { data, error } = await LinkShortener({ original_link, user_id });
      if (error) {
        toast.error(error);
        return;
      }
      toast.success("You just shortened a link!");
    } catch (error: any) {
      console.log(error);
      toast.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full">
        <form
          onSubmit={handleLinkShortening}
          className="flex flex-col space-y-2 w-3/4 mx-auto"
        >
          <input
            type="text"
            disabled={isLoading}
            value={original_link}
            onChange={(e: any) => {
              setOriginalLink(e.target.value);
              if (original_link && !isURL(original_link)) {
                setError("Please enter a valid url!");
              } else {
                setError("");
              }
            }}
            placeholder="Your Original link..."
            className="p-2 border-2 border-black rounded-md"
          />
          <button
            disabled={isLoading}
            className="hover:bg-slate-800 bg-black rounded-md text-white py-2 space-x-2 flex justify-center items-center"
          >
            <ClipLoader color="#fffff" loading={isLoading} size={20} />
            Shorten Link
          </button>
        </form>
      </div>
    </div>
  );
}
