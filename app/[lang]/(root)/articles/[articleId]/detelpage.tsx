"use client";

import Heading from "@/components/ui/heading";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Articlsall } from "@/types/auth";
import CardStatya from "@/components/shared/stati/card-stati";

interface Props {
  detel?: any;
  articlsall?: any;
  lang: string;
  langue: any;
}

export default function DeteleArticle({
  detel,
  articlsall,
  lang,
  langue,
}: Props) {
  console.log(detel, "ths is data");

  return (
    <div>
      <div className="pt-20 ">
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
            <Heading text={lang === "ru" ? detel?.titleRu : detel.titleUz} />
            <h2 className="font-normal  text-[26px] md:text-[32px] leading-[44px] mb-4 font-comfortaa mt-8">
              {lang === "ru" ? detel.headlineRu : detel.headlineUz}
            </h2>
            <p className="font-normal w-full text-2xl text-[#585D65]">
              {lang === "ru" ? detel?.textRu : detel.textUz}
            </p>
          </div>
          <Link
            className="flex w-full h-[250px] flex-col lg:hidden"
            href={`${detel?.link}`}
          >
            <Image
              src={detel?.imageWeb}
              className="lg:w-[450px] w-full lg:h-[620px] h-[250px] object-cover rounded-[40px] bg-slate-400 "
              width={425}
              height={620}
              alt="Image baner"
            />
          </Link>
          <Link
            className="hidden w-1/3 flex-col lg:flex"
            href={`${detel?.link}`}
          >
            <Image
              src={detel?.imageWeb}
              className="lg:w-[450px] w-full lg:h-[620px] h-[140px] object-cover rounded-[40px] bg-slate-400 "
              width={425}
              height={620}
              alt="Image baner"
            />
          </Link>
        </div>
      </div>
      <div className="bg-csneutral-100 py-40">
        <div className="container ">
          <h2 className="title text-h2 leading-[56px] mb-8">
            {langue.articles.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlsall?.slice(-3).map((article: Articlsall) => (
              <Link key={article.id} href={`/articles/${article.id}`}>
                <CardStatya
                  key={article.id}
                  title={lang === "ru" ? article.titleRu : article.titleUz}
                  text={lang === "ru" ? article.textRu : article.titleUz}
                  time={format(new Date(article.updatedAt), "MMMM dd, yyyy")}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
