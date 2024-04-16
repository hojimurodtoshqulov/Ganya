import Card from "./card"

function Tariflar() {
  return (
      <div className="flex gap-6 px-6 flex-col pb-5 min-h-[696px] justify-center">
          <h2 className="title text-h2  leading-[56px]">Тарифы</h2>
          <div className="flex flex-wrap gap-6 justify-center ">
              <Card title="Базовый пакет:"
                  price="650.000 UZS"
                  content={["Доступ ко всем видеоурокам в течение 3 месяцев с момента приобретения курса."]} />
              
              <Card title="Стандартный"
                  price="850.000 UZS"
                  content={["Доступ ко всем видеоурокам в течение 6 месяцев с момента приобретения курса.", "Дополнительные текстовые материалы."]} />
              
              <Card title="Премиум пакет:"
                  price="1 200 000 UZS"
                  content={["Доступ ко всем видеоурокам в течение 1 года с момента приобретения курса.", "Дополнительные текстовые материалы.", "1 онлайн - консультации со мной."]}/>
          </div>

    </div>
  )
}

export default Tariflar