import DetelCard from "./detelpage";
import BackLink from "@/components/dashboard/back-link";
import { getDictionary } from "@/lib/get-dictionary";

interface propstype {
  params: {
    articlesId: string;
    lang: "uz" | "ru";
  };
}

async function getData(paramsId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/articles/single/${paramsId}`,
    {
      cache: "no-store",
    },
  );

  return res.json();
}

export default async function DetelPage({
  params: { lang, articlesId },
}: propstype) {
  const data = await getData(articlesId);
  const langue = await getDictionary(lang);

  return (
    <div>
      <BackLink title={langue.dashboard.admin.articels.home.back} />
      <DetelCard data={data} lang={lang} articlesId={articlesId} />
    </div>
  );
}
