import AddModul from "@/components/dashboard/add_modul";
import { Cousine } from "next/font/google";
import { FC } from "react";

const SingleCourse: FC<{ params: { courseId: string } }> = ({ params: { courseId } }): JSX.Element => {
  console.log(courseId)
  return (
    <div>
      <AddModul courseId={courseId}  />
    </div>
  );
}
export default SingleCourse;
