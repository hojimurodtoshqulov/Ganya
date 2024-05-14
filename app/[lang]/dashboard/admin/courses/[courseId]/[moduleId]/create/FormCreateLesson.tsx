"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast, { Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CiCirclePlus } from "react-icons/ci";
import { z } from "zod";
import { useRouter } from "next/navigation";

interface Props {
    params: any;
}

const schema = z.object({
    video: z.union([z.string(), z.instanceof(FileList)]),
    titleRu: z.string().min(1),
    titleUz: z.string(),
    descriptionRu: z.string().min(1),
    descriptionUz: z.string(),
});

type Schema = z.infer<typeof schema>;

const FormCreateLesson: FC<Props> = ({ params }): JSX.Element => {
    const { register, handleSubmit, watch, reset, formState: { isSubmitting } } = useForm<Schema>({
        resolver: zodResolver(schema),
    });
    const router = useRouter();
    const videoFile = watch("video") as FileList;
    const videoName = videoFile && videoFile.length > 0 ? videoFile[0]?.name : "";

    const onSubmit = async (values: Schema) => {
        try {
            const formData = new FormData();
            if (values.video instanceof FileList) {
                formData.append("video", values.video[0], values.video[0].name);
            } else {
                formData.append("video", values.video);
            }

            formData.append("titleUz", values.titleUz);
            formData.append("titleRu", values.titleRu);
            formData.append("descriptionRu", values.descriptionRu);
            formData.append("descriptionUz", values.descriptionUz);

            const api =
                process.env.NEXT_PUBLIC_BASE_URL + `/lessons/create/${params.moduleId}`;
            const req = await fetch(api, {
                method: "POST",
                body: formData,
            });

            if (!req.ok) throw new Error("Yangi Dars Yuklashda muammo!");

            const res = await req.json();
            reset()
            toast.success("Yangi dars muvaffaqiyatli qo'shildi");
            router.refresh();
            /*  router.push(
                 `/dashboard/admin/courses/${params.courseId}/${params.moduleId}`,
             ); */
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div className="space-y-5">
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        backgroundColor: "white",
                        borderRadius: "16px",
                        padding: "16px",
                        boxShadow: "box-shadow: 0px 24px 36px 0px #DEDEDE7A",
                    },
                }}
            />

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="relative">
                    <Label
                        htmlFor="videoUpload"
                        className=" relative rounded-2xl p-4 flex items-center justify-between gap-3 border-dashed border-2"
                    >
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl w-[60px] h-[60px] flex items-center justify-center bg-white">
                                <CiCirclePlus className="w-7 h-7" />
                            </div>
                            <div className="flex flex-col text-csneutral-500 gap-1">
                                <h1 className="text-[22px] font-medium">
                                    {videoName ? "Video Tanlandi" : "Video qo'shish"}
                                </h1>
                                <p className="text-base font-normal">
                                    {videoName ? videoName : "Videongizni torting yoki tanlang"}
                                </p>
                            </div>
                        </div>
                        <span className="rounded-[8px] py-3 px-5 bg-main-100 text-primary-300 text-sm font-normal">
                            {videoName ? "O'zgartirish" : "Tanlash"}
                        </span>
                    </Label>
                    <Input
                        id="videoUpload"
                        type="file"
                        accept="video/*"
                        className="absolute inset-0 opacity-0"
                        {...register("video")}
                    />
                </div>

                <div className="rounded-2xl  bg-white flex flex-col gap-4 p-6">
                    <div className="grid w-full  items-center gap-1.5">
                        <Label htmlFor="titleRu">Заголовок</Label>
                        <Input
                            type="text"
                            id="titleRu"
                            placeholder="Базовый пакет:"
                            {...register("titleRu")}
                        />
                    </div>
                    <div className="grid w-full  items-center gap-1.5">
                        <Label htmlFor="titleUz">Sarlavha</Label>
                        <Input
                            type="text"
                            id="titleUz"
                            placeholder="Asosiy paket:"
                            {...register("titleUz")}
                        />
                    </div>
                    <div className="grid w-full  items-center gap-1.5">
                        <Label htmlFor={`descriptionRu`}>Описание</Label>
                        <Textarea
                            placeholder="Преимущество 1"
                            className="resize-none"
                            {...register("descriptionRu")}
                        />
                    </div>
                    <div className="grid w-full  items-center gap-1.5">
                        <Label htmlFor={`descriptionUz`}>Tavsif</Label>
                        <Textarea
                            placeholder="Преимущество 1"
                            className="resize-none"
                            {...register("descriptionUz")}
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            className="disabled:bg-main-200 text-sm font-normal py3 px-5"
                            variant={"main"}
                        >
                            Saqlash
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FormCreateLesson;