import Image from 'next/image'
import React from 'react'
import Icon2 from "@/icons/Vector-dars2.svg";
import Icon1 from "@/icons/Vector-dars1.svg";

const DarsList = ({isActive}: {isActive?:boolean}) => {
  return (
      <div className='bg-csneutral-100 py-8'>
          <div className=' w-full max-w-[1080px] h-[92px] p-4 flex gap-3 rounded-2xl bg-white mx-auto'>
              <div className=' w-[60px] h-[60px] flex justify-center items-center bg-csneutral-100 rounded-xl '>
                  <Image src={isActive? Icon1: Icon2} alt='vector' priority width={24} height={24}/>
              </div>

              <div className='flex gap-1 flex-col w-full'>
                  <p className={` text-sm font-normal leading- flex justify-between  ${isActive ? ' text-csneutral-400' :'text-csneutral-500'}`}>
                      <span>Урок 1</span> <span className={` ${isActive? 'max-[500px]:hidden': 'hidden'} `}>Есть домашнее задание</span>
                  </p>
                  <p className={` text-[22px] max-[500px]:text-lg font-normal leading-[32px]  ${isActive ? 'text-csneutral-400' :'text-csneutral-500'}`}>Ознакомление</p>
            </div>
          </div>
    </div>
  )
}

export default DarsList