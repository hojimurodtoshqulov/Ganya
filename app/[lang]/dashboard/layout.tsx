import Header from "@/components/dashboard/header";
import SideBar from "@/components/dashboard/sidebar";
import Image from "next/image";
import Link from "next/link";
import { FC, ReactNode } from "react";
import Logo from "@/images/dashboard-logo.svg";
import { Locale } from "@/lib/i18n-config";

interface Props {
  children: ReactNode;

  params: { lang: Locale };
}

const Layout: FC<Props> = ({ children, params: { lang } }): JSX.Element => {
  return (
    <div className="flex">
      <div className="w-80 h-screen p-5 border-r border-csneutral-200 bg-white sticky top-0 left-0 flex flex-col justify-between">
        <div className="space-y-9">
          <Link href={"/"}>
            <Image src={Logo} alt="dashboard-logo" width={146} height={42} />
          </Link>
          <SideBar lang={lang} />
        </div>
      </div>
      <div className="w-full relative">
        <div className="sticky top-0 left-0 w-full">
          <Header />
        </div>
        <main className="h-[900px]">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
