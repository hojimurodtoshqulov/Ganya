import React from "react";
import Card from "./card-stati";
import { Button } from "@/components/ui/button";

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

      <div className="bg-csneutral-100 py-20 my-16">
        <div className="container">
          <h2 className="title text-h2 leading-[56px] mb-8">Статьи</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              title="Роды в Lapino. Как это было?"
              text="Описание"
              time="Mar 25, 2024"
              minut={9}
            />
            <Card
              title="Роды в Lapino. Как это было?"
              text="Описание"
              time="Mar 25, 2024"
              minut={9}
            />
            <Card
              title="Роды в Lapino. Как это было?"
              text="Описание"
              time="Mar 25, 2024"
              minut={9}
            />
          </div>
          <div className="flex justify-center align-middle">
            <Button
              variant={"main"}
              size={"lg"}
              className="rounded-[20px] text-lg px-8 mt-8"
            >
              Перейти к статьям
            </Button>
          </div>
        </div>
      </div>
      </div>
      );
}

      export default Stati;
