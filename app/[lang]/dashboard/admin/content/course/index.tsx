import { FC } from "react";
import Info2 from "./info2";

const Course: FC<{ lang: "uz" | "ru" }> = ({ lang }): JSX.Element => {
  return (
    <div>
      <Info2 lang={lang} editable />
    </div>
  );
};

export default Course;
