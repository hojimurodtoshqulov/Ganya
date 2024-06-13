import Image from "next/image";

interface ModuleCardProps {
  title: string;
  image: string;
  id: string;
  lang: "uz" | "ru";
}

// async function getCourse<T>(id: string): Promise<T[] | Error> {
//   const res = await fetch(
//     process.env.NEXT_PUBLIC_BASE_URL + "/plans/all/" + id,
//     {
//       cache: "no-store",
//     },
//   );

//   if (!res.ok) {
//     return new Error("Failed to fetch data");
//   }

//   return res.json();
// }

const ModuleCard: React.FC<ModuleCardProps> = async ({
  title,
  image,
  id,
  lang,
}) => {
  // const data = await getCourse<{
  //   availablePeriod: number;
  //   includeResources: boolean;
  //   includeSupport: boolean;
  //   price: number;
  //   titleUz: string;
  //   titleRu: string;
  //   id: string;
  // }>(id);

  // if (data instanceof Error) {
  //   return <h2>Failed to fetch plan.</h2>;
  // }

  // const sum = lang === "uz" ? "UZS" : "УЗС";

  return (
    <div className="rounded-[18px] bg-white overflow-hidden w-full h-full flex flex-col">
      <div className="w-full aspect-[9/5] relative">
        <Image src={image} alt="image" className="object-cover" fill />
      </div>
      <div className="w-full h-fit p-4 pt-2 gap-2 flex flex-col justify-between grow">
        <h1 className="text-lg font-semibold">{title}</h1>
        {/* <div className="flex flex-col ">
          <h3 className="text-lg text-main-300 font-semibold">
            {data?.[0]?.price ? data?.[0]?.price : 0} {sum}
          </h3>
        </div> */}
      </div>
    </div>
  );
};

export default ModuleCard;
