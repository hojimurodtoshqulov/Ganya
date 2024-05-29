"use client";

import Heading from "@/components/ui/heading";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Articlsall } from "@/types/auth";
import CardStatya from "@/components/shared/stati/card-stati";
import BackLink from "@/components/dashboard/back-link";

interface Props {
  detel?: any;
  articlsall?: any;
  lang: string;
  langue: any;
}

export default function DeteleArticle({ detel, lang, langue }: Props) {
  return (
    <div>
      <div className="pt-5">
        <div className="container">
          <Image
            className="w-full aspect-[66/17] h-[340px] object-cover rounded-[40px]"
            src={detel?.articleImage}
            width={1320}
            height={328}
            alt="images"
          />
        </div>
      </div>
      <div className="py-10 lg:py28">
        <div className="flex lg:flex-row flex-col-reverse  justify-between container w-full gap-6">
          <div className="bg-csneutral-100 w-full p-10 rounded-[40px]">
            <div className="mb-3">
              <BackLink title={langue.dashboard.admin.articels.home.back} />
            </div>
            <Heading text={lang === "ru" ? detel?.titleRu : detel.titleUz} />
            <h2 className="font-normal  text-[20px] md:text-[32px] leading-[44px] mb-4 font-comfortaa mt-8">
              {lang === "ru" ? detel.headlineRu : detel.headlineUz}
            </h2>
            <p className="font-normal w-full text-1xl md:text-2xl text-[#585D65]">
              {lang === "ru" ? detel?.textRu : detel.textUz}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
