"use client";
import Link from "next/link";
import { FaScissors } from "react-icons/fa6";
import { HiMenu } from "react-icons/hi";
import { HiScissors } from "react-icons/hi2";
import NavBar from "./NavBar";
import { LinkShortener } from "@/utils/actions/server";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { motion } from "motion/react";

export default function HomePage() {
  const [original_link, setOriginalLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shortenedUrl, setShortenedURL] = useState("");

  useEffect(function () {
    const storedUrl = localStorage.getItem("shortened_link");
    if (storedUrl) {
      setShortenedURL(storedUrl);
    }
  }, []);
  async function handleLinkShortening(e: any) {
    e.preventDefault();
    if (shortenedUrl)
      toast.error("You can only shorten once, sign up to continue shortening!");
    if (!original_link) {
      toast.error("Please enter a valid link");
      return;
    }

    const randomString = Math.random().toString(36).substring(2, 8);
    const shortener = window.location.origin + "/" + randomString;
    setShortenedURL(shortener);
    localStorage.setItem("shortened_link", shortener);

    // try {
    //   setIsLoading(true);

    //   const user_id = "unknown";

    //   const { data, error } = await LinkShortener({ original_link, user_id });
    //   if (error) {
    //     toast.error(error);
    //     return;
    //   }
    //   toast.success("You just shortened a link!");
    // } catch (error: any) {
    //   toast.error(error);
    //   setIsLoading(false);
    // } finally {
    //   setIsLoading(false);
    // }
  }
  return (
    <div>
      <NavBar />

      <div className="w-3/4 mx-auto text-center pt-24 md:pt-36 md:w-2/3 lg:w-1/2">
        <h2 className="text-3xl font-bold md:text-4xl">
          Shorten, Share & Scan - The Smartest URL Shortener!
        </h2>
        <p className="text-sm mt-3 lg:text-lg">
          Transform long links into sleek, scannable QR codes in seconds.
          Perfect for business, marketing campaigns, and personal use!
        </p>
        <Link href="/signup">
          <button className="hover:bg-slate-400 hover:text-black  duration-300 bg-black text-white rounded py-2 px-3 mt-2">
            Start Now - It's Free
          </button>
        </Link>
      </div>

      <div className="mt-16 w-3/4 mx-auto md:w-2/3 lg:w-1/2">
        <h2 className="text-xl font-semibold w-4/5 md:w-2/3 lg:w-1/2">
          Quickly Shorten Your Link Here - To Have A Feel Of Shortl.iy!
        </h2>
        <form
          onSubmit={handleLinkShortening}
          className="flex space-x-2 items-center mt-2 w-full md:w-3/4"
        >
          <input
            type="text"
            disabled={isLoading || !!shortenedUrl}
            value={original_link}
            onChange={(e: any) => setOriginalLink(e.target.value)}
            placeholder="Add your link..."
            className="p-2 border-black border-2 rounded-md w-full"
          />
          <button
            disabled={!!shortenedUrl}
            className="bg-black text-white p-2 rounded-md border-2 border-slate-200 flex items-center space-x-2 font-semibold"
          >
            <FaScissors className="size-4" />{" "}
            <ClipLoader color="#fffff" loading={isLoading} size={20} />
            <span className="px-[2px]">Shorten </span>
          </button>
        </form>
        {shortenedUrl && (
          <motion.p
            initial={{ y: "-100%" }}
            animate={{ y: shortenedUrl ? "0%" : "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="font-semibold"
          >
            {shortenedUrl}
          </motion.p>
        )}
        {shortenedUrl && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: shortenedUrl ? "0%" : "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="bg-slate-200 mt-4 rounded-lg w-3/4 p-4"
          >
            <h2 className="text-xl font-semibold">
              Reasons To Sign Up For Free:
            </h2>
            <p className="mt-2">- To prevent link expiration</p>
            <p>- To manage and track all your links in one place!</p>
            <p>- To monitor your analytics!</p>
            <p>- Get QR code</p>
            <p className="font-semibold text-center text-sm mt-2">ALL THIS FOR FREE</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
