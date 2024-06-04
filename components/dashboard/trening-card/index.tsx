import Image from "next/image";
import React from "react";
import Images from "@/images/mobile-baner.png";
import Link from "./link";

type Props = {
  title: string;
  description: string;
  btn: string;
  courseId: string;
};

const Trening = ({ title, description, btn, courseId }: Props) => {
  return (
    <div className="flex sm:flex-row justify-between bg-white rounded-2xl sm:p-6 p-4 flex-col gap-4">
      <div className="w-full flex gap-6 sm:flex-row flex-col">
        <div className="bg-slate-500 rounded-lg aspect-video sm:aspect-square flex-shrink-0 relative w-full sm:w-16 overflow-hidden">
          <Image src={Images} alt="Kimdur" fill className="object-cover" />
        </div>
        <div>
          <h2 className="text-main-300 text-2xl mb-2 font-comfortaa font-bold">
            {title}
          </h2>
          <p className="text-base font-normal font-comfortaa">{description}</p>
        </div>
      </div>
      <Link btn={btn} courseId={courseId} />
    </div>
  );
};

export default Trening;
