import { FC } from "react";
import Form from "./form";
import { cookies } from "next/headers";

async function getData<T>(): Promise<T[] | Error> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/statics/idx/home_course_p1`,
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
const Course: FC<{ lang: "uz" | "ru" }> = async ({
  lang,
}): Promise<JSX.Element> => {
  const data = await getData<{
    id: string;
    idx: string;
    titleUz: string;
    titleRu: string;
    textUz: string;
    textRu: string;
    file: string;
  }>();
  console.log(data, "data");
  if (data instanceof Error) {
    return <h2>Failed to fetch data.</h2>;
  }

  return (
    <div>
      <Form
        method="POST"
        lang={lang}
        accessToken={cookies().get("accessToken")?.value}
      />
    </div>
  );
};

export default Course;
