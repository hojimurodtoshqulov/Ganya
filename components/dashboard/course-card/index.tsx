import { SquarePen } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface Props {
  title: string;
  image: string;
  status: string;
}

const CourseCard: FC<Props> = ({ image, status, title }): JSX.Element => {
  return (
    <div className="rounded-2xl overflow-hidden">
      <div className="relative aspect-[9/5]">
        <Image src={image} alt="course image" fill className="object-cover" />
        <button className="rounded-full bg-white w-8 h-8 flex items-center justify-center cursor-pointer border-none outline-none absolute top-2 right-2 text-black">
          <SquarePen width={16} height={16} />
        </button>
      </div>
      <div className="p-4 bg-white">
        <h4>{title}</h4>
      </div>
    </div>
  );
};

export default CourseCard;
