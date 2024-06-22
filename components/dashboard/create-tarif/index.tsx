import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import { FC } from "react";
import CreateTarifForm from "./form";
import Card from "./card";
import { cookies } from "next/headers";
import { getDictionary } from "@/lib/get-dictionary";

interface Props {
  courseId: string;
  lang: "uz" | "ru";
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
const CreateTarif: FC<Props> = async ({
  courseId,
  lang,
}): Promise<JSX.Element> => {
  const response = await getData<{
    id: string;
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
    package: string;
  }>(courseId);
  if (response instanceof Error) {
    return <h2>Failed to fetch data.</h2>;
  }
  console.log(response, "response");
  const dict = await getDictionary(lang);
  return (
    <>
      <div className="flex flex-row justify-between items-center bg-white rounded-2xl p-6">
        <h1 className="text-[26px] text-main-300">
          {dict.dashboard.admin.curse.tarifi.title}
        </h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="main" className="text-sm py-2 px-5 font-normal">
              {dict.dashboard.admin.curse.tarifi.btn}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl overflow-auto max-h-screen">
            <CreateTarifForm
              courseId={courseId}
              method="POST"
              lang={lang}
              accessToken={cookies().get("accessToken")?.value}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-3 gap-5 p-5">
        {response.map((data) => (
          <Card
            values={data}
            key={data.id}
            small
            planId={data.id}
            lang={lang}
          />
        ))}
      </div>
    </>
  );
};

export default CreateTarif;
