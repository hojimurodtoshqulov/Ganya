"use client";

import LessonItem from "@/components/dashboard/add-lesson/lesson-item";
import { useRouter } from "next/navigation";
import { FC, useState, useEffect } from "react";

interface Props {
  params: any;
}

const Page: FC<Props> = ({ params }): JSX.Element => {
  const [data, setData] = useState<Object | any>(null);
  const router = useRouter();

  const lessonsLength = data?.Lesson?.length;

  useEffect(() => {
    const getModuleById = async () => {
      try {
        const api =
          process.env.NEXT_PUBLIC_BASE_URL +
          `/modules/single/${params.moduleId}`;
        const req = await fetch(api, { cache: "no-store" });

        if (!req.ok) {
          throw new Error("Failed to fetch module data");
        }
        router.refresh();
        const data = await req.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching module data:", error);
      }
    };

    getModuleById();
  }, []);

  return (
    <div>
      <h1>{data?.titleRu}</h1>
      <div className="flex flex-col gap-3">
        {data?.Lesson?.map((lesson: any, index: number) => (
          <LessonItem
            type="item"
            link={`/dashboard/admin/courses/${params.courseId}/${params.moduleId}/${lesson.id}`}
            value={{ title: lesson, number: index }}
            key={lesson.id}
          />
        ))}

        {/*    <LessonItem type="create" link={{ pathname: `/dashboard/admin/courses/${params.courseId}/${params.moduleId}/create`, query: `number=${lessonsLength + 1}` }} /> */}

        <LessonItem
          type="create"
          link={`/dashboard/admin/courses/${params.courseId}/${params.moduleId}/create/?number=${lessonsLength + 1}`}
        />
      </div>
    </div>
  );
};

export default page;
