"use client"
import { SquarePen } from 'lucide-react'
import React, { useState } from 'react'
import Image from "next/image";
import Icon from "@/images/Gallery.svg";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button, buttonVariants } from '@/components/ui/button'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input';
interface DataProps {
    id: string,
    idx: string,
    titleUz: null | string,
    titleRu: null | string,
    subTitleUz: null | string,
    subTitleRu: null | string,
    textUz: null | string,
    textRu: null | string,
    file: string,
    createdAt: string,
    updatedAt: string
}

const schema = z.object({
    file: z.union([z.string(), z.instanceof(FileList)]),
})
type Schema = z.infer<typeof schema>;
const VideoCard = ({ data, lang,accessToken }: { data: DataProps, lang: "uz" | "ru", accessToken:string }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [method, setMethod] = useState('')
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
    const router = useRouter()

    async function onSubmit(value: z.infer<typeof schema>) {
        if (method === 'DELETE') {
            console.log('DELETE')
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/statics/${data.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`,
                    },
                },
            );

            if (res.ok) {
                setIsOpen(!isOpen)
                router.refresh()
                reset()
            }
        } else {
            const formData = new FormData();
            if (value.file instanceof FileList && value.file.length > 0) {
                formData.append("file", value.file[0], value.file[0].name);
            }
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/statics/${data.id}`,
                {
                    method: "PATCH",
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`,
                    },
                },
            );

            if (res.ok) {
                setIsOpen(!isOpen)
                router.refresh()
                reset()
            }
        }
    }
    return (
        <>
            <article className=" group relative flex flex-col justify-end overflow-hidden rounded-2xl max-w-sm mt-14 h-64">
                <video
                    className="h-full w-full object-cover"
                    controls
                    preload="auto"
                //   poster={images.src}
                >
                    <source src={data.file} type="video/mp4" />
                </video>
                <SquarePen onClick={() => setIsOpen(!isOpen)} className="absolute top-4 right-3 text-main-300 cursor-pointer hidden group-hover:block" />
            </article>
            <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
                <DialogContent className="sm:max-w-[425px] md:max-w-[625px] rounded">
                    <DialogHeader>
                        <DialogTitle className="capitalize text-2xl">добавить видео</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="my-5 flex flex-col">
                        <div className="border-dashed border-[2px] rounded-2xl p-4 flex justify-between items-center w-full mb-5">
                            <div className="flex items-center">
                                <div className={`bg-neutral-100 rounded-xl w-16 h-16 flex items-center justify-center`}>
                                    <Image
                                        className=""
                                        src={Icon}
                                        width={24}
                                        height={24}
                                        alt="Post image "
                                    />
                                </div>

                                <div className="flex ml-3 flex-col gap-1">
                                    <h2 className="text-2xl font-normal">Обложка</h2>
                                    <p className="text-base">
                                        {file ? file?.name : "Выберите или перетащите обложку для курса"}
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
                                {...register("file")}
                            />
                        </div>
                        <div className='flex gap-5 justify-end'>
                            <Button type="submit" disabled={isSubmitting} variant={"outline"} className=" w-fit self-end capitalize border-destructive text-destructive" onClick={() => setMethod("DELETE")}>удалить</Button>
                            <Button type="submit" disabled={isSubmitting} variant={'main'} className=" w-fit self-end">Опубликовать</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>

    )
}

export default VideoCard