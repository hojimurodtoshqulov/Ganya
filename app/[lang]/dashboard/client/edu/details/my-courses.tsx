import Trening from "@/components/dashboard/trening-card";
import { FC } from "react";
import { buyedCourse, modules } from "@/constants/buyed-course";

const MyCourses: FC<{ lang: "uz" | "ru" }> = ({ lang }): JSX.Element => {
  return (
    <div className="space-y-2.5">
      <Trening
        title={lang === "uz" ? buyedCourse.titleUz : buyedCourse.titleRu}
        description={
          lang === "uz" ? buyedCourse.descriptionUz : buyedCourse.descriptionRu
        }
        btn={lang === "uz" ? "Trenigga o'tish" : "Перейти к обучению"}
        courseId={buyedCourse.id}
      />
    </div>
  );
};

export default MyCourses;
