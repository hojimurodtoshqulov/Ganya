import { FC } from "react";

const BuyCourse: FC<{ params: { lang: "uz" | "ru" } }> = ({
  params: { lang },
}): JSX.Element => {
  return (
    <div>
      {lang}
      <p></p>
      bu yerdan courseni plan buyicha sotib olish uchun linklar bulishi kerak
    </div>
  );
};

export default BuyCourse;
