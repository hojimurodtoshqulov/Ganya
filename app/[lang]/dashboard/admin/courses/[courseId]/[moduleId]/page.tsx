import LessonItem from "@/components/dashboard/add-lesson/lesson-item";
import { useRouter } from "next/navigation";

interface Props {
  params: any;
}


const getModuleById = async (id: string) => {
  try {
    const api =
      process.env.NEXT_PUBLIC_BASE_URL +
      `/modules/single/${id}`;
    const req = await fetch(api, { cache: "no-store" });

    if (!req.ok) {
      throw new Error("Failed to fetch module data");
    }
    // router.refresh();
    const data = await req.json();
    return data
  } catch (error) {
    console.error("Error fetching module data:", error);
  }
};


const Page: React.FC<Props> = async ({ params }): Promise<JSX.Element> => {
  const data = await getModuleById(params.moduleId)
  const lessonsLength = data?.Lesson?.length;

  return (
    <div>
      <h1 className="text-2xl text-main-300 font-semibold pb-4 ">{data?.titleRu ? data?.titleRu : 'Module title'}</h1>
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

export default Page;
