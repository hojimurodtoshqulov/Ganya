"use client";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import EditIcon from "@/icons/editIcon.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
interface data {
  id: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  titleUz: string | null;
  titleRu: string | null;
  descriptionUz: string | null;
  descriptionRu: string | null;
  courseId: string | null;
}

const Card = ({ bacData, id, lang, accessToken }: { bacData: data; id: number; lang: string; accessToken: string | undefined }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [method, setMethod] = useState("");
  const ref = useRef<HTMLFormElement>(null);
  const onClickHandle = () => {
    setIsOpen(!isOpen);
  };

  const onSubmitHandle = async (data: FormData | unknown) => {
    if (method && method === "PATCH") {
      const res = await fetch(
        `https://oar-api.onrender.com/api/v1/modules/update/${bacData.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`,
          },
        },
      );
      if (res.ok) {
        router.refresh();
        onClickHandle();
      }
    }
    if (method && method === "DELETE") {
      const res = await fetch(
        `https://oar-api.onrender.com/api/v1/modules/delete/${bacData.id}`,
        {
          method: "DELETE",
          headers:{
          Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`,
          }
        },
      );
      if (res.ok) {
        router.refresh();
        onClickHandle();
      }
    }

    if (ref.current) {
      ref.current.reset();
    }
  };

  return (
    <>
      <div className="lg:w-1/3 md:w-1/2 w-full min-w-[330px] pr-5 py-3 pl-0 h-auto">
        <div className="rounded-2xl p-4 bg-white gap-3 flex flex-col min-w-[320px] min-h-[124px] relative">
          <Image
            src={EditIcon}
            alt="edit"
            width={20}
            height={20}
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => onClickHandle()}
          />

          <p className="text-neutral-500 text-base">{id + 1} - modul</p>
          <p className="text-[22px] leading-[32px] text-neutral-500">
            <Link href={bacData.id + ""}>{lang==='ru'? bacData.titleRu : bacData.titleUz}</Link>
          </p>
        </div>
      </div>

      <div
        className={` addCard w-screen h-screen z-50 top-0 left-0 flex justify-center items-center ${isOpen ? "fixed" : "hidden"}`}
        style={{ backgroundColor: "rgba(100, 121, 55, 0.2)" }}
        onClick={(e) => {
          if (
            e.target === e.currentTarget ||
            (e.target as Element).classList.contains("addCard")
          ) {
            onClickHandle();
          }
        }}
      >
        <form
          ref={ref}
          method="post"
          onSubmit={handleSubmit((data) => onSubmitHandle(data))}
          className="bg-white flex flex-col w-11/12 max-w-[648px] max-h-[534px] h-5/6 overflow-auto p-10 gap-6 rounded-2xl"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex flex-col gap-4 ">

            <div className="flex flex-col gap-2">
              <label className="font-normal text-sm text-neutral-400">
                Название модуля
              </label>
              <Input
                autoComplete="off"
                {...register("titleRu", { required: true })}
                type="text"
                placeholder="Название Ru"
                defaultValue={bacData.titleRu ? bacData.titleRu : ""}
                className={`text-neutral-500 ${errors.titleRu ? "border-destructive focus-visible:!border-destructive" : ""}`}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Input
                autoComplete="off"
                {...register("titleUz", { required: true })}
                type="text"
                placeholder="Название Uz"
                defaultValue={bacData.titleUz ? bacData.titleUz : ""}
                className={`text-neutral-500 ${errors.titleUz ? "border-destructive focus-visible:!border-destructive" : ""}`}
              />
            </div>


            <div className="flex flex-col gap-2">
              <label className=" font-normal text-sm text-neutral-400">
                Описание модуля
              </label>
              <Input
                {...register("descriptionRu", { required: true })}
                defaultValue={
                  bacData.descriptionRu ? bacData.descriptionRu : ""
                }
                autoComplete="off"
                placeholder="Описание Ru"
                className={`text-neutral-500 ${errors.descriptionRu ? "border-destructive focus-visible:!border-destructive" : ""}`}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Input
                {...register("descriptionUz", { required: true })}
                defaultValue={
                  bacData.descriptionUz ? bacData.descriptionUz : ""
                }
                autoComplete="off"
                placeholder="Описание Uz"
                className={`text-neutral-500 ${errors.descriptionUz ? "border-destructive focus-visible:!border-destructive" : ""}`}
              />
            </div>
          </div>
          <div className="flex justify-end max-sm:flex-col gap-4">
            <Button
              variant={"outline"}
              disabled={isSubmitting}
              onClick={() => setMethod("DELETE")}
              className="font-normal text-base py-4 px-7  hover:bg-red-500 border-red-500 text-red-500 hover:text-white"
            >
              удалить
            </Button>
            <Button
              variant={"main"}
              disabled={isSubmitting}
              onClick={() => setMethod("PATCH")}
              className="font-normal text-base py-4 px-7"
            >
              Добавить
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Card;
