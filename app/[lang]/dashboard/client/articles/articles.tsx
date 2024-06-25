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
  langue: any;
}

const ArticlesPage = ({ data, lang, langue }: dataProps): JSX.Element => {
  const [searchText, setSearchText] = useState<string>("");

  const filteredData = data?.filter((element: Articlsall) =>
    element.titleUz?.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <h2 className="title text-h2 leading-[56px] mb-8">
          {langue.home.articlesHome.title}
        </h2>
        <div className="relative w-[350px] ">
          <Search className="absolute top-0 h-full left-2" />
          <Input
            onChange={(e) => setSearchText(e.target.value)}
            placeholder={langue.dashboard.admin.articels?.home?.search}
            className="w-full pl-9"
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-4 gap-6 mt-10 md:grid-cols-2 grid-cols-1">
        {filteredData?.map((element: any, i: number) => (
          <Link key={i} href={`/dashboard/client/articles/${element?.id}`}>
            <CardArticls
              title={lang === "uz" ? element?.titleUz : element.titleRu}
              text={lang === "uz" ? element.textUz : element?.textRu}
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
