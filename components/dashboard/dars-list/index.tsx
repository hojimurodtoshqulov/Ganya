import Image from 'next/image'
import React from 'react'
import Icon from "@/icons/Vector-dars.svg";

const DarsList = () => {
  return (
      <div className='bg-csneutral-100 py-8'>
          <div className=' w-full max-w-[1080px] h-[92px] p-4 flex gap-3 rounded-2xl bg-white mx-auto'>
              <div className=' w-[60px] h-[60px] flex justify-center align-middle bg-csneutral-100 rounded-xl '>
                  <Image src={Icon} alt='vector' width={24} height={24}/>
              </div>

              <div className='flex gap-1 flex-col justify-between w-full'>
                  <p className=' text-sm font-normal leading-5 text-csneutral-400 flex justify-between'>
                      <span>Урок 1</span> <span className=' max-[500px]:hidden '>Есть домашнее задание</span>
                  </p>
                  <p className=' text-[22px] font-normal leading-[32px] text-csneutral-400'>Ознакомление</p>
            </div>
          </div>
    </div>
  )
}

export default DarsList