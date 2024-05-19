import Image from "next/image";
import React from "react";
import imges from "@/images/success.png";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/get-dictionary";

interface propstype {
  params: {
    lang: "uz" | "ru";
  };
}

export default async function Message({ params: { lang } }: propstype) {
  const langue = await getDictionary(lang);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="p-6 rounded-2xl flex flex-col items-center bg-white">
        <Image
          src={imges}
          width={320}
          height={220}
          alt="Succses images
        "
        />
        <h1 className="text-main-300 mt-2 md:text-[32px] text-[24px] leading-[28px]  font-bold md:leading-[44px] font-comfortaa mb-8">
          {langue.auth.sucsestitle}
        </h1>
        <Button className="w-full" variant={"main"}>
          {langue.auth.btn2}
        </Button>
      </div>
    </div>
  );
}
