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

interface MyCourses {
  id: string;
  courseId: string;
  planId: string;
  userId: string;
  purchaseDate: string;
  expirationDate: string;
  createdAt: string;
  updatedAt: string;
}
async function getMyCourses<T>(): Promise<T[] | Error> {
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

async function getAllCourses<T>(): Promise<T[] | Error> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/courses/all?status=completed",
    {
      cache: "no-store",
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
  const myCourses = await getMyCourses<MyCourses>();
  if (myCourses instanceof Error) {
    return <h2>Something went wrong</h2>;
  }
  if (myCourses.length === 0) {
    return (
      <h2>
        {lang === "uz"
          ? "Hozirda sizda sotib olingan kurslar yoq"
          : "У вас нет купленных курсов"}
      </h2>
    );
  }

  const allCourses = await getAllCourses<ICard>();
  if (allCourses instanceof Error) {
    return <h2>Something went wrong</h2>;
  }
  const data = allCourses.filter((c) =>
    myCourses.some((m) => m?.courseId === c?.id),
  );

  return (
    <div className="space-y-2.5">
      {data.map((c) => (
        <Trening
          key={c?.id}
          title={lang === "uz" ? c?.titleUz : c?.titleRu}
          description={lang === "uz" ? c?.descriptionUz : c?.descriptionRu}
          btn={lang === "uz" ? "Treningga o'tish" : "Перейти к обучению"}
          courseId={c?.id}
          image={c?.image}
        />
      ))}
    </div>
  );
};

export default MyCourses;
