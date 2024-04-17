"use client";
import { FC } from "react";
import { useSelectedLayoutSegments } from "next/navigation";

const Header: FC = (): JSX.Element => {
  const act = useSelectedLayoutSegments().pop();
  return (
    <header className="w-full bg-white border-b border-csneutral-200 px-8 h-[68px] flex items-center justify-between">
      hello header
    </header>
  );
};

export default Header;
