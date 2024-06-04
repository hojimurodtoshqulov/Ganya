import BackLink from "@/components/dashboard/back-link";
import DarsList from "@/components/dashboard/dars-list";
import LinkById from "@/components/dashboard/link-by-id";
import { FC } from "react";
import { modules } from "@/constants/buyed-course";

interface Props {
  params: {
    module: string;
    lang: "ru" | "uz";
  };
}

const SingleModule: FC<Props> = ({ params: { module, lang } }): JSX.Element => {
  const moduleData = modules.find((m) => m.id === module);
  if (!moduleData) return <div>Module not found</div>;
  return (
    <div>
      <BackLink
        title={lang === "ru" ? moduleData?.titleRu : moduleData?.titleUz}
        heading={lang === "ru" ? moduleData?.titleRu : moduleData?.titleUz}
      />

      <div className="space-y-5 mt-5">
        {moduleData?.lessons.map((lesson) => (
          <LinkById href={lesson.id} className="block" key={lesson.id}>
            <DarsList title={lang === "ru" ? lesson.titleRu : lesson.titleUz} />
          </LinkById>
        ))}
      </div>
    </div>
  );
};

export default SingleModule;
