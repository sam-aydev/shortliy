"use client";

import { useEffect, useRef, useState } from "react";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import { motion } from "motion/react";
import { HiLogout } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { FaLinkSlash } from "react-icons/fa6";
import { RiLinksFill } from "react-icons/ri";

import { BiUserCircle } from "react-icons/bi";
import Link from "next/link";
import { signOut } from "@/utils/actions";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { usePathname, useRouter } from "next/navigation";

export default function AppLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(
    function () {
      if (!isOpen) return;
      function handleOutsideClick(event: MouseEvent): void {
        if (
          (event.target as Node) &&
          sidebarRef.current &&
          !sidebarRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      }

      document.addEventListener("mousedown", handleOutsideClick);

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    },
    [isOpen, setIsOpen]
  );

  async function handleLogout() {
    try {
      setIsLoggingOut(true);
      const { message, error }: any = await signOut();
      if (error) {
        toast.error(error);
        return;
      }
      toast.success(message);
      router.replace("/login");
    } catch (error: any) {
      toast.error(error);
      setIsLoggingOut(false);
      console.log(error);
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <div>
      <div className=" text-black py-2 px-3 border-b-2 border-b-black flex items-center justify-between">
        <div className="flex items-center justify-center space-x-1  sm:space-x-2">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer md:hidden"
          >
            {!isOpen ? (
              <LuPanelLeftOpen className="size-6" />
            ) : (
              <LuPanelLeftClose className="size-6" />
            )}
          </div>
          <h2 className="text-xl font-semibold">Shortliy</h2>
        </div>
        <div className="flex items-center justify-between space-x-2 sm:space-x-4">
          <p className="text-sm font-semibold md:text-lg">Welcome Samx</p>
          <button
            disabled={isLoggingOut}
            onClick={handleLogout}
            className="bg-black text-sm hover:bg-slate-900 text-white rounded p-2 flex items-center justify-between space-x-2 "
          >
            {isLoggingOut ? (
              <ClipLoader color="#fffff" loading={isLoggingOut} size={20} />
            ) : (
              <>
                <span>Logout</span>
                <HiLogout className="text-white size-5 p-1" />
              </>
            )}
          </button>
        </div>
      </div>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        ref={sidebarRef}
        className="fixed sidebar left-0 h-screen shadow-xl text-sm font-semibold bg-white w-1/2 rounded-r-xl sm:w-1/3  md:hidden"
      >
        <ul className="flex flex-col space-y-2 px-3">
          <Link href="/app">
            <li
              className={
                pathname === "/app"
                  ? "p-2 mt-4 flex items-center space-x-2 cursor-pointer text-white  rounded-md bg-black"
                  : "p-2 mt-4 flex items-center space-x-2 cursor-pointer text-black  rounded-md"
              }
            >
              <MdDashboard className="size-6 p-1" /> Dashboard
            </li>
          </Link>
          <Link href="/app/shorten">
            <li
              className={
                pathname === "/app/shorten"
                  ? "p-2 mt-4 flex items-center space-x-2 cursor-pointer text-white  rounded-md bg-black"
                  : "p-2 mt-4 flex items-center space-x-2 cursor-pointer text-black  rounded-md"
              }
            >
              <FaLinkSlash className="size-6 p-1" /> Shorten Links
            </li>
          </Link>
          <Link href="/app/manage">
            <li
              className={
                pathname === "/app/manage"
                  ? "p-2 mt-4 flex items-center space-x-2 cursor-pointer text-white  rounded-md bg-black "
                  : "p-2 mt-4 flex items-center space-x-2 cursor-pointer text-black  rounded-md"
              }
            >
              <RiLinksFill className="size-6 p-1" /> Manage Links
            </li>
          </Link>
          <Link href="/app/profile">
            <li
              className={
                pathname === "/app/profile"
                  ? "p-2 mt-4 flex items-center space-x-2 cursor-pointer text-white  rounded-md bg-black "
                  : "p-2 mt-4 flex items-center space-x-2 cursor-pointer text-black  rounded-md"
              }
            >
              <BiUserCircle className="size-6 p-1" /> Profile
            </li>
          </Link>
        </ul>
      </motion.div>

      <div className="md:flex hidden fixed  left-0 h-screen shadow-xl bg-white w-[30%] lg:w-[20%]  rounded-r-xl">
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
                pathname === "/app/manage"
                  ? "p-2 w-full mt-4 flex items-center space-x-2 cursor-pointer text-white bg-black rounded-md"
                  : "p-2 w-full mt-4 flex items-center space-x-2 cursor-pointer text-black hover:bg-black hover:text-white rounded-md"
              }
            >
              <RiLinksFill className="size-6 p-1" /> Manage Links
            </li>
          </Link>
          <Link href="/app/profile">
            <li
              className={
                pathname === "/app/profile"
                  ? "p-2 w-full mt-4 flex items-center space-x-2 cursor-pointer text-white bg-black rounded-md"
                  : "p-2 w-full mt-4 flex items-center space-x-2 cursor-pointer text-black hover:bg-black hover:text-white rounded-md"
              }
            >
              <BiUserCircle className="size-6 p-1" /> Profile
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
