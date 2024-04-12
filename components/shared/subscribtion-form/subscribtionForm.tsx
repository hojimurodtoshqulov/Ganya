"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Please use your real name later we might need it for contact you",
  }),
  number: z.string().min(10, {
    message:
      "Please use your real phone number later we might need it for contact you",
  }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function SubscriptionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: FormSchemaType) => {
    console.log(data);
    reset();
  };

  return (
    <div className="w-100 p-8 lg:p-20 rounded-[40px] bg-[#F4F1C6] flex flex-col items-center">
      <h1 className="text-h1 lg:leading-[70px] text-center">
        Запишитесь на курс прямо сейчас и начните свой путь в осознанное
        родительство вместе с нами!
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:w-11/12 lg:w-4/5 w-[98%] flex  flex-col md:flex-row gap-6 mt-10"
      >
        <div className="flex flex-col gap-1 items-center">
          <Input
            placeholder="Имя Фамилия"
            {...register("fullName", { required: true })}
          />
          {errors.fullName && (
            <span className="text-red-500">{errors.fullName.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-1 items-center">
          <Input
            type="number"
            placeholder="+998|___ - __ - __"
            {...register("number", { required: true })}
          />
          {errors.number && (
            <span className="text-red-500">{errors.number.message}</span>
          )}
        </div>

        <Button type="submit" variant={"main"} className="font-normal text-lg">
          Оставить заявку
        </Button>
      </form>
    </div>
  );
}
