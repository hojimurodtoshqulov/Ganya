import { Button } from '@/components/ui/button'
import React from 'react'
import { Switch } from "@/components/ui/switch";

const BannerCard = () => {
  return (
      <div className='rounded-2xl p-4 bg-white gap-3 flex flex-col w-[252px] h-[124px] relative'>
          <div className='flex justify-between'>
              <p className='text-neutral-500 text-lg'>Banner</p>
              <Switch className=' bg-main-300'/>
          </div>

              <p className='text-[22px] leading-[32px] text-neutral-500'></p>
              <Button variant={"filled"} className='py-3 px-5'>Изменить</Button>
          </div>
  )
}

export default BannerCard