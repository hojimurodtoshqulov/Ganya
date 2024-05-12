"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Articlsall } from "@/types/auth";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

interface propstype {
  params: {
    articlesId: string;
  };
}

const DetelPage = ({ params }: propstype) => {
  async function getData<T>(): Promise<T[] | Error> {
    const res = await fetch(
      `https://oar-api.onrender.com/api/v1/articles/single/${params.articlesId}`,
    );
    if (!res.ok) {
      return new Error("Failed to fetch data");
    }
    return res.json();
  }

  const [data, setData] = useState<Articlsall>();

  const fetchData = async () => {
    const result: any = await getData();
    if (!(result instanceof Error)) {
      setData(result);
    }
  };

  useState(() => {
    fetchData();
  });

  return (
    <div>
      <Link
        href={"/dashboard/admin/articles/"}
        className={`${buttonVariants({ variant: "link" })} flex gap-2 items-center`}
      >
        <FaChevronLeft className="font-normal" />
        Orqaga
      </Link>
      <div className="bg-white rounded-2xl p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-[24px] leading-[36px] text-main-300">
            {data?.headlineUz}
          </h2>
          <Link href={`/dashboard/admin/articles/${params.articlesId}/edit`}>
            <Pencil className="cursor-pointer" />
          </Link>
        </div>
        <h4 className="text-lg text-main-300 mt-5">{data?.textUz}</h4>
        <p className="text-sm mt-1">{data?.textUz}</p>
      </div>
    </div>
  );
};

export default DetelPage;
