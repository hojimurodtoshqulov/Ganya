"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { emailSchema, phoneSchema, validateInput } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { fs } from "./action";

const schema = z.object({
  emailOrPhone: z.union([emailSchema, phoneSchema]),
});

const Form: FC = (): JSX.Element => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    handleSubmit,
    formState: { isSubmitting },
    register,
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    const key = validateInput(values.emailOrPhone) as string;
    const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + `/auth/${key}/send-reset-code`,
      {
        method: "POST",
        body: JSON.stringify({ [key]: values.emailOrPhone }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const json = await res.json();
    if (res.ok) {
      await fs(json, key);
      reset();
      toast({
        description: "Code sent!",
      });
      router.push("/auth/forgot-password/new-password");
    } else {
      toast({
        description: json.message ?? "Something went wrong",
        variant: "destructive",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <Label>
        <Input
          placeholder="Email or Phone"
          type="text"
          {...register("emailOrPhone")}
        />
      </Label>

      <Button className="w-full" variant={"main"} disabled={isSubmitting}>
        Submit
      </Button>
    </form>
  );
};

export default Form;
