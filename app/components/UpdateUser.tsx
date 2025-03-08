"use client"


import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { updateUser } from "@/utils/actions/server";



export default function UpdateUser(){
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
  
    async function handleSubmit(e: any) {
      e.preventDefault();
      if (!password) {
        toast.error("Please fill in all the details!");
        return;
      }
      try {
        setIsLoading(true);
        const { message, error } = await updateUser(password);
        if (error) {
          toast.error(error);
        }
        if (message) {
          toast.success(message);
          router.push("/update_user");
        }
      } catch (error: any) {
        toast.error(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
  
    return (
      <>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2 w-full">
          <div className="">
            <label className="block">New Password:</label>
            <input
              disabled={isLoading}
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              type="email"
              placeholder="Your new password..."
              className="p-2 border-black border-2 rounded w-full"
            />
          </div>
  
          <button
            disabled={isLoading}
            className="bg-black p-2 text-white rounded flex justify-center space-x-2 items-center  hover:bg-slate-900"
          >
            <ClipLoader color="#fffff" loading={isLoading} size={15} />
            <span className="px-[2px]">Change Password</span>
          </button>
        </form>
      </>
    );
  }
  