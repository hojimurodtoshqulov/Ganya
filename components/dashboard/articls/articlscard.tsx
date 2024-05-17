import React from "react";
interface CardProps {
  title: string;
  text: string;
  time: string;
  minut: number;
  bacraund?: boolean;
  width?: boolean;
  hight?: boolean;
}

function CardArticls(props: CardProps) {
  return (
    <div
      className={`flex flex-wrap flex-col gap-4 rounded-2xl p-6 ${!props.width ? "max-w-[424px]" : "w-full"} h-[200px]} justify-between ${!props.bacraund ? "bg-white" : "bg-[#F4F5F5]"}`}
    >
      <div className="flex flex-col gap-3">
        <h2 className="text-[20px] leading-[28px] font-bold font-comfortaa text-csneutral-600">
          {props.title}
        </h2>
        <p className="text-[12px] leading-[18px] text-csneutral-500">
          {props.text}...
        </p>
      </div>

      <div className="flex gap-2 text-lg">
        <p>{props.time}</p>
      </div>
    </div>
  );
}

export default CardArticls;
