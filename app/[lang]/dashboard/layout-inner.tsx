"use client";
import Header from "@/components/dashboard/header";
import SideBar from "@/components/dashboard/sidebar";
import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Locale } from "@/lib/i18n-config";
import { cn } from "@/lib/utils";
import { useSelectedLayoutSegment } from "next/navigation";

interface Props {
  children: ReactNode;
  params: { lang: Locale; role?: string };
  dictionary: { label: string; path: string }[];
  userButton: ReactNode;
}

const InnerLayout: FC<Props> = ({
  children,
  params: { lang, role },
  dictionary,
  userButton,
}): JSX.Element => {
  const pathname = useSelectedLayoutSegment();

  const [open, setOpen] = useState<boolean>(true);
  const handleClick = useCallback(() => setOpen((p) => !p), []);
  useLayoutEffect(() => {
    if (window.innerWidth < 1024) {
      setOpen(false);
    } else setOpen(true);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024 && open) {
      setOpen(false);
    }
  }, [pathname]);

  return (
    <div className="flex relative">
      <div
        className={cn(
          `w-full sm:w-80 h-screen p-5 border-r border-csneutral-200 z-50 fixed bottom-0 top-0 ${open ? "left-0" : "-left-full"} bg-white transition-all animate-out`,
        )}
      >
        <SideBar
          lang={lang}
          handleClick={handleClick}
          role={role}
          dictionary={dictionary}
        />
      </div>
      <div
        className={`transition-all relative animate-out hidden lg:block ${open ? "w-80" : "w-0"}`}
      ></div>

      <div className="relative w-full flex-1">
        <div className="sticky top-0 left-0 w-full z-10">
          <Header
            handleClick={handleClick}
            dictionary={dictionary}
            userButton={userButton}
          />
        </div>
        <main
          className={`px-4 pt-3 md:p-6 md:pb-0 ${open ? "max-w-[calc(100vw_-_350px)]" : ""}`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default InnerLayout;
