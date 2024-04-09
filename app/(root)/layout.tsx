import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <>
      {/* navbar */}
      <main>{children}</main>
      {/* footer */}
    </>
  );
};

export default Layout;
