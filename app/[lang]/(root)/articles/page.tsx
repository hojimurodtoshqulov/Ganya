import Trening from "@/components/dashboard/trening-card";
import CardStatya from "@/components/shared/stati/card-stati";
import Card from "@/components/shared/tariflar/card";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const articeldata = [1, 2, 3, 4, 5, 6, 7, 8];

const Articles: FC = (): JSX.Element => {
  return (
    <div className="container mt-32">
      <div className="flex items-center justify-between">
        <Heading text="Статьи" />
        <Search />
        <Input placeholder="Поиск статьей" className="max-w-[425px]" />
      </div>
      <div className="grid lg:grid-cols-3 gap-6 mt-10 md:grid-cols-2 grid-cols-1">
        {articeldata.map((e, i) => (
          <Link key={i} href={`/articles/${e}`}>
            <CardStatya
              hight
              key={e}
              title="Роды в Lapino. Как это было?"
              text="Описание"
              time="Mar 25, 2024"
              minut={9}
              bacraund
              width
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Articles;
