"use client";
import { FC } from "react";
import { useSelectedLayoutSegments } from "next/navigation";
import { AlignJustify } from "lucide-react";
import { UserButton } from "../details";

const sidebarLinks = [
  {
    path: "edu",
    label: "Обучение",
  },
  {
    path: "profile",
    label: "Профиль",
  },
];

const Header: FC<{ handleClick: () => void }> = ({
  handleClick,
}): JSX.Element => {
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
      <UserButton />
    </header>
  );
};

export default Header;
