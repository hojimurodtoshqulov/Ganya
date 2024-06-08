"use client";
import { Locale } from "@/lib/i18n-config";
import {
  LayoutGrid,
  LogOut,
  UserRound,
  X,
  Newspaper,
  Image,
} from "lucide-react";
import { useParams, useSelectedLayoutSegments } from "next/navigation";
import { FC, memo } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo, SidebarButton, SidebarContact } from "../details";
import { logout } from "@/lib/actions/user";

interface SidebarProps {
  lang: Locale;
  handleClick: () => void;
  role?: string;
  dictionary: { label: string; path: string }[];
}

const SideBar: FC<SidebarProps> = ({
  lang,
  handleClick,
  role = "admin",
  dictionary,
}): JSX.Element => {
  const userLinks = [
    {
      icon: LayoutGrid,
      label: lang === "ru" ? "Обучение" : "Ta'lim",
      path: "edu",
    },
    {
      icon: Newspaper,
      label: lang === "ru" ? "Статьи" : "Maqola",
      path: "articles",
    },
  ];

  const adminLinks = [
    {
      icon: LayoutGrid,
      ...dictionary[0],
    },
    {
      icon: Newspaper,
      ...dictionary[1],
    },
    {
      icon: Image,
      ...dictionary[2],
    },
  ];
  const paths = useSelectedLayoutSegments();

  return (
    <aside className="w-full h-full bg-white flex flex-col justify-between">
      <div className="space-y-9">
        <div className="flex items-center justify-between gap-5">
          <Logo />
          <Button
            size={"sm"}
            variant={"ghost"}
            onClick={handleClick}
            className="lg:hidden"
          >
            <X size={24} />
          </Button>
        </div>

        <nav className="flex flex-col text-base ">
          {(role === "user" ? userLinks : adminLinks).map((link) => {
            const active = paths.includes(link.path);
            return (
              <Link
                href={`/${lang}/dashboard/${role === "user" ? "client" : "admin"}/${link.path}`}
                key={link.path}
              >
                <SidebarButton {...link} active={active} />
              </Link>
            );
          })}
          <Link href={`/${lang}/dashboard/profile`}>
            <SidebarButton
              icon={UserRound}
              label={lang === "ru" ? "Профиль" : "Profil"}
              active={paths.includes("profile")}
            />
          </Link>
          <button
            className="bg-none border-none"
            onClick={async () => {
              await logout(`/${lang}`);
            }}
          >
            <SidebarButton
              icon={LogOut}
              label={lang === "ru" ? "Выйти" : "Chiqish"}
              className="text-destructive"
            />
          </button>
        </nav>
      </div>
      <SidebarContact lang={lang} />
    </aside>
  );
};

export default memo(SideBar);
