import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <section className="flex items-center justify-center min-h-screen">
      {children}
    </section>
  );
};

export default Layout;
