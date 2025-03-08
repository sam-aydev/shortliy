"use client";

import { HiLogout } from "react-icons/hi";
import { signOut } from "@/utils/actions/server";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import MobileSidebar from "./MobileSidebar";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";

export default function AppLayout({ user }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    try {
      setIsLoggingOut(true);
      const { message, error }: any = await signOut();
      if (error) {
        toast.error(error);
        return;
      }
      toast.success(message);
      router.push("/login");
    } catch (error: any) {
      toast.error(error);
      setIsLoggingOut(false);
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <div>
      {/* Header - NavBar */}
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
          <p className="text-sm font-semibold md:text-lg">
            Welcome {user?.data?.user_metadata?.username}
          </p>
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

      {/* mobile sidebar */}
      <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
