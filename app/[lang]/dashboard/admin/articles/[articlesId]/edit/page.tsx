import React from "react";
import FormEditArticle from "./FormEdit";
import { cookies } from "next/headers";
import { date } from "zod";
import { getDictionary } from "@/lib/get-dictionary";

interface Props {
  params: {
    articlesId: string;
    lang: "ru" | "uz";
  };
}

async function getData(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/articles/single/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return new Error("Failed to fetch data");
  }

  return response.json();
}

export default async function Post({ params: { articlesId, lang } }: Props) {
  const data = await getData(articlesId);

  if (data instanceof Error) return <h2>Failed to fetch data.</h2>;

  const accessToken = cookies().get("accessToken")?.value;
  const langue = await getDictionary(lang);

  return (
    <>
      <FormEditArticle
        lang={lang}
        langue={langue}
        articleId={articlesId}
        defaultValues={data}
        accessToken={accessToken}
      />
    </>
  );
}
