"use client";

import Modal from "@/components/dashboard/modal";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImageDownIcon } from "lucide-react";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface hookinterface {
  titleUz: string;
  titleRu: string;
  articleImage: any;
  headlineUz: string;
  headlineRu: string;
  textUz: string;
  textRu: string;
}

const Post = () => {
  const [modal, setModal] = useState(false);
  const [image, setImage]: any = useState({});

  const form = useForm<hookinterface>({
    defaultValues: {
      titleUz: "",
      titleRu: "",
      headlineUz: "",
      headlineRu: "",
      textUz: "",
      textRu: "",
    },
  });

  const { register } = form;

  function onSubmit(data: any) {
    fetch("https://oar-api.onrender.com/api/v1/articles/create", {
      method: "POST",
      body: {
        ...data,
        ...image,
        imageWeb: image.imageWeb,
        bannerImageWeb: image.bannerImageWeb,
        link: image.link,
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  }
  return (
    <div>
      <h2 className="text-[24px] leading-[36px] text-main-300">
        {" Lapinoda tug'ilish. Bu qanday edi? (Maqola nomi)"}
      </h2>
      <div className="bg-white p-6 rounded-2xl mt-5">
        <div className="border-dashed border-[2px] rounded-2xl p-4 flex justify-between items-center">
          <div className="flex items-center">
            <ImageDownIcon />
            <div className="flex ml-3 flex-col gap-1">
              <h2 className="text-2xl font-normal">Обложка</h2>
              <p className="text-base">
                Выберите или перетащите обложку для курса
              </p>
            </div>
          </div>
          <label
            className={buttonVariants({ variant: "filled" })}
            htmlFor="file1"
          >
            Выбрать
          </label>
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
            <Input
              className="hidden"
              id="file1"
              {...register("articleImage")}
              type="file"
              name="articleImage"
            />
            <FormField
              control={form.control}
              name="titleUz"
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
              name="titleRu"
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
                <div className="Input">
                  <FormLabel className="text-[#D5D6D8] text-sm mb-4">
                    Sarlavha uz
                  </FormLabel>
                  <input
                    className="flex h-14 w-full rounded-xl border-2 border-csneutral-200 bg-background p-4 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:!border-main-200 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register(`headlineRu`)}
                    placeholder="Maqola sarlavhasini kiriting"
                  />
                  <FormLabel className="text-[#D5D6D8] text-sm mb-4">
                    Tavsif uz
                  </FormLabel>
                  <textarea
                    className="flex w-full rounded-xl border-2 border-csneutral-200 bg-background p-4 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:!border-main-200 disabled:cursor-not-allowed disabled:opacity-50"
                    rows={5}
                    placeholder="Maqolaning tavsifini kiriting"
                    {...register(`textUz`)}
                  ></textarea>
                  <FormLabel className="text-[#D5D6D8] text-sm mb-4">
                    Sarlavha ru
                  </FormLabel>
                  <input
                    className="flex h-14 w-full rounded-xl border-2 border-csneutral-200 bg-background p-4 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:!border-main-200 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Maqola sarlavhasini kiriting"
                    {...register(`headlineUz`)}
                  />
                  <FormLabel className="text-[#D5D6D8] text-sm mb-4">
                    Tavsif ru
                  </FormLabel>
                  <textarea
                    className="flex  w-full rounded-xl border-2 border-csneutral-200 bg-background p-4 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:!border-main-200 disabled:cursor-not-allowed disabled:opacity-50"
                    rows={5}
                    placeholder="Maqolaning tavsifini kiriting"
                    {...register(`textRu`)}
                  ></textarea>
                </div>
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
      {modal ? (
        <Modal setImage={setImage} onClick={() => setModal(false)} />
      ) : null}
    </div>
  );
};

export default Post;
