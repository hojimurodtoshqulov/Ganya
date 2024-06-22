import { cookies } from "next/headers";
import Image from "next/image";
import { FC } from "react";
import HomeCourseDataForm from "../form";
import CourseHelpForm from "../form2";

async function getData<T>(): Promise<T[] | Error> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/statics/idx/home_course`,
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
const Info2: FC<{ lang: "uz" | "ru"; editable?: boolean }> = async ({
  lang,
  editable,
}): Promise<JSX.Element> => {
  const data = await getData<{
    id: string;
    idx: string;
    titleUz: string;
    titleRu: string;
    textUz: string;
    textRu: string;
    subTitleUz: string;
    subTitleRu: string;
    file: string;
  }>();
  // console.log(data);

  if (data instanceof Error || data.length === 0) {
    return <h2>Something went wrong</h2>;
  }
  return (
    <div>
      <div
        className={`flex flex-row-reverse w-full justify-center max-[900px]:-mb-20 gap-8 max-[900px]:gap-0  max-[900px]:items-center max-[900px]:flex-col-reverse about ${editable ? "scale-[0.8] scale-x-100 m-0 mx-0 my-0 !-mb-12 !-mt-14" : ""}`}
      >
        <div
          className={`flex flex-col justify-between flex-3 max-[900px]:flex-auto gap-4 bg-main-100 max-w-[760px] p-5 md:px-10 md:py-14 rounded-[20px] md:rounded-[40px] max-[900px]:max-w-full max-[900px]:relative max-[450px]:max-w-full ${editable ? "" : "z-10"} -top-20`}
        >
          <div className="flex flex-col gap-2 md:gap-4">
            <h2 className="text-h2 leading-normal">
              {lang === "ru" ? data?.[0]?.titleRu : data?.[0]?.titleUz}
            </h2>
            <p className="text-base md:text-[22px] md:leading-8 text-main-200 font-roboto">
              {lang === "ru" ? data?.[0]?.textRu : data?.[0]?.textUz}
            </p>
          </div>
        </div>

        <div className="flex-2 max-[900px]:w-full relative">
          <Image
            className="w-full h-full max-sm:object-cover rounded-[40px] min-w-[343px] max-[370px]:min-w-[300px] max-w-[536px]  max-[900px]:max-w-full"
            priority
            width={536}
            height={536}
            src={data?.[0].file}
            alt="Picture of the author"
          />
        </div>
      </div>
      {editable && (
        <HomeCourseDataForm
          method="PATCH"
          lang={lang}
          defaultValues={data?.[0]}
          id={data?.[0]?.id}
          accessToken={cookies().get("accessToken")?.value}
        />
      )}
      {editable && (
        <CourseHelpForm
          method="PATCH"
          lang={lang}
          defaultValues={data?.[1]}
          id={data?.[1]?.id}
          accessToken={cookies().get("accessToken")?.value}
        />
      )}
    </div>
  );
};

export default Info2;
