import { getDictionary } from "@/lib/get-dictionary";
import ArticlesPage from "./articles";
import Banner from "@/components/shared/banner";

async function getData<T>(): Promise<T[] | Error> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/articles/all`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return new Error("Failed to fetch data");
  }
  return res?.json();
}

interface props {
  params: {
    lang: "ru" | "uz";
  };
}

export default async function Articles({ params: { lang } }: props) {
  const data = await getData();
  const langue = await getDictionary(lang);

  return (
    <div>
      <div className="container pt-24">
        <Banner />
      </div>
      <ArticlesPage langue={langue} articls={data} lang={lang} />;
    </div>
  );
}
