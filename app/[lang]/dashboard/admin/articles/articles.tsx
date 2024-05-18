"use client";

import React, { FC, useState, useEffect } from "react";
import { Articlsall } from "@/types/auth";
import { Search } from "lucide-react";
import Link from "next/link";
import CardArticls from "@/components/dashboard/articls/articlscard";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { getLangText } from "@/lib/utils";
import { format } from "date-fns";

interface dataProps {
  lang: string;
  data?: any;
}

const ArticlesPage = ({ data, lang }: dataProps): JSX.Element => {
  const [searchText, setSearchText] = useState<string>("");

  const filteredData = data?.filter((element: Articlsall) =>
    element.titleUz?.toLowerCase().includes(searchText.toLowerCase()),
  );

  console.log(data, "this is data");

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="relative w-[350px] ">
          <Search className="absolute top-[10px] left-2" />
          <Input
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Поиск статьей"
            className="w-full pl-[35px]"
          />
        </div>
        <Link
          className={buttonVariants({ variant: "main" })}
          href={"/dashboard/admin/articles/post"}
        >
          {"Yangi maqola qo'shing"}
        </Link>
      </div>
      <div className="grid lg:grid-cols-4 gap-6 mt-10 md:grid-cols-2 grid-cols-1">
        {filteredData?.map((element: any, i: number) => (
          <Link key={i} href={`/dashboard/admin/articles/${element?.id}`}>
            <CardArticls
              title={lang === "uz" ? element?.titleRu : element.titleUz}
              text={lang === "uz" ? element.textRu : element?.textUz}
              time={format(new Date(element.updatedAt), "MMMM dd, yyyy")}
              minut={9}
              width
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
