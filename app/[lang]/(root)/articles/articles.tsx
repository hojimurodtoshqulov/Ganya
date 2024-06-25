"use client";

import { useState } from "react";
import { Articlsall } from "@/types/auth";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import CardStatya from "@/components/shared/stati/card-stati";
import Heading from "@/components/ui/heading";
import Link from "next/link";
import { format } from "date-fns";

interface props {
  articls?: Articlsall[] | any;
  lang: string;
  langue: any;
}

export default function ArticlesPage({ articls, lang, langue }: props) {
  const [searchText, setSearchText] = useState<string>("");

  const filteredData = articls?.filter((element: Articlsall) =>
    element?.titleUz.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div className="container pt-24">
      <div className="flex lg:flex-row mt-10 flex-col gap-2 items-center justify-between">
        <Heading text={langue?.articles?.title} />
        <div className="relative w-full sm:w-[350px] ">
          <Search className="absolute top-0 h-full left-2" />
          <Input
            placeholder="Поиск статьей"
            className="w-full pl-9"
            value={searchText}
            onChange={(e) => setSearchText(e?.target?.value)}
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-6 mt-10 md:grid-cols-2 grid-cols-1">
        {filteredData?.map((element: Articlsall) => (
          <Link key={element.id} href={`/articles/${element.id}`}>
            <CardStatya
              title={lang === "ru" ? element.titleRu : element?.titleUz}
              text={
                lang === "ru"
                  ? element.textRu.slice(0, 80)
                  : element.textUz.slice(0, 80)
              }
              time={format(new Date(element?.updatedAt), "MMMM dd, yyyy")}
              bacraund
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
