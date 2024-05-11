"use client";

import { navlink } from "@/constants";
import Link from "next/link";
import { FC, useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "@/icons/Logo.svg";
import Search from "@/icons/search.svg";
import Arow from "/public/icons/btn-arrow.svg";
import { buttonVariants } from "@/components/ui/button";
import LocaleSwitcher from "../locale-switcher";

interface NavLinkType {
  id: number;
  label: string;
  path: string;
}

const HomeNavbar: FC = () => {
  const [currentHash, setCurrentHash] = useState("#about");
  const [scrolled, setScrolled] = useState(false);
  const prevHashRef = useRef(currentHash);
  const pathname = usePathname();

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (currentHash !== prevHashRef.current) {
      prevHashRef.current = currentHash;
    }
  }, [currentHash]);

  return (
    <nav
      className={`fixed py-2  left-0 w-full z-50 ${scrolled ? "backdrop-blur-md" : ""}`}
    >
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
          <div className="p-3 bg-white rounded-xl cursor-pointer flex items-center justify-center">
            <LocaleSwitcher />
          </div>
          <div>
            <Link
              className={`${buttonVariants({ variant: "main" })} flex gap-1`}
              href={`${pathname}/auth/sign-in`}
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
