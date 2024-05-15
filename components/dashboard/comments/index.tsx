import React from 'react'
import Card from './card'
import AddCard from './add-card'
interface data {
      "id": string,
      "createdAt": string,
      "updatedAt": string,
      "username": string,
      "userAvatar": string,
      "text": string,
      "isPublished": boolean
}

const Sharhlar = async (): Promise<JSX.Element> => {
      const res = await fetch("https://oar-api.onrender.com/api/v1/comments/all")
      const data = await res.json()

      return (
            <>
                  <div className=" flex flex-wrap gap-6 bg-neutral-200 w-full p-4 max-w-[1400px] mx-auto">
                        {data.map((item: data, indx: number) => (
                              <Card key={indx} data={item} />
                        ))}
                        <AddCard />
                  </div>
            </>
      )
}

export default Sharhlar