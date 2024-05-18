import Image from "next/image";
import React from "react";
import pay1 from "@/icons/pay-1.png";
import pay2 from "@/icons/pay-2.png";
import pay3 from "@/icons/pay-3.png";
import { getDictionary } from "@/lib/get-dictionary";

interface propstype {
  params: {
    lang: "uz" | "ru";
  };
}

export default async function Sucsesspage({ params: { lang } }: propstype) {
  const langue = await getDictionary(lang);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="bg-white p-10 rounded-2xl w-[650px]">
        <h1 className="text-main-300 text-[32px] font-bold leading-[44px] font-comfortaa mb-8">
          {langue.pay.heading}
        </h1>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <p className="text-lg font-normal text-[#585D65]">
              {langue.pay.title}
            </p>{" "}
            <h2 className="text-[22px] leading-[32px] text-main-300 font-bold">
              Премиум
            </h2>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg font-normal text-[#585D65]">
              {langue.pay.pay}
            </p>{" "}
            <h2 className="text-[22px] leading-[32px] text-main-300 font-bold">
              850.000 UZS
            </h2>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-4 items-center">
          <div className="border rounded-xl px-6 py-4 w-full flex justify-center md:w-[180px]">
            <Image
              src={pay1}
              width={100}
              height={100}
              alt="Pay images logo"
            ></Image>
          </div>
          <div className="border rounded-xl px-6 py-4 w-full flex justify-center md:w-[180px]">
            <Image
              src={pay2}
              width={100}
              height={100}
              alt="Pay images logo"
            ></Image>
          </div>
          <div className="border rounded-xl px-6 py-4 w-full flex justify-center md:w-[180px]">
            <Image
              src={pay3}
              width={100}
              height={100}
              alt="Pay images logo"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
}
