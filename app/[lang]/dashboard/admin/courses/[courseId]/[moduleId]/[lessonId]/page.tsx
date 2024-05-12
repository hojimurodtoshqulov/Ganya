import { FC } from "react";
import FormLessonEdit from "./formLessonEdit";
import toast from "react-hot-toast";

interface Props {
  params: any;
}

const getLesson = async (id: string) => {
  const api = process.env.NEXT_PUBLIC_BASE_URL + `/lessons/single/${id}`;
  try {
    const req = await fetch(api, { cache: "no-store" });
    if (!req.ok) throw new Error("Failed to fetch");
    const res = await req.json();
    return res;
  } catch (error: any) {
    return null;
  }
};

const Page: FC<Props> = async ({ params }): Promise<JSX.Element> => {
  const data = await getLesson(params.lessonId);

  return (
    <div>
      <FormLessonEdit params={params} data={data} />
    </div>
  );
};

export default Page;
