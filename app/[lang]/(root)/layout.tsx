import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <div className="bg-white">
      <Header />
      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
