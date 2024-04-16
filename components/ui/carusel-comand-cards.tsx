import Image from "next/image";
import React from "react";

const CaruselCardcom = () => {
  return (
    <div className="w-[425px] p-10 bg-[#F4F5F5] rounded-[40px]">
      <Image
        src={""}
        alt="Image"
        width={345}
        height={320}
        className="bg-[#F4F1C6]"
      />
      <h3 className="font-bold text-[32px] mt-5 mb-2">Имя Фамилия</h3>
      <p className="font-normal text-[22px]">Основатель</p>
    </div>
  );
};

export default CaruselCardcom;
