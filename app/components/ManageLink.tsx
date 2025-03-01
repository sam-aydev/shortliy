"use client";

import { useLink } from "@/utils/hooks/useLink";
import { useRouter } from "next/navigation";
import { BiCopy } from "react-icons/bi";
import { FaCopy } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";

export default function ManageLink({ id }: any) {
  const router = useRouter();
  const { link, linkError, isLoadingLink }: any = useLink(id);
  if (isLoadingLink) {
    return (
      <div className="flex items-center h-screen justify-center">
        <ClipLoader color="#000000" loading={isLoadingLink} size={70} />
      </div>
    );
  }
  console.log(link);
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        {link?.map((item: any) => (
          <div className="grid grid-cols-2 gap-4 place-items-center  ">
            <div className="flex flex-col justify-between items-center bg-slate-100 rounded-lg p-2 size-36">
              <h2 className="font-semibold text-[16px]">ORIGINAL LINK </h2>
              <div className="flex space-x-2 items-center mt-2">
                <p>{item?.original_url}</p>
                <BiCopy className="size-4" />
              </div>
            </div>
            <div className="flex flex-col justify-between items-center bg-slate-100  rounded-lg p-2 size-36">
              <h2 className="font-semibold text-[16px]">SHORTENED LINK </h2>
              <div className="flex space-x-2 items-center mt-2">
                <p>{item?.shortened_link}</p>
                <BiCopy className="size-4" />
              </div>
            </div>
            <div className="flex flex-col justify-between items-center bg-slate-100 rounded-lg p-2 size-36">
              <h2 className="font-semibold text-[16px]">CLICKS</h2>
              <div className="flex space-x-2 items-center mt-2">
                <p>0 clicks</p>
                <BiCopy className="size-4" />
              </div>
            </div>
            <div className="flex flex-col justify-between items-center bg-slate-100 rounded-lg p-2 size-36">
              <h2 className="font-semibold text-[16px]">QR Code LINK </h2>
              <div className="flex space-x-2 items-center mt-2">
                <p>www.orilsl.co</p>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={() => router.back()}
          className="mt-4 rounded-md  p-2 bg-black text-white"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
