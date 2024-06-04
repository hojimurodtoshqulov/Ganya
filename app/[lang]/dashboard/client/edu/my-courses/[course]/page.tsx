import { FC } from "react";
import BackLink from "@/components/dashboard/back-link";
import LinkById from "@/components/dashboard/link-by-id";
import { buyedCourse, modules } from "@/constants/buyed-course";

interface Props {
  params: {
    course: string;
    lang: "ru" | "uz";
  };
}

const arr = [1, 2, 3, 4, 5, 6];

const OneOfMyCourses: FC<Props> = ({
  params: { course, lang },
}): JSX.Element => {
  return (
    <>
      <BackLink
        title={lang === "uz" ? "Mening xaridlarim" : "Мои покупки"}
        heading={lang === "uz" ? buyedCourse.titleUz : buyedCourse.titleRu}
      />

      <div className="mt-3 md:mt-5 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {modules.map(({ id, titleRu, titleUz }) => (
          <LinkById
            href={id}
            key={id}
            className="px-5 py-4 bg-white rounded-2xl"
          >
            <span className="block mb-2 text-base">
              {lang === "ru" ? titleRu : titleUz}
            </span>
            <h4 className="font-normal text-[22px] leading-8">
              {lang === "ru" ? titleRu : titleUz}
            </h4>
          </LinkById>
        ))}
      </div>
    </>
  );
};

export default OneOfMyCourses;
