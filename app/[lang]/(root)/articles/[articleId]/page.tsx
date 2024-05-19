import Heading from "@/components/ui/heading";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Articlsall } from "@/types/auth";
import CardStatya from "@/components/shared/stati/card-stati";
import DeteleArticle from "./detelpage";
import { getDictionary } from "@/lib/get-dictionary";

interface propstype {
  params: {
    articleId: string;
    lang: "uz" | "ru";
  };
}
async function getData(articlesId: string) {
  const res = await fetch(
    `https://oar-api.onrender.com/api/v1/articles/single/${articlesId}`,
    {
      cache: "no-cache",
    },
  );

  return res.json();
}

async function getDetel() {
  const res = await fetch(`https://oar-api.onrender.com/api/v1/articles/all`, {
    cache: "no-cache",
  });

  return res.json();
}

export default async function SingleArticle({
  params: { lang, articleId },
}: propstype) {
  const detel = await getData(articleId);
  const articlsall = await getDetel();
  const langue = await getDictionary(lang);
  return (
    <DeteleArticle
      detel={detel}
      langue={langue}
      articlsall={articlsall}
      lang={lang}
    />
  );
}
