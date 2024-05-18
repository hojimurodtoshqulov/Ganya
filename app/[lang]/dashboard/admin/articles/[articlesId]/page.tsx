import { buttonVariants } from "@/components/ui/button";
import { FaSquarePen } from "react-icons/fa6";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import DetelCard from "./detelpage";

interface propstype {
  params: {
    articlesId: string;
    lang: string;
  };
}

async function getData(paramsId: string) {
  const res = await fetch(
    `https://oar-api.onrender.com/api/v1/articles/single/${paramsId}`,
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

  console.log(lang, "uzb");

  return (
    <div>
      <Link
        href={"/dashboard/admin/articles/"}
        className={`${buttonVariants({ variant: "link" })} flex gap-2 items-center`}
      >
        <FaChevronLeft className="font-normal" />
        Orqaga
      </Link>
      <DetelCard data={data} lang={lang} articlesId={articlesId} />
    </div>
  );
}
