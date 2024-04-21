import Trening from "@/components/dashboard/trening-card";
import { FC } from "react";

const MyCourses: FC = (): JSX.Element => {
  return (
    <div className="space-y-2.5">
      {[1, 2, 3].map((i) => (
        <Trening key={i} />
      ))}
    </div>
  );
};

export default MyCourses;
