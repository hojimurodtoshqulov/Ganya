"use client"

import { Button, buttonVariants } from "@/components/ui/button";
import Showcase from '@/images/showcase-hero1.png'
import aboutImg from '@/images/IMG_0574 1.jpg'
import Image from "next/image";
import { DialogContent, DialogTrigger, Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Image as ImageSvg } from "lucide-react";


interface Props {
    type?: keyof Data;
    defaultValues?: any
};
type Data = {
    showcase: any;
    video: any;
    about: any;
    course: any;
};

/* 
const data: Data = {
    showcase: {
        title: 'Bosh sahidagi Rasm',
        img: Showcase
    },
    video: {
        title: 'Видео на главной странице',
        video: ''
    },
    about: {
        title: 'Фотография “О нас” на главной странице',
        img: aboutImg
    },
    course: {
        title: 'Фотография Курс “Прикорм без проблем”',
        img: ''
    }
}; */

const schema = z.object({
    titleRu: z.string().min(1),
    titleUz: z.string().min(1),
    imgageMobile: z.union([z.string(), z.instanceof(FileList)]),
    imgageDesktop: z.union([z.string(), z.instanceof(FileList)]),
    video: z.union([z.string(), z.instanceof(FileList)])
});

type Schema = z.infer<typeof schema>;

