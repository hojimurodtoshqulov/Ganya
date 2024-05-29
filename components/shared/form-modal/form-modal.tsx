"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";

import successIcon from "@/images/success.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, FormSchemaType } from "@/lib/types";
import { fetchSendMessage } from "@/lib/utils";
import toast from "react-hot-toast";

function FormModal({ dict }: { dict: any }) {
  const [isSuccess, setIsSuccess] = useState(false);

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
        if (d.ok) setIsSuccess(false);
        toast.success(dict.showcase.showcasModul.success.title);
      })
      .catch((e) => {
        toast.error(dict.showcase.showcasModul.success.error);
        console.log(e);
      });

    reset();
  };

  // if (false)
  //   return (
  //     <Dialog
  //       onOpenChange={(e) => {
  //         if (isSuccess && !e) setIsSuccess(false);
  //       }}
  //     >
  //       <DialogTrigger asChild>
  //         <Button
  //           className="text-lg font-normal mt-8 py-3 px-6 md:py-5 md:px-8"
  //           variant={"main"}
  //         >
  //           Оставить заявку
  //         </Button>
  //       </DialogTrigger>
  //       <DialogContent className="sm:max-w-[425px] md:max-w-[648px]  ">
  //         <div className="flex items-center justify-center flex-col">
  //           <h2 className="text-h2">{dict.showcase.showcasModul.success.title}</h2>
  //           <p className="text-csneutral-500 py-4">
  //             {dict.showcase.showcasModul.success.paragraph}
  //           </p>

  //           <Image src={successIcon} alt="scuccess" />
  //         </div>

  //         <DialogClose asChild>
  //           <Button className="text-lg font-normal" variant={"main"}>
  //             {dict.showcase.showcasModul.success.close}
  //           </Button>
  //         </DialogClose>
  //       </DialogContent>
  //     </Dialog>
  //   );

  // onOpenChange={(e) => {
  // if (isSuccess && !e) setIsSuccess(false);
  // }}

  return (
    <Dialog open={isSuccess} onOpenChange={setIsSuccess}>
      <DialogTrigger asChild>
        <Button
          className="text-lg font-normal mt-8 py-3 px-6 md:py-5 md:px-8 text-main-300"
          variant={"filled"}
          onChange={() => setIsSuccess((p) => !p)}
        >
          {dict.showcase.showcasModul.btn}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[648px]">
        <h2 className="text-h2">{dict.showcase.showcasModul.title}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-right">
              {dict.showcase.showcasModul.label}
            </Label>
            <Input
              id="name"
              className="col-span-3"
              placeholder={dict.showcase.showcasModul.placeholder}
              {...register("fullName", { required: true })}
            />
            {errors.fullName && (
              <span className="text-red-500">{errors.fullName.message}</span>
            )}
          </div>
          <div className=" space-y-3">
            <Label htmlFor="username" className="text-right">
              {dict.showcase.showcasModul.phoneLabel}
            </Label>
            <Input
              type="tel"
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
            {dict.showcase.showcasModul.submit}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default FormModal;
