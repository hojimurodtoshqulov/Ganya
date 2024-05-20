import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { getDictionary } from "@/lib/get-dictionary";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  params: {
    lang: "uz" | "ru";
  };
}

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
