"use client";

import { navlink } from "@/constants";
import Link from "next/link";
import { FC } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "@/icons/Logo.svg";
import Search from "@/icons/search.svg";
import Globo from "@/icons/lang.svg";
import Arow from "/public/icons/btn-arrow.svg";
import { buttonVariants } from "@/components/ui/button";

interface navlinktype {
  id: number;
  label: string;
  path: string;
}

const HomeNavbar: FC = (): JSX.Element => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-2 left-0 w-full z-50">
      <div className="container flex justify-between items-center">
        <div>
          <Link href={"/"}>
            <Image width={38} height={47} alt="Logo" src={Logo} />
          </Link>
        </div>
        <div className="flex gap-[20px] bg-white p-1 rounded-[30px]">
          {navlink.map((element: navlinktype) => {
            return (
              <Link
                className="text-[#5A7A2E] text-[16px] leading-6 font-normal px-[24px] py-[12px] rounded-[24px]  bg-main-100"
                key={element.id}
                href={`#${element.path}`}
              >
                {element.label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-[20px]">
          <div className="p-3 bg-white rounded-[12px] cursor-pointer">
            <Image src={Search} width={20} height={20} alt="search" />
          </div>
          <div className="p-3 bg-white rounded-[12px] cursor-pointer">
            <Image src={Globo} width={20} height={20} alt="lang icon" />
          </div>
          <div>
            <Link
              className={`${buttonVariants({ variant: "main" })} flex gap-1`}
              href={"#"}
            >
              Войти
              <Image src={Arow} alt="arrow" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
