import Image from "next/image";
import Link from "next/link";
import Logo from "/public/icons/Logo.svg";
import { FC } from "react";
import Media from "../media";

const Footer: FC = (): JSX.Element => {
  return (
    <div className="container flex justify-between items-center py-10">
      <Link href={"/"}>
        <Image width={38} height={47} alt="Logo" src={Logo} />
      </Link>
      <Media />
      <p className="text-xs font-normal leading-[18px]">© 2024 АОР</p>
    </div>
  );
};

export default Footer;
