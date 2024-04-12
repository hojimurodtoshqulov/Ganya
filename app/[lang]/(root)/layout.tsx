import Header from "@/components/shared/header";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <div className="bg-white">
      {/* header */}
      <Header />
      <main>{children}</main>
      {/* footer */}
    </div>
  );
};

export default Layout;
