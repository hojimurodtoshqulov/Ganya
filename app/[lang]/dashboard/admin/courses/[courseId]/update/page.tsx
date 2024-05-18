import AddModul from "@/components/dashboard/add_modul";
import CreateTarif from "@/components/dashboard/create-tarif";
import { FC } from "react";
import StatusChange from "./status";

const UpdateCourse: FC<{ params: { courseId: string, lang:'uz'| 'ru' } }> = ({
  params: { courseId, lang },
}): JSX.Element => {
  return (
    <div className="min-h-[calc(100vh-93px)] relative h-full flex flex-col justify-between">
      <div>
        <AddModul courseId={courseId} lang={lang} />

        <div className="pb-6 bg-white">
          <CreateTarif courseId={courseId} />
        </div>
      </div>

      <div className="sticky bottom-0 w-full z-50 h-[68px]">
        <StatusChange id={courseId} />
      </div>
    </div>
  );
};

export default UpdateCourse;
