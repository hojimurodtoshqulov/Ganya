import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Trening = () => {
  return (
    <div className="flex sm:flex-row justify-between items-center bg-white rounded-2xl sm:p-6 p-4 flex-col">
      <div className="flex sm:items-center items-stretch gap-6 sm:flex-row flex-col">
        <Image
          className="bg-slate-500 rounded-xl sm:w-[68px] sm:h-[68px] w-full h-[120px]"
          src={""}
          width={68}
          height={68}
          alt="Kimdur"
        />
        <div>
          <h2 className="text-main-300 text-2xl font-normal mb-2 font-comfortaa">
            Qo'shimcha muammosiz ovqatlar
          </h2>
          <p className="text-base font-normal font-comfortaa">
            Ushbu kurs haqida 1 satrdan iborat kichik tavsif!
          </p>
        </div>
      </div>
      <Button className="sm:mt-0 mt-4 w-full sm:w-[180px]" variant={"main"}>
        Treningga o'tish
      </Button>
    </div>
  );
};

export default Trening;
