import { FC } from "react";
import Slider from "./slider";

async function getBanners<T>(): Promise<T[] | Error> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/banners/all?isPublished=true",
    {
      cache: "no-store",
    },
  );

  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    return new Error("Failed to fetch data");
  }

  return data;
}
const Banner: FC = async (): Promise<JSX.Element> => {
  const banners = await getBanners<{
    imageWeb: string;
    imageMobile: string;
    link: string;
    id: string;
  }>();

  if (banners instanceof Error) {
    return <h2>Failed to fetch banners.</h2>;
  }

  return <Slider data={banners} />;
};

export default Banner;
