"use client";

import { useLinks } from "@/utils/hooks/useLinks";
import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import ShortenLinkItem from "./ShortenLinkItem";
import { RiLinksFill } from "react-icons/ri";
import { TbClick } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import { useFiveLinks } from "@/utils/hooks/useFiveLinks";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useDaysData } from "@/utils/hooks/useLinksDays";
import { ClipLoader } from "react-spinners";

export default function Dashboard({ user }: any) {
  const [isOn, setIsOn] = useState(null);
  const [range, setRange] = useState<any>({});
  const [showPicker, setShowPicker] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  console.log(range?.from?.toISOString());
  const start = range?.from?.toISOString();
  const end = range?.to?.toISOString();

  useEffect(
    function () {
      function handleOutsideClick(event: MouseEvent) {
        if (
          (event.target as Node) &&
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          setIsOn(null);
        }
      }

      const handleClickOutside = (event: MouseEvent) => {
        if (
          (event.target as Node) &&
          popoverRef.current &&
          !popoverRef.current.contains(event.target as Node)
        ) {
          setShowPicker(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      document.addEventListener("mousedown", handleOutsideClick);

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    },
    [isOn, setIsOn]
  );

  const { fiveLinks, fiveLinksError, isLoadingFiveLinks }: any = useFiveLinks();

  const { linksDays, linksDaysError, isLoadingLinksDays } = useDaysData({
    start,
    end,
  });
  console.log(linksDays);

  const clickCounts: any = linksDays?.data?.map(
    (item: any) => item.click_count
  );
  const totalClickCount: any = clickCounts?.reduce(
    (acc: any, count: any) => acc + count,
    0
  );

  if (isLoadingLinksDays || isLoadingFiveLinks) {
    return (
      <div className="flex items-center h-screen justify-center">
        <ClipLoader
          color="#000000"
          loading={isLoadingLinksDays || isLoadingFiveLinks}
          size={70}
        />
      </div>
    );
  }
  return (
    <div className=" px-4 min-h-screen lg:w-2/3 mx-auto">
      <div className="mt-4">
        <p className="">Hi {user?.data?.user_metadata?.username}</p>
      </div>

      <div className="w-full p-4 relative">
        <div className="flex gap-2 mb-4 w-1/2 justify-end ">
          <input
            type="text"
            value={
              range.from || range.to
                ? range.from?.toLocaleDateString() +
                  "-" +
                  range.to?.toLocaleDateString()
                : "Pick a date"
            }
            readOnly
            onFocus={() => setShowPicker(true)}
            className="border p-2 rounded w-full"
          />
        </div>

        {showPicker && (
          <div
            ref={popoverRef}
            className="absolute top-4 z-10 bg-white border p-4 rounded shadow-lg"
            style={{ top: "100%", left: 0 }}
          >
            <DayPicker
              mode="range"
              selected={range}
              onSelect={setRange}
              footer={
                range.from && range.to ? (
                  <p className="mt-4">
                    Selected from {range.from.toLocaleDateString()} to{" "}
                    {range.to.toLocaleDateString()}
                  </p>
                ) : (
                  <p className="mt-4">Please select a start and end date.</p>
                )
              }
            />
          </div>
        )}
      </div>

      <div className="flex space-x-2 w-full  mt-10 ">
        <div className=" w-1/2 border-2  flex flex-col justify-between  p-3 border-slate-800 rounded-md  mx-auto  size-48 shadow-2xl ">
          <p className="font-semibold text-lg flex items-center justify-between ">
            SHORTENED LINKS{" "}
            <RiLinksFill className="size-8 p-1 rounded-full bg-slate-200" />{" "}
          </p>
          <p className="text-center font-semibold ">{linksDays?.data?.length}</p>
        </div>
        <div className=" w-1/2 border-2 flex flex-col justify-between  p-3 border-slate-800 rounded-md  mx-auto  size-48 shadow-2xl ">
          <p className="font-semibold text-lg flex items-center justify-between ">
            TOTAL CLICKS{" "}
            <TbClick className="size-8 p-1 rounded-full bg-slate-200" />{" "}
          </p>
          <p className="text-center font-semibold ">{totalClickCount}</p>
        </div>
      </div>

      <div className="w-full h-96 mx-auto shadow-2xl mt-8 rounded-md p-2 ">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={500} height={400}>
            <Pie
              data={linksDays?.data}
              nameKey="shortened_link"
              innerRadius={85}
              outerRadius={110}
              cx="40%"
              cy="50%"
              paddingAngle={3}
              dataKey="click_count"
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalClickCount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
              {linksDays?.data?.map((entry, index): any => {
                <Cell key={index} fill={entry.color} stroke={entry.color} />;
              })}
            </Pie>

            <Tooltip content={<CustomToolTip />} />
          </PieChart>
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
        <p className="p-2">{payload[0].name}</p>

        <p className="p-2">Shortened Link: {payload[0].value}</p>
      </div>
    );
  }
};
