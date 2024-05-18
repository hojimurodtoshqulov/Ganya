'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import FormUpdate from './form_update'
interface data {
  id: string,
  username: string,
  occupationUz: string,
  occupationRu: string,
  textUz: string,
  textRu: string,
  isPublished: boolean,
  createdAt: string,
  updatedAt: string
}
const Card = ({ data, accessToken, lang }: { data: data, accessToken:string | undefined, lang:'uz' | 'ru' }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  const onClickHandle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='flex flex-col bg-white rounded-2xl p-4 gap-3 w-[252px]'>
      <h3 className='text-lg text-main-300 font-medium font-roboto'>{data.username}</h3>
      <p className='text-neutral-500 text-sm'>{lang === 'ru' ? data.occupationRu : data.occupationUz}</p>
      <p className='text-neutral-500 text-sm overflow-hidden line-clamp-[8]'>{lang ==='ru' ? data.textRu : data.textUz}</p>
      <Button variant={"filled"} size={"default"} onClick={onClickHandle} className=' font-normal h-10 rounded-lg'>Изменить</Button>
      <FormUpdate open={isOpen} closeFunc={onClickHandle} comment={data} accessToken={accessToken} />
    </div>
  )
}

export default Card