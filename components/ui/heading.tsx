import React from "react";

const Heading = ({ text }: { text: string | undefined }) => {
  return (
    <h2 className="text-3xl md:text-5xl font-bold text-main-300 font-comfortaa">
      {text}
    </h2>
  );
};

export default Heading;
