import Image from "next/image";
import { FC } from "react";
import images from "@/images/about1.png";
import AbautModal from "@/components/dashboard/o-nas-modal";
import { getDictionary } from "@/lib/get-dictionary";
import { cookies } from "next/headers";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

interface abaouttype {
  lang: "uz" | "ru";
}

async function getData() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/statics/idx/about`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return new Error("Failed to fetch data");
  }

  return response.json();
}

export default async function About({ lang }: abaouttype) {
  const langue = await getDictionary(lang);
  const data = await getData();
  if (data instanceof Error) {
    return <h2>Failed to fetch data.</h2>;
  }

  const accessToken = cookies().get("accessToken")?.value;

  return (
    <div>
      <div className="container">
        <div className="flex items-center gap-5 bg-main-100 p-4 rounded-lg relative">
          <Image
            src={data[0]?.file}
            width={100}
            height={100}
            className="object-cover w-[200px] h-[200px] rounded"
            alt="Abaut us informatin"
          />
          <div>
            <h2 className="text-2xl text-main-300 mb-5">
              {lang === "ru" ? data[0]?.titleRu : data[0]?.titleUz}
            </h2>
            <p className="text-base text-main-200">
              {lang === "ru" ? data[0]?.textRu : data[0]?.textUz}
            </p>
          </div>
          <AbautModal
            lang={lang}
            accessToken={accessToken}
            langue={langue}
            defaultValues={data[0]}
          />
        </div>
      </div>
    </div>
  );
}
