import React from "react";
import CardStatya from "./card-stati";
import { buttonVariants } from "@/components/ui/button";
import { Articlsall } from "@/types/auth";
import Link from "next/link";
import { format } from "date-fns";

async function getPost() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/articles/all`,
    { method: "GET" },
  );
  if (!response.ok) {
    return new Error("Failed to fetch data");
  }

  return response.json();
}

async function Stati({
  container,
  lang,
  articles,
}: {
  articles: any;
  container?: string;
  lang: string;
}) {
  const getdata = await getPost();
  const data = getdata?.length > 2 ? getdata.slice(0, 3) : getdata;
  return (
    <div className="bg-csneutral-100 py-10 my-10 md:my-20">
      <div className={`${container}`}>
        <h2 className="title text-h2 leading-[56px] mb-8">{articles.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((article: Articlsall) => (
            <Link key={article.id} href={`/articles/${article.id}`}>
              <CardStatya
                key={article.id}
                title={lang === "ru" ? article.titleRu : article.titleUz}
                text={lang === "uz" ? article.textUz : article.textRu}
                time={format(new Date(article.updatedAt), "MMMM dd, yyyy")}
              />
            </Link>
          ))}
        </div>
        <div className="flex justify-center align-middle">
          <Link
            className={`${buttonVariants({ variant: "main" })} rounded-[20px] text-lg px-8 mt-8`}
            href={"/articles"}
          >
            {articles.btn}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Stati;
