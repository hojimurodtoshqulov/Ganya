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
    `${process.env.NEXT_PUBLIC_BASE_URL}/articles/single/${articlesId}`,
    {
      cache: "no-store",
    },
  );

  return res.json();
}

async function getDetel() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/articles/all`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function SingleArticle({
  params: { lang, articleId },
}: propstype) {
  const detel = await getData(articleId);
  const articlsall = await getDetel();
  const langue = await getDictionary(lang);

  if (detel instanceof Error) {
    return <h2>Failed to fetch data.</h2>;
  }

  if (articlsall instanceof Error) {
    return <h2>Failed to fetch data.</h2>;
  }

  return (
    <DeteleArticle
      detel={detel}
      langue={langue}
      articlsall={articlsall}
      lang={lang}
    />
  );
}
