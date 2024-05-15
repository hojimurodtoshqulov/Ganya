'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'
import { useForm } from "react-hook-form";
interface data {
    "id": string,
    "createdAt": string,
    "updatedAt": string,
    "username": string,
    "userAvatar": string,
    "text": string,
    "isPublished": boolean
}

const FormUpdate = ({ open, closeFunc, comment }: { closeFunc: Function, open: boolean, comment: data }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const ref = useRef<HTMLFormElement>(null);
    const text1ref = useRef<HTMLTextAreaElement>(null);
    const text2ref = useRef<HTMLTextAreaElement>(null);
    const [count1, setcount1] = useState(0)
    const [count2, setcount2] = useState(0)
    const [method, setMethod] = useState("");
    const router = useRouter()

    const onSubmitHandle = async (data: FormData | unknown) => {
        console.log(comment.id)
        if (method && method === "PATCH") {
            const res = await fetch(
                `https://oar-api.onrender.com/api/v1/comments/update/${comment.id}`,
                {
                    method: "PATCH",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
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
                `https://oar-api.onrender.com/api/v1/comments/delete/${comment.id}`,
                {
                    method: "DELETE",
                },
            );
            if (res.ok) {
                router.refresh();
                closeFunc();
            }
        }
    }

    const Changed = (ref: React.RefObject<HTMLTextAreaElement>) => {
        if (ref.current) {
            if (ref.current.name === 'Sharh') {
                setcount2(ref.current.value.length)
            }
            else {
                setcount1(ref.current.value.length)
            }
        }
    }
    return (
        <div className={`Отзывы w-screen h-screen z-50 top-0 left-0 flex justify-center items-center ${open ? 'fixed' : 'hidden'}`} style={{ backgroundColor: "rgba(100, 121, 55, 0.2)" }} onClick={(e) => {
            if ((e.target as Element).classList.contains('Отзывы')) {
                closeFunc()
            }
        }} >

            <form ref={ref} onSubmit={handleSubmit((data) => {
                console.log("salom")
                onSubmitHandle(data)
            })} className='bg-white flex flex-col w-11/12 max-w-[648px] max-h-[534px] h-5/6 overflow-auto p-10 gap-6 rounded-2xl' style={{ scrollbarWidth: 'none' }}>
                <div className='flex flex-col gap-4'>

                    <div className='flex flex-col gap-2'>
                        <label className='font-normal text-sm text-neutral-400'>Имя Фамилия</label>
                        <Input autoComplete='off' {...register("Имя", { required: true })} placeholder='Введите Имя и Фамилию' className='text-neutral-500' defaultValue={comment.username} />
                    </div>
                    {errors.Имя && <span className='text-red-500'>This field is required</span>}

                    <div className='flex flex-col gap-2'>
                        <label className=' font-normal text-sm text-neutral-400'>Ism Familiya</label>
                        <Input  {...register("Ism", { required: true })} autoComplete='off' placeholder='Ism va familiyani kiriting' className=' text-neutral-500' defaultValue={comment.username} />
                    </div>
                    {errors.Ism && <span className='text-red-500'>This field is required</span>}

                    {/* <div className='flex flex-col gap-2'>
                        <label className=' font-normal text-sm text-neutral-400'>Должность</label>
                        <Input  {...register("должность", { required: true })} autoComplete='off' placeholder='Введите должность или положение' className=' text-neutral-500' />
                    </div>
                    {errors.должность && <span className='text-red-500'>This field is required</span>}

                    <div className='flex flex-col gap-2'>
                        <label className=' font-normal text-sm text-neutral-400'>Lavozim</label>
                        <Input {...register("Lavozim", { required: true })} autoComplete='off' placeholder='Lavozim yoki lavozimni kiriting' className=' text-neutral-500' />
                    </div>
                    {errors.Lavozim && <span className='text-red-500'>This field is required</span>} */}

                    <div className='flex flex-col gap-2'>
                        <label className=' font-normal text-sm text-neutral-400'>Отзыв</label>
                        <textarea  {...register("отзыв")} ref={text1ref} onChange={() => Changed(text1ref)} maxLength={400} defaultValue={comment.text} placeholder='Введите отзыв пользователя' className=" text-w-full rounded-xl h-[120px] text-lg outline-none p-4 resize-none border-2 placeholder-neutral-500 text-neutral-500" />
                        <p className={`${count1 >= 400 ? 'text-red-500' : ''}`}>{count1}/400</p>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className=' font-normal text-sm text-neutral-400'>Sharhlar</label>
                        <textarea {...register("Sharh")} ref={text2ref} onChange={() => Changed(text2ref)} maxLength={400} defaultValue={comment.text} placeholder='Foydalanuvchi sharhini kiriting' className=" text-w-full rounded-xl h-[120px] text-lg outline-none p-4 resize-none border-2 placeholder-neutral-500 text-neutral-500" />
                        <p className={`${count2 >= 400 ? 'text-red-500' : ''}`}>{count2}/400</p>
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
    )
}

export default FormUpdate