"use client";

import Image from "next/image";
import React from "react";
import images from "@/images/success.png";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { Label } from "@/components/ui/label";

const EditPage = () => {
  const FormSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    sorrname: z.string().min(2, {
      message: "Sorrname must be at least 2 characters.",
    }),
    parentname: z.string().min(2, {
      message: "Parentname must be at least 2 characters.",
    }),
    phone: z.string().max(12, {
      message: "Phone number must be at least 2 characters.",
    }),
    email: z.string().max(12, {
      message: "Phone number must be at least 2 characters.",
    }),
    parol1: z.string().max(12, {
      message: "Phone number must be at least 2 characters.",
    }),
    parol2: z.string().max(12, {
      message: "Phone number must be at least 2 characters.",
    }),
    parol3: z.string().max(12, {
      message: "Phone number must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      sorrname: "",
      parentname: "",
      phone: "",
      email: "",
      parol1: "",
      parol2: "",
      parol3: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <div>
      <Link
        className="flex ml-6 mb-4 items-center gap-1"
        href={"/dashboard/profile"}
      >
        <FaChevronLeft /> Вернуться назад
      </Link>
      <h1 className="ml-6 text-[26px] text-main-300 font-normal">
        Редактировать профиль
      </h1>
      <div className="mt-5 mx-6 p-6 rounded-2xl bg-white ">
        <div className="flex">
          <Image
            className="bg-slate-600"
            src={images}
            width={100}
            height={100}
            alt="Profile image"
          />

          <div>
            <h3 className="text-3xl font-normal text-[#585D65]">
              Фото профиля
            </h3>

            <div className="flex py-3 px-5 bg-main-100 items-center rounded-[8px] mt-3 cursor-pointer">
              <Label
                htmlFor="picture"
                className="text-sm text-main-300 ml-1 cursor-pointer"
              >
                Изменить фото профиля
              </Label>
              <Input id="picture" type="file" className="hidden" />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-3xl font-normal text-[#585D65] mb-4">
            Основная информация
          </h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <div className="w-full flex sm:flex-row flex-col sm:gap-6  items-center gap-0">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-[#D5D6D8] text-sm mb-2">
                        Имя
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Имя" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sorrname"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-[#D5D6D8] text-sm mb-2">
                        Фамилия
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Фамилия" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="parentname"
                render={({ field }) => (
                  <FormItem className="w-full ">
                    <FormLabel className="text-[#D5D6D8] text-sm mb-2">
                      Отчество
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Отчество" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h3 className="text-3xl font-normal text-[#585D65] mb-4 mt-5">
                Контактная информация
              </h3>
              <div className="w-full flex sm:flex-row flex-col sm:gap-6  items-center gap-0">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-[#D5D6D8] text-sm mb-2">
                        Телефон
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Телефон" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-[#D5D6D8] text-sm mb-2">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <h3 className="text-3xl font-normal text-[#585D65] mb-4 mt-5">
                Пароль
              </h3>

              <div className="sm:w-1/2 w-full">
                <FormField
                  control={form.control}
                  name="parol1"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-[#D5D6D8] text-sm mb-2">
                        Подтвердите пароль
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Подтвердите пароль" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full flex sm:flex-row flex-col sm:gap-6  items-center gap-0">
                <FormField
                  control={form.control}
                  name="parol2"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-[#D5D6D8] text-sm mb-2">
                        Придумайте новый пароль
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Придумайте новый пароль"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="parol3"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-[#D5D6D8] text-sm mb-2">
                        Повторите новый пароль
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Повторите новый пароль"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex sm:justify-end mt-5 justify-center">
                <Button type="submit" variant={"main"}>
                  Сохранить изменения
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
