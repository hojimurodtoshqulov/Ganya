'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import FormUpdate from './form_update'
interface data {
  "id": string,
  "createdAt": string,
  "updatedAt": string,
  "username": string,
  "userAvatar": string,
  "text": string,
  "isPublished": boolean
}
const Card = ({ data }: { data: data }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const onClickHandle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className='flex flex-col bg-white rounded-2xl p-4 gap-3 w-[252px]'>
      <h3 className='text-lg text-main-300 font-medium font-roboto'>{data.username}</h3>
      <p className='text-neutral-500 text-sm'>Должность</p>
      <p className='text-neutral-500 text-sm overflow-hidden line-clamp-[8]'>{data.text}</p>
      <Button variant={"filled"} size={"default"} onClick={onClickHandle} className=' font-normal h-10 rounded-lg'>Изменить</Button>
      <FormUpdate open={isOpen} closeFunc={onClickHandle} comment={data} />
    </div>
  )
}

export default Card