import DeteleArticle from "./detelpage";
import { getDictionary } from "@/lib/get-dictionary";

interface propstype {
  params: {
    articlesId: string;
    lang: "uz" | "ru";
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

export default async function SingleArticle({
  params: { lang, articlesId },
}: propstype) {
  const detel = await getData(articlesId);
  if (detel instanceof Error) return <h2>Failed to fetch data.</h2>;
  const langue = await getDictionary(lang);

  return <DeteleArticle detel={detel} langue={langue} lang={lang} />;
}
