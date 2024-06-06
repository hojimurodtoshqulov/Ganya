import BackLink from "@/components/dashboard/back-link";
import DarsList from "@/components/dashboard/dars-list";
import LinkById from "@/components/dashboard/link-by-id";
import { FC } from "react";
import { cookies } from "next/headers";

interface Props {
  params: {
    module: string;
    course: string;
    lang: "ru" | "uz";
  };
}
async function getData<T>(id: string): Promise<T | Error> {
  const api = process.env.NEXT_PUBLIC_BASE_URL + `/modules/single/${id}`;
  const req = await fetch(api, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${JSON.parse(cookies().get("accessToken")?.value ?? "")}`,
    },
  });

  if (!req.ok) {
    throw new Error("Failed to fetch module data");
  }

  const data = await req.json();
  return data;
}

const SingleModule: FC<Props> = async ({
  params: { module, lang, course },
}): Promise<JSX.Element> => {
  const moduleData = await getData<{
    id: string;
    titleUz: string;
    titleRu: string;
    descriptionUz: string;
    descriptionRu: string;
    courseId: string;
    Lesson: any[];
  }>(module);

  if (moduleData instanceof Error) return <div>Module not found</div>;
  return (
    <div>
      <BackLink
        title={lang === "ru" ? moduleData?.titleRu : moduleData?.titleUz}
        heading={lang === "ru" ? moduleData?.titleRu : moduleData?.titleUz}
      />

      <div className="space-y-5 mt-5">
        {moduleData?.Lesson.map((lesson: any) => (
          <LinkById href={lesson.id} className="block" key={lesson.id}>
            <DarsList title={lang === "ru" ? lesson.titleRu : lesson.titleUz} />
          </LinkById>
        ))}
      </div>
    </div>
  );
};

export default SingleModule;
