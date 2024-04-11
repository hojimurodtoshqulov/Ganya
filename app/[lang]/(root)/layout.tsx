import Header from "@/components/shared/header";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <>
      {/* header */}
      <Header />
      <main>{children}</main>
      {/* footer */}
    </>
  );
};

export default Layout;
