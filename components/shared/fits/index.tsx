import Heading from "@/components/ui/heading";
import { fitsdata } from "@/constants/fits";
import React from "react";
import Icon from "@/icons/Eye-white.svg";
import Image from "next/image";

const Fits = () => {
  return (
    <div className="container">
      <Heading text="Кому подходит курс" />
      <div className="mt-10">
        <div className="grid grid-cols-12 gap-6">
          {fitsdata.map((e: any, i) => (
            <div
              key={i}
              className={`bg-csneutral-200 p-10 rounded-[40px] col-span-4 ${e.id > 3 ? "col-span-6 " : ""}`}
            >
              <div className="p-4 bg-main-200 rounded-xl w-14 h-14">
                <Image width={24} height={24} src={Icon} alt="Icon" />
              </div>
              <p className="text-[22px] leading-[32px] mt-8 font-sans">
                {e.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fits;
