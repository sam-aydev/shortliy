import { BiCopy } from "react-icons/bi";
import { FaCopy } from "react-icons/fa6";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  console.log(id);
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div className="grid grid-cols-2 gap-4 place-items-center  ">
          <div className="flex flex-col justify-between items-center bg-slate-100 rounded-lg p-2 size-36">
            <h2 className="font-semibold text-[16px]">ORIGINAL LINK </h2>
            <div className="flex space-x-2 items-center mt-2">
              <p>www.orilsl.co</p>
              <BiCopy className="size-4" />
            </div>
          </div>
          <div className="flex flex-col justify-between items-center bg-slate-100  rounded-lg p-2 size-36">
            <h2 className="font-semibold text-[16px]">SHORTENED LINK </h2>
            <div className="flex space-x-2 items-center mt-2">
              <p>wrilsl.co</p>
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
        <button className="mt-4 rounded-md  p-2 bg-black text-white">
          Go Back
        </button>
      </div>
    </div>
  );
}
