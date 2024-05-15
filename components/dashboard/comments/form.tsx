'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea';
import React, { useRef, useState } from 'react'
import { useForm } from "react-hook-form";


const Form = ({open, closeFunc}:{closeFunc:Function, open:boolean}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const ref = useRef<HTMLFormElement>(null);
    const [count1, setcount1] = useState(0)
    const [count2, setcount2] = useState(0)

    const onSubmitHandle = (data: FormData | unknown) => {
        closeFunc()
        if (ref.current) {
            (ref.current).reset();
        }
    };
    return (
        <div className={`Отзывы w-screen h-screen z-50 top-0 left-0 flex justify-center items-center ${open ? 'fixed' : 'hidden'}`} style={{ backgroundColor: "rgba(100, 121, 55, 0.2)" }} onClick={(e) => {
            if((e.target as Element).classList.contains('Отзывы')){
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
                        <Input autoComplete='off' {...register("Имя", { required: true })} placeholder='Введите Имя и Фамилию' className={`text-neutral-500 ${errors.Имя ? 'border-destructive focus-visible:!border-destructive':''}`} />
                    </div>
                    
                    <div className='flex flex-col gap-2'>
                        <label className=' font-normal text-sm text-neutral-400'>Ism Familiya</label>
                        <Input  {...register("Ism", { required: true })} autoComplete='off' placeholder='Ism va familiyani kiriting' className={`text-neutral-500 ${errors.Ism ? 'border-destructive focus-visible:!border-destructive' : ''}`} />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className=' font-normal text-sm text-neutral-400'>Должность</label>
                        <Input  {...register("должность", { required: true })} autoComplete='off' placeholder='Введите должность или положение' className={`text-neutral-500 ${errors.должность ? 'border-destructive focus-visible:!border-destructive' : ''}`} />
                    </div>
                    
                    <div className='flex flex-col gap-2'>
                        <label className=' font-normal text-sm text-neutral-400'>Lavozim</label>
                        <Input {...register("Lavozim", { required: true })} autoComplete='off' placeholder='Lavozim yoki lavozimni kiriting' className={`text-neutral-500 ${errors.Lavozim ? 'border-destructive focus-visible:!border-destructive' : ''}`} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="отзыв" className='font-normal text-sm text-neutral-400'>Oтзыв</label>
                        <Textarea {...register("отзыв", { required: true, onChange: (e) => { setcount1(e.target.value.length) } })} maxLength={400} autoComplete='off' className={`text-neutral-500 h-[120px] ${errors.отзыв ? 'border-destructive focus-visible:!border-destructive' : ''}`}  />

                        <p className={`${count1 >= 400 ? 'text-red-500' : ''} text-end`}>{count1 || 0}/400</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="sharh" className='font-normal text-sm text-neutral-400'>
                            Sharh
                        </label>
                        <Textarea {...register("sharh", { required: true, onChange: (e) => { setcount2(e.target.value.length) } })} maxLength={400} autoComplete='off' className={`text-neutral-500 h-[120px] ${errors.отзыв ? 'border-destructive focus-visible:!border-destructive' : ''}`} />
                        <p className={`${count2 >= 400 ? 'text-red-500' : ''} text-end`}>{count2 || 0}/400</p>
                    </div>
                </div>

                <Button variant={'main'} className='font-normal text-base py-4 px-7'>Добавить</Button>
            </form>
        </div>
    )
}

export default Form