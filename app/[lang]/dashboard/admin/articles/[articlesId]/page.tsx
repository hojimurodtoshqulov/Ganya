import DetelCard from "./detelpage";
import BackLink from "@/components/dashboard/back-link";
import { getDictionary } from "@/lib/get-dictionary";
import Image from "next/image";

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

  if (!res.ok) {
    return new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function DetelPage({
  params: { lang, articlesId },
}: propstype) {
  const data = await getData(articlesId);

  if (data instanceof Error) {
    return <h2>Failed to fetch data.</h2>;
  }
  const langue = await getDictionary(lang);

  return (
    <div>
      <BackLink title={langue.dashboard.admin.articels.home.back} />
      {/* <Image
        src={data?.articleImageMobile ?? ""}
        alt="image"
        width={400}
        height={400}
      />
      <Image
        src={data?.articleImageWeb ?? ""}
        alt="image"
        width={400}
        height={400}
      /> */}
      <DetelCard data={data} lang={lang} articlesId={articlesId} />
    </div>
  );
}
