import { FC } from "react";
import Video from "./video";

async function getVideo<T>(): Promise<T[] | Error> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/statics/idx/main_video`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) {
    return new Error("Failed to fetch data");
  }
  return res.json();
}

const MainVideo: FC = async (): Promise<JSX.Element> => {
  const data = await getVideo<{
    file: string;
  }>();

  if (data instanceof Error) return <h2>Failed to fetch data</h2>;
  return <Video videoLink={data?.[0]?.file} />;
};

export default MainVideo;
