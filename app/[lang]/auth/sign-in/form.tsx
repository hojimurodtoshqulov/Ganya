"use client";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";
import { cn, getActionErrors } from "@/lib/utils";
import { PasswordInput } from "../password-input";
import Link from "next/link";
import { ZodIssue } from "zod";
import { redirect } from "next/navigation";
import SubmitBtn from "../submit-button";
import { useToast } from "@/components/ui/use-toast";

type ActionReturn = {
  errors?: ZodIssue[];
  successMessage?: string;
  errorMessage?: string;
};

interface Props {
  action: (params: FormData) => Promise<ActionReturn>;
}

const SignUpForm: FC<Props> = ({ action }): JSX.Element => {
  const [state, setState] = useState<ActionReturn>();
  const { toast } = useToast();

  const emailOrPhoneErr = getActionErrors("emailOrPhone", state?.errors)?.[0];
  const passwordErr = getActionErrors("password", state?.errors)?.[0];

  return (
    <form
      action={async (data: FormData) => {
        const result = await action(data);
        if (result?.errors) {
          setState((p) => ({ ...p, errors: result.errors }));
        } else if (result?.successMessage) {
          redirect("/dashboard");
        } else {
          // error toast
          toast({
            description: result?.errorMessage,
            variant: "destructive",
          });
          console.log(result?.errorMessage);
        }
      }}
      className="flex flex-col justify-center gap-6"
    >
      <Input
        type="text"
        name="emailOrPhone"
        placeholder={"Телефон или E-mail"}
        className={cn({
          "border-destructive": emailOrPhoneErr,
        })}
      />
      <div>
        <PasswordInput
          name="password"
          placeholder={"Введите пароль"}
          className={cn({
            "border-destructive": passwordErr,
          })}
        />
        <Link
          href={"/"}
          className="block text-xs text-main-200 font-normal px-1 mt-2"
        >
          Забыли пароль?
        </Link>
      </div>
      <SubmitBtn className="text-base">Войти</SubmitBtn>
    </form>
  );
};

export default SignUpForm;
