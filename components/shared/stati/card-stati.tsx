import React from 'react'
interface CardProps{
    title: string,
    text: string,
    time: string,
    minut:number
    
}
function Card(props:CardProps) {
  return (
      <div className='flex flex-wrap flex-col gap-4 rounded-[40px] p-6 max-w-[424px] h-[374px] bg-white justify-between'>
          <div className="flex flex-col gap-3">
              <h2 className="text-[32px] leading-[44px] font-comfortaa text-csneutral-600">
                  {props.title}
              </h2>
              <p className='text-[22px] leading-[32px] text-csneutral-500'>{ props.text}</p>
          </div>

          <div className="flex gap-2 text-lg">
              <p>{props.minut} минут чтения</p><span>·</span> <p>{props.time}</p>
          </div>

    </div>
  )
}

export default Card