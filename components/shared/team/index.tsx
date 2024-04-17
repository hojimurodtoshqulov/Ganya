import Image from "next/image";
import React from "react";

const TeamCard = () => {
  return (
    <div className="w-full p-4 sm:p-6 md:p-10 bg-csneutral-100 rounded-[20px] md:rounded-[40px]">
      {/* <Image
        src={""}
        alt="Image"
        width={345}
        height={320}
        className="bg-main-100"
      /> */}
      <div className="w-full bg-main-100 rounded-3xl aspect-square"></div>
      <h3 className="font-bold text-2xl md:text-3xl mt-5 font-comfortaa text-csneutral-600">
        Имя Фамилия
      </h3>
      <p className="text-base md:text-[22px]">Основатель</p>
    </div>
  );
};

export default TeamCard;
