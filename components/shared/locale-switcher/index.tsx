"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n } from "@/lib/i18n-config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import Image from "next/image";
import Globo from "@/icons/lang.svg";

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image src={Globo} width={20} height={20} alt="lang icon" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {i18n.locales.map((locale) => (
          <DropdownMenuItem className="cursor-pointer" key={locale}>
            <Link href={redirectedPathName(locale)} className="block w-full">
              {locale}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
