import AddModul from "@/components/dashboard/add_modul";
import Modules from "@/components/dashboard/module-card/module.card";
import PlanCard from "@/components/shared/tariflar/card";

import { FC } from "react";

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

  return res.json();
}
const SingleCourse: FC<{ params: { courseId: string } }> = async ({
  params: { courseId },
}): Promise<JSX.Element> => {
  const course = await getCourse(courseId);
  const plans = await getPlans<{
    availablePeriod: number;
    includeResources: boolean;
    includeSupport: boolean;
    price: number;
    titleUz: string;
    titleRu: string;
    id: string;
  }>(courseId);
  if (course instanceof Error || plans instanceof Error)
    return <h2>Failed to fetch course data.</h2>;
  return (
    <>
      <Modules data={course} />

      <div className="bg-white rounded-2xl p-6 mt-10">
        <h2 className="text-main-300 text-2xl font-medium mb-5">Тарифы</h2>
        <div className="grid grid-cols-3 gap-5">
          {plans.map((plan) => (
            <PlanCard key={plan.id} values={plan} small />
          ))}
        </div>
      </div>
    </>
  );
};
export default SingleCourse;
