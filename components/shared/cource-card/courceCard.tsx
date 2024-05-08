"use client";

import Link from "next/link";
import Image from "next/image";
import siblingsHero from "@/images/siblings-hero.png";
import childrensSchedule from "@/images/childrens-schedule.png";
import arrowCorner from "@/icons/arrowleftCorner.svg";
import { buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordian-card";
import { courceCardData } from "@/constants";


interface Props {
  courceCard: any,
  type?: string
}

const CourceCard: React.FC<Props> = ({ courceCard, type }) => {
  const { modules, title, id } = courceCardData;
  const totalModules = modules.length;
  const [toggle, setToggle] = useState(false);

  if (type === 'grid') {
    return (
      <div className={`bg-csneutral-100 transition-colors   flex flex-col w-full  gap-4 lg:gap-10  p-4 lg:p-6 xl:p-7 rounded-[20px] xl:rounded-[40px] justify-between `}>
        <Image
          src={siblingsHero}
          alt="title"
          className="rounded-[20px] xl:rounded-[40px] h-auto w-full md:w-auto overflow-hidden"
        />

        <div className="grow flex flex-col justify-between space-y-8">
          <div className="flex flex-row items-center justify-between gap-4">
            <h2 className="font-bold text-[22px] md:text-4xl lg:text-[44px] text-main-300 font-comfortaa">{title}</h2>
            <Link href={"/"} className="flex flex-row items-center justify-between">
              <Image src={arrowCorner} alt="salom" className="hidden md:block" />
            </Link>
          </div>

          <div className="flex flex-row items-center justify-between gap-2">
            <div className="flex flex-row items-center justify-between gap-3 md:gap-5">
              <p className=" border-main-300 border text-main-300 rounded-[30px] px-2 py-[4px]  md:px-4 md:py-2  text-base md:text-[22px]">31 видео уроков</p>
              <p className="border-main-300 border text-main-300 rounded-[30px]  text-base md:text-[22px] px-2 py-[4px]  md:px-4 md:py-2 ">{totalModules} модулей</p>
            </div>

          </div>
        </div>
      </div>
    )
  }

  return (
    <AccordionItem value={id} className="border-none ">
      <div className=" rounded-[20px] md:rounded-[40px] overflow-hidden  bg-csneutral-100">
        <div className={` ${toggle ? 'bg-main-100' : 'bg-csneutral-100'} transition-colors   flex flex-col md:flex-row w-full  gap-4 lg:gap-10  p-4 lg:p-8 xl:p-10 rounded-[20px] xl:rounded-[40px] lg:h-[320px]`}>
          <Image
            src={siblingsHero}
            alt="title"
            className="rounded-[20px] xl:rounded-[40px] h-auto w-full md:w-auto overflow-hidden"
          />

          <div className="grow flex flex-col justify-between space-y-8">
            <div className="flex flex-row items-center justify-between gap-4">
              <h2 className="font-bold text-[22px] md:text-4xl lg:text-[44px] text-main-300 font-comfortaa">{title}</h2>
              <Link href={"/"} className="flex flex-row items-center justify-between">
                <Image src={arrowCorner} alt="salom" className="hidden md:block" />
              </Link>



              <AccordionTrigger onClick={() => setToggle(e => !e)} className={`${buttonVariants({ variant: "main" })}  md:hidden w-11 h-11 md:w-14 md:h-14`}>
              </AccordionTrigger>

            </div>

            <div className="flex flex-row items-center justify-between gap-2">
              <div className="flex flex-row items-center justify-between gap-3 md:gap-5">
                <p className=" border-main-300 border text-main-300 rounded-[30px] px-2 py-[4px]  md:px-4 md:py-2  text-base md:text-[22px]">31 видео уроков</p>
                <p className="border-main-300 border text-main-300 rounded-[30px]  text-base md:text-[22px] px-2 py-[4px]  md:px-4 md:py-2 ">{totalModules} модулей</p>
              </div>

              <AccordionTrigger onClick={() => setToggle(e => !e)} className={`${buttonVariants({ variant: "main" })}  hidden md:flex w-11 h-11 md:w-14 md:h-14 `}>
              </AccordionTrigger>
            </div>
          </div>
        </div>


        <AccordionContent>





          <div className="p-4 lg:p-10 xl:py-12 xl:px-10  w-full  overflow-hidden ">
            <div className="flex flex-col md:grid md:grid-cols-2 gap-5  relative">
              {modules.map((item, index) => (
                <div key={item.id}>
                  <div className={` md:border-b-0 md:my-4 border-csneutral-200 ${index % 2 === 1 ? 'md:border-l  md:pl-5 border-csneutral-200' : ''}  ${index < totalModules - 1 ? 'border-b  pb-3 md:pb-0' : 'border-b-0'}`}>
                    <h3 className="text-2xl md:text-[32px] mb-4 text-csneutral-600 font-bold font-comfortaa">
                      {item.modulTitle}
                    </h3>
                    <p className="text-base md:text-lg text-csneutral-500 font-normal">
                      {item.modulDescription}
                    </p>
                  </div>
                  {(index % 2 === 1 && (index < totalModules - 2 || index < totalModules - 1)) ? <span className=" my-3 md:absolute  right-0 h-[1px] w-[100%] bg-csneutral-200"></span>
                    : null}
                </div>
              ))}
            </div>

            <div className="bg-main-100 rounded-3xl p-3 md:p-5 grid md:grid-rows-2 grid-rows-2 md:mt-8 mt-5 grid-flow-col gap-2 md:gap-4 justify-start items-center md:items-center h-[202px] sm:h-auto">
              <Image src={childrensSchedule} alt="salom" className="md:row-span-3 row-span-1 col-span-1" width={69} height={86} />
              <h4 className="text-lg font-normal text-main-300 row-span-1 col-start-2 col-span-4">Подарок для каждой участницы курса:</h4>
              <h1 className="w-full font-comfortaa font-bold text-[20px] leading-6 sm:text-[22px] sm:leading-7 md:text-3xl text-main-300 row-span-2 col-start-1 col-span-4  md:row-span-2 md:col-span-2">Книга рецептов для малышей до года и тд</h1>
            </div>
          </div>
        </AccordionContent>

      </div >
    </AccordionItem>
  );
}


export default CourceCard;