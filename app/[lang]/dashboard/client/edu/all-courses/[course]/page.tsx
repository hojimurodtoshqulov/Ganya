import Modules from "@/components/dashboard/module-card/module.card";
import Card from "@/components/shared/tariflar/card";
import { FC } from "react";

interface Props {
  params: {
    course: string;
    lang: "uz" | "ru";
  };
}

async function getData<T>(id: string): Promise<T | Error> {
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
async function getPlan<T>(id: string): Promise<T[] | Error> {
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
const OneOfAllCourses: FC<Props> = async ({
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
  const plans = await getPlan<{
    id: string;
    price: number;
    availablePeriod: number;
    titleUz: string;
    titleRu: string;
    includeSupport: boolean;
    includeResources: boolean;
    includePrivateGroupAccess: boolean;
    descriptionUz: string;
    descriptionRu: string;
    detailsUz: string;
    detailsRu: string;
    discount?: number;
    discountExpiredAt?: string;
  }>(course);
  if (plans instanceof Error) return <h2>Failed to fetch data.</h2>;

  return (
    <div>
      <Modules data={data} lang={lang} />
      <div className="flex gap-6 flex-col justify-center p-6 bg-white mt-5 rounded-2xl">
        <h2 className="font-comfortaa text-main-300 font-semibold text-[26px]">
          Тарифы
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center lg:grid-cols-3 gap-5 md:gap-6">
          {plans.map((plan, i) => (
            <Card
              key={plan.id}
              values={plan}
              btn
              small
              lang={lang}
              pro={i === 1}
              courseId={course}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OneOfAllCourses;
