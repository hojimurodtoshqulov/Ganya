import { FC } from "react";
import Link from "next/link";
import Form from "./form";
import { loginAction } from "@/lib/actions/auth.actions";

const SignIn: FC = (): JSX.Element => {
  return (
    <div className="max-w-[472px] bg-white p-6 flex flex-col gap-6 justify-center w-full rounded-2xl overflow-hidden">
      <div className="text-center space-y-1">
        <h2 className="text-h2 leading-tight">Войти</h2>
        <p className="text-lg">Займет всего минуту</p>
      </div>
      <Form action={loginAction} />
      <div className="flex gap-2 justify-center items-center bg-csneutral-100 p-6">
        <p>Нет аккаунта?</p>
        <Link href={"/auth/sign-up"} className="text-main-200 font-semibold">
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
