"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Showcase from "@/images/showcase-hero1.png";
import aboutImg from "@/images/IMG_0574 1.jpg";
import Image from "next/image";
import { DialogContent, DialogTrigger, Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FileVideo, Image as ImageSvg } from "lucide-react";

interface Props {
  type?: keyof Data;
  defaultValues?: any;
}

type Data = {
  showcase: any;
  video: any;
  about: any;
  course: any;
};

const data: Data = {
  showcase: {
    title: "Bosh sahidagi Rasm",
    img: Showcase,
  },
  video: {
    title: "Видео на главной странице",
    video: "",
  },
  about: {
    title: "Фотография “О нас” на главной странице",
    img: aboutImg,
  },
  course: {
    title: "Фотография Курс “Прикорм без проблем”",
    img: "",
  },
};

const schema = z.object({
  titleRu: z.string().min(1),
  titleUz: z.string().min(1),
  imgageMobile: z.union([z.string(), z.instanceof(FileList)]),
  imgageDesktop: z.union([z.string(), z.instanceof(FileList)]),
  video: z.union([z.string(), z.instanceof(FileList)]),
});

type Schema = z.infer<typeof schema>;

const EditHomeVideo: React.FC<Props> = ({
  type = "showcase",
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: inputErrors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const [isImage, setIsImage] = useState<boolean>(!!defaultValues?.image);

  const onSubmit = (values: Schema) => {
    const formData = new FormData();
    if (
      values.imgageDesktop ||
      values.imgageMobile ||
      values.video instanceof FileList
    ) {
      formData.append("imageMobile", values.imgageMobile[0]);
      formData.append("imageDesktop", values.imgageDesktop[0]);
      formData.append("video", values.video[0]);
    } else {
      formData.append("imageMobile", values.imgageMobile as string);
      formData.append("imageDesktop", values.imgageDesktop as string);
      formData.append("video", values.video as string);
    }
    formData.append("titleRu", values.titleRu);
    formData.append("titleUz", values.titleUz);
  };

  return (
    <div className="p-4 rounded-2xl bg-white flex flex-col gap-3 max-w-64 justify-between h-[292px]">
      <h1 className="text-lg text-csneutral-500">Bosh Sahifadagi Video </h1>
      <div className="bg-csneutral-100 rounded-xl flex items-center justify-center w-56 h-36 overflow-hidden">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 0C11.8452 0 13.3293 0 14.5401 0.0878298L11.0986 5.25002H6.40139L9.9014 0H10Z"
            fill="#585D65"
          />
          <path
            d="M1.46447 1.46447C2.71683 0.212099 4.62194 0.0307184 8.09566 0.00444896L4.59861 5.25002H0.10418C0.251429 3.48593 0.606802 2.32213 1.46447 1.46447Z"
            fill="#585D65"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 10C0 8.76326 0 7.68875 0.0264445 6.75002H19.9736C20 7.68875 20 8.76326 20 10C20 14.714 20 17.0711 18.5355 18.5355C17.0711 20 14.714 20 10 20C5.28595 20 2.92893 20 1.46447 18.5355C0 17.0711 0 14.714 0 10ZM11.014 10.5852C12.338 11.4395 13 11.8666 13 12.5C13 13.1334 12.338 13.5605 11.014 14.4148C9.67188 15.2807 9.0008 15.7137 8.5004 15.3958C8 15.0779 8 14.2186 8 12.5C8 10.7814 8 9.92209 8.5004 9.60419C9.0008 9.28628 9.67186 9.71925 11.014 10.5852Z"
            fill="#585D65"
          />
          <path
            d="M19.8958 5.25002C19.7486 3.48593 19.3932 2.32213 18.5355 1.46447C17.9382 0.867142 17.1924 0.513454 16.1987 0.304027L12.9014 5.25002H19.8958Z"
            fill="#585D65"
          />
        </svg>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            size={"sm"}
            className="bg-main-100 text-main-300 text-sm font-normal py-3 px-5 hover:bg-main-100"
          >
            O&apos;zgartirish
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
            <label
              htmlFor="image"
              className={`p-4 flex items-center justify-between gap-3 rounded-2xl border-csneutral-300 border-2 ${isImage ? "border-none bg-csneutral-100" : "border-dashed"}`}
            >
              <div
                className={`w-14 h-14 ${isImage ? "bg-white" : "bg-csneutral-100"} rounded-xl flex items-center justify-center text-csneutral-500 flex-shrink-0`}
              >
                <ImageSvg width={24} height={24} />

                <FileVideo />
              </div>
              <div className="w-full">
                <h3 className="text-xl font-semibold">
                  {isImage ? "Ваша обложка загружено" : "Обложка"}
                </h3>
                <p className="mt-1">
                  Выберите или перетащите обложку для курса
                </p>
              </div>

              <div
                className={cn(
                  buttonVariants({ variant: "filled" }),
                  "h-10 font-normal rounded-lg cursor-pointer flex-shrink-0",
                )}
              >
                {isImage ? "Изменить" : "Выбрать"}
              </div>
              <Input
                className="absolute w-0 h-0 -z-50"
                accept="video/*"
                type="file"
                id="image"
                {...register("video", {
                  required: "video picture is required",
                })}
                onChange={() => {
                  setIsImage(true);
                }}
              />
            </label>
            <Button
              type="submit"
              variant={"main"}
              className="w-full"
              disabled={isSubmitting}
            >
              Davom etish
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditHomeVideo;
