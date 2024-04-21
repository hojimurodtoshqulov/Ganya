import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import Play from "@/icons/Play.svg";

const Dars = () => {
  return (
    <div className='bg-csneutral-100 py-8'>
      <div className=' h-screen max-h-[764px] w-full max-w-[1080px] p-6 rounded-2xl bg- flex gap-4 flex-col  mx-auto bg-white '>
        <div className=" w-full h-[580px] bg-csneutral-100 rounded-xl flex justify-center align-middle">
          <Image src={Play} alt='' width={96} height={96}/>
        </div>
        <div className="btn-container flex justify-end">
          <Button
            variant={"main"}
            size={"default"}
            className=" max-[500px]:rounded-[8px] rounded-[10px]  text-sm px-8 py-3 mt-8 max-[500px]:w-full">Следующий урок</Button>
        </div>
        <div className="text flex flex-col gap-5">
          <p className=' text-csneutral-500 font-normal text-[22px] leading-8 '>Подзаголовок</p>
          <p className=' text-sm font-normal leading-5'>Тут будет домашнее задание</p>
        </div>
      </div>
    </div>

  )
}
export default Dars