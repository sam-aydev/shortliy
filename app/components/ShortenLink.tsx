"use client";

import { getUser, LinkShortener } from "@/utils/actions/server";
import { useFiveLinks } from "@/utils/hooks/useFiveLinks";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { ClipLoader } from "react-spinners";
import isURL from "validator/lib/isURL";

export default function ShortenLink() {
  const [original_link, setOriginalLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { fiveLinks, fiveLinksError, isLoadingFiveLinks }: any = useFiveLinks();

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

  console.log(fiveLinks);

  return (
    <>
      <div className="">
        <div className="w-full flex justify-center items-center h-screen">
          <div className="w-full px-3">
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
                className="hover:bg-slate-800 bg-black rounded-md text-white py-2 flex justify-center items-center"
              >
                <ClipLoader color="#fffff" loading={isLoading} size={20} />
                <span className="px-[2px]">Shorten Link</span>
              </button>
            </form>
            {fiveLinks && (
              <div className="text-sm font-bold w-full">
                <div className=" ">
                  <div className="w-full mx-auto mt-16 ">
                    <div className="gap-4  grid grid-cols-4 px-3 text-center bg-black text-white py-2 rounded">
                      <div className="w-[30%]">Time</div>
                      <div className="w-[30%]">Original Link</div>
                      <div className="w-[30%]">Shortened Link</div>
                    </div>
                  </div>
                  <div className="w-full mx-auto mt-1 ">
                    {fiveLinks?.data?.map((item: any) => (
                      <div
                        key={item.id}
                        className=" gap-4 grid text-xs grid-cols-4 text-black py-2 rounded"
                      >
                        <div className="text-center">2hr</div>
                        <div className="">
                          {item.original_link.slice(0, 9)}...
                        </div>
                        <div className="">
                          {item.shortened_link.slice(0, 15)}...
                        </div>
                        <div className="">
                          <BiDotsVerticalRounded className="size-6" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {fiveLinks?.data.length >= 5 ? (
                  <div>
                    <Link href="/app/manage">
                      <button className="hover:bg-black hover:text-white duration-300 text-black mt-4  w-full bg-slate-100 p-2 rounded-md">
                        See Links
                      </button>
                    </Link>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
