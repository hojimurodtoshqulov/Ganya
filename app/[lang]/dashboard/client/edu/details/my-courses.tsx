import Trening from "@/components/dashboard/trening-card";
import { FC } from "react";
import { cookies } from "next/headers";

interface ICard {
  id: string;
  createdAt: string;
  updatedAt: string;
  titleUz: string;
  titleRu: string;
  image: string;
  descriptionUz: string;
  descriptionRu: string;
  courseStatus: string;
}

interface FullCourses {
  id: string;
  courseId: string;
  planId: string;
  userId: string;
  purchaseDate: string;
  expirationDate: string;
  createdAt: string;
  updatedAt: string;
  course: ICard;
}
async function getData<T>(): Promise<T[] | Error> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/courses/my-courses",
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

const MyCourses: FC<{ lang: "uz" | "ru" }> = async ({
  lang,
}): Promise<JSX.Element> => {
  const data = await getData<FullCourses>();
  // console.log(data, "my coruse");
  if (data instanceof Error) {
    return <h2>Something went wrong</h2>;
  }
  if (data.length === 0) {
    return (
      <h2>
        {lang === "uz"
          ? "Hozirda sizda sotib olingan kurslar yoq"
          : "У вас нет купленных курсов"}
      </h2>
    );
  }
  return (
    <div className="space-y-2.5">
      {data.map(({ course: c }) => (
        <Trening
          key={c.id}
          title={lang === "uz" ? c.titleUz : c.titleRu}
          description={lang === "uz" ? c.descriptionUz : c.descriptionRu}
          btn={lang === "uz" ? "Trenigga o'tish" : "Перейти к обучению"}
          courseId={c.id}
          image={c.image}
        />
      ))}
    </div>
  );
};

export default MyCourses;
