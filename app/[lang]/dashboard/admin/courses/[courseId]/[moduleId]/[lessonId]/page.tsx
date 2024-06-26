import { FC } from "react";
import FormLessonEdit from "./formLessonEdit";
import toast from "react-hot-toast";
import { cookies } from "next/headers";
import { getDictionary } from "@/lib/get-dictionary";
interface Props {
  params: any;
}


const getLesson = async (id: string) => {

  const api = process.env.NEXT_PUBLIC_BASE_URL + `/lessons/single/${id}`;
  const accessToken = cookies().get("accessToken")?.value;
  try {
    const req = await fetch(api, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`,
      },
    });

    if (!req.ok) throw new Error("Failed to fetch");

    const res = await req.json();

    return res;
  } catch (error: any) {
    return null;
  }
};

const Page: FC<Props> = async ({ params }): Promise<JSX.Element> => {
  const data = await getLesson(params.lessonId);
  const accessToken = cookies().get("accessToken")?.value;
  const dictionary = await getDictionary(params.lang)

  return (
    <div>
      <FormLessonEdit params={params} data={data} accToken={accessToken} dict={dictionary.dashboard} />
    </div>
  );
};

export default Page;
