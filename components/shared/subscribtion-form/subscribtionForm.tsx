"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
} from "@/components/ui/dialog";

import successIcon from "@/images/success.png";
import Image from "next/image";
import { useState } from "react";
import { fetchSendMessage } from "@/lib/utils";
import { FormSchema, FormSchemaType } from "@/lib/types";


export default function SubscriptionForm() {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: FormSchemaType) => {
    fetchSendMessage(data)
      .then((d) => {
        if (d.ok) {
          setShow(d.ok);
        }
      })
      .catch((e) => console.log(e));

    reset();
  };

  return (
    <div className="w-100 p-8 lg:p-20 rounded-[40px] bg-[#F4F1C6] flex flex-col items-center">
      <h1 className="text-h1 lg:leading-[70px] text-center">
        Запишитесь на курс прямо сейчас и начните свой путь в осознанное
        родительство вместе с нами!
      </h1>

      {show && (
        <Dialog
          onOpenChange={(e) => {
            if (show && !e) setShow(false);
          }}
          open={show}
        >
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
      )}

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
            type="tel"
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
