import Link from "next/link";
import { FaScissors } from "react-icons/fa6";
import { HiMenu } from "react-icons/hi";
import { HiScissors } from "react-icons/hi2";
import NavBar from "./NavBar";

export default function HomePage() {
  return (
    <div>
      <NavBar />

      <div className="w-3/4 mx-auto text-center pt-24">
        <h2 className="text-3xl font-bold ">
          Shorten, Share & Scan - The Smartest URL Shortener!
        </h2>
        <p className="text-sm mt-3">
          Transform long links into sleek, scannable QR codes in seconds.
          Perfect for business, marketing campaigns, and personal use!
        </p>
        <Link href="/signup">
          <button className="hover:bg-slate-400 hover:text-black  duration-300 bg-black text-white rounded py-2 px-3 mt-2">
            Start Now - It's Free
          </button>
        </Link>
      </div>

      <div className="mt-16 w-3/4 mx-auto">
        <h2 className="text-xl font-semibold w-4/5">
          Quickly Shorten Your Link Here - To Have A Little Feel Of Shortl.iy!
        </h2>
        <form className="flex space-x-2 items-center mt-2 w-full">
          <input
            type="text"
            placeholder="Add your link..."
            className="p-2 border-black border-2 rounded-md w-full"
          />
          <button className="bg-black text-white p-2 rounded-md border-2 border-slate-200 flex items-center space-x-2 font-semibold">
            <FaScissors className="size-4" />{" "}
            <span className="px-[2px]">Shorten </span>
          </button>
        </form>
      </div>
    </div>
  );
}
