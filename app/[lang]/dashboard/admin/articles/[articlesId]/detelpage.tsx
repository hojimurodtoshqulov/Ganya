import Link from "next/link";
import React from "react";
import { FaSquarePen } from "react-icons/fa6";

const DetelCard = ({ data, articlesId, lang }: any) => {
  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-[24px] leading-[36px] text-main-300">
          {lang === "ru" ? data?.titleRu : data.titleUz}
        </h2>
        <Link href={`/dashboard/admin/articles/${articlesId}/edit`}>
          <FaSquarePen className="cursor-pointer text-3xl" />
        </Link>
      </div>
      <h4 className="text-lg text-main-300 mt-5">
        {lang === "ru" ? data?.textRu : data.textUz}
      </h4>
      <p className="text-sm mt-1">
        {lang === "ru" ? data?.textRu : data.tuextUz}
      </p>
    </div>
  );
};

export default DetelCard;
