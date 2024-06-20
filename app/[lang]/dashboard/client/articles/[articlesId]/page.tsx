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

  return response.json();
}

export default async function SingleArticle({
  params: { lang, articlesId },
}: propstype) {
  const detel = await getData(articlesId);
  const langue = await getDictionary(lang);

  return <DeteleArticle detel={detel} langue={langue} lang={lang} />;
}
