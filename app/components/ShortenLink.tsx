"use client";

import { deleteLinkById, getUser, LinkShortener } from "@/utils/actions/server";
import { useFiveLinks } from "@/utils/hooks/useFiveLinks";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GrView } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import isURL from "validator/lib/isURL";

export default function ShortenLink() {
  const [original_link, setOriginalLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingLink, setIsLoadingLink] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isOn, setIsOn] = useState(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(
    function () {
      if (!isOn) return;
      function handleOutsideClick(event: MouseEvent): void {
        if (
          (event.target as Node) &&
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          setIsOn(null);
        }
      }

      document.addEventListener("mousedown", handleOutsideClick);

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    },
    [isOn, setIsOn]
  );
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
      toast.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: number) {
    try {
      setIsLoadingLink(true);
      const { message, error } = await deleteLinkById(id);
      if (error) {
        toast.error(error);
      }
      if (message) {
        toast.success(message);
      }
    } catch (error: any) {
      toast.error(error);
      setIsLoadingLink(false);
    } finally {
      setIsLoadingLink(false);
    }
  }

  return (
    <>
      <div className="">
        <div className="w-full flex justify-center items-center h-screen md:w-2/3 md:mx-auto">
          <div className="w-full px-3">
            <form
              onSubmit={handleLinkShortening}
              className="flex flex-col space-y-2 w-full mx-auto"
            >
              <input
                type="text"
                disabled={isLoading}
                value={original_link}
                onChange={(e: any) => setOriginalLink(e.target.value)}
                placeholder="Your Original link..."
                className="p-2 border-2 border-black rounded-md"
              />
              <button
                disabled={isLoading}
                className="hover:bg-slate-800 bg-black rounded-md text-white py-2 flex justify-center items-center"
              >
                <ClipLoader color="#fffff" loading={isLoading} size={20} />
                <span className="px-2">Shorten Link</span>
              </button>
            </form>
            {isLoadingFiveLinks ? (
              <div className="flex justify-center items-center h-fit ">
                <ClipLoader color="#000000" loading={isLoadingLink} size={50} />
              </div>
            ) : (
              fiveLinks?.data && (
                <div className="text-sm font-bold w-full">
                  <div className=" ">
                    <div className="w-full mx-auto mt-16 ">
                      <div className="gap-4  grid grid-cols-4 px-3 text-center bg-black text-white py-2 rounded">
                        <div className="w-[30%] text-right">Time</div>
                        <div className="w-[30%]">Original Link</div>
                        <div className="w-[30%]">Shortened Link</div>
                      </div>
                    </div>
                    <div className="relative z-50 w-full mx-auto mt-2 ">
                      {fiveLinks?.data?.map((item: any) => (
                        <div
                          key={item.id}
                          className="bg-slate-200 mb-2 px-2 gap-4 grid text-xs grid-cols-4 text-black py-2 rounded"
                        >
                          <div className="text-center">2hr</div>
                          <div className="">
                            {item.original_link.slice(0, 9)}...
                          </div>
                          <div className="">
                            {item.shortened_link.slice(0, 15)}...
                          </div>
                          <div
                            onClick={() => setIsOn(item.id)}
                            className="flex justify-end cursor-pounter"
                          >
                            <BiDotsVerticalRounded className="cursor-pointer size-6 bg-white rounded-full p-1 hover:bg-black hover:text-white" />
                          </div>
                          {isOn === item.id && (
                            <div
                              ref={menuRef}
                              className=" flex flex-col space-y-2 right-0 justify-end mt-7 bg-white rounded-md p-2 absolute"
                            >
                              <button className="hover:text-green-700  flex items-center space-x-2">
                                <GrView className="size-5" /> <span>View</span>
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="hover:text-red-700 flex items-center space-x-2"
                              >
                                {isLoadingLink ? (
                                  <ClipLoader
                                    color="red"
                                    loading={isLoadingLink}
                                    size={15}
                                  />
                                ) : (
                                  <MdDeleteForever className="size-5" />
                                )}{" "}
                                <span>Delete</span>
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  {fiveLinks?.data?.length >= 5 ? (
                    <div>
                      <Link href="/app/manage">
                        <button className="hover:bg-black hover:text-white duration-300 text-black mt-4  w-full bg-slate-100 p-2 rounded-md">
                          See Links
                        </button>
                      </Link>
                    </div>
                  ) : null}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
