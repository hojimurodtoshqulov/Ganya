import { Button, buttonVariants } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";

const DetelPage = () => {
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
            {"Lapinoda tug'ilish. Bu qanday edi? (Maqola nomi)"}
          </h2>
          <Link href={"/dashboard/admin/articles/edit"}>
            <Pencil className="cursor-pointer" />
          </Link>
        </div>
        <h4 className="text-lg text-main-300 mt-5">1-band</h4>
        <p className="text-sm mt-1">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem ex
          officia commodi animi distinctio maiores excepturi quae ipsum natus
          cum, exercitationem fuga earum tempora voluptatibus odit voluptate
          illo nesciunt vero!
        </p>
        <h4 className="text-lg text-main-300 mt-5">1-band</h4>
        <p className="text-sm mt-1">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem ex
          officia commodi animi distinctio maiores excepturi quae ipsum natus
          cum, exercitationem fuga earum tempora voluptatibus odit voluptate
          illo nesciunt vero!
        </p>
      </div>
    </div>
  );
};

export default DetelPage;
