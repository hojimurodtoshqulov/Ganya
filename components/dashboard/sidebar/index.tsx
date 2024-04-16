"use client";
import { Locale } from "@/lib/i18n-config";
import { cn } from "@/lib/utils";
import { LayoutGrid, LogOut, LucideIcon, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { FC } from "react";

const links = [
  {
    icon: LayoutGrid,
    label: "Обучение",
    path: "edu",
  },
];

const SideBar: FC<{ lang: Locale }> = ({ lang }): JSX.Element => {
  const path = useSelectedLayoutSegments().pop();
  const router = useRouter();
  return (
    <nav className="flex flex-col text-base ">
      {links.slice(0, 2).map((link) => {
        const active = link.path === path;
        return (
          <Link href={`/${lang}/dashboard/client/${link.path}`} key={link.path}>
            <SidebarButton {...link} active={active} />
          </Link>
        );
      })}
      <Link href={`/${lang}/dashboard/profile`}>
        <SidebarButton
          icon={UserRound}
          label="Профиль"
          active={path === "profile"}
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
  );
};

export default SideBar;

interface Props {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  className?: string;
}

const SidebarButton: FC<Props> = ({
  label,
  icon: Icon,
  active,
  className,
}): JSX.Element => {
  return (
    <div
      className={cn(
        "flex gap-2 items-center py-4 px-6 rounded-xl w-full cursor-pointer font-normal",
        {
          "text-main-300 bg-main-300/10": active,
        },
        className,
      )}
    >
      <Icon width={24} height={24} />
      <span>{label}</span>
    </div>
  );
};
