import React from "react";
import AddBanner from "./addCard";
import BannerCard from "./card";
import { cookies } from "next/headers";
import { getDictionary } from "@/lib/get-dictionary";

interface banner {
  id: string;
  createdAt: string;
  updatedAt: string;
  imageWeb: string;
  imageMobile: string;
  link: string;
  isPublished: boolean;
}

async function getData<T>(): Promise<T | Error> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/banners/all`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return new Error("Failed to fetch data");
  }

  return res.json();
}

const Banner = async ({ lang }: { lang: "uz" | "ru" }) => {
  const accessToken = cookies().get("accessToken")?.value;

  const dictionary = await getDictionary(lang);

  const banners = await getData<banner[]>();
  if (banners instanceof Error) {
    return <h2>Failed to fetch data.</h2>;
  }

  return (
    <div className="bg-neutral-100 flex flex-wrap gap-5">
      {banners.map((banner, id) => (
        <BannerCard
          key={id}
          banner={banner}
          id={id}
          accessToken={accessToken}
          lang={lang}
          dictionary={dictionary.dashboard.admin.baner.modal}
        />
      ))}
      <AddBanner
        accessToken={accessToken}
        lang={lang}
        dictionary={dictionary.dashboard.admin.baner.modal}
      />
    </div>
  );
};

export default Banner;
