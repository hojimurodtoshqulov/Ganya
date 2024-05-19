"use client"

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { Form, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Schema, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { User2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { getLangText } from "@/lib/utils";
import { emailSchema, phoneSchema, validateInput, passwordSchema } from "@/types/auth";



const FormSchema = z.object({
    fullName: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    emailOrPhone: z.union([emailSchema, phoneSchema]),
    avatar: z.union([z.string(), z.instanceof(FileList)]),
});

const passwordSch = z.object({
    password: passwordSchema,
    passwordCheck: passwordSchema
}).refine(data => {
    if (data.password && data.passwordCheck && data.password !== data.passwordCheck) {
        return false;
    }
    return true;
}, {
    message: "Passwords do not match."
});



const FormEditProfile = ({ lang, defaultValue, accToken }: { lang: "ru" | "uz", defaultValue: any, accToken: any }) => {
    const { handleSubmit, register, reset, formState: { isSubmitting }
    } = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: defaultValue ?? {}
    });

    const form = useForm<z.infer<typeof passwordSch>>({
        resolver: zodResolver(passwordSch)
    })

    const router = useRouter()


    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const api = process.env.NEXT_PUBLIC_BASE_URL + '/users/profile';
        const formData = new FormData()
        formData.append('fullname', data.fullName)

        const type = validateInput(data.emailOrPhone) as "email" | "phone";
        formData.append(type, data.emailOrPhone)

        if (data.avatar instanceof FileList) {
            formData.append('avatar', data.avatar[0], data.avatar[0].name)
        } else {
            formData.append('avatar', data.avatar)
        }

        try {
            const req = await fetch(api, {
                method: "PATCH",
                body: formData,
                headers: {
                    Authorization: `Bearer ${JSON.parse(accToken ?? "")}`
                }
            })

            if (!req.ok) throw new Error('Failed to fetch')

            const res = await req.json()
            reset()
            router.refresh()
            router.back()
        } catch (error: any) {
            console.log(error.message)
        }
    }

    const passwordSubmit = async (data: z.infer<typeof passwordSch>) => {
        try {
            const api = process.env.NEXT_PUBLIC_BASE_URL + '/users/profile';
            const formData = new FormData();
            formData.append('password', data.password)
            const req = await fetch(api, {
                method: "PATCH",
                body: formData,
                headers: {
                    Authorization: `Bearer ${JSON.parse(accToken ?? "")}`
                }
            })

            if (!req.ok) throw new Error('Failed to fetch')

            const res = await req.json()
            reset()
            router.refresh()
            router.back()
        } catch (error: any) {
            console.log(error.message)
        }

    }

    return (
        <div>
            <Link className="flex ml-6 mb-4 items-center gap-1" href={"/dashboard/profile"}>
                <FaChevronLeft />{getLangText(lang, "Orqaga Qaytish", " Вернуться назад")}
            </Link>

            <div className="mt-5 mx-6 p-6 rounded-2xl bg-white ">

                <h1 className="text-2xl  md:text-4xl pb-3 text-main-300 font-normal">
                    {getLangText(lang, "Profile Tahrirlash", " Редактировать профиль")}
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="">
                        <div className="flex gap-4 ">
                            {defaultValue && defaultValue?.avatar ? (
                                <div className="relative w-20 h-20 rounded-2xl">
                                    <Image
                                        className="bg-slate-600  object-contain rounded-2xl"
                                        src={defaultValue.avatar}
                                        fill={true}
                                        alt="Profile image"
                                    />
                                </div>
                            ) : (
                                <div className="rounded-2xl bg-gray-100 flex items-center justify-center p-5">
                                    <User2Icon className="w-20 h-20" />
                                </div>
                            )}

                            <div>
                                <h3 className="text-xl md:text-3xl font-normal text-[#585D65]">
                                    {getLangText(lang, "Profile Rasmi", " Фото профиля")}
                                </h3>

                                <div className="flex py-1 px-3 md:py-3 md:px-5 bg-main-100 items-center rounded-[8px] mt-3 cursor-pointer">
                                    <label
                                        htmlFor="picture"
                                        className="text-sm text-main-300 ml-1 cursor-pointer"
                                    >
                                        {getLangText(lang, "Rasmni tahrirlash", "Изменить фото профиля")}
                                    </label>
                                    <Input id="picture" type="file" className="hidden" accept="image/*" {...register('avatar')} />
                                </div>
                            </div>
                        </div>
                        <div >
                            <div className="mt-5 md:grid grid-cols-2 gap-4 grid-rows-1 items-end space-y-3 md:space-y-0">
                                <div className="">
                                    <h3 className="text-xl md:text-3xl font-normal text-[#585D65] mb-2 md:mb-3">
                                        {getLangText(lang, "Assosiy Malumotlar", "Основная информация")}
                                    </h3>
                                    <Input placeholder="Фамилия" {...register('fullName')} defaultValue={defaultValue?.fullname} />
                                </div>
                                <div>
                                    <h3 className=" text-xl md:text-3xl font-normal text-[#585D65] mb-2 md:mb-3">
                                        {getLangText(lang, "Kontakt malumotlari", "Контактная информация")}
                                    </h3>
                                    {defaultValue?.phone ? (
                                        <Input placeholder="Телефон" {...register("emailOrPhone", { required: false })} defaultValue={defaultValue?.phone} />
                                    ) : (
                                        <Input placeholder="Email" {...register('emailOrPhone', { required: false })} defaultValue={defaultValue?.email} />
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end mt-5 ">
                                <Button type="submit" variant={"main"} disabled={isSubmitting}>
                                    {getLangText(lang, "O'zgarishlarni saqlash", "Сохранить изменения")}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
                <form onSubmit={form.handleSubmit(passwordSubmit)}>
                    <div className="md:grid md:grid-cols-2 py-3 flex flex-col gap-3 pt-7">
                        <Input type="password" {...form.register("password")} placeholder="Password" />
                        <Input type="password" {...form.register('passwordCheck')} placeholder="Password Check" />
                    </div>
                    <div className="flex justify-end  mt-3 ">
                        <Button type="submit" variant={"main"} disabled={isSubmitting}>
                            {getLangText(lang, "O'zgarishlarni saqlash", "Сохранить изменения")}
                        </Button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default FormEditProfile;
