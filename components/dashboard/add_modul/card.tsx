'use client'
import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from "react-hook-form";
import  EditIcon  from "@/icons/editIcon.svg";
import Image from 'next/image';


const Card = ({ number, modul_name, id, updatedData, deletedData }: { number: number, modul_name: string, id: number, updatedData: (data: FormData | unknown, id: number) => void, deletedData: ( id: number) => void } ) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef<HTMLFormElement>(null);
    const onClickHandle = () => {
        setIsOpen(!isOpen)
    }
    const onSubmitHandle = (data: FormData | unknown) => {
        if (data) {
            updatedData(data, id)
        }
        onClickHandle()
        if (ref.current) {
            (ref.current).reset();
        }
    };
    return (
        <>
            <div className='lg:w-1/3 md:w-1/2 w-full min-w-[330px] p-3 h-auto'>
                <div className='rounded-2xl p-4 bg-white gap-3 flex flex-col min-w-[320px] min-h-[124px] relative'>
                    <Image src={EditIcon} alt='edit' width={20} height={20} className='absolute top-4 right-4 cursor-pointer' onClick={() => onClickHandle()} />

                    <p className='text-neutral-500 text-base'>{number} - modul</p>
                    <p className='text-[22px] leading-[32px] text-neutral-500'>{modul_name}</p>
                </div>
            </div>

            <div className={` addCard w-screen h-screen z-50 top-0 left-0 flex justify-center items-center ${isOpen ? 'fixed' : 'hidden'}`} style={{ backgroundColor: "rgba(100, 121, 55, 0.2)" }} onClick={(e) => {
                if (e.target === e.currentTarget || (e.target as Element).classList.contains('addCard')) {
                    onClickHandle()
                }
            }} >
                <form ref={ref} onSubmit={handleSubmit((data) => onSubmitHandle(data))} className='bg-white flex flex-col w-11/12 max-w-[648px] max-h-[534px] h-5/6 overflow-auto p-10 gap-6 rounded-2xl' style={{ scrollbarWidth: 'none' }}>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <label className='font-normal text-sm text-neutral-400'>Modul raqami</label>
                            <Input autoComplete='off' {...register("Number1", { required: true })} type='number' placeholder='Modul raqami' defaultValue={number} className='text-neutral-500' />
                        </div>
                        {errors.Number1 && <span className=' text-red-500'>This field is required</span>}

                        <div className='flex flex-col gap-2'>
                            <label className='font-normal text-sm text-neutral-400'>Номер модуля</label>
                            <Input autoComplete='off' {...register("Number2", { required: true })} type='number' placeholder='Номер модуля' defaultValue={number} className='text-neutral-500' />
                        </div>
                        {errors.Number2 && <span className=' text-red-500'>This field is required</span>}
                        <div className='flex flex-col gap-2'>
                            <label className=' font-normal text-sm text-neutral-400'>Modul qo'shish</label>
                            <Input  {...register("modul_nomi", { required: true })} defaultValue={modul_name} autoComplete='off' placeholder="Modul qo'shish" className=' text-neutral-500' />
                        </div>
                        {errors.Ism && <span className='text-red-500'>This field is required</span>}

                        <div className='flex flex-col gap-2'>
                            <label className=' font-normal text-sm text-neutral-400'>Добавить модул</label>
                            <Input  {...register("имя_модуля", { required: true })} defaultValue={modul_name} autoComplete='off' placeholder='Добавить модул' className=' text-neutral-500' />
                        </div>
                        {errors.должность && <span className=' text-red-500'>This field is required</span>}

                    </div>
                    <div className='flex justify-end max-sm:flex-col gap-4'>

                        <Button variant={'outline'} className='font-normal text-base py-4 px-7  hover:bg-red-500 border-red-500 text-red-500 hover:text-white' onClick={() => deletedData(id)} >удалить</Button>
                        <Button variant={'main'} className='font-normal text-base py-4 px-7'>Добавить</Button>
                    </div>

                </form>
            </div>
        </>
    )
}

export const AddCard = ({getData}: {getData: (data: FormData | unknown) => void}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef<HTMLFormElement>(null);
    const onClickHandle = () => {
        setIsOpen(!isOpen)
    }
    const onSubmitHandle = (data: FormData | unknown) => {
        if (data) {
            getData(data)
        }
        onClickHandle()
        if (ref.current) {
            (ref.current).reset();
        }
    };

    return (
        <>
            <div className='lg:w-1/3 md:w-1/2 w-full min-w-[330px] p-3 h-auto'>
                <div className=' rounded-2xl p-4 border-2 border-neutral-300 border-dashed gap-3 flex flex-col min-w-[320px] min-h-[124px] cursor-pointer' onClick={() => onClickHandle()}>
                    <p className='text-neutral-500 text-base'>Modul raqami</p>
                    <p className='text-[22px] leading-[32px] text-neutral-500'>Modul qo'shish</p>
                </div>
            </div>


            <div className={` addCard w-screen h-screen z-50 top-0 left-0 flex justify-center items-center ${isOpen ? 'fixed' : 'hidden'}`} style={{ backgroundColor: "rgba(100, 121, 55, 0.2)" }} onClick={(e) => { 
                if (e.target === e.currentTarget || (e.target as Element).classList.contains('addCard')) {
                    onClickHandle()
                }
            }} >
                <form ref={ref} onSubmit={handleSubmit((data) => onSubmitHandle(data))} className='bg-white flex flex-col w-11/12 max-w-[648px] max-h-[534px] h-5/6 overflow-auto p-10 gap-6 rounded-2xl' style={{ scrollbarWidth: 'none' }}>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <label className='font-normal text-sm text-neutral-400'>Modul raqami</label>
                            <Input autoComplete='off' {...register("Number1", { required: true })} type='number' placeholder='Modul raqami' className='text-neutral-500' />
                        </div>
                        {errors.Number1 && <span className=' text-red-500'>This field is required</span>}

                        <div className='flex flex-col gap-2'>
                            <label className='font-normal text-sm text-neutral-400'>Номер модуля</label>
                            <Input autoComplete='off' {...register("Number2", { required: true })} type='number' placeholder='Номер модуля' className='text-neutral-500' />
                        </div>
                        {errors.Number2 && <span className=' text-red-500'>This field is required</span>}
                        <div className='flex flex-col gap-2'>
                            <label className=' font-normal text-sm text-neutral-400'>Modul qo'shish</label>
                            <Input  {...register("modul_nomi", { required: true })} autoComplete='off' placeholder="Modul qo'shish" className=' text-neutral-500' />
                        </div>
                        {errors.Ism && <span className='text-red-500'>This field is required</span>}

                        <div className='flex flex-col gap-2'>
                            <label className=' font-normal text-sm text-neutral-400'>Добавить модул</label>
                            <Input  {...register("имя_модуля", { required: true })} autoComplete='off' placeholder='Добавить модул' className=' text-neutral-500' />
                        </div>
                        {errors.должность && <span className=' text-red-500'>This field is required</span>}

                    </div>
                    <Button variant={'main'} className='font-normal text-base py-4 px-7'>Добавить</Button>
                </form>
            </div>
        </>

    )
}

export default Card