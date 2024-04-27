import BackLink from "@/components/dashboard/back-link";
import Dars from "@/components/dashboard/dars";
import { FC } from "react";

interface Props {
  params: {
    lesson: string;
  };
}

const SingleLesson: FC<Props> = ({ params: { lesson } }): JSX.Element => {
  return (
    <>
      <BackLink
        title="1-modul: Kichkintoyingiz uchun birinchi qo'shimcha ovqatlarni kiritish"
        heading="1-Dars: Tanishish"
      />
      <div className="mt-5">
        <Dars />
      </div>
    </>
  );
};

export default SingleLesson;
