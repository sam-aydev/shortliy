"use client";

import { useLinks } from "@/utils/hooks/useLinks";
import { Label, Legend, Pie, PieChart, Tooltip } from "recharts";
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

  const clickCounts: any = links?.data.map((item: any) => item.click_count);
  const totalClickCount: any = clickCounts?.reduce(
    (acc: any, count: any) => acc + count,
    0
  );
  return (
    <div className=" px-4 min-h-screen">
      <div className="mt-4">
        <p className="font-bold">Hi {user?.data?.user_metadata?.username}</p>
      </div>

      <div className="flex  w-full  mt-10 ">
        <div className="flex flex-col justify-between  p-3 border-slate-800 rounded-md  mx-auto  size-48 shadow-2xl ">
          <p className="font-semibold text-lg flex items-center justify-between ">
            SHORTENED LINKS{" "}
            <RiLinksFill className="size-8 p-1 rounded-full bg-slate-200" />{" "}
          </p>
          <p className="text-center font-semibold ">10</p>
        </div>
        <div className="flex flex-col justify-between  p-3 border-slate-800 rounded-md  mx-auto  size-48 shadow-2xl ">
          <p className="font-semibold text-lg flex items-center justify-between ">
            TOTAL CLICKS{" "}
            <TbClick className="size-8 p-1 rounded-full bg-slate-200" />{" "}
          </p>
          <p className="text-center font-semibold ">0</p>
        </div>
      </div>

      {/* <PieChart>
              <Pie
                data={links?.data}
                dataKey="shortened_link"
                nameKey="click_count"
                innerRadius={60}
                strokeWidth={5}
                color="blue"
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
              </Pie>
            </PieChart> */}

      <ShortenLinkItem
        isOn={isOn}
        menuRef={menuRef}
        setIsOn={setIsOn}
        fiveLinks={fiveLinks}
      />
    </div>
  );
}
