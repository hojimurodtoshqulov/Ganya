import CourseCard from "@/components/dashboard/course-card";
import { FC } from "react";

interface ICard {
  id: string;
  createdAt: string;
  updatedAt: string;
  titleUz: string;
  titleRu: string;
  image: string;
  descriptionUz: string;
  descriptionRu: string;
}

async function getData<T>(): Promise<T[]> {
  const res = await fetch("https://oar-api.onrender.com/api/v1/courses/all", {
    cache: "no-store",
  });

  return res.json();
}

const AllCourses: FC = async (): Promise<JSX.Element> => {
  console.log("fetch start");
  const data = await getData<ICard>();
  if (data.length === 0) {
    return <h2>no data</h2>;
  }
  return (
    <div className="grid grid-cols-4 gap-6">
      {data.map(({ id, image, titleRu }) => (
        <CourseCard image={image} title={titleRu} status="" key={id} />
      ))}
    </div>
  );
};

export default AllCourses;
