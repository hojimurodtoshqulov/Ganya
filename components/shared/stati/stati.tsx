"use client";

import React from "react";
import CardStatya from "./card-stati";
import { buttonVariants } from "@/components/ui/button";
import { Articlsall } from "@/types/auth";
import Link from "next/link";
import { format } from "date-fns";

async function Getpost() {
  const response = await fetch(
    "https://oar-api.onrender.com/api/v1/articles/all",
    { method: "GET" },
  );

  return response.json();
}

async function Stati({ container }: { container?: string }) {
  const getdata = await Getpost();

  return (
    <div className="bg-csneutral-100 py-20 my-16">
      <div className={`${container}`}>
        <h2 className="title text-h2 leading-[56px] mb-8">Статьи</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {getdata.slice(-3).map((article: Articlsall) => (
            <Link key={article.id} href={`/articles/${article.id}`}>
              <CardStatya
                key={article.id}
                title={article.headlineUz}
                text={article.textUz}
                time={format(new Date(article.updatedAt), "MMMM dd, yyyy")}
              />
            </Link>
          ))}
        </div>
        <div className="flex justify-center align-middle">
          <Link
            className={`${buttonVariants({ variant: "main" })} rounded-[20px] text-lg px-8 mt-8`}
            href={"/articles"}
          >
            Перейти к статьям
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Stati;
