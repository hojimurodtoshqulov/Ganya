"use client";

import Heading from "@/components/ui/heading";
import Image from "next/image";
import Link from "next/link";
import Stati from "@/components/shared/stati/stati";
import images from "@/images/siblings-hero.png";
import { useEffect, useState } from "react";
import { Articlsall } from "@/types/auth";
import CardStatya from "@/components/shared/stati/card-stati";

interface Props {
  params: {
    articleId: string;
  };
}

// async function getArticles<T>(id: string): Promise<T[] | Error> {
//   const res = await fetch(
//     process.env.NEXT_PUBLIC_BASE_URL + "/articles/single/" + id,
//     {
//       cache: "no-store",
//     },
//   );

//   if (!res.ok) {
//     return new Error("Failed to fetch data");
//   }

//   return res?.json();
// }

// const articles = await getArticles<{
//   id: string;
//   createdAt: string;
//   updatedAt: string;
//   titleUz: string;
//   headlineUz: string;
//   headlineRu: string;
//   textUz: string;
//   textRu: string;
//   imageWeb: any;
//   imageMobile: any;
//   link: string;
//   isPublished: boolean;
// }>(params.articleId);

// console.log(articles);

export default function SingleArticle({ params }: Props) {
  const [data, setData] = useState<Articlsall>();
  const [articls, setArticls] = useState([]);
  useEffect(() => {
    fetch(
      `https://oar-api.onrender.com/api/v1/articles/single/${params.articleId}`,
    )
      .then((res) => res.json())
      .then((json) => setData(json));

    fetch(`https://oar-api.onrender.com/api/v1/articles/all`)
      .then((res) => res.json())
      .then((json) => setArticls(json));
  }, [params?.articleId]);

  return (
    <div>
      <div className="pt-32 ">
        <div className="container">
          <Image
            className="w-full aspect-[66/17] h-[340px] object-cover rounded-[40px]"
            src={data?.articleImage}
            width={1320}
            height={328}
            alt="images"
          />
        </div>
      </div>
      <div className="py-28">
        <div className="flex lg:flex-row flex-col-reverse  justify-between container w-full gap-6">
          <div className="bg-csneutral-100 w-full p-10 rounded-[40px]">
            <Heading text={`${data?.headlineUz}`} />
            <h2 className="font-normal text-[32px] leading-[44px] mb-4 font-comfortaa mt-8">
              Подзаголовок
            </h2>
            <p className="font-normal w-full text-2xl text-[#585D65]">
              {data?.textUz}
            </p>
          </div>
          <Link className="flex flex-col w-[425px]" href={`${data?.link}`}>
            <Image
              src={data?.imageWeb}
              className="lg:w-[425px] w-full lg:h-[620px] h-[140px] object-cover rounded-[40px] bg-slate-400 "
              width={425}
              height={620}
              alt="Image baner"
            />
          </Link>
        </div>
      </div>
      <div className="bg-csneutral-100 py-40">
        <div className="container ">
          <h2 className="title text-h2 leading-[56px] mb-8">Статьи</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articls.slice(-3).map((article: Articlsall) => (
              <Link key={article.id} href={`/articles/${article.id}`}>
                <CardStatya
                  key={article.id}
                  title={article.headlineUz}
                  text={article.textUz}
                  time={article.updatedAt}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
