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
async function Tariflar({ id }: { id: string }) {
  const data = await getCourse<{
    available_period: number;
    includeResources: boolean;
    includeSupport: boolean;
    price: number;
    titleUz: string;
    titleRu: string;
    id: string;
  }>(id);

  console.log(data,"<--- home page plans")

  if (data instanceof Error) return <h2>Failed to fetch data.</h2>;

  return (
    <div className="flex gap-6 px-6 flex-col pb-5 min-h-[696px] justify-center">
      <h2 className="title text-h2  leading-[56px]">Тарифы</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center lg:grid-cols-3 gap-5 md:gap-6">
        {data.map((t, i) => (
          <Card values={t} key={t.id} btn pro={i === 1} />
        ))}

        {/* <Card
          title="Стандартный"
          price="850.000 UZS"
          content={[
            "Доступ ко всем видеоурокам в течение 6 месяцев с момента приобретения курса.",
            "Дополнительные текстовые материалы.",
          ]}
          pro
        />

        <Card
          title="Премиум пакет:"
          price="1 200 000 UZS"
          content={[
            "Доступ ко всем видеоурокам в течение 1 года с момента приобретения курса.",
            "Дополнительные текстовые материалы.",
            "1 онлайн - консультации со мной.",
          ]}
        /> */}
      </div>
    </div>
  );
}

export default Tariflar;
