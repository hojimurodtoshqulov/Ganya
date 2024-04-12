import React, { FC } from "react";
import Youtube from "/public/icons/you-tube.svg";
import Instagram from "/public/icons/Telegram.svg";
import Telegram from "/public/icons/Instagram.svg";
import Image from "next/image";
import Link from "next/link";

const Media: FC = () => {
  return (
    <div className="flex gap-5 items-center">
      <Link href={"#"}>
        <Image src={Youtube} alt="You tube"></Image>
      </Link>
      <Link href={"#"}>
        <Image src={Instagram} alt="Instagram"></Image>
      </Link>
      <Link href={"#"}>
        <Image src={Telegram} alt="Telegram"></Image>
      </Link>
    </div>
  );
};

export default Media;
