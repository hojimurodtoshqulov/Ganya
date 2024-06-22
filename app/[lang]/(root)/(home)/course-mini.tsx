import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import arrowCorner from "@/icons/arrowleftCorner.svg";
import { ArrowDownRight } from "lucide-react";

interface Props {
  gridData: {
    id?: string;
    descriptionRu?: string;
    descriptionUz?: string;
    image?: string;
    titleRu?: string;
    titleUz?: string;
  };
  lang: "ru" | "uz";
}

const CourseMini: FC<Props> = ({ gridData, lang }): JSX.Element => {
  return (
    <div
      className={`bg-csneutral-100 transition-colors flex flex-col w-full  gap-4 lg:gap-10  p-4 lg:p-6 xl:p-7 rounded-[20px] md:rounded-[40px] justify-between hover:text-main-300`}
    >
      <div className="relative w-full aspect-[2/1]">
        <Image
          src={gridData?.image ?? ""}
          alt={gridData?.descriptionRu ?? "image"}
          className="rounded-[10px] md:rounded-[25px] overflow-hidden"
          fill
        />
      </div>
      <Link
        href={`/${lang}/courses/${gridData?.id}`}
        className="flex justify-between gap-2.5 items-start"
      >
        <h2 className="text-2xl md:text-4xl font-bold font-comfortaa">
          {lang === "ru" ? gridData?.titleRu : gridData?.titleUz}
        </h2>
        <div className="flex-shrink-0 md:w-12 md:h-12 -rotate-90">
          <ArrowDownRight className="w-full h-full" />
        </div>
      </Link>
    </div>
  );
};

export default CourseMini;
