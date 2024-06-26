"use client";

import Link from "next/link";
import Image from "next/image";
import siblingsHero from "@/images/siblings-hero.png";
import childrensSchedule from "@/images/childrens-schedule.png";
import arrowCorner from "@/icons/arrowleftCorner.svg";
import { buttonVariants } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordian-card";
import { ImageIcon } from "lucide-react";
import { getLangText } from "@/lib/utils";

interface Props {
  gridData?: any;
  id?: string;
  type?: string;
  lang: string;
  data?: any;
}

const CourceCard: React.FC<Props> = ({ id, gridData, type, lang, data }) => {
  const [toggle, setToggle] = useState(true);
  // const [data, setData] = useState<any>([]);
  const [error, setError] = useState(false);
  const totalModules = data?.Module?.length;
  const gridDataModules = gridData?.Module?.length;
  // console.log(data);
  // useEffect(() => {
  //   async function getData() {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/courses/single/${id}`,
  //       {
  //         cache: "no-store",
  //       },
  //     );

  //     if (!res.ok) {
  //       return new Error("Failed to fetch data");
  //     }
  //     const a = await res.json();
  //     console.log(a, "a");
  //     setData(a);
  //   }

  //   const d = async () => await getData();
  //   if (d instanceof Error) {
  //     setError(true);
  //   }
  // }, [id]);

  if (type === "grid") {
    return (
      <div
        className={`bg-csneutral-100 transition-colors flex flex-col w-full  gap-4 lg:gap-10  p-4 lg:p-6 xl:p-7 rounded-[20px] xl:rounded-[40px] justify-between `}
      >
        <div className="relative w-full h-56 ">
          {gridData?.image ? (
            <Image
              src={gridData.image}
              alt={gridData?.descriptionRu}
              className="rounded-[20px] xl:rounded-[40px] h-auto w-auto  overflow-hidden"
              fill={true}
            />
          ) : (
            <span className="rounded-[20px] bg-white flex  items-center justify-center h-full xl:rounded-[40px] w-full md:w-auto overflow-hidden">
              <ImageIcon />
            </span>
          )}
        </div>

        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-row items-center justify-between gap-4 grow">
            <h2 className="font-bold text-[22px] md:text-4xl lg:text-[44px] text-main-300 font-comfortaa">
              {lang === "ru" ? gridData?.titleRu : gridData?.titleUz}
            </h2>
            <Link
              href={`/${lang}/courses/${gridData?.id}`}
              className="flex justify-end"
            >
              <Image src={arrowCorner} alt="salom" className="md:block" />
            </Link>
          </div>

          <div className="flex flex-row items-center justify-between gap-2">
            <div className="flex flex-row items-center justify-between gap-3 md:gap-5">
              <p className="border-main-300 border text-main-300 rounded-[30px]  text-base md:text-[22px] px-2 py-[4px]  md:px-4 md:py-2 ">
                {gridDataModules} {lang === "ru" ? "Модули" : "Modul"}{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <h2>Failed to fetch data.</h2>;
  }

  return (
    <AccordionItem value={data?.id} className="border-none">
      <div className=" rounded-[20px] md:rounded-[40px] overflow-hidden  bg-csneutral-100">
        <div
          className={` ${toggle ? "bg-main-100" : "bg-csneutral-100"} transition-colors   flex flex-col md:grid md:grid-cols-[2fr_3fr] w-full  gap-4 lg:gap-10  p-4 lg:p-8 xl:p-10 rounded-[20px] xl:rounded-[40px] `}
        >
          <div className="h-56 sm:h-auto md:w-[370px] lg:w-[485px] w-full relative">
            {data?.image ? (
              <Image
                src={data?.image}
                alt={data?.descriptionRu}
                className="rounded-[20px] h-full w-full xl:rounded-[40px] overflow-hidden"
                fill={true}
              />
            ) : (
              <span className="rounded-[20px] bg-white flex  items-center justify-center h-full xl:rounded-[40px] w-full md:w-auto overflow-hidden">
                <ImageIcon />
              </span>
            )}
          </div>

          <div className="grow flex flex-col justify-between">
            <div className="flex flex-col  justify-between gap-4">
              <Link
                href={`/${lang}/courses/${id}`}
                className="flex justify-between grow"
              >
                <h2 className="font-bold text-[22px] md:text-4xl lg:text-[44px] text-main-300 font-comfortaa">
                  {lang === "ru" ? data?.titleRu : data?.titleUz}
                </h2>
                <Image
                  src={arrowCorner}
                  alt="arrow"
                  className="hidden md:block"
                />
              </Link>
              <p className="mt-0 sm:mt-2  md::mt-6 font-normal text-[14px] md:text-xl lg:text-[20px] md:leading-[28px] text-main-300 font-comfortaa line-clamp-4">
                {getLangText(lang, data?.descriptionUz, data?.descriptionRu)}
                ...
              </p>
              <AccordionTrigger
                onClick={() => setToggle((e) => !e)}
                className={`${buttonVariants({ variant: "main" })} hidden  w-11 h-11 md:w-14 md:h-14`}
              ></AccordionTrigger>
            </div>

            <div className="flex flex-row items-center justify-between gap-2">
              <div className="flex flex-row items-center justify-between gap-3 md:gap-5">
                <p className="border-main-300 border text-main-300 rounded-[30px]  text-base md:text-[22px] px-2 py-[4px]  md:px-4 md:py-2 ">
                  {lang === "ru" ? "Модули" : "Modullar"}
                </p>
              </div>

              <AccordionTrigger
                onClick={() => setToggle((e) => !e)}
                className={`${buttonVariants({ variant: "main" })} w-11 h-11 md:w-14 md:h-14 `}
              ></AccordionTrigger>
            </div>
          </div>
        </div>

        <AccordionContent>
          <div className="p-4 lg:p-10 xl:py-12 xl:px-10  w-full  overflow-hidden ">
            <div className="flex flex-col md:grid md:grid-cols-2 gap-5  relative">
              {data?.Module?.map((item: any, index: any) => (
                <div key={item.id}>
                  <div
                    className={` md:border-b-0 md:my-4 border-csneutral-200 ${index % 2 === 1 ? "md:border-l  md:pl-5 border-csneutral-200" : ""}  ${index < totalModules - 1 ? "border-b  pb-3 md:pb-0" : "border-b-0"}`}
                  >
                    <h3 className="text-2xl md:text-[32px] mb-4 text-csneutral-600 font-bold font-comfortaa">
                      {lang === "ru" ? item.titleRu : item?.titleUz}
                    </h3>
                    <p className="text-base md:text-lg text-csneutral-500 font-normal">
                      {lang === "ru" ? item.descriptionRu : item.descriptionUz}
                    </p>
                  </div>
                  {index % 2 === 1 &&
                  (index < totalModules - 2 || index < totalModules - 1) ? (
                    <span className=" my-3 md:absolute  right-0 h-[1px] w-[100%] bg-csneutral-200"></span>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="grid bg-main-100 rounded-3xl p-3 h-[202px] justify-start items-center md:grid-cols-[70px_1fr] gap-2 md:p-5  md:grid-rows-2 md:mt-8 mt-5  md:gap-4  md:items-center sm:h-auto">
              <Image
                src={childrensSchedule}
                alt="salom"
                className="md:row-span-3 row-span-1 col-span-1"
                width={69}
                height={86}
              />
              <h4 className="text-lg font-normal text-main-300 row-span-1 col-start-2 col-span-4">
                {lang === "ru"
                  ? "Подарок для участниц стандартного и ВИП-тарифа"
                  : "Standart va VIP tarif ishtirokchilari uchun sovg'a"}
              </h4>
              <h1 className="w-full font-comfortaa font-bold text-[20px] leading-6 sm:text-[22px] sm:leading-7 md:text-3xl text-main-300 row-span-2 col-start-1 col-span-4  md:row-span-2 md:col-span-2">
                {lang === "ru"
                  ? "Книга рецептов для малышей до года"
                  : "Bir yoshgacha bo'lgan chaqaloqlar uchun retseptlar kitobi"}
              </h1>
            </div>
          </div>
        </AccordionContent>
      </div>
    </AccordionItem>
  );
};

export default CourceCard;
