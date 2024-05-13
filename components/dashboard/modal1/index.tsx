'use client'
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "lucide-react";
import Image from "next/image";
import Icon from "@/images/Gallery.svg";
import { useRouter } from "next/navigation";
import React, { useRef } from 'react'
import { useForm } from "react-hook-form";

const Modal = ({ onClick, isOpen, banner }: { onClick: () => void, isOpen: boolean, banner?: {} }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const router = useRouter()
    const ref = useRef<HTMLFormElement>(null);
    const onSubmitHandle = async (data: FormData | unknown) => {
        if (data) {
            const formData = new FormData();
            const res = await fetch(`https://oar-api.onrender.com/api/v1/banners/create`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.ok) {
                router.refresh()
                onClick()
            }

            if (ref.current) {
                (ref.current).reset();
            }
            console.log(res)
        }
        
    }

    return (
        <div
            onClick={(e) => {
                if (e.target && (e.target as Element).classList.contains('addBanner')) { onClick() }
            }}
            className={`w-full h-screen ${isOpen ? ' fixed': 'hidden'} addBanner z-50 top-0 left-0 flex items-center justify-center`}
            style={{ background: "#64793733" }}
        >
            <div className="p-10 bg-white rounded-2xl absolute z-[100]">
                <form ref={ref} method="post" onSubmit={handleSubmit((data) => {
                    console.log('clicked')
                    onSubmitHandle(data)
                })} encType="multipart/form-data" >
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
                        <Input type="file" accept="image/*" className="block" id="file1" {...register("imageWeb")} />
                    </div>
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
                        <Input type="file" accept="image/*" className="block" id="file2"  {...register("imageMobile")} />
                    </div>
                    <div className="relative">
                        <Link className="absolute top-2 left-3" />
                        <Input placeholder="Ссылка" className={`mt-4 pl-12 ${errors.link ? "border-destructive focus-visible:!border-destructive" : ""}`}  {...register("link")} />
                    </div>
                    <Button variant={"main"}
                        disabled={isSubmitting}
                        className="block w-full mt-6">
                        Опубликовать
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Modal;