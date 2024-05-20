import { FC } from "react";
import HomeNavbar from "../navbar";

interface HeaderProps {
  lang: "uz" | "ru";
  dictionary: any;
}

const Header: FC<HeaderProps> = ({ lang, dictionary }): JSX.Element => {
  return (
    <header className="relative z-[50]">
      <HomeNavbar lang={lang} dictionary={dictionary} />
    </header>
  );
};

export default Header;
