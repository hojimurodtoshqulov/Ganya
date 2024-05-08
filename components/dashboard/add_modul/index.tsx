'use client'
import React, { useState } from 'react'
import Card, { AddCard } from './card'
interface data  {
    Number1: number,
    modul_nomi: string
}

const AddModul = () => {
    const [allData, setAllData] = useState<data[]>([])
    const getData = (data: data) => {
        setAllData([...allData, data])
    }
    const updatedData = (data: data, id: number) => {
        setAllData(prev => prev.map((item, indx) => indx === id ? data : item))
    }

    const deletedData = (id: number) => {
        setAllData(prev => prev.filter((item, indx) => indx !== id))
    }

  return (
      <div className='bg-neutral-100'>
          <h1 className='text-[26px] leading-[36px] text-[#5A7A2E] pl-3'>Homiladorlik uchun tayyorgarlik</h1>
          <div className='flex flex-wrap'>
              {allData.map((data: data, id: number) => (<Card key={id} id={id} number={data.Number1} modul_name={data.modul_nomi} updatedData={(data: FormData | unknown) => updatedData(data as data, id)} deletedData={(data: FormData | unknown) => deletedData(id)} />))}
              <AddCard getData={(data: FormData | unknown) => getData(data as data)} />
          </div>
    </div>
  )
}

export default AddModul

