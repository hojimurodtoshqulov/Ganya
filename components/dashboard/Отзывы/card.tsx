import { Button } from '@/components/ui/button'
import React from 'react'

const Card = (): JSX.Element => {
  return (
      <div className='flex flex-col bg-white rounded-2xl p-4 gap-3 w-[252px]'>
          <h3 className='text-lg text-main-300 font-medium font-roboto'>Имя Фамилия</h3>
          <p className='text-neutral-500 text-sm'>Должность</p>
          <p className='text-neutral-500 text-sm'>Прошла курс Pre-natal Pilates и не могу нарадоваться! Занятия помогли мне оставаться в форме и подготовиться к родам. Инструкторы были внимательны и профессиональны, а атмосфера на занятиях всегда была поддерживающей.</p>
          <Button  variant={"filled"} size={"default"} className=' font-normal h-10 rounded-lg'>Изменить</Button>
    </div>
  )
}

export default Card