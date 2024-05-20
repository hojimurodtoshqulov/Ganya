import React from "react";

const Heading = ({ text }: { text: string }) => {
  return (
    <h2 className="text-4xl md:text-5xl font-bold text-main-300 font-comfortaa">
      {text}
    </h2>
  );
};

export default Heading;
