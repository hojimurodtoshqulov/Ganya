import React, { FC } from "react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import Link from "next/link";

const Media: FC = () => {
  return (
    <div className="flex gap-5 items-center text-main-100">
      <Link href={"#"}>
        <FaYoutube size={35} />
      </Link>
      <Link href={"#"}>
        <FaInstagram size={35} />
      </Link>
      <Link href={"#"}>
        <FaTelegram size={35} />
      </Link>
    </div>
  );
};

export default Media;
