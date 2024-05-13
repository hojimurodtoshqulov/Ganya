import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageIcon, Link, XCircle } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Modal = ({ onClick, setImage }: any) => {
  const { handleSubmit, register } = useForm();

  const onsubmit = (data: any) => setImage(data);

  return (
    <div
      className="w-full h-screen fixed z-50 top-0 left-0 flex items-center justify-center"
      style={{ background: "#64793733" }}
    >
      <div className="p-10 bg-white rounded-2xl absolute z-[100]">
        <XCircle onClick={onClick} />
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="border-dashed border-[2px] rounded-2xl p-4 flex justify-between items-center w-[568px] mb-4">
            <div className="flex items-center">
              <ImageIcon />
              <div className="flex ml-4 flex-col gap-1">
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
            <Input
              {...register("bannerImageWeb")}
              type="file"
              className="hidden"
              id="file1"
            />
          </div>
          <div className="border-dashed border-[2px] rounded-2xl p-4 flex justify-between items-center w-[568px]">
            <div className="flex items-center">
              <ImageIcon />
              <div className="flex ml-4 flex-col gap-1">
                <h2 className="text-2xl font-normal">Обложка</h2>
                <p className="text-base">
                  Выберите или перетащите обложку для курса
                </p>
              </div>
            </div>
            <label
              className={buttonVariants({ variant: "filled" })}
              htmlFor="file2"
            >
              Выбрать
            </label>
            <Input
              {...register("bannerImageMobile")}
              type="file"
              className="hidden"
              id="file2"
            />
          </div>
          <div className="relative">
            <Link className="absolute top-2 left-3" />
            <Input
              {...register("link")}
              placeholder="Ссылка"
              className="mt-4 pl-12"
            />
          </div>
          <Button variant={"main"} className="block w-full mt-6">
            Опубликовать
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
