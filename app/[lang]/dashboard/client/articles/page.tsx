import { getDictionary } from "@/lib/get-dictionary";
import ArticlesPage from "./articles";

async function getData<T>(): Promise<T[] | Error> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/articles/all`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return new Error("Failed to fetch data");
  }
  return res.json();
}

interface propstype {
  params: {
    lang: "uz" | "ru";
  };
}

export default async function Articles({ params: { lang } }: propstype) {
  const data = await getData();
  if (data instanceof Error) return <h2>Failed to fetch data.</h2>;
  const langue = await getDictionary(lang);
  return <ArticlesPage data={data} lang={lang} langue={langue} />;
}
