import { FC } from "react";
import Link from "next/link";
import Form from "./form";
import { loginAction } from "@/lib/actions/auth.actions";
import ClearStorage from "../clear-storage";

const SignIn: FC<{ params: { lang: "uz" | "ru" } }> = ({
  params: { lang },
}): JSX.Element => {
  return (
    <div className="max-w-[472px] bg-white p-6 flex flex-col gap-6 justify-center w-full rounded-2xl overflow-hidden relative">
      <ClearStorage />
      <div className="text-center space-y-1">
        <h2 className="text-h2 leading-tight">
          {lang === "ru" ? "Войти" : "Kirish"}
        </h2>
        <p className="text-lg">
          {lang === "ru"
            ? "Займет всего минуту"
            : "Faqat bir daqiqa vaqt oladi"}
        </p>
      </div>
      <Form action={loginAction} lang={lang} />
      <div className="flex gap-2 justify-center items-center bg-csneutral-100 p-6">
        <p>{lang === "ru" ? "Нет аккаунта" : "Akkaunt yo'qmi"}?</p>
        <Link
          href={`/${lang}/auth/sign-up`}
          className="text-main-200 font-semibold"
        >
          {lang === "ru" ? "Зарегистрироваться" : "Ro'yxatdan o'tish"}
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
