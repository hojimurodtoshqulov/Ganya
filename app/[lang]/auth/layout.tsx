import { FC, ReactNode } from "react";
import Back from "./back";

interface Props {
  children: ReactNode;
  params: {
    lang: "uz" | "ru";
  };
}

const Layout: FC<Props> = ({ children, params: { lang } }): JSX.Element => {
  return (
    <section className="flex items-center justify-center min-h-screen">
      {children}
      <Back lang={lang} />
    </section>
  );
};

export default Layout;
