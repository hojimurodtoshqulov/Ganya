import React, { FC } from "react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import Link from "next/link";

interface propstype {
  color?: boolean;
}

const Media = ({ color }: propstype) => {
  return (
    <div className={`flex gap-5 items-center text-main-100`}>
      <Link href={"#"}>
        <FaYoutube
          className={`text-main-100 ${!color && "text-main-200"}`}
          size={35}
        />
      </Link>
      <Link href={"#"}>
        <FaInstagram
          size={35}
          className={`text-main-100 ${!color && "text-main-200"}`}
        />
      </Link>
      <Link href={"#"}>
        <FaTelegram
          size={35}
          className={`text-main-100 ${!color && "text-main-200"}`}
        />
      </Link>
    </div>
  );
};

export default Media;
