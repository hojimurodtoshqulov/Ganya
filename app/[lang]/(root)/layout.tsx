import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { getDictionary } from "@/lib/get-dictionary";
import type { Metadata } from "next";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  params: {
    lang: "uz" | "ru";
  };
}
export const metadata: Metadata = {
  title: "Академия родителей",
  description: "Первая обучающая платформа для родителей в Узбекистане",
  openGraph: {
    title: "Академия родителей",
    description: "Первая обучающая платформа для родителей в Узбекистане",
    url: "https://academiaroditeley.com/",
    siteName: "Академия родителей",
    locale: "ru",
    type: "website",
  },
};

const Layout: FC<Props> = async ({ children, params: { lang } }) => {
  const dictionary: any = await getDictionary(lang);
  return (
    <div className="bg-white">
      <Header lang={lang} dictionary={dictionary} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
