"use client";
import { useToast } from "@/components/ui/use-toast";
import { passwordSchema } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordInput } from "../../password-input";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  newPassword: passwordSchema,
  confirmationCode: z.string().min(5).max(5),
});

const Form: FC<{
  sms: {
    sessionId: string;
    path: string;
  };
  lang: "uz" | "ru";
}> = ({ sms, lang }): JSX.Element => {
  const { toast } = useToast();
  const router = useRouter();

  if (!sms.sessionId || !sms.path) {
    router.push(`/${lang}/auth/forgot-password`);
  }

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    register,
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      confirmationCode: "",
      newPassword: "",
    },
  });

  const submit = async (values: z.infer<typeof schema>) => {
    const data = {
      newPassword: values.newPassword,
      confirmationCode: Number(values.confirmationCode),
      sessionId: sms.sessionId,
    };
    const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + `/auth/reset-user-password`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const json = await res.json();
    if (res.ok) {
      router.push(`/${lang}/auth/sign-in`);
    } else {
      toast({
        description: json.message ?? "Something went wrong",
        variant: "destructive",
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(submit)} className="w-full space-y-4">
      <div>
        <PasswordInput
          {...register("newPassword")}
          placeholder={lang === "uz" ? "Yangi parol" : "Новый пароль"}
          className={errors?.newPassword ? "border-destructive" : ""}
        />
        {errors?.newPassword && (
          <p className="text-sm text-destructive">
            {errors?.newPassword.message}
          </p>
        )}
      </div>
      <Input
        {...register("confirmationCode")}
        type="number"
        placeholder="SMS code"
        className={errors?.confirmationCode ? "border-destructive" : ""}
      />
      <Button className="w-full" variant={"main"} disabled={isSubmitting}>
        {lang === "ru" ? "Отправлять" : "Jo'natish"}
      </Button>
    </form>
  );
};

export default Form;
