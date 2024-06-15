import Link from "next/link";
import { FC } from "react";
import Form from "./form";
import { registerAction } from "@/lib/actions/auth.actions";

const SignUp: FC<{ params: { lang: "ru" | "uz" } }> = ({
  params: { lang },
}): JSX.Element => {
  return (
    <div className="max-w-[472px] flex flex-col gap-6 justify-center w-full rounded-2xl overflow-hidden bg-white p-6">
      <div className="text-center space-y-1">
        <h2 className="text-h2">
          {lang === "ru" ? "Регистрация" : "Ro'yxatdan o'tish"}
        </h2>
        <p className="text-lg">
          {lang === "ru"
            ? "Займет всего минуту"
            : "Faqat bir daqiqa vaqt oladi"}
        </p>
      </div>
      <Form action={registerAction} lang={lang} />

      <div className="flex gap-2 justify-center items-center bg-csneutral-100 p-6">
        <p>{lang === "ru" ? "Уже есть аккаунт" : "Akkaunt mavjudmi"}?</p>
        <Link
          href={`/${lang}/auth/sign-in`}
          className="text-main-200 font-semibold"
        >
          {lang === "ru" ? "Войти" : "Kirish"}
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
