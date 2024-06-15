"use client";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { ZodIssue } from "zod";
import { cn, getActionErrors } from "@/lib/utils";
import { PasswordInput } from "../password-input";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import SubmitBtn from "../submit-button";
import { useToast } from "@/components/ui/use-toast";

const conditionsRu = [
  "Не менее 8 символов",
  "Большие только латинские буквы",
  "Маленькие только латинские буквы",
  "Цифры",
  "Символы ~!@#№$%^?&*(){}[]<>'`-_+=|/:;,.",
];

const conditionsUz = [
  "8 dan ko’p harf",
  "Birinchi harf katta",
  "Birinchi harf kichik",
  "Raqamlar",
  "Simvollar ~!@#$%^&*(){}[]<>'`-_+=|/:;,.",
];

type ActionReturn = {
  errors?: ZodIssue[];
  sessionId?: string;
  message?: string;
  statusCode?: number;
};

interface Props {
  action: (params: FormData) => Promise<ActionReturn>;
  lang: "uz" | "ru";
}

const SignUpForm: FC<Props> = ({ action, lang }): JSX.Element => {
  const router = useRouter();
  const { toast } = useToast();
  const [state, setState] = useState<ActionReturn>();

  const termsErr = getActionErrors("terms", state?.errors)?.[0];
  const emailOrPhoneErr = getActionErrors("emailOrPhone", state?.errors)?.[0];
  const passwordErr = getActionErrors("password", state?.errors)?.[0];
  const confirmPasswordErr = getActionErrors(
    "confirmPassword",
    state?.errors,
  )?.[0];

  const conditions = lang === "uz" ? conditionsUz : conditionsRu;

  return (
    <form
      action={async (data: FormData) => {
        const result = await action(data);
        if (result?.errors) {
          setState((p) => ({ ...p, errors: result.errors }));
        } else if (result?.sessionId) {
          router.push("/auth/validate");
        } else {
          // error toast

          toast({
            description: result?.message,
            variant: "destructive",
          });
        }
      }}
      className="flex flex-col justify-center gap-2.5"
    >
      <Input
        type="text"
        name="name"
        placeholder={lang === "uz" ? "Ism" : "Имя"}
        className={cn({
          "border-destructive": emailOrPhoneErr,
        })}
      />
      <Input
        type="text"
        name="surname"
        placeholder={lang === "uz" ? "Familiya" : "Фамилия"}
        className={cn({
          "border-destructive": emailOrPhoneErr,
        })}
      />
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

      <div className="space-y-3">
        <PasswordInput
          placeholder={lang === "uz" ? "Parol" : "Придумайте пароль"}
          name="password"
          className={cn({
            "border-destructive": passwordErr,
          })}
        />
        <div className="flex items-center justify-center gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-full h-2 bg-csneutral-200 rounded-full" />
          ))}
        </div>
        <ul className="list-disc pl-6 text-csneutral-400 text-sm">
          {conditions.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>

        <PasswordInput
          placeholder={
            lang === "uz" ? "Parolni tasdiqlang" : "Повторите пароль"
          }
          name="confirmPassword"
          className={cn({
            "border-destructive": confirmPasswordErr,
          })}
        />
      </div>

      <div className="flex items-center gap-3">
        <Checkbox
          id="terms"
          name="terms"
          defaultChecked
          onCheckedChange={(e) => console.log(e)}
          className={cn({ "border-destructive": termsErr })}
        />
        <label
          htmlFor="terms"
          className={cn(
            "text-sm font-normal text-csneutral-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            { "text-destructive": termsErr },
          )}
        >
          {lang === "uz"
            ? "Men shaxsiy ma'lumotlarni qayta ishlashga rozilik beraman"
            : "Я даю согласие на обработку персональных данных"}
        </label>
      </div>
      <SubmitBtn className="text-base">
        {lang === "uz" ? "Ro'yxatdan o'tish" : "Регистрация"}
      </SubmitBtn>
    </form>
  );
};

export default SignUpForm;
