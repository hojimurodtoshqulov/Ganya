'use client'
import React, { useState } from 'react'
import AddBanner from './addCard'
import BannerCard from './card'

interface banner {
  "id": string,
  "createdAt": string,
  "updatedAt": string,
  "imageWeb": string,
  "imageMobile": string,
  "link": string,
  "isPublished": boolean
}

async function getData<T>(): Promise<T[] | Error> {
  const res = await fetch("https://oar-api.onrender.com/api/v1/banners/all", {
    cache: "no-store",
  });

  if (!res.ok) {
    return new Error("Failed to fetch data");
  }

  return res.json();
}


const Banner = async () => {
  const banners = await getData();
  if (banners instanceof Error) {
    return <h2>Failed to fetch data.</h2>;
  }
  console.log(banners)

  return (
    <div className='bg-neutral-100 flex flex-wrap gap-5'>
      <AddBanner />

    </div>
  )
}

export default Banner