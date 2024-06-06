import { FC } from "react";
import BackLink from "@/components/dashboard/back-link";
import LinkById from "@/components/dashboard/link-by-id";
import { cookies } from "next/headers";

interface Props {
  params: {
    course: string;
    lang: "ru" | "uz";
  };
}

async function getData<T>(id: string): Promise<T | Error> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/courses/single/" + id,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${JSON.parse(cookies().get("accessToken")?.value ?? "")}`,
      },
    },
  );

  if (!res.ok) {
    return new Error("Failed to fetch data");
  }

  return res.json();
}

const OneOfMyCourses: FC<Props> = async ({
  params: { course, lang },
}): Promise<JSX.Element> => {
  const data = await getData<{
    id: string;
    createdAt: string;
    updatedAt: string;
    titleUz: string;
    titleRu: string;
    image: string;
    descriptionUz: string;
    descriptionRu: string;
    courseStatus: string;
    myCoursesId: null;
    Module: any[];
  }>(course);
  if (data instanceof Error) return <h2>Failed to fetch data.</h2>;
  if (data.Module.length === 0) return <h2>No modules</h2>;
  return (
    <>
      <BackLink
        title={lang === "uz" ? "Mening xaridlarim" : "Мои покупки"}
        heading={lang === "uz" ? data.titleUz : data.titleRu}
      />

      <div className="mt-3 md:mt-5 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.Module.map(({ id, titleRu, titleUz }, i) => (
          <LinkById
            href={id}
            key={id}
            className="px-5 py-4 bg-white rounded-2xl"
          >
            <span className="block mb-2 text-base">
              {lang === "ru" ? `Модуль ${i + 1}` : `${i + 1}-modul`}
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
