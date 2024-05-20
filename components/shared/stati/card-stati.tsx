import Link from "next/link";
import React from "react";
interface CardProps {
  title: string;
  text: string;
  time: string;
  bacraund?: boolean;
  width?: boolean;
  hight?: boolean;
}

function CardStatya(props: CardProps) {
  return (
    <div
      className={`flex flex-wrap flex-col gap-4 rounded-[40px] p-6 ${!props.width ? "max-w-[424px]" : "w-full bg-gray-950"} ${!props.hight ? "h-[375px]" : "h-auto"} justify-between ${!props.bacraund ? "bg-white" : "bg-[#F4F5F5]"}`}
    >
      <div className="flex flex-col gap-3">
        <h2 className="text-[28px] leading-[44px] font-comfortaa text-csneutral-600">
          {props.title}
        </h2>
        <p className="text-[18px] leading-[32px] text-csneutral-500">
          {props.text}...
        </p>
      </div>

      <div className="flex gap-2 text-lg">
        <p>{props.time}</p>
      </div>
    </div>
  );
}

export default CardStatya;