const EditShowcase: React.FC<Props> = ({ type = 'showcase', defaultValues }) => {
    const { register, handleSubmit, reset, formState: { errors: inputErrors, isSubmitting } } = useForm<Schema>({
        resolver: zodResolver(schema)
    })
    const [isImage, setIsImage] = useState<boolean>(!!defaultValues?.image);

    const onSubmit = (values: Schema) => {
        console.log(values)

        const formData = new FormData();
        if (values.imgageDesktop || values.imgageMobile || values.video instanceof FileList) {
            formData.append('imageMobile', values.imgageMobile[0]);
            formData.append('imageDesktop', values.imgageDesktop[0]);
            formData.append('video', values.video[0]);
        } else {
            formData.append('imageMobile', values.imgageMobile as string);
            formData.append('imageDesktop', values.imgageDesktop as string);
            formData.append('video', values.video as string);
        }
        formData.append('titleRu', values.titleRu)
        formData.append('titleUz', values.titleUz)
    }

    return (

        <div className="p-4 rounded-2xl bg-white flex flex-col gap-3 max-w-64 justify-between h-[292px]">
            <h1 className="text-lg text-csneutral-500">Bosh sahifadagi rasm </h1>
            <div className="bg-csneutral-100 rounded-xl flex items-center justify-center w-56 h-36 overflow-hidden">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 8C18 9.10457 17.1046 10 16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8Z" fill="#585D65" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9426 1.25H12.0574C14.3658 1.24999 16.1748 1.24998 17.5863 1.43975C19.031 1.63399 20.1711 2.03933 21.0659 2.93414C21.9607 3.82895 22.366 4.96897 22.5603 6.41371C22.75 7.82519 22.75 9.63423 22.75 11.9426V12.0309C22.75 13.9397 22.75 15.5023 22.6463 16.7745C22.5422 18.0531 22.3287 19.1214 21.8509 20.0087C21.6401 20.4001 21.3812 20.7506 21.0659 21.0659C20.1711 21.9607 19.031 22.366 17.5863 22.5603C16.1748 22.75 14.3658 22.75 12.0574 22.75H11.9426C9.63423 22.75 7.82519 22.75 6.41371 22.5603C4.96897 22.366 3.82895 21.9607 2.93414 21.0659C2.14086 20.2726 1.7312 19.2852 1.51335 18.0604C1.29935 16.8573 1.2602 15.3603 1.25207 13.5015C1.25 13.0287 1.25 12.5286 1.25 12.001V11.9426C1.24999 9.63424 1.24998 7.82519 1.43975 6.41371C1.63399 4.96897 2.03933 3.82895 2.93414 2.93414C3.82895 2.03933 4.96897 1.63399 6.41371 1.43975C7.82519 1.24998 9.63424 1.24999 11.9426 1.25ZM6.61358 2.92637C5.33517 3.09825 4.56445 3.42514 3.9948 3.9948C3.42514 4.56445 3.09825 5.33517 2.92637 6.61358C2.75159 7.91356 2.75 9.62178 2.75 12C2.75 12.2905 2.75 12.5715 2.75034 12.8435L3.75148 11.9675C4.66275 11.1702 6.03617 11.2159 6.89238 12.0721L11.1821 16.3618C11.8693 17.0491 12.9511 17.1428 13.7463 16.5839L14.0445 16.3744C15.1887 15.5702 16.7368 15.6634 17.7764 16.599L20.6068 19.1463C20.8917 18.548 21.0609 17.7618 21.1513 16.6527C21.2494 15.4482 21.25 13.9459 21.25 12C21.25 9.62178 21.2484 7.91356 21.0736 6.61358C20.9018 5.33517 20.5749 4.56445 20.0052 3.9948C19.4355 3.42514 18.6648 3.09825 17.3864 2.92637C16.0864 2.75159 14.3782 2.75 12 2.75C9.62178 2.75 7.91356 2.75159 6.61358 2.92637Z" fill="#585D65" />
                </svg>

            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size={'sm'} className="bg-main-100 text-main-300 text-sm font-normal py-3 px-5 hover:bg-main-100">O&apos;zgartirish</Button>
                </DialogTrigger>
                <DialogContent>
                    <h1>SAlom</h1>
                    <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-1">
                            <h6 className="text-sm text-csneutral-400">Title</h6>
                            <Input
                                type="text"
                                {...register("titleUz")}
                                placeholder="Title UZ"
                                className={cn({ "border-destructive": inputErrors.titleUz })}
                            />
                            <Input
                                {...register("titleRu")}
                                type="text"
                                name="titleRu"
                                placeholder="Title RU"
                                className={cn({ "border-destructive": inputErrors.titleRu })}
                            />
                        </div>


                        <label
                            htmlFor="image"
                            className={`p-4 flex items-center justify-between gap-3 rounded-2xl border-csneutral-300 border-2 ${isImage ? "border-none bg-csneutral-100" : "border-dashed"}`}
                        >
                            <div
                                className={`w-14 h-14 ${isImage ? "bg-white" : "bg-csneutral-100"} rounded-xl flex items-center justify-center text-csneutral-500 flex-shrink-0`}
                            >
                                <ImageSvg width={24} height={24} />
                            </div>
                            <div className="w-full">
                                <h3 className="text-xl font-semibold">
                                    {isImage ? "Ваша обложка загружено" : "Обложка"}
                                </h3>
                                <p className="mt-1">Выберите или перетащите обложку для курса</p>
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
                                accept="image/*"
                                type="file"
                                id="image"
                                {...register("imgageMobile", {
                                    required: "Mobile picture is required",
                                })}
                                onChange={() => {
                                    setIsImage(true);
                                }}
                            />
                        </label>

                        <label
                            htmlFor="image"
                            className={`p-4 flex items-center justify-between gap-3 rounded-2xl border-csneutral-300 border-2 ${isImage ? "border-none bg-csneutral-100" : "border-dashed"}`}
                        >
                            <div
                                className={`w-14 h-14 ${isImage ? "bg-white" : "bg-csneutral-100"} rounded-xl flex items-center justify-center text-csneutral-500 flex-shrink-0`}
                            >
                                <ImageSvg width={24} height={24} />
                            </div>
                            <div className="w-full">
                                <h3 className="text-xl font-semibold">
                                    {isImage ? "Ваша обложка загружено" : "Обложка"}
                                </h3>
                                <p className="mt-1">Выберите или перетащите обложку для курса</p>
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
                                accept="image/*"
                                type="file"
                                id="image"
                                {...register("imgageDesktop", {
                                    required: "Desktop picture is required",
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

export default EditShowcase;