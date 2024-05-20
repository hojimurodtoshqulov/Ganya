"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n } from "@/lib/i18n-config";
import ru from "@/images/flagru.png";
import uz from "@/images/flaguz.png";

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
      <DropdownMenuContent className="min-w-[50px] flex flex-col gap-2 relative top-2">
        {i18n.locales.map((locale) => (
          <DropdownMenuItem className="cursor-pointer p-0" key={locale}>
            <Link
              className="px-2 py-1.5 w-full block"
              href={redirectedPathName(locale)}
            >
              <Image
                width={30}
                height={20}
                src={locale === "ru" ? ru : uz}
                alt="flag images"
                className="f-h-full"
              />
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
