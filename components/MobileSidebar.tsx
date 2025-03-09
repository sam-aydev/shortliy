import { useEffect, useRef, useState } from "react";

import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import { motion } from "motion/react";
import { MdDashboard } from "react-icons/md";
import { FaLinkSlash } from "react-icons/fa6";
import { RiLinksFill } from "react-icons/ri";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function MobileSidebar({ isOpen, setIsOpen }: any) {
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

  return (
    <div>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        ref={sidebarRef}
        className="fixed z-[1000] sidebar left-0 h-screen shadow-xl text-sm font-semibold bg-white w-1/2 rounded-r-xl sm:w-1/3  md:hidden"
      >
        <ul className="flex flex-col space-y-2 px-3">
          <Link href="/app">
            <li
              className={
                pathname === "/app"
                  ? "p-2 mt-4 flex items-center space-x-2 cursor-pointer text-white  rounded-md bg-black"
                  : "p-2 mt-4 flex items-center space-x-2 cursor-pointer text-black  rounded-md hover:bg-black hover:text-white"
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
                  : "p-2 mt-4 flex items-center space-x-2 cursor-pointer text-black  rounded-md hover:bg-black hover:text-white"
              }
            >
              <FaLinkSlash className="size-6 p-1" /> Shorten Links
            </li>
          </Link>
          <Link href="/app/manage">
            <li
              className={
                pathname.startsWith("/app/manage")
                  ? "p-2 mt-4 flex items-center space-x-2 cursor-pointer text-white  rounded-md bg-black "
                  : "p-2 mt-4 flex items-center space-x-2 cursor-pointer text-black  rounded-md hover:bg-black hover:text-white"
              }
            >
              <RiLinksFill className="size-6 p-1" /> Manage Links
            </li>
          </Link>
        </ul>
      </motion.div>
    </div>
  );
}
