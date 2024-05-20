import Heading from "@/components/ui/heading";
import { helpcurs } from "@/constants/help-curse";
import React from "react";
interface Help {
  title: string;
  cards: { heading: string; desc: string }[];
}

const CurseHelp = ({ help }: { help: Help }) => {
  return (
    <div className="container">
      <Heading text={help.title} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        {help.cards.map((e, i) => (
          <div key={i} className="bg-csneutral-100 p-10 rounded-[40px]">
            <h4 className="text-[22px] md:text-[32px] md:leading-[44px] leading-9 font-comfortaa mb-[16px]">
              {e.heading}
            </h4>
            <p className="md:text-[22px] text-[17px] md:leading-[32px] leading-7">
              {e.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurseHelp;
