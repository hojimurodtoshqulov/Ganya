import { teamMembers } from "@/constants/team";
import Image from "next/image";
import React from "react";

const TeamCard = ({data:{image,job,name}}:{data:typeof teamMembers[0]}) => {
  return (
    <div className="w-full p-4 sm:p-6 md:p-10 bg-csneutral-100 rounded-[20px] md:rounded-[40px]">
      <Image
        src={image}
        alt="Image"
        width={345}
        height={320}
        className="bg-main-100 md:rounded-3xl rounded-xl"
      />
      <h3 className="font-bold text-2xl  mt-5 font-comfortaa text-csneutral-600">
        {name}
      </h3>
      <p className="text-base md:text-[22px]">{job}</p>
    </div>
  );
};

export default TeamCard;
