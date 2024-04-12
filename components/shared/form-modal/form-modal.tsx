"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";

import successIcon from "@/images/success.png";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Please use your real name",
  }),
  number: z.string().min(10, {
    message: "Please use your real phone number ",
  }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

function FormModal() {
  const [isSuccess, setIsSuccess] = useState(false);

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

  if (isSuccess)
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="text-lg font-normal mt-8" variant={"main"}>
            Оставить заявку
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-w-[648px]  ">
          <div className="flex items-center justify-center flex-col">
            <h2 className="text-h2">Ваша щаявка принято</h2>
            <p className="text-csneutral-500 py-4">
              Скоро с вами свяжется наш менеджер
            </p>

            <Image src={successIcon} alt="scuccess" />
          </div>

          <DialogClose asChild>
            <Button className="text-lg font-normal" variant={"main"}>
              Закрыть
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-lg font-normal mt-8" variant={"main"}>
          Оставить заявку
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[648px]">
        <h2 className="text-h2">Оставить заявку</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-right">
              Имя Фамилия
            </Label>
            <Input
              id="name"
              className="col-span-3"
              placeholder="Введите своё Имя и Фамилия"
              {...register("fullName", { required: true })}
            />
            {errors.fullName && (
              <span className="text-red-500">{errors.fullName.message}</span>
            )}
          </div>
          <div className=" space-y-3">
            <Label htmlFor="username" className="text-right">
              Номер телфона
            </Label>
            <Input
              type="number"
              id="username"
              className="col-span-3"
              placeholder="+998__"
              {...register("number", { required: true })}
            />
            {errors.number && (
              <span className="text-red-500">{errors.number.message}</span>
            )}
          </div>
          <Button
            type="submit"
            className="text-lg font-normal mt-3"
            variant={"main"}
          >
            Оплатить
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default FormModal;
