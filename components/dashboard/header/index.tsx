"use client";
import { FC, ReactNode } from "react";
import { useSelectedLayoutSegments } from "next/navigation";
import { AlignJustify } from "lucide-react";
import LocaleSwitcher from "@/components/shared/locale-switcher";

const Header: FC<{
  handleClick: () => void;
  dictionary: { label: string; path: string }[];
  userButton: ReactNode;
}> = ({ handleClick, dictionary, userButton: UserButton }): JSX.Element => {
  const sidebarLinks = [
    {
      ...dictionary[4],
      // path: "edu",
      // label: "Обучение",
    },
    {
      ...dictionary[5],
      // path: "profile",
      // label: "Профиль",
    },
  ];
  const paths = useSelectedLayoutSegments();

  const activePath = sidebarLinks.find((i) => paths.includes(i.path));

  return (
    <header className="w-full bg-white border-b border-csneutral-200 px-8 h-[68px] flex items-center justify-between">
      <div className="flex items-center gap-4">
        <AlignJustify
          width={20}
          height={20}
          className="cursor-pointer flex-shrink-0"
          onClick={handleClick}
        />
        {activePath?.label}
      </div>
      <div className="flex items-center gap-2">
        <LocaleSwitcher />

        {UserButton}
      </div>
    </header>
  );
};

export default Header;
