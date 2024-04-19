import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Images from "@/images/mobile-baner.png";

const Trening = () => {
  return (
    <div className="flex sm:flex-row justify-between items-center bg-white rounded-2xl sm:p-6 p-4 flex-col">
      <div className="flex sm:items-center items-stretch gap-6 sm:flex-row flex-col">
        <Image
          className="bg-slate-500 rounded-xl sm:w-[68px] sm:h-[68px] w-full h-[120px]"
          src={Images}
          alt="Kimdur"
        />
        <div>
          <h2 className="text-main-300 text-2xl font-normal mb-2 font-comfortaa">
            Прикорм без проблем
          </h2>
          <p className="text-base font-normal font-comfortaa">
            Небольшое описание про этот курс в 1 строк!
          </p>
        </div>
      </div>
      <Button className="sm:mt-0 mt-4 w-full sm:w-[180px]" variant={"main"}>
        Перейти к обучению
      </Button>
    </div>
  );
};

export default Trening;
