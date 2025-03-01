"use client";
import { deleteLinkById } from "@/utils/actions/server";
import { useLinks } from "@/utils/hooks/useLinks";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FcDeleteRow } from "react-icons/fc";
import { GrView } from "react-icons/gr";
import { LuView } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import { ClipLoader } from "react-spinners";

export default function ManageLinks() {
  const [isOn, setIsOn] = useState(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      if (!isOn) return;
      function handleOutsideClick(event: MouseEvent): void {
        if (
          (event.target as Node) &&
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          setIsOn(null);
        }
      }

      document.addEventListener("mousedown", handleOutsideClick);

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    },
    [isOn, setIsOn]
  );

  const { links, LinksError, isLoadingLinks }: any = useLinks();

  if (isLoadingLinks) {
    return (
      <div className="flex items-center h-screen justify-center">
        <ClipLoader color="#000000" loading={isLoadingLinks} size={70} />
      </div>
    );
  }

  async function handleDelete(id: number) {
    try {
      setIsLoading(true);
      const { message, error } = await deleteLinkById(id);
      if (error) {
        toast.error(error);
      }
      if (message) {
        toast.success(message);
      }
    } catch (error: any) {
      toast.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="min-h-screen px-3">
      {links?.data ? (
        <div className="text-sm font-bold w-full mt-3 lg:w-2/3 md:mx-auto">
          <div className=" ">
            <div className=" w-full mx-auto">
              <div className="gap-4  grid grid-cols-4 px-3 text-center bg-black text-white py-2 rounded">
                <div className="w-[30%] text-right">Time</div>
                <div className="w-[30%]">Original Link</div>
                <div className="w-[30%]">Shortened Link</div>
              </div>
            </div>
            <div className="relative z-50 w-full mx-auto mt-2 ">
              {links?.data?.map((item: any) => (
                <div
                  key={item.id}
                  className=" bg-slate-200 mb-2 px-2 gap-4 grid text-xs grid-cols-4 text-black py-2 rounded"
                >
                  <div className="text-center">2hr</div>
                  <div className="">{item.original_link.slice(0, 9)}...</div>
                  <div className="">{item.shortened_link.slice(0, 15)}...</div>
                  <div
                    onClick={() => setIsOn(item.id)}
                    className="flex justify-end cursor-pointer"
                  >
                    <BiDotsVerticalRounded className="cursor-pointer size-6 bg-white rounded-full p-1 hover:bg-black hover:text-white" />
                  </div>
                  {isOn === item.id && (
                    <div
                      ref={menuRef}
                      className=" flex flex-col space-y-2 right-0 justify-end mt-7  bg-white rounded-md p-2 absolute"
                    >
                      <Link href={`/app/manage/${item.id}`}>
                        <button className="hover:text-green-700   flex items-center space-x-2">
                          <GrView className="size-5" /> <span>View</span>
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="hover:text-red-700 flex items-center space-x-2"
                      >
                        {isLoading ? (
                          <ClipLoader
                            color="red"
                            loading={isLoading}
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
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <h2 className="font-bold text-lg w-3/4 mx-auto text-center">
            No Shortened Links Yet!
          </h2>
        </div>
      )}
    </div>
  );
}
