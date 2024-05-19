import React from 'react'
import Card from './card'
import AddCard from './add-card'
import { cookies } from 'next/headers'
interface data {
      id: string,
      username: string,
      occupationUz: string,
      occupationRu: string,
      textUz: string,
      textRu: string,
      isPublished: boolean,
      createdAt: string,
      updatedAt: string
}

const Sharhlar = async ({lang}: {lang:'uz' | 'ru'}): Promise<JSX.Element> => {
      const accessToken = cookies().get("accessToken")?.value;
      const res = await fetch("https://oar-api.onrender.com/api/v1/comments/all",
      { cache: "no-store" })
      const data = await res.json()

      return (
            <>
                  <div className=" flex flex-wrap gap-6 bg-neutral-200 w-full p-4 max-w-[1400px] mx-auto">
                        {data.map((item: data, indx: number) => (
                              <Card key={indx} data={item} accessToken={accessToken} lang={lang} />
                        ))}
                        <AddCard accessToken={accessToken} />
                  </div>
            </>
      )
}

export default Sharhlar