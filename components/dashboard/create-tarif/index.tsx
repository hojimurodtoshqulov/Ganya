import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import { FC } from "react";
import CreateTarifForm from "./form";
import Card from "./card";
import { cookies } from "next/headers";

interface Props {
  courseId: string;
}
async function getData<T>(id: string): Promise<T[] | Error> {
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
const CreateTarif: FC<Props> = async ({ courseId }): Promise<JSX.Element> => {
  const response = await getData<{
    id: string;
    availablePeriod: number;
    includeResources: boolean;
    includeSupport: boolean;
    price: number;
    titleUz: string;
    titleRu: string;
  }>(courseId);
  if (response instanceof Error) {
    return <h2>Failed to fetch data.</h2>;
  }
  console.log(response);
  return (
    <>
      <div className="flex flex-row justify-between items-center bg-white rounded-2xl p-6">
        <h1 className="text-[26px] text-main-300">Тарифы</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="main" className="text-sm py-2 px-5 font-normal">
              Добавить тариф
            </Button>
          </DialogTrigger>
          <DialogContent>
            <CreateTarifForm
              courseId={courseId}
              method="POST"
              accessToken={cookies().get("accessToken")?.value}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-3 gap-5 p-5">
        {response.map((data) => (
          <Card values={data} key={data.id} small planId={data.id} />
        ))}
      </div>
    </>
  );
};

export default CreateTarif;
