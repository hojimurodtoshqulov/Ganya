import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Play from "@/icons/Play.svg";

const Dars = () => {
  return (
    <div className="w-full p-6 rounded-2xl bg- flex gap-4 flex-col bg-white">
      <div className="w-full aspect-[5/3] bg-csneutral-100 rounded-xl flex justify-center items-center">
        <Image
          src={Play}
          alt="image"
          className="w-8 h-8 md:w-20 md:h-20"
          priority
        />
      </div>
      <div className="btn-container flex justify-end">
        <Button
          variant={"main"}
          size={"default"}
          className="rounded-[10px] text-sm px-8 py-3 mt-8 max-[500px]:w-full"
        >
          Следующий урок
        </Button>
      </div>
      <div className="text flex flex-col gap-5">
        <p className=" text-csneutral-500 font-normal text-[22px] leading-8 ">
          Подзаголовок
        </p>
        <p className=" text-sm font-normal leading-5">
          Тут будет домашнее задание
        </p>
      </div>
    </div>
  );
};
export default Dars;
