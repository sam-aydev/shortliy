"use client";

import { useLink } from "@/utils/hooks/useLink";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiCopy } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import { HiShare } from "react-icons/hi2";
import { TbCopyCheckFilled } from "react-icons/tb";
import { ClipLoader } from "react-spinners";

export default function LinkItem({ id }: any) {
  const [isCopy, setCopied] = useState(null)
  const router = useRouter();
  const { link, linkError, isLoadingLink }: any = useLink(id);
  if (isLoadingLink) {
    return (
      <div className="flex items-center h-screen justify-center">
        <ClipLoader color="#000000" loading={isLoadingLink} size={70} />
      </div>
    );
  }
  
  function handleCopy(data: string, id: any){
    navigator.clipboard.writeText(data).then(()=> {
      setCopied(id)
      setTimeout(()=> setCopied(null), 2000)
    })
  }
  return ( 
    <div className="flex justify-center items-center h-screen ">
      <div className=" mx-auto">
        <div className=" grid grid-cols-2 gap-2 place-items-center md:gap-3">
          <div className="flex flex-col justify-between items-center bg-slate-100 rounded-lg p-2 size-40 sm:w-48 ">
            <div>
              <h2 className="font-semibold text-[16px]">ORIGINAL LINK </h2>
            </div>
            <div className="flex space-x-2  mx-auto  text-xs font-semibold items-center mt-2 md:text-sm">
              <p>{link?.data?.original_link.slice(0, 20)}...</p>
             {isCopy === 1  ? 
               <TbCopyCheckFilled className="cursor-pointer size-4"/>
             : <BiCopy onClick={()=> handleCopy(link?.data?.original_link, 1)} className="cursor-pointer size-4" />
              }
            </div>
          </div>
          <div className="flex flex-col justify-between items-center bg-slate-100  rounded-lg p-2 size-40 sm:w-48">
            <h2 className="font-semibold text-[16px]">SHORTENED LINK </h2>
            <div className="flex  space-x-2  text-xs font-semibold items-center mt-2 md:text-sm">
              <p>{link?.data?.shortened_link.slice(0, 20)}...</p>
              {isCopy === 2 ? 
              <TbCopyCheckFilled className="cursor-pointer size-4"/>
              : 
              <BiCopy onClick={()=> handleCopy(link?.data?.shortened_link, 2)} className="cursor-pointer size-4" />
              }
            </div>
          </div>
          <div className="flex flex-col justify-between items-center bg-slate-100 rounded-lg p-2 size-40 sm:w-48">
            <h2 className="font-semibold text-[16px]">CLICKS</h2>
            <div className="flex space-x-2  text-sm font-semibold items-center mt-2">
              <p>{link?.data?.click_count} clicks</p>
              {isCopy === 3 ? 
              <TbCopyCheckFilled className="cursor-pointer size-4"/>
              : 
              <BiCopy onClick={()=> handleCopy(link?.data?.click_count, 3)} className="cursor-pointer size-4" />
              }
            </div>
          </div>
          <div className="flex flex-col justify-between items-center border-2 border-slate-100 rounded-lg p-2 size-40 sm:w-48">
            <h2 className="font-semibold text-[16px]">QR Code LINK </h2>
            <div className="flex space-x-2 items-center -mt-1">
              <Image
                src={link?.data?.qr_code_url}
                alt="qr_code"
                width={400}
                height={400}
                className="h-32"
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => router.back()}
          className="hover:bg-slate-800 mt-4 rounded-md  p-2 bg-black text-white"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
