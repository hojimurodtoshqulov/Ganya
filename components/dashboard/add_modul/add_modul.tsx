'use client'
import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';


export const AddCard = ({id}: {id:string | string[]}) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const ref = useRef<HTMLFormElement>(null);
    const onClickHandle = () => {
        setIsOpen(!isOpen)
    }
    
    const onSubmitHandle = async (data: FormData | unknown) => {

        const res = await fetch(`https://oar-api.onrender.com/api/v1/modules/create/${id}`,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        if (res.ok) {
            router.refresh()
            onClickHandle()
        }

        if (ref.current) {
            (ref.current).reset();
        }
    };

    return (
        <>
            <div className='lg:w-1/3 md:w-1/2 w-full min-w-[330px] pr-5 py-3 pl-0 h-auto'>

                <div className=' rounded-2xl p-4 border-2 border-neutral-300 border-dashed gap-3 flex flex-col min-w-[320px] min-h-[124px] cursor-pointer' onClick={() => onClickHandle()}>
                    <p className='text-neutral-500 text-base'>Modul raqami</p>
                    <p className='text-[22px] leading-[32px] text-neutral-500'>Modul qo&apos;shish</p>
                </div>
            </div>

            <div className={` addCard w-screen h-screen z-50 top-0 left-0 flex justify-center items-center ${isOpen ? 'fixed' : 'hidden'}`} style={{ backgroundColor: "rgba(100, 121, 55, 0.2)" }} onClick={(e) => {
                if (e.target === e.currentTarget || (e.target as Element).classList.contains('addCard')) {
                    onClickHandle()
                }
            }} >
                <form ref={ref} onSubmit={handleSubmit((data) => onSubmitHandle(data))} method='post' className='bg-white flex flex-col w-11/12 max-w-[648px] max-h-[534px] h-5/6 overflow-auto p-10 gap-6 rounded-2xl' style={{ scrollbarWidth: 'none' }}>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <label className='font-normal text-sm text-neutral-400'>Modul nomi</label>
                            <Input autoComplete='off' {...register("titleUz", { required: true })} type='text' placeholder='Modul nomi' className={`text-neutral-500 ${errors.titleUz ? "border-destructive focus-visible:!border-destructive" : ""}`} />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='font-normal text-sm text-neutral-400'>название модуля</label>
                            <Input autoComplete='off' {...register("titleRu", { required: true })} type='text' placeholder='название модуля' className={`text-neutral-500 ${errors.titleRu ? "border-destructive focus-visible:!border-destructive" : ""}`} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className=' font-normal text-sm text-neutral-400'>Modul tavsifi</label>
                            <Input  {...register("descriptionUz", { required: true })} autoComplete='off' placeholder="Modul tavsifi" className={`text-neutral-500 ${errors.descriptionUz ? "border-destructive focus-visible:!border-destructive" : ""}`} />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className=' font-normal text-sm text-neutral-400'>Описание модуля</label>
                            <Input  {...register("descriptionRu", { required: true })} autoComplete='off' placeholder='Описание модуля' className={`text-neutral-500 ${errors.descriptionRu ? "border-destructive focus-visible:!border-destructive" : ""}`} />
                        </div>

                    </div>
                    <Button variant={'main'}
                        disabled={isSubmitting}
                        className='font-normal text-base py-4 px-7'>Добавить</Button>
                </form>
            </div>
        </>

    )
}