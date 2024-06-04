import Image from "next/image";
import React from "react";
import Icon2 from "@/icons/Vector-dars2.svg";
import Icon1 from "@/icons/Vector-dars1.svg";

type Props = { isActive?: boolean; title: string };

const DarsList = ({ isActive, title }: Props) => {
  return (
    <div>
      <div className=" w-full p-4 flex gap-3 rounded-2xl bg-white">
        <div className="w-[60px] h-[60px] flex justify-center items-center rounded-xl bg-csneutral-100 flex-shrink-0">
          <Image
            src={isActive ? Icon1 : Icon2}
            alt="vector"
            priority
            width={20}
            height={20}
          />
        </div>

        <div className="flex gap-1 flex-col w-full">
          <p
            className={`text-sm font-normal leading- flex justify-between ${isActive ? "text-csneutral-400" : "text-csneutral-500"}`}
          >
            {/* <span>Урок 1</span> */}
            <span className={` ${isActive ? "max-sm:hidden" : "hidden"} `}>
              Есть домашнее задание
            </span>
          </p>
          <p
            className={` sm:text-[22px] text-lg font-normal leading-8  ${isActive ? "text-csneutral-400" : "text-csneutral-500"}`}
          >
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DarsList;
