'use client'
import React, { useState } from 'react'
import AddBanner from './addCard'
import BannerCard from './card'
const Banner = () => {
    const [data, setData] = useState([])
  return (
      <div className='bg-neutral-100 flex flex-wrap gap-5'>
          <BannerCard />
          <AddBanner />

    </div>
  )
}

export default Banner