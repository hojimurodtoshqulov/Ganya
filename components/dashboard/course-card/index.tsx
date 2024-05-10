import { SquarePen } from "lucide-react";
import Image from "next/image";
import { FC, ReactNode } from "react";
import LinkById from "../link-by-id";

interface Props {
  title: string;
  image: string;
  status: string;
  children: ReactNode;
  id: string;
}

const CourseCard: FC<Props> = ({
  image,
  status,
  title,
  children,
  id,
}): JSX.Element => {


  
  return (
    <div className="rounded-2xl overflow-hidden bg-white flex flex-col">
      <div className="relative aspect-[9/5]">
        <Image src={image} alt="course image" fill className="object-cover" />
        <div className="absolute top-2 right-2">{children}</div>
      </div>
      <LinkById
        href={id}
        className="flex flex-col justify-between gap-5 px-4 pt-1 pb-3 flex-1"
      >
        <h4 className="text-lg font-semibold">{title}</h4>

        <div className="space-y-2">
          <h3 className="text-lg text-main-300 font-semibold">600.000 UZS</h3>
          <div className="px-3 py-1 text-xs text-blue-400 bg-blue-400/10 w-max rounded-lg">
            {status}
          </div>
        </div>
      </LinkById>
    </div>
  );
};

export default CourseCard;
