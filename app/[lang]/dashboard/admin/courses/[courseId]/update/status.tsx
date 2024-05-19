import { Status } from "@/components/dashboard/course-card";
import { FC } from "react";
import StatusForm from "./statusForm";
import { cookies } from "next/headers";

async function getData<T>(id: string): Promise<T | Error> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + `/courses/single/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return new Error("Failed to fetch data");
  }

  return res.json();
}
const StatusChange: FC<{ id: string }> = async ({
  id,
}): Promise<JSX.Element> => {
  const data = await getData<{
    courseStatus: string;
  }>(id);

  if (data instanceof Error) {
    return <h2>Failed to fetch data.</h2>;
  }

  return (
    <div className="w-[calc(100%+3rem)] px-8 h-full flex justify-between items-center absolute top-0 -left-6 bg-white border-t">
      <div className="flex items-center gap-5">
        <span className="text-lg">Статус:</span>{" "}
        <Status status={data.courseStatus} />
      </div>
      <div className="flex items-center gap-5 text-sm">
        <p>Перед тем как опубликовать убедитесь что всё подготовили:</p>
        <StatusForm id={id} accessToken={cookies().get("accessToken")?.value} />
      </div>
    </div>
  );
};

export default StatusChange;
