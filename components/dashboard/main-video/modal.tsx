"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Icon from "@/images/Gallery.svg";
import { useRouter } from "next/navigation";
import { useState } from "react";

const schema = z.object({
  file: z.union([z.string(), z.instanceof(FileList)]),
});
type Schema = z.infer<typeof schema>;
export function Modal({ accessToken }: { accessToken: string }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const file: any = watch("file") && (watch("file")[0] ?? "");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  async function onSubmit(data: z.infer<typeof schema>) {
    const formData = new FormData();
    if (data.file instanceof FileList && data.file.length > 0) {
      formData.append("idx", "main_video");
      formData.append("file", data.file[0], data.file[0].name);
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/statics/create`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`,
        },
      },
    );
    if (res.ok) {
      setIsOpen(!isOpen);
      reset();
      router.refresh();
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button
          variant="main"
          onClick={() => setIsOpen(!isOpen)}
          size={"default"}
          className="absolute right-0 top-0"
        >
          Добавить
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[625px] rounded">
        <DialogHeader>
          <DialogTitle className="capitalize text-2xl">
            добавить видео
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="my-5 flex flex-col">
          <div className="border-dashed border-[2px] rounded-2xl p-4 flex justify-between items-center w-full mb-5">
            <div className="flex items-center">
              <div
                className={`bg-neutral-100 rounded-xl w-16 h-16 flex items-center justify-center`}
              >
                <Image
                  className=""
                  src={Icon}
                  width={24}
                  height={24}
                  alt="Post image "
                />
              </div>

              <div className="flex ml-3 flex-col gap-1">
                <h2 className="text-2xl font-normal capitalize">видео</h2>
                <p className="text-base">
                  {file
                    ? file?.name
                    : "Выберите или перетащите обложку для курса"}
                </p>
              </div>
            </div>

            <label
              className={buttonVariants({ variant: "filled" })}
              htmlFor="file"
            >
              {file?.name ? "редактировать" : "Выбрать"}
            </label>
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              id="file"
              required
              {...register("file")}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            variant={"main"}
            className=" w-fit self-end"
          >
            Опубликовать
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
