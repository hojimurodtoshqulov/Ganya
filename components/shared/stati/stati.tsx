import React from 'react'
import Card from './card-stati'

function Stati() {
  return (
      <div className="flex gap-6 px-6 pb-5 flex-col bg-csneutral-100 min-h-[748px] justify-center">
      <h2 className="title text-h2  leading-[56px]">Статьи</h2>
          <div className="flex flex-wrap gap-6 justify-center ">
              <Card title='Роды в Lapino. Как это было?' text="Описание" time="Mar 25, 2024" minut={9} />
              <Card title='Роды в Lapino. Как это было?' text="Описание" time="Mar 25, 2024" minut={9} />
              <Card title='Роды в Lapino. Как это было?' text="Описание" time="Mar 25, 2024" minut={9} />
          </div>
          <div className='flex justify-center align-middle'>
              <button className='w-[200px] h-16 rounded-[20px] bg-main-200 text-lg text-white'>Перейти к статьям</button>
          </div>
    </div>
  )
}

export default Stati