import React from "react";

const Heading = ({ text }: { text: string }) => {
  return (
    <h2 className="leading-[70px] text-[56px] font-bold text-main-300 font-comfortaa">
      {text}
    </h2>
  );
};

export default Heading;
