"use client";

import { useLinks } from "@/utils/hooks/useLinks";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ShortenLinkItem from "./ShortenLinkItem";
import { RiLinksFill } from "react-icons/ri";
import { TbClick } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import { useFiveLinks } from "@/utils/hooks/useFiveLinks";

export default function Dashboard({ user }: any) {
  const [isOn, setIsOn] = useState(null);
  const menuRef = useRef<HTMLDivElement>(null);

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
  const { fiveLinks, fiveLinksError, isLoadingFiveLinks }: any = useFiveLinks();

  const { links, linksError, isLoadingLinks }: any = useLinks();

  console.log(links);

  const clickCounts: any = links?.data?.map((item: any) => item.click_count);
  const totalClickCount: any = clickCounts?.reduce(
    (acc: any, count: any) => acc + count,
    0
  );
  return (
    <div className=" px-4 min-h-screen lg:w-2/3 mx-auto">
      <div className="mt-4">
        <p className="font-bold">Hi {user?.data?.user_metadata?.username}</p>
      </div>

      <div className="flex space-x-2 w-full  mt-10 ">
        <div className=" w-1/2 border-2  flex flex-col justify-between  p-3 border-slate-800 rounded-md  mx-auto  size-48 shadow-2xl ">
          <p className="font-semibold text-lg flex items-center justify-between ">
            SHORTENED LINKS{" "}
            <RiLinksFill className="size-8 p-1 rounded-full bg-slate-200" />{" "}
          </p>
          <p className="text-center font-semibold ">10</p>
        </div>
        <div className=" w-1/2 border-2 flex flex-col justify-between  p-3 border-slate-800 rounded-md  mx-auto  size-48 shadow-2xl ">
          <p className="font-semibold text-lg flex items-center justify-between ">
            TOTAL CLICKS{" "}
            <TbClick className="size-8 p-1 rounded-full bg-slate-200" />{" "}
          </p>
          <p className="text-center font-semibold ">0</p>
        </div>
      </div>

      <div className="w-full h-96 mx-auto shadow-2xl mt-8 rounded-md p-2 ">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={links?.data} width={500} height={400}>
            <YAxis />
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="shortened_link" />
            <Legend />
            <Tooltip content={<CustomToolTip />} />
            <Line
              fill="blue"
              stroke="black"
              type="monotone"
              dataKey="click_count"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <ShortenLinkItem
        isOn={isOn}
        menuRef={menuRef}
        setIsOn={setIsOn}
        fiveLinks={fiveLinks}
      />
    </div>
  );
}

const CustomToolTip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 py-2 text-white flex flex-col gap-4 rounded-md w-48 ">
        <p className="p-2">{label}</p>

        <p className="p-2">Shortened Link: {payload[0].value}</p>
      </div>
    );
  }
};
