'use client'
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "lucide-react";
import Image from "next/image";
import Icon from "@/images/Gallery.svg";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from 'react'
import { useForm } from "react-hook-form";
interface banner {
    "id": string,
    "createdAt": string,
    "updatedAt": string,
    "imageWeb": string,
    "imageMobile": string,
    "link": string,
    "isPublished": boolean
}
const Modal = ({ onClick, isOpen, banner, accessToken }: { onClick: () => void, isOpen: boolean, banner?: banner, accessToken: string | undefined }) => {
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
    const router = useRouter()
    const ref = useRef<HTMLFormElement>(null);
    const [method, setMethod] = useState('')
    const imageWeb: any = watch("imageWeb") && (watch("imageWeb")[0] ?? '');
    const imageMobile: any = watch("imageMobile") && (watch("imageMobile")[0] ?? ''); 

    const onSubmitHandle = async (data: any) => {
        const formData = new FormData()
        if (banner) {
            if (method === 'DELETE') {
                const res = await fetch(`https://oar-api.onrender.com/api/v1/banners/delete/${banner.id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`,
                    },
                });
                if (res.ok) {
                    onClick()
                    router.refresh()
                }

                if (ref.current) {
                    (ref.current).reset();
                }
            }
            else if (method === "PATCH") {
                if (data.imageWeb[0]) {
                    formData.append('images', data.imageWeb[0], data.imageWeb[0].name)
                }
                if (data.imageMobile[0]) {
                    formData.append('images', data.imageMobile[0], data.imageMobile[0].name);
                }
                formData.append('link', data.link);
                const res = await fetch(`https://oar-api.onrender.com/api/v1/banners/update/${banner.id}`, {
                    method: "PATCH",
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`
                    }
                });

                if (res.ok) {
                    onClick()
                    router.refresh()
                }

                if (ref.current) {
                    (ref.current).reset();
                }
            }
        } else {
            formData.append('images', data.imageWeb[0], data.imageWeb[0].name)
            formData.append('images', data.imageMobile[0], data.imageMobile[0].name);
            formData.append('link', data.link);
            const res = await fetch(`https://oar-api.onrender.com/api/v1/banners/create`, {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`,
                }
            });

            if (res.ok) {
                onClick()
                router.refresh()
            }

            if (ref.current) {
                (ref.current).reset();
            }
        }
    }

    return (
        <>
            {banner ? (
                <div
                    onClick={(e) => {
                        if (e.target && (e.target as Element).classList.contains('addBanner')) { onClick() }
                    }}
                    className={`w-full h-screen ${isOpen ? ' fixed' : 'hidden'} addBanner z-50 top-0 left-0 flex items-center justify-center`}
                    style={{ background: "#64793733" }}
                >
                    <div className="p-10 bg-white rounded-2xl absolute z-[100]">
                        <form ref={ref} onSubmit={handleSubmit(onSubmitHandle)}>
                            <p className=" text-neutral-500 text-lg  font-semibold mb-3">Desktop Image</p>
                            <div className="border-dashed border-[2px] rounded-2xl p-4 flex justify-between items-center w-[568px] mb-4">
                                <div className="flex items-center">
                                    <div
                                        className="bg-neutral-100 rounded-xl w-16 h-16 flex items-center justify-center">
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
                                            {imageWeb
                                                ? (imageWeb?.name as string)
                                                : "Выберите или перетащите обложку для курса"}
                                        </p>
                                    </div>

                                </div>

                                <label
                                    className={buttonVariants({ variant: "filled" })}
                                    htmlFor="fayl"
                                >
                                    {imageWeb?.name ? "редактировать" : "Выбрать"}
                                </label>
                                <Input type="file" accept="image/*" className="hidden" id="fayl" {...register("imageWeb")} />

                            </div>
                            <p className=" text-neutral-500 text-lg font-semibold mb-3">Mobile Image</p>
                            <div className="border-dashed border-[2px] rounded-2xl p-4 flex justify-between items-center w-[568px]">
                                <div className="flex items-center">
                                    <div
                                        className="bg-neutral-100 rounded-xl w-16 h-16 flex items-center justify-center">
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
                                            {imageMobile
                                                ? (imageMobile?.name as string)
                                                : "Выберите или перетащите обложку для курса"}
                                        </p>
                                    </div>
                                </div>

                                <label
                                    htmlFor="fayl2"
                                    className={buttonVariants({ variant: "filled" })}
                                >
                                    {imageMobile?.name ? "редактировать" : "Выбрать"}
                                </label>
                                <Input type="file" accept="image/*" className="hidden" id="fayl2"  {...register("imageMobile")} />
                            </div>
                            <div className="relative">
                                <Link className="absolute top-2 left-3" />
                                <Input placeholder="Ссылка" className={`mt-4 pl-12 ${errors.link ? "border-destructive focus-visible:!border-destructive" : ""}`}  {...register("link", {required:true})} defaultValue={banner.link} />

                            </div>
                            <div className="flex justify-end max-sm:flex-col gap-4 mt-4">
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
                                    Опубликовать
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div
                    onClick={(e) => {
                        if (e.target && (e.target as Element).classList.contains('addBanner')) { onClick() }
                    }}
                    className={`w-full h-screen ${isOpen ? ' fixed' : 'hidden'} addBanner z-50 top-0 left-0 flex items-center justify-center`}
                    style={{ background: "#64793733" }}
                >
                    <div className="p-10 bg-white rounded-2xl absolute z-[100]">
                            <form ref={ref} onSubmit={handleSubmit(onSubmitHandle)}>
                                <p className=" text-neutral-500 text-lg font-semibold mb-3">Desktop Image</p>
                            <div className="border-dashed border-[2px] rounded-2xl p-4 flex justify-between items-center w-[568px] mb-4">
                                <div className="flex items-center">
                                    <div
                                        className="bg-neutral-100 rounded-xl w-16 h-16 flex items-center justify-center">
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
                                                {imageWeb
                                                    ? (imageWeb?.name as string)
                                                    : "Выберите или перетащите обложку для курса"}
                                        </p>
                                    </div>

                                </div>

                                <label
                                    className={buttonVariants({ variant: "filled" })}
                                    htmlFor="fayl"
                                >
                                        {imageWeb?.name ? "редактировать" : "Выбрать"}
                                </label>
                                <Input type="file" accept="image/*" className="hidden" id="fayl" {...register("imageWeb", { required: true })} />

                                </div>
                                <p className=" text-neutral-500 text-lg font-semibold mb-3">Mobile Image</p>
                            <div className="border-dashed border-[2px] rounded-2xl p-4 flex justify-between items-center w-[568px]">
                                <div className="flex items-center">
                                    <div
                                        className="bg-neutral-100 rounded-xl w-16 h-16 flex items-center justify-center">
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
                                                {imageMobile
                                                    ? (imageMobile?.name as string)
                                                    : "Выберите или перетащите обложку для курса"}
                                        </p>
                                    </div>
                                </div>

                                <label
                                    htmlFor="fayl2"
                                    className={buttonVariants({ variant: "filled" })}
                                >
                                        {imageMobile?.name ? "редактировать" : "Выбрать"}
                                </label>
                                <Input type="file" accept="image/*" className="hidden" id="fayl2"  {...register("imageMobile", { required: true })} />
                            </div>
                            <div className="relative">
                                <Link className="absolute top-2 left-3" />
                                <Input placeholder="Ссылка" className={`mt-4 pl-12 ${errors.link ? "border-destructive focus-visible:!border-destructive" : ""}`}  {...register("link", {required:true})} />

                            </div>
                            <Button variant={"main"}
                                disabled={isSubmitting}
                                className="block w-full mt-6">
                                Опубликовать
                            </Button>

                        </form>
                    </div>
                </div>
            )}


        </>

    );
};

export default Modal;