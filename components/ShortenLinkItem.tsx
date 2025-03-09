import { timeAgo } from "@/utils/actions/client";
import { deleteLinkById } from "@/utils/actions/server";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GrView } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { ClipLoader } from "react-spinners";

export default function ShortenLinkItem({
  fiveLinks,
  isOn,
  setIsOn,
  menuRef,
}: any) {
    
  const [isLoadingLink, setIsLoadingLink] = useState<boolean>(false);

  async function handleDelete(id: number) {
    try {
      setIsLoadingLink(true);
      const { message, error } = await deleteLinkById(id);
      if (error) {
        toast.error(error);
      }
      if (message) {
        toast.success(message);
      }
    } catch (error: any) {
      toast.error(error);
      setIsLoadingLink(false);
    } finally {
      setIsLoadingLink(false);
    }
  }
  return (
    <div className="text-sm font-bold w-full">
      <div className=" ">
        <div className="w-full mx-auto mt-16 ">
          <div className="gap-4  grid grid-cols-4 px-3 text-center bg-black text-white py-2 rounded">
            <div className="w-[30%] text-right">Time</div>
            <div className="w-[30%]">Original Link</div>
            <div className="w-[30%]">Shortened Link</div>
          </div>
        </div>
        <div className="relative z-50 w-full mx-auto mt-2 ">
          {fiveLinks?.data?.map((item: any) => (
            <div
              key={item.id}
              className="bg-slate-200 mb-2 px-2 gap-4 grid text-xs grid-cols-4 text-black py-2 rounded"
            >
              <div className="text-center">{timeAgo(item.created_at)}</div>
              <div className="">{item.original_link.slice(0, 9)}...</div>
              <div className="">{item.shortened_link.slice(0, 15)}...</div>
              <div
                onClick={() => setIsOn(item.id)}
                className="flex justify-end cursor-pounter"
              >
                <BiDotsVerticalRounded className="cursor-pointer size-6 bg-white rounded-full p-1 hover:bg-black hover:text-white" />
              </div>
              {isOn === item.id && (
                <div
                  ref={menuRef}
                  className=" flex flex-col space-y-2 right-0 justify-end mt-7 bg-white rounded-md p-2 absolute"
                >
                  <Link href={`/app/manage/${item.id}`}>
                    <button className="hover:text-green-700  flex items-center space-x-2">
                      <GrView className="size-5" /> <span>View</span>
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="hover:text-red-700 flex items-center space-x-2"
                  >
                    {isLoadingLink ? (
                      <ClipLoader
                        color="red"
                        loading={isLoadingLink}
                        size={15}
                      />
                    ) : (
                      <MdDeleteForever className="size-5" />
                    )}{" "}
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {fiveLinks?.data?.length >= 5 ? (
        <div>
          <Link href="/app/manage">
            <button className="hover:bg-black hover:text-white duration-300 text-black mt-4  w-full bg-slate-100 p-2 rounded-md">
              See Links
            </button>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
