"use client";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { FaLinkSlash } from "react-icons/fa6";
import { RiLinksFill } from "react-icons/ri";
import { usePathname } from "next/navigation";

export default function DesktopSidebar() {
  const pathname = usePathname();
  return (
    <div className=" md:grid md:col-span-4 lg:col-span-3  hidden  min-h-screen shadow-xl bg-white  rounded-r-xl">
      <ul className="flex flex-col space-y-2 px-3 w-full">
        <Link href="/app">
          <li
            className={
              pathname === "/app"
                ? "p-2 w-full mt-4 flex items-center space-x-2 cursor-pointer text-white bg-black rounded-md"
                : "p-2 w-full mt-4 flex items-center space-x-2 cursor-pointer text-black hover:bg-black hover:text-white rounded-md"
            }
          >
            <MdDashboard className="size-6 p-1" /> Dashboard
          </li>
        </Link>
        <Link href="/app/shorten">
          <li
            className={
              pathname === "/app/shorten"
                ? "p-2 w-full mt-4 flex items-center space-x-2 cursor-pointer text-white bg-black rounded-md"
                : "p-2 w-full mt-4 flex items-center space-x-2 cursor-pointer text-black hover:bg-black hover:text-white rounded-md"
            }
          >
            <FaLinkSlash className="size-6 p-1" /> Shorten Links
          </li>
        </Link>
        <Link href="/app/manage">
          <li
            className={
              pathname.startsWith("/app/manage")
                ? "p-2 w-full mt-4 flex items-center space-x-2 cursor-pointer text-white bg-black rounded-md"
                : "p-2 w-full mt-4 flex items-center space-x-2 cursor-pointer text-black hover:bg-black hover:text-white rounded-md"
            }
          >
            <RiLinksFill className="size-6 p-1" /> Manage Links
          </li>
        </Link>
      </ul>
    </div>
  );
}
