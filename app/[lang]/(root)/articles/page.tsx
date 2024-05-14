"use client";

import { FC, useState } from "react";
import date from "date-and-time";
import { Articlsall } from "@/types/auth";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import CardStatya from "@/components/shared/stati/card-stati";
import Heading from "@/components/ui/heading";
import Image from "next/image";
import images from "@/images/showcase-hero1.png";
import Link from "next/link";

async function getData<T>(): Promise<T[] | Error> {
  const res = await fetch("https://oar-api.onrender.com/api/v1/articles/all", {
    cache: "no-store",
  });
  if (!res.ok) {
    return new Error("Failed to fetch data");
  }
  return res?.json();
}

const Articles: FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [data, setData] = useState<Articlsall[]>([]);

  const fetchData = async () => {
    const result: any = await getData<Articlsall[]>();
    if (!(result instanceof Error)) {
      setData(result);
    }
  };

  useState(() => {
    fetchData();
  });

  const filteredData = data.filter((element: Articlsall) =>
    element.titleUz.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div className="container pt-20">
      <div className="container">
        <Image
          className="w-full aspect-[66/17] h-[340px] object-cover rounded-[40px]"
          width={1320}
          height={400}
          src={images}
          alt="Articls image baner"
        />
      </div>
      <div className="flex lg:flex-row mt-10 flex-col gap-2 items-center justify-between">
        <Heading text="Статьи" />
        <div className="relative w-[350px] ">
          <Search className="absolute top-[10px] left-2" />
          <Input
            placeholder="Поиск статьей"
            className="w-full pl-[35px]"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-6 mt-10 md:grid-cols-2 grid-cols-1">
        {filteredData?.map((element: Articlsall, i) => (
          <Link key={element.id} href={`/articles/${element.id}`}>
            <CardStatya
              hight
              title={element.titleUz}
              text={element.textUz}
              time={`${date.parse(element.createdAt, "DD-MM-YYYY")}`}
              bacraund
              width
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Articles;
