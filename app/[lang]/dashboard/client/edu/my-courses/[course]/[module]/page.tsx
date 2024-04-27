import BackLink from "@/components/dashboard/back-link";
import DarsList from "@/components/dashboard/dars-list";
import LinkById from "@/components/dashboard/link-by-id";
import { FC } from "react";

interface Props {
  params: {
    module: string;
  };
}

const lessons = [
  {
    lessonNumber: 1,
    title: "Tanishuv",
  },
  {
    lessonNumber: 2,
    title: "Tanishuv",
  },
  {
    lessonNumber: 3,
    title: "Tanishuv",
  },
  {
    lessonNumber: 4,
    title: "Tanishuv",
  },
];

const SingleModule: FC<Props> = ({ params: { module } }): JSX.Element => {
  return (
    <div>
      <BackLink
        title="Qo'shimcha muammosiz ovqatlar"
        heading="1-modul: Kichkintoyingiz uchun birinchi qo'shimcha ovqatlarni kiritish"
      />

      <div className="space-y-5 mt-5">
        {lessons.map((lesson) => (
          <LinkById
            href={lesson.lessonNumber}
            className="block"
            key={lesson.lessonNumber}
          >
            <DarsList />
          </LinkById>
        ))}
      </div>
    </div>
  );
};

export default SingleModule;
