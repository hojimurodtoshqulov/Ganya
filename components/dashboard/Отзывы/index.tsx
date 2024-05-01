import React from 'react'
import Card from './card'
import AddCard from './add-card'

const Sharhlar = (): JSX.Element => {
    return (
      <>
      <div className=" flex flex-wrap gap-6 bg-neutral-200 w-full p-4 max-w-[1400px] mx-auto">
            <Card />
            <Card />
            <Card />
            <AddCard />
      </div> 
            </>
  )
}

export default Sharhlar