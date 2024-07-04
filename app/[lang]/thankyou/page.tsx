import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";

interface Props {
  params: { lang: "ru" | "uz" };
}

const Page: FC<Props> = ({ params: { lang } }): JSX.Element => {
  return (
    <div className="w-full h-screen text-center flex items-center justify-center flex-col px-5">
      <h3 className="md:text-3xl text-2xl font-medium text-csneutral-500">
        {lang === "ru"
          ? "Спасибо за вашу заявку!"
          : "Murojaatingiz uchun rahmat!"}
      </h3>

      <p className="md:text-lg text-sm">
        {lang === "ru"
          ? "Также вы можете подключиться в наш телеграм канал"
          : "Siz bizning telegram kanalimizga ham ulanishingiz mumkin"}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 items-center mt-5">
        <Link
          href={"/" + lang}
          className="px-5 py-2.5 rounded-md text-main-300 border border-main-300 block w-full"
        >
          {lang === "ru"
            ? "Вернуться на главную страницу"
            : "Bosh sahifaga qaytish"}
        </Link>
        <a
          href="https://t.me/academia_prikorm"
          className="px-5 py-2.5 rounded-md text-white bg-main-200 block w-full border border-main-300"
        >
          {lang === "ru" ? "Перейти на канал" : "Kanalga o'tish"}
        </a>
      </div>
    </div>
  );
};

export default Page;
