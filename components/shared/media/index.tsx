import React, { FC } from "react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";

interface propstype {
  color?: boolean;
}

const Media = ({ color }: propstype) => {
  return (
    <div className={`flex gap-5 items-center text-main-100`}>
      <a href={"https://www.facebook.com/profile.php?id=61560078971181"}>
        <FaFacebook
          className={`text-main-100 ${!color && "text-main-200"}`}
          size={35}
        />
      </a>
      <a
        href={
          "https://www.instagram.com/academia_roditelstva?igsh=MTlvM2plMWM1ZjBuMA=="
        }
      >
        <FaInstagram
          size={35}
          className={`text-main-100 ${!color && "text-main-200"}`}
        />
      </a>
      <a href={"https://t.me/academia_prikorm"}>
        <FaTelegram
          size={35}
          className={`text-main-100 ${!color && "text-main-200"}`}
        />
      </a>
    </div>
  );
};

export default Media;
