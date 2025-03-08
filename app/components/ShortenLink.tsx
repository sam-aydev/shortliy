"use client";

import { timeAgo } from "@/utils/actions/client";
import { deleteLinkById, getUser, LinkShortener } from "@/utils/actions/server";
import { useFiveLinks } from "@/utils/hooks/useFiveLinks";
import { useEffect, useRef, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GrView } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { ClipLoader } from "react-spinners";

import Link from "next/link";
import toast from "react-hot-toast";
import ShortenLinkItem from "./ShortenLinkItem";

export default function ShortenLink() {
  const [original_link, setOriginalLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  function isValidUrl(url: string) {
    const regex =
      /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(:\d+)?(\/[\w.-]*)*(\?[\w=&%-]*)?(#[\w-]*)?$/i;
    return regex.test(url);
  }
  async function handleLinkShortening(e: any) {
    e.preventDefault();
    if (!original_link || !isValidUrl(original_link)) {
      toast.error("Please enter a valid link");
      return;
    }

    try {
      setIsLoading(true);

      const { data: user } = await getUser();

      const user_id = user?.id as string;

      const { data, error }: any = await LinkShortener({
        original_link,
        user_id,
      });
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
                <ClipLoader
                  color="#000000"
                  loading={isLoadingFiveLinks}
                  size={50}
                />
              </div>
            ) : (
              fiveLinks?.data && (
                <ShortenLinkItem
                  isOn={isOn}
                  menuRef={menuRef}
                  setIsOn={setIsOn}
                  fiveLinks={fiveLinks}
                />
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
