"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
interface data {
  id: string;
  username: string;
  occupationUz: string;
  occupationRu: string;
  textUz: string;
  textRu: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

const FormUpdate = ({
  open,
  closeFunc,
  comment,
  accessToken,
}: {
  closeFunc: Function;
  open: boolean;
  comment: data;
  accessToken: string | undefined;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const ref = useRef<HTMLFormElement>(null);
  const [count1, setcount1] = useState(comment.textRu.length);
  const [count2, setcount2] = useState(comment.textUz.length);
  const [method, setMethod] = useState("");
  const router = useRouter();

  const onSubmitHandle = async (data: FormData | unknown) => {
    if (method && method === "PATCH") {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/comments/update/${comment.id}`,
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
        closeFunc();
      }
    }
    if (method && method === "DELETE") {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/comments/delete/${comment.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`,
          },
        },
      );
      if (res.ok) {
        router.refresh();
        closeFunc();
      }
    }
  };

  return (
    <div
      className={`Отзывы w-screen h-screen z-50 top-0 left-0 flex justify-center items-center ${open ? "fixed" : "hidden"}`}
      style={{ backgroundColor: "rgba(100, 121, 55, 0.2)" }}
      onClick={(e) => {
        if ((e.target as Element).classList.contains("Отзывы")) {
          closeFunc();
        }
      }}
    >
      <form
        ref={ref}
        onSubmit={handleSubmit(onSubmitHandle)}
        className="bg-white flex flex-col w-11/12 max-w-[648px] max-h-[534px] h-5/6 overflow-auto p-10 gap-6 rounded-2xl"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-normal text-sm text-neutral-400">
              Имя Фамилия
            </label>
            <Input
              autoComplete="off"
              {...register("username", { required: true })}
              placeholder="Введите Имя и Фамилию"
              defaultValue={comment.username}
              className={`text-neutral-500 ${errors.username ? "border-destructive focus-visible:!border-destructive" : ""}`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className=" font-normal text-sm text-neutral-400">
              Должность
            </label>
            <Input
              {...register("occupationRu", { required: true })}
              defaultValue={comment.occupationRu}
              autoComplete="off"
              placeholder="Должность Ru"
              className={`text-neutral-500 ${errors.occupationRu ? "border-destructive focus-visible:!border-destructive" : ""}`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Input
              {...register("occupationUz", { required: true })}
              autoComplete="off"
              defaultValue={comment.occupationUz}
              placeholder="Должность Uz"
              className={`text-neutral-500 ${errors.occupationUz ? "border-destructive focus-visible:!border-destructive" : ""}`}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="отзыв"
              className="font-normal text-sm text-neutral-400"
            >
              Oтзыв
            </label>
            <Textarea
              {...register("textRu", {
                required: true,
                onChange: (e) => {
                  setcount1(e.target.value.length);
                },
              })}
              maxLength={400}
              placeholder="Text Ru"
              autoComplete="off"
              defaultValue={comment.textRu}
              className={`text-neutral-500 h-[120px] ${errors.textRu ? "border-destructive focus-visible:!border-destructive" : ""}`}
            />

            <p className={`${count1 >= 400 ? "text-red-500" : ""} text-end`}>
              {count1 || 0}/400
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Textarea
              {...register("textUz", {
                required: true,
                onChange: (e) => {
                  setcount2(e.target.value.length);
                },
              })}
              maxLength={400}
              placeholder="Text Uz"
              autoComplete="off"
              defaultValue={comment.textUz}
              className={`text-neutral-500 h-[120px] ${errors.textUz ? "border-destructive focus-visible:!border-destructive" : ""}`}
            />
            <p className={`${count2 >= 400 ? "text-red-500" : ""} text-end`}>
              {count2 || 0}/400
            </p>
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
  );
};

export default FormUpdate;
