"use client";
import { Input } from "@/components/ui/input";
import { FC, useEffect, useState } from "react";
import { cn, getActionErrors } from "@/lib/utils";
import { PasswordInput } from "../password-input";
import Link from "next/link";
import { ZodIssue } from "zod";
import { redirect, useRouter } from "next/navigation";
import SubmitBtn from "../submit-button";
import { useToast } from "@/components/ui/use-toast";
import { clearCookie } from "@/lib/actions/auth.actions";

type ActionReturn = {
  errors?: ZodIssue[];
  successMessage?: string;
  errorMessage?: string;
};

interface Props {
  action: (params: FormData) => Promise<ActionReturn>;
  lang: "uz" | "ru";
}

const SignInForm: FC<Props> = ({ action, lang }): JSX.Element => {
  const [state, setState] = useState<ActionReturn>();
  const { toast } = useToast();

  const emailOrPhoneErr = getActionErrors("emailOrPhone", state?.errors)?.[0];
  const passwordErr = getActionErrors("password", state?.errors)?.[0];

  // useEffect(() => {
  //   const f = async () => await clearCookie();
  //   f();
  //   return () => {
  //     f();
  //   };
  // }, []);

  return (
    <form
      action={async (data: FormData) => {
        const result = await action(data);
        if (result?.errors) {
          setState((p) => ({ ...p, errors: result.errors }));
        } else if (result?.successMessage) {
          if (result?.successMessage === "link-expired") {
            redirect(`/${lang}/dashboard`);
          } else redirect(result?.successMessage);
        } else {
          // error toast
          toast({
            description: result?.errorMessage ?? "Something went wrong!",
            variant: "destructive",
          });
        }
      }}
      className="flex flex-col justify-center gap-6"
    >
      <Input
        type="text"
        name="emailOrPhone"
        placeholder={
          lang === "uz" ? "Telefon yoki E-mail" : "Телефон или E-mail"
        }
        className={cn({
          "border-destructive": emailOrPhoneErr,
        })}
      />
      <div>
        <PasswordInput
          name="password"
          placeholder={lang === "uz" ? "Parol" : "Введите пароль"}
          className={cn({
            "border-destructive": passwordErr,
          })}
        />
        <Link
          href={`/${lang}/auth/forgot-password`}
          className="block text-sm text-main-200 font-normal px-1 mt-2"
        >
          {lang === "uz" ? "Parolni unutdingizmi?" : "Забыли пароль?"}
        </Link>
      </div>
      <SubmitBtn className="text-base">
        {lang === "uz" ? "Kirish" : "Войти"}
      </SubmitBtn>
    </form>
  );
};

export default SignInForm;
