import { FC } from "react";
import BackLink from "@/components/dashboard/back-link";
import LinkById from "@/components/dashboard/link-by-id";

interface Props {
  params: {
    course: string;
  };
}

const arr = [1, 2, 3, 4, 5, 6];

const OneOfMyCourses: FC<Props> = ({ params: { course } }): JSX.Element => {
  return (
    <>
      <BackLink
        title="Mening xaridlarim"
        heading="Qo'shimcha muammosiz ovqatlar"
      />

      <div className="mt-3 md:mt-5 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {arr.map((i) => (
          <LinkById href={i} key={i} className="px-5 py-4 bg-white rounded-2xl">
            <span className="block mb-2 text-base">{i}-modul</span>
            <h4 className="font-normal text-[22px] leading-8">
              Kichkintoyingiz uchun birinchi qo'shimcha ovqatlarni kiritish
            </h4>
          </LinkById>
        ))}
      </div>
    </>
  );
};

export default OneOfMyCourses;
