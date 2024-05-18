import ArticlesPage from "./articles";

async function getData<T>(): Promise<T[] | Error> {
  const res = await fetch("https://oar-api.onrender.com/api/v1/articles/all", {
    cache: "no-store",
  });
  if (!res.ok) {
    return new Error("Failed to fetch data");
  }
  return res?.json();
}

interface props {
  params: {
    lang: string;
  };
}

export default async function Articles({ params: { lang } }: props) {
  const data = await getData();

  return <ArticlesPage articls={data} lang={lang} />;
}
