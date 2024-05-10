'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import Form from './form'

const AddCard = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onClickHandle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
          <div className='flex flex-col bg-white rounded-2xl p-4 gap-3 h-fit w-[252px]'>
          <h3 className='text-lg text-main-300 font-medium font-roboto'>Добавить новый отзыв</h3>
          <Button variant={"main"} size={"default"} onClick={onClickHandle} className=' font-normal h-10 rounded-lg'>Добавить</Button>
      </div>
      <Form closeFunc={onClickHandle} open={isOpen}  />

      <div className='flex flex-col bg-white rounded-2xl p-4 gap-3 h-fit w-[252px]'>
        <h3 className='text-lg text-main-300 font-medium font-roboto'>Добавить новый отзыв</h3>
        <Button variant={"main"} size={"default"} onClick={onClickHandle} className=' font-normal h-10 rounded-lg'>Добавить</Button>
      </div>
      <Form closeFunc={onClickHandle} open={isOpen} />
    </>

  )
}

export default AddCard