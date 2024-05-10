import CardArticls from "@/components/dashboard/articls/articlscard";
import CardStatya from "@/components/shared/stati/card-stati";
import { Button, buttonVariants } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const Articles: FC = (): JSX.Element => {
  const facedate = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="relative w-[350px] ">
          <Search className="absolute top-[10px] left-2" />
          <Input placeholder="Поиск статьей" className="w-full pl-[35px]" />
        </div>
        <Link
          className={buttonVariants({ variant: "main" })}
          href={"/dashboard/admin/articles/post"}
        >
          {"Yangi maqola qo'shing"}
        </Link>
      </div>
      <div className="grid lg:grid-cols-4 gap-6 mt-10 md:grid-cols-2 grid-cols-1">
        {facedate.map((e, i) => (
          <Link key={i} href={`/dashboard/admin/articles/${i}`}>
            <CardArticls
              title="Роды в Lapino. Как это было?"
              text="Описание"
              time="Mar 25, 2024"
              minut={9}
              width
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Articles;
