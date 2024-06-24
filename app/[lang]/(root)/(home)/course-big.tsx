import CourceCard from "@/components/shared/cource-card/courceCard";
import { Accordion } from "@/components/ui/accordion";
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
const CourseBig: FC<{ singleCourseId: string; lang: "uz" | "ru" }> = async ({
  singleCourseId,
  lang,
}): Promise<JSX.Element> => {
  const course = await getCourse<any>(singleCourseId);
  if (course instanceof Error) return <h2>Failed to fetch course data.</h2>;
  return (
    <>
      <Accordion type="multiple" defaultValue={[singleCourseId]}>
        <CourceCard id={singleCourseId} lang={lang} data={course} />
      </Accordion>
    </>
  );
};

export default CourseBig;
