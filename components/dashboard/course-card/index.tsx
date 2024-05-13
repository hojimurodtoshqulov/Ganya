import Image from "next/image";
import { FC, ReactNode } from "react";
import LinkById from "../link-by-id";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  image: string;
  status: string;
  children: ReactNode;
  id: string;
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

const CourseCard: FC<Props> = async ({
  image,
  status,
  title,
  children,
  id,
}): Promise<JSX.Element> => {
  const plans = await getData<{
    price: number;
  }>(id);

  if (plans instanceof Error) {
    return <h2>Failed to fetch data.</h2>;
  }

  return (
    <div className="rounded-2xl overflow-hidden bg-white flex flex-col">
      <div className="relative aspect-[9/5]">
        <Image src={image} alt="course image" fill className="object-cover" />
        <div className="absolute top-2 right-2">{children}</div>
      </div>
      <LinkById
        href={id}
        className="flex flex-col justify-between gap-5 px-4 pt-1 pb-3 flex-1"
      >
        <h4 className="text-lg font-semibold">{title}</h4>

        <div className="space-y-2">
          <h3 className="text-lg text-main-300 font-semibold">
            {plans?.[0]?.price ? plans?.[0]?.price + " UZS" : "0 UZS"}
          </h3>
          <Status status={status} />
        </div>
      </LinkById>
    </div>
  );
};

export default CourseCard;

export const Status: FC<{
  status: string;
}> = ({ status }) => {
  return (
    <div
      className={cn(
        `px-3 py-1 text-xs w-max rounded-lg`,
        { "text-blue-500 bg-blue-500/10": status === "inProgress" },
        { "text-csneutral-500 bg-csneutral-500/10": status === "archived" },
        { "text-green-500 bg-green-500/10": status === "completed" },
      )}
    >
      {status}
    </div>
  );
};
