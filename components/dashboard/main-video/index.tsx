import React from "react";
import { Modal } from "./modal";
import { cookies } from "next/headers";
import VideoCard from "./card";
interface DataProps {
  id: string;
  idx: string;
  titleUz: null | string;
  titleRu: null | string;
  subTitleUz: null | string;
  subTitleRu: null | string;
  textUz: null | string;
  textRu: null | string;
  file: string;
  createdAt: string;
  updatedAt: string;
}
interface Props {
  lang: "uz" | "ru";
}
const MainVideoCom = async ({ lang }: Props) => {
  const accessToken = cookies().get("accessToken")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/statics/idx/main_video`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) {
    return <div>Something went wrong</div>;
  }
  let data: DataProps[] = await res.json();
  return (
    <div className="relative">
      {data.length !== 0 ? (
        data.map((item: DataProps, indx: number) => (
          <VideoCard
            data={item}
            key={item.id}
            lang={lang}
            accessToken={accessToken || ""}
          />
        ))
      ) : (
        <Modal accessToken={accessToken || ""} />
      )}
    </div>
  );
};
export default MainVideoCom;
