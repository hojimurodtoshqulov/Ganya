import LinkById from "@/components/dashboard/link-by-id";
import ModuleCard from "@/components/dashboard/module-card";
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
  courseStatus: string;
}
async function getData<T>(): Promise<T[] | Error> {
  console.log("archived");
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/courses/all?status=completed",
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return new Error("Failed to fetch data");
  }

  return res.json();
}
const AllCourses: FC = async (): Promise<JSX.Element> => {
  const data = await getData<ICard>();
  if (data instanceof Error) {
    return <h2>Failed to fetch data.</h2>;
  }
  if (data.length === 0) {
    return <h2>No data</h2>;
  }
  console.log(data, "nu baa");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.map((c) => (
        <LinkById href={`all-courses/${c.id}`} key={c.id}>
          <ModuleCard title={c.titleUz} id={c.id} image={c.image} />
        </LinkById>
      ))}
    </div>
  );
};

export default AllCourses;
