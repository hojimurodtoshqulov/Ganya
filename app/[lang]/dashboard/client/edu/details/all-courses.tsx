import LinkById from "@/components/dashboard/link-by-id";
import ModuleCard from "@/components/dashboard/module-card";
import { FC } from "react";

const AllCourses: FC = (): JSX.Element => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <LinkById href={`all-courses/${i}`} key={i}>
          <ModuleCard title="Post-natal pilates" />
        </LinkById>
      ))}
      <ModuleCard title="Post-natal pilates kask kasdkas kasd akddsak" />
    </div>
  );
};

export default AllCourses;
