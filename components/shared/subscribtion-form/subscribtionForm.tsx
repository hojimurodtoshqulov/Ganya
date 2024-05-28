"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";

import successIcon from "@/images/success.png";
import Image from "next/image";
import { useState } from "react";
import { fetchSendMessage } from "@/lib/utils";
import { FormSchema, FormSchemaType } from "@/lib/types";
import { getDictionary } from "@/lib/get-dictionary";
import toast, { Toaster } from "react-hot-toast";

export default function SubscriptionForm({ dict }: { dict: Awaited<ReturnType<typeof getDictionary>>['home'] }) {
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
          setShow(false);
          toast.success(dict.showcase.showcasModul.success.title)
        }
      })
      .catch((e) => {
        console.log(e)
        toast.success(dict.showcase.showcasModul.success.error)
      }
      );

    reset();
  };

  return (
    <div className="container p-8 lg:p-20 rounded-[40px] bg-[#F4F1C6] flex flex-col items-center justify-center">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "16px",
            boxShadow: "box-shadow: 0px 24px 36px 0px #DEDEDE7A",
          },
        }}
      />
      <h1 className="font-bold text-xl md:text-3xl lg:text-4xl text-main-300 font-comfortaa text-center leading-7">
        {dict.contact.text}
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
              <h2 className="text-h2">{dict.showcase.showcasModul.success.title}</h2>
              <p className="text-csneutral-500 py-4">
                {dict.showcase.showcasModul.success.paragraph}
              </p>

              <Image src={successIcon} alt="scuccess" />
            </div>

            <DialogClose asChild>
              <Button className="text-lg font-normal" variant={"main"}>
                {dict.showcase.showcasModul.success.close}
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-6 mt-10"
      >
        <div className="flex flex-col gap-1 items-center">
          <Input
            placeholder={dict.contact.name}
            {...register("fullName", { required: true })}
          />
          {errors.fullName && (
            <span className="text-red-500">{errors.fullName.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-1 items-center">
          <Input
            type="tel"
            placeholder="+998 | ___ - __ - __"
            {...register("number", { required: true })}
          />
          {errors.number && (
            <span className="text-red-500">{errors.number.message}</span>
          )}
        </div>

        <Button type="submit" variant={"main"} className="font-normal text-lg">
          {dict.contact.btn}
        </Button>
      </form>
    </div>
  );
}
