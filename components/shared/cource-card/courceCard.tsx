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

export default function CourceCard({ courceCardData, index }: any) {
  const lengthOfModals = courceCardData.moduls.length;
  const [toggle, setToggle] = useState(false);

  return (

    <AccordionItem value={index} className="border-none ">
      <div className=" rounded-[20px] md:rounded-[40px] overflow-hidden  bg-csneutral-100">
        <div className={` ${toggle ? 'bg-main-100' : 'bg-csneutral-100'} transition-colors   flex flex-col md:flex-row w-full  gap-4 lg:gap-10  p-4 lg:p-8 xl:p-10 rounded-[20px] xl:rounded-[40px] lg:h-[320px]`}>
          <Image
            src={siblingsHero}
            alt="title"
            className="rounded-[20px] xl:rounded-[40px] h-auto w-full md:w-auto overflow-hidden"
          />

          <div className="grow flex flex-col justify-between space-y-8">
            <div className="flex flex-row items-center justify-between gap-4">
              <h2 className="font-bold text-[22px] md:text-4xl lg:text-[44px] text-main-300 font-comfortaa">Прикорм без проблем</h2>
              <Link href={"/"} className="flex flex-row items-center justify-between">
                <Image src={arrowCorner} alt="salom" className="hidden md:block" />
              </Link>



              <AccordionTrigger onClick={() => setToggle(e => !e)} className={`${buttonVariants({ variant: "main" })}  md:hidden w-11 h-11 md:w-14 md:h-14`}>
              </AccordionTrigger>

            </div>

            <div className="flex flex-row items-center justify-between gap-2">
              <div className="flex flex-row items-center justify-between gap-3 md:gap-5">
                <p className=" border-main-300 border text-main-300 rounded-[30px] px-2 py-[4px]  md:px-4 md:py-2  text-base md:text-[22px]">31 видео уроков</p>
                <p className="border-main-300 border text-main-300 rounded-[30px]  text-base md:text-[22px] px-2 py-[4px]  md:px-4 md:py-2 ">6 модулей</p>
              </div>

              <AccordionTrigger onClick={() => setToggle(e => !e)} className={`${buttonVariants({ variant: "main" })}  hidden md:flex w-11 h-11 md:w-14 md:h-14 `}>
              </AccordionTrigger>
            </div>
          </div>
        </div>


        <AccordionContent>
          <div className="p-4 lg:p-10 xl:py-12 xl:px-10  w-full  overflow-hidden ">
            <div className="flex flex-col md:grid md:grid-cols-2 gap-5">
              <div className="py-4 border-b border-csneutral-200  md:relative">

                <span className="md:absolute right-0 h-[80%] w-[2px] bg-csneutral-200"></span>
                {/* 
                md:relative
                */}
                <h3 className="text-2xl md:text-[32px] mb-4 text-csneutral-600 font-bold font-comfortaa">
                  Модуль 1
                </h3>
                <p className="text-base md:text-lg text-csneutral-500 font-normal">
                  Приглашает вас погрузиться в тему введения первого прикорма
                  для вашего малыша и узнать основные принципы BLW (Baby-Led
                  Weaning – введение прикорма под руководством ребенка)
                </p>
              </div>
              <div className="py-4 border-b border-csneutral-200">
                <h3 className="text-2xl md:text-[32px] mb-4 text-csneutral-600 font-bold font-comfortaa">
                  Модуль 2
                </h3>
                <p className="text-base md:text-lg text-csneutral-500 font-normal">
                  Посвящен формированию пищевого интереса у вашего малыша,
                  помогая вам создать здоровые пищевые привычки.
                </p>
              </div>

              {/* <span className="w-full h-[2px] bg-csneutral-200"></span> */}
              <div className="py-4 border-b border-csneutral-200 md:relative">
                <span className="md:absolute right-0 h-[80%] w-[2px] bg-csneutral-200"></span>

                <h3 className="text-2xl md:text-[32px] mb-4 text-csneutral-600 font-bold font-comfortaa">
                  Модуль 3
                </h3>
                <p className="text-base md:text-lg text-csneutral-500 font-normal">
                  Предлагает всесторонний анализ аллергии и ценную информацию,
                  предоставленную врачом-аллергологом.
                </p>
              </div>
              <div className="py-4 border-b border-csneutral-200">
                <h3 className="text-2xl md:text-[32px] mb-4 text-csneutral-600 font-bold font-comfortaa">
                  Модуль 4
                </h3>
                <p className="text-base md:text-lg text-csneutral-500 font-normal">
                  Разработанный совместно с детским психологом, поможет
                  разобраться в вопросах, связанных с малышами, которые могут
                  испытывать трудности с пищей.
                </p>
              </div>
              <div className="py-4  border-csneutral-200 md:relative border-b md:border-b-0">
                <span className="md:absolute right-0 h-[80%] w-[2px] bg-csneutral-200"></span>

                <h3 className="text-2xl md:text-[32px] mb-4 text-csneutral-600 font-bold font-comfortaa">
                  Модуль 5
                </h3>
                <p className="text-base md:text-lg text-csneutral-500 font-normal">
                  Приглашает вас отправиться на рынок вместе со мной, где я
                  поделюсь советами о том, как выбирать лучшие продукты для
                  вашего малыша.
                </p>
              </div>
              <div className="py-4  border-csneutral-200 ">
                <h3 className="text-2xl md:text-[32px] mb-4 text-csneutral-600 font-bold font-comfortaa">
                  Модуль 6
                </h3>
                <p className="text-base md:text-lg text-csneutral-500 ">
                  Бонусное видео от детского психолога, дарит ценные советы по
                  уходу за малышом и созданию благоприятной пищевой среды для
                  него.
                </p>
              </div>
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
