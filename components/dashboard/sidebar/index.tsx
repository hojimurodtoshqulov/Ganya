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
import { useSelectedLayoutSegments } from "next/navigation";
import { FC, memo } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo, SidebarButton, SidebarContact } from "../details";

const userLinks = [
  {
    icon: LayoutGrid,
    label: "Обучение",
    path: "edu",
  },
];
const adminLinks = [
  {
    icon: LayoutGrid,
    label: "Курсы",
    path: "courses",
  },
  {
    icon: Newspaper,
    label: "Статьи",
    path: "articles",
  },
  {
    icon: Image,
    label: "Контент",
    path: "content",
  },
];

interface SidebarProps {
  lang: Locale;
  handleClick: () => void;
  role?: string;
}

const SideBar: FC<SidebarProps> = ({
  lang,
  handleClick,
  role = "admin",
}): JSX.Element => {
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
              label="Профиль"
              active={paths.includes("profile")}
            />
          </Link>
          <button className="bg-none border-none">
            <SidebarButton
              icon={LogOut}
              label={"Выйти"}
              className="text-destructive"
            />
          </button>
        </nav>
      </div>
      <SidebarContact />
    </aside>
  );
};

export default memo(SideBar);
