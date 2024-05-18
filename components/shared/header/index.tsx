import { FC } from "react";
import HomeNavbar from "../navbar";

const Header: FC = (): JSX.Element => {
  return (
    <header className="relative z-[50]">
      <HomeNavbar />
    </header>
  );
};

export default Header;
