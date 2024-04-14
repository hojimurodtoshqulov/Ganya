import Link from "next/link";
import { FC } from "react";
import Form from "./form";
import { registerAction } from "@/lib/actions/auth.actions";

const SignUp: FC = (): JSX.Element => {
  return (
    <div className="max-w-[472px] flex flex-col gap-6 justify-center w-full rounded-2xl overflow-hidden bg-white p-6">
      <div className="text-center space-y-1">
        <h2 className="text-h2">Регистрация</h2>
        <p className="text-lg">Займет всего минуту</p>
      </div>
      <Form action={registerAction} />

      <div className="flex gap-2 justify-center items-center bg-csneutral-100 p-6">
        <p>Уже есть аккаунт?</p>
        <Link href={"/auth/sign-in"} className="text-main-200 font-semibold">
          Войти
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
