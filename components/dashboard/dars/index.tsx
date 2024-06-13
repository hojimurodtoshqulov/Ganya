"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  videoLink: string;
  next?: string;
  prev?: string;
  lang: "uz" | "ru";
};
const Dars = ({ videoLink, next, prev, lang }: Props) => {
  const router = useRouter();

  return (
    <div className="w-full p-6 rounded-2xl bg- flex gap-4 flex-col bg-white">
      <div className="w-full aspect-[5/3] bg-csneutral-100 rounded-xl flex justify-center items-center relative">
        <video
          controls
          controlsList="nodownload"
          className="w-full h-full rounded-sm absolute top-0 left-0"
        >
          <source src={videoLink} type="video/mp4" />
        </video>
      </div>
      <div className="btn-container flex justify-between items-center">
        <Button
          variant={"main"}
          size={"default"}
          disabled={!prev}
          onClick={() => router.replace(prev ?? "")}
          className="rounded-[10px] text-sm px-8 py-3 mt-8 max-[500px]:w-full"
        >
          {lang === "ru" ? "Предыдущий урок" : "Avvalgi dars"}
        </Button>
        <Button
          variant={"main"}
          size={"default"}
          disabled={!next}
          onClick={() => router.replace(next ?? "")}
          className="rounded-[10px] text-sm px-8 py-3 mt-8 max-[500px]:w-full"
        >
          {lang === "ru" ? "Следующий урок" : "Keyingi dars"}
        </Button>
      </div>
      {/* <div className="text flex flex-col gap-5">
        <p className=" text-csneutral-500 font-normal text-[22px] leading-8 ">
          Подзаголовок
        </p>
        <p className=" text-sm font-normal leading-5">
          Тут будет домашнее задание
        </p>
      </div> */}
    </div>
  );
};
export default Dars;
