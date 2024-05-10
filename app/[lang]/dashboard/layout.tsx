"use client";
import Header from "@/components/dashboard/header";
import SideBar from "@/components/dashboard/sidebar";
import { FC, ReactNode, useCallback, useLayoutEffect, useState } from "react";
import { Locale } from "@/lib/i18n-config";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  params: { lang: Locale };
}

const Layout: FC<Props> = ({ children, params: { lang } }): JSX.Element => {
  const [open, setOpen] = useState<boolean>(true);
  const handleClick = useCallback(() => setOpen((p) => !p), []);
  useLayoutEffect(() => {
    if (window.innerWidth < 1024) {
      setOpen(false);
    } else setOpen(true);
  }, []);

  return (
    <div className="flex relative">
      <div
        className={cn(
          `w-full sm:w-80 h-screen p-5 border-r border-csneutral-200 z-50 fixed bottom-0 top-0 ${open ? "left-0" : "-left-full"} bg-white transition-all animate-out`,
        )}
      >
        <SideBar lang={lang} handleClick={handleClick} />
      </div>
      <div
        className={`transition-all animate-out hidden lg:block ${open ? "w-80" : "w-0"}`}
      />

      <div className="w-full relative flex-1">
        <div className="sticky top-0 left-0 w-full z-10">
          <Header handleClick={handleClick} />
        </div>
        <main className="px-4 py-3 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
