import Heading from "@/components/ui/heading";
import { fitsdata } from "@/constants/fits";
import React from "react";
import Icon from "@/icons/Eye-white.svg";
import Image from "next/image";
import icon1 from "@/icons/icon1.svg";
import icon2 from "@/icons/icon2.svg";
import icon3 from "@/icons/icon3.svg";
import icon4 from "@/icons/icon4.svg";
import icon5 from "@/icons/icon5.svg";

const images = [icon1, icon2, icon3, icon4, icon5];

interface Fits {
  title: string;
  cards: { id: number; text: string }[];
}

const Fits = ({ fits }: { fits: Fits }) => {
  return (
    <div className="container">
      <Heading text={fits.title} />
      <div className="mt-10">
        <div className="grid grid-cols-12 gap-6">
          {fits.cards.map((e, i) => (
            <div
              key={i}
              className={`bg-csneutral-200 p-10 rounded-[40px] lg:col-span-4 md:col-span-6 col-span-12 ${e.id > 3 ? "col-span-12 lg:col-span-6" : ""}`}
            >
              <div className="">
                <Image width={48} height={48} src={images[i]} alt="Icon" />
              </div>
              <p className="text-[22px] leading-[32px] mt-8 font-sans">
                {e.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fits;
