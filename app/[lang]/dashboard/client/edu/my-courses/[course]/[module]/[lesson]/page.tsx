import BackLink from "@/components/dashboard/back-link";
import Dars from "@/components/dashboard/dars";
import { FC } from "react";
import { modules } from "@/constants/buyed-course";

interface Props {
  params: {
    lesson: string;
    module: string;
    lang: "ru" | "uz";
  };
}

const SingleLesson: FC<Props> = ({
  params: { lesson, module, lang },
}): JSX.Element => {
  const moduleData = modules.find((m) => m.id === module);
  const lessonData = moduleData?.lessons.find((l) => l.id === lesson);
  if (!lessonData || !moduleData) return <div>Lesson not found</div>;
  return (
    <>
      <BackLink
        title={lang === "ru" ? moduleData?.titleRu : moduleData?.titleUz}
        heading={lang === "ru" ? lessonData?.titleRu : lessonData?.titleUz}
      />
      <div className="mt-5">
        <Dars videoLink={lessonData.link} />
      </div>
    </>
  );
};

export default SingleLesson;
