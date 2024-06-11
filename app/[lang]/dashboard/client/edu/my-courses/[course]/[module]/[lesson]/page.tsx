import BackLink from "@/components/dashboard/back-link";
import Dars from "@/components/dashboard/dars";
import { FC } from "react";
import { modules } from "@/constants/buyed-course";
import { cookies } from "next/headers";

interface Props {
  params: {
    lesson: string;
    module: string;
    lang: "ru" | "uz";
  };
}

async function getData<T>(id: string): Promise<T | Error> {
  const api = process.env.NEXT_PUBLIC_BASE_URL + `/lessons/single/${id}`;
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
async function getModule<T>(id: string): Promise<T | Error> {
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
const SingleLesson: FC<Props> = async ({
  params: { lesson, module, lang },
}): Promise<JSX.Element> => {
  const lessonData = await getData<{
    id: string;
    titleUz: string;
    titleRu: string;
    videoUz: string;
    videoRu: string;
    descriptionUz: string;
    attachedFiles: [];
    moduleId: string;
  }>(lesson);
  if (lessonData instanceof Error) {
    return <div>Something went wrong!</div>;
  }
  const moduleData = await getModule<{
    id: string;
    titleUz: string;
    titleRu: string;
    descriptionUz: string;
    descriptionRu: string;
    courseId: string;
    Lesson: { id: string }[];
  }>(module);

  if (moduleData instanceof Error) return <div>Module not found</div>;

  const currentLessonIndex = moduleData?.Lesson.findIndex(
    (p) => p.id === lesson,
  );

  if (currentLessonIndex === -1) return <div>Lesson not found</div>;

  return (
    <>
      <BackLink
        title={lang === "ru" ? "Назад" : "Orqaga"}
        heading={lang === "ru" ? lessonData?.titleRu : lessonData?.titleUz}
      />
      <div className="mt-5">
        <Dars
          videoLink={lang === "ru" ? lessonData.videoRu : lessonData.videoUz}
          next={moduleData.Lesson[currentLessonIndex + 1]?.id}
          prev={moduleData.Lesson[currentLessonIndex - 1]?.id}
          lang={lang}
        />
      </div>
    </>
  );
};

export default SingleLesson;
