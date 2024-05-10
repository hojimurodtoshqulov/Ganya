"use client";

import CardArticls from "@/components/dashboard/articls/articlscard";
import CardStatya from "@/components/shared/stati/card-stati";
import { Button, buttonVariants } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Articlsall } from "@/types/auth";
import { Search } from "lucide-react";
import Link from "next/link";
import { FC, useState } from "react";

async function getData<T>(): Promise<T[] | Error> {
  const res = await fetch("https://oar-api.onrender.com/api/v1/articles/all", {
    cache: "no-store",
  });
  if (!res.ok) {
    return new Error("Failed to fetch data");
  }
  return res.json();
}

const Articles: FC = (): JSX.Element => {
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

  console.log(filteredData);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="relative w-[350px] ">
          <Search className="absolute top-[10px] left-2" />
          <Input placeholder="Поиск статьей" className="w-full pl-[35px]" />
        </div>
        <Link
          className={buttonVariants({ variant: "main" })}
          href={"/dashboard/admin/articles/post"}
        >
          {"Yangi maqola qo'shing"}
        </Link>
      </div>
      <div className="grid lg:grid-cols-4 gap-6 mt-10 md:grid-cols-2 grid-cols-1">
        {filteredData?.map((element, i) => (
          <Link key={i} href={`/dashboard/admin/articles/${element?.id}`}>
            <CardArticls
              title={element?.titleUz}
              text={element?.textUz}
              time="Mar 25, 2024"
              minut={9}
              width
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Articles;
