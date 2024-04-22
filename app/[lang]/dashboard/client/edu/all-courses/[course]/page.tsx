import Modules from "@/components/dashboard/module-card/module.card";
import Card from "@/components/shared/tariflar/card";
import { FC } from "react";

interface Props {
  params: {
    course: string;
  };
}

const OneOfAllCourses: FC<Props> = ({ params: { course } }): JSX.Element => {
  return (
    <div>
      <Modules />
      <div className="flex gap-6 flex-col justify-center p-6 bg-white mt-5 rounded-2xl">
        <h2 className="font-comfortaa text-main-300 font-semibold text-[26px]">
          Тарифы
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center lg:grid-cols-3 gap-5 md:gap-6">
          <Card
            small
            title="Базовый пакет:"
            price="650.000 UZS"
            content={[
              "Доступ ко всем видеоурокам в течение 3 месяцев с момента приобретения курса.",
            ]}
          />

          <Card
            small
            title="Стандартный"
            price="850.000 UZS"
            content={[
              "Доступ ко всем видеоурокам в течение 6 месяцев с момента приобретения курса.",
              "Дополнительные текстовые материалы.",
            ]}
            pro
          />

          <Card
            small
            title="Премиум пакет:"
            price="1 200 000 UZS"
            content={[
              "Доступ ко всем видеоурокам в течение 1 года с момента приобретения курса.",
              "Дополнительные текстовые материалы.",
              "1 онлайн - консультации со мной.",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default OneOfAllCourses;
