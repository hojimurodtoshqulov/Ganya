"use client";

import Modal from "@/components/dashboard/modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

interface hookinterface {
  titleuz: string;
  titleru: string;
  articls: [
    {
      headinguz: string;
      headingru: string;
      descriptionuz: string;
      descriptionru: string;
    },
  ];
}

const Post = () => {
  const [modal, setModal] = useState(false);
  const form = useForm<hookinterface>({
    defaultValues: {
      titleuz: "",
      titleru: "",
      articls: [
        {
          headinguz: "",
          headingru: "",
          descriptionuz: "",
          descriptionru: "",
        },
      ],
    },
  });

  const { control, handleSubmit, register } = form;

  const { fields, append, remove } = useFieldArray({
    name: "articls",
    control,
  });

  function onSubmit(data: any) {
    console.log(data);
  }
  return (
    <div>
      <h2 className="text-[24px] leading-[36px] text-main-300">
        {" Lapinoda tug'ilish. Bu qanday edi? (Maqola nomi)"}
      </h2>
      <div className="bg-white p-6 rounded-2xl mt-5">
        <div className="border-dashed border-[2px] rounded-2xl p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              className="bg-slate-500 rounded-xl"
              src={"/public/images/childrens-schedule.png"}
              width={60}
              height={60}
              alt="Post image "
            />
            <div className="flex ml-3 flex-col gap-1">
              <h2 className="text-2xl font-normal">Обложка</h2>
              <p className="text-base">
                Выберите или перетащите обложку для курса
              </p>
            </div>
          </div>
          <Button onClick={() => setModal(true)} variant={"filled"}>
            Выбрать
          </Button>
        </div>
        <div className="border-dashed border-[2px] rounded-2xl p-4 flex justify-between items-center mt-4 mb-2">
          <div className="flex items-center">
            <h2 className="text-2xl font-normal">Добавить рекламный баннер</h2>
          </div>
          <Button onClick={() => setModal(true)} variant={"filled"}>
            Выбрать
          </Button>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
              name="titleuz"
              render={({ field }) => (
                <FormItem className="w-full ">
                  <FormLabel className="text-[#D5D6D8] text-sm mb-4">
                    Sarlavha uz
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Sarlavha uz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="titleru"
              render={({ field }) => (
                <FormItem className="w-full ">
                  <FormLabel className="text-[#D5D6D8] text-sm mb-4">
                    Sarlavha ru
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Sarlavha ru" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <div>
                {fields.map((field, index) => (
                  <div className="Input" key={field.id}>
                    <FormLabel className="text-[#D5D6D8] text-sm mb-4">
                      Sarlavha uz
                    </FormLabel>
                    <input
                      className="flex h-14 w-full rounded-xl border-2 border-csneutral-200 bg-background p-4 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:!border-main-200 disabled:cursor-not-allowed disabled:opacity-50"
                      {...register(`articls.${index}.headingru` as any)}
                      placeholder="Maqola sarlavhasini kiriting"
                    />
                    <FormLabel className="text-[#D5D6D8] text-sm mb-4">
                      Tavsif uz
                    </FormLabel>
                    <textarea
                      className="flex w-full rounded-xl border-2 border-csneutral-200 bg-background p-4 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:!border-main-200 disabled:cursor-not-allowed disabled:opacity-50"
                      rows={5}
                      placeholder="Maqolaning tavsifini kiriting"
                      {...register(`articls.${index}.descriptionuz` as any)}
                    ></textarea>
                    <FormLabel className="text-[#D5D6D8] text-sm mb-4">
                      Sarlavha ru
                    </FormLabel>
                    <input
                      className="flex h-14 w-full rounded-xl border-2 border-csneutral-200 bg-background p-4 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:!border-main-200 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Maqola sarlavhasini kiriting"
                      {...register(`articls.${index}.headinguz` as any)}
                    />
                    <FormLabel className="text-[#D5D6D8] text-sm mb-4">
                      Tavsif ru
                    </FormLabel>
                    <textarea
                      className="flex  w-full rounded-xl border-2 border-csneutral-200 bg-background p-4 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:!border-main-200 disabled:cursor-not-allowed disabled:opacity-50"
                      rows={5}
                      placeholder="Maqolaning tavsifini kiriting"
                      {...register(`articls.${index}.descriptionru` as any)}
                    ></textarea>
                    {index > 0 && (
                      <Button
                        className="mt-2"
                        variant={"destructive"}
                        onClick={() => remove(index)}
                      >
                        remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant={"link"}
                  className="text-main-300 text-sm"
                  onClick={() =>
                    append({
                      headinguz: "",
                      headingru: "",
                      descriptionuz: "",
                      descriptionru: "",
                    })
                  }
                >
                  {"+ Sarlavha qo'shing"}
                </Button>
              </div>
            </div>
            <div className="flex sm:justify-end mt-5 justify-center">
              <Button type="submit" variant={"main"}>
                Nashr qilish
              </Button>
            </div>
          </form>
        </Form>
      </div>
      {modal ? <Modal onClick={() => setModal(false)} /> : null}
    </div>
  );
};

export default Post;