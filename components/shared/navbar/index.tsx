"use client";

import { navlink } from "@/constants";
import Link from "next/link";
import { FC, useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "@/icons/Logo.svg";
import Logo2 from "@/icons/Logo2.svg";
import { buttonVariants } from "@/components/ui/button";
import LocaleSwitcher from "../locale-switcher";
import Headroom from "react-headroom";
import { ArrowRight } from "lucide-react";

interface NavLinkType {
  id: number;
  label: string;
  path: string;
}
interface Lang {
  lang: "uz" | "ru";
  dictionary: any;
}
const HomeNavbar: FC<Lang> = ({ lang, dictionary }) => {
  const [currentHash, setCurrentHash] = useState("#about");
  const [isScrolled, setIsScrolled] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Headroom className={`fixed w-full`}>
      <nav className={`py-2 ${isScrolled ? "bg-white shadow-lg" : ""} `}>
        <div className="container flex justify-between items-center">
          <div>
            <Link href={"/"}>
              <Image
                width={38}
                height={47}
                alt="Logo"
                src={!isScrolled ? Logo : Logo2}
              />
            </Link>
          </div>
          {!pathname.includes("articles") ? (
            <div className="hidden gap-5 bg-slate-100 p-1 rounded-[30px] md:flex">
              {navlink.map((element: NavLinkType) => {
                const isActive = currentHash.replace("#", "") === element.path;
                return (
                  <a
                    onClick={() => setCurrentHash(window.location.hash)}
                    key={element.id}
                    href={`#${element.path}`}
                    className={`text-base leading-6 font-normal px-6 py-3 rounded-3xl ${isActive ? "text-main-300 bg-main-100 hover:bg-main-100" : ""} hover:bg-gray-200`} // Add hover effect
                  >
                    {lang === "ru"
                      ? element.label
                      : dictionary.home.navbar[element.label]}
                  </a>
                );
              })}
            </div>
          ) : null}

          <div className="flex items-center gap-5">
            <div className="p-3 bg-slate-100 rounded-xl cursor-pointer flex items-center justify-center">
              <LocaleSwitcher />
            </div>
            <div>
              <Link
                className={`${buttonVariants({ variant: "main" })} flex gap-1`}
                href={`${lang}/auth/sign-in`}
              >
                {dictionary.home.navbar.login}
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </Headroom>
  );
};

export default HomeNavbar;
