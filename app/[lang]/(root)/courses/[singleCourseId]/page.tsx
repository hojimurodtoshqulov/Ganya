import CourceCard from "@/components/shared/cource-card/courceCard";
import PlanCard from "@/components/shared/tariflar/card";
import { Accordion } from "@/components/shared/cource-card/accordian-card";

import { FC } from "react";
import BackLink from "@/components/dashboard/back-link";

async function getCourse<T>(id: string): Promise<T | Error> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/courses/single/" + id,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return new Error("Failed to fetch data");
  }

  return res.json();
}
async function getPlans<T>(id: string): Promise<T[] | Error> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/plans/all/" + id,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return new Error("Failed to fetch data");
  }
  const json = res.json();

  return json;
}
const SingleCourse: FC<{
  params: { singleCourseId: string; lang: "uz" | "ru" };
}> = async ({ params: { singleCourseId, lang } }): Promise<JSX.Element> => {
  const course = await getCourse<any>(singleCourseId);
  const plans = await getPlans<{
    availablePeriod: number;
    includeResources: boolean;
    includeSupport: boolean;
    price: number;
    titleUz: string;
    titleRu: string;
    id: string;
  }>(singleCourseId);

  if (course instanceof Error || plans instanceof Error)
    return <h2>Failed to fetch course data.</h2>;
  return (
    <div className="px-8 pb-8 pt-28">
      <div className="pb-4">
        <BackLink title={lang === "ru" ? "Назад" : "Orqaga"} heading="" />
      </div>
      <Accordion type="multiple" defaultValue={[singleCourseId]}>
        <CourceCard id={singleCourseId} lang={lang} />
      </Accordion>

      <div className="bg-white rounded-2xl pt-6 mt-10">
        <h2 className="text-main-300 text-2xl md:text-4xl font-medium mb-5">
          {lang === "ru" ? "Тарифы" : "Tariflar"}
        </h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-5">
          {plans?.map((plan: any) => (
            <PlanCard
              key={plan.id}
              values={plan}
              lang={lang}
              btn
              courseId={singleCourseId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default SingleCourse;
