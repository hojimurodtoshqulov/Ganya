"use client";

import { navlink } from "@/constants";
import Link from "next/link";
import { FC, useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "@/icons/Logo.svg";
import Search from "@/icons/search.svg";
import Globo from "@/icons/lang.svg";
import Arow from "/public/icons/btn-arrow.svg";
import { buttonVariants } from "@/components/ui/button";

interface NavLinkType {
  id: number;
  label: string;
  path: string;
}

const HomeNavbar: FC = () => {
  const [currentHash, setCurrentHash] = useState("#about");
  const prevHashRef = useRef(currentHash);
  const pathname = usePathname();

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (currentHash !== prevHashRef.current) {
      prevHashRef.current = currentHash;
    }
  }, [currentHash]);

  // Boshqa useEffect lar mavjudmi mumkin

  // console.log(currentHash.replace("#", ""));

  return (
    <nav className="fixed top-2 left-0 w-full z-50">
      <div className="container flex justify-between items-center">
        <div>
          <Link href={"/"}>
            <Image width={38} height={47} alt="Logo" src={Logo} />
          </Link>
        </div>
        {!pathname.includes("articles") ? (
          <div className="hidden gap-5 bg-white p-1 rounded-[30px] md:flex">
            {navlink.map((element: NavLinkType) => {
              const isActive = currentHash.replace("#", "") === element.path;
              return (
                <a
                  onClick={() => setCurrentHash(window.location.hash)}
                  key={element.id}
                  href={`#${element.path}`}
                  className={`text-base leading-6 font-normal px-6 py-3 rounded-3xl ${isActive ? "text-main-300 bg-main-100 hover:bg-main-100" : ""} hover:bg-gray-200`} // Add hover effect
                >
                  {element.label}
                </a>
              );
            })}
          </div>
        ) : null}

        <div className="flex items-center gap-5">
          <div className="p-3 bg-white rounded-xl cursor-pointer">
            <Image src={Search} width={20} height={20} alt="search" />
          </div>
          <div className="p-3 bg-white rounded-xl cursor-pointer">
            <Image src={Globo} width={20} height={20} alt="lang icon" />
          </div>
          <div>
            <Link
              className={`${buttonVariants({ variant: "main" })} flex gap-1`}
              href="#"
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
