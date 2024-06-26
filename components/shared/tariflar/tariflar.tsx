import Card from "./card";

async function getCourse<T>(id: string): Promise<T[] | Error> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/plans/all/" + id,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return new Error("Failed to fetch data");
  }

  return res.json();
}
async function Tariflar({ id, lang }: { id: string; lang: "uz" | "ru" }) {
  const data = await getCourse<{
    availablePeriod: number;
    includeResources: boolean;
    includeSupport: boolean;
    includePrivateGroupAccess: boolean;
    price: number;
    discount?: number;
    discountExpiredAt?: string;
    titleUz: string;
    titleRu: string;
    detailsUz: string;
    detailsRu: string;
    descriptionUz: string;
    descriptionRu: string;
    id: string;
  }>(id);

  if (data instanceof Error) return <h2>Failed to fetch data.</h2>;

  return (
    <div className="flex gap-6 px-5 flex-col justify-center">
      <h2 className="title text-h2  leading-[56px]">
        {lang === "ru" ? "Тарифы" : "Tariflar"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-center lg:grid-cols-3 gap-5 md:gap-6">
        {data.map((t) => (
          <Card values={t} key={t.id} btn lang={lang} courseId={id} />
        ))}
      </div>
    </div>
  );
}

export default Tariflar;
