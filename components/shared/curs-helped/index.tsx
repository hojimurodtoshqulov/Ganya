import Heading from "@/components/ui/heading";
import { helpcurs } from "@/constants/help-curse";
import React from "react";

const CurseHelp = () => {
  return (
    <div className="container">
      <Heading text="Курс поможет" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        {helpcurs.map((e, i) => (
          <div key={e.id} className="bg-csneutral-100 p-10 rounded-[40px]">
            <h4 className="text-[32px] leading-[44px] font-comfortaa mb-[16px]">
              {e.title}
            </h4>
            <p className="text-[22px] leading-[32px]">{e.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurseHelp;
