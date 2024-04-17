import Image from "next/image"
import icon from "@/icons/Bolt.svg";
import icon2  from "@/icons/Vector.svg";
interface CardProps {
    title: string
    price: string
    content: string[]
}
function Card(props: CardProps): JSX.Element {
    console.log(props)
    return props.title === "Стандартный" ? (
          <div className="flex flex-col max-w-[424px] p-10 gap-10 bg-main-200 rounded-[32px] min-h-[440px] justify-between">
              <div className="flex flex-col gap-3">
                <p className="title text-[32px] leading-[44px] font-comfortaa text-main-100">
                      {props.title}
                  </p>
                  <ul className="flex flex-col gap-2">
                      {props.content.map( item => (
                          <li className="flex gap-2">
                              <span> <Image className="min-w-5" src={icon} alt="Picture of the author" /></span>
                              <span className="text-base font-roboto text-csneutral-100">{item}</span>
                          </li>
                      ) )}
                  </ul>
              </div>

              <div className="flex flex-col gap-2">
                  <p className="price text-[32px] leading-[44px] text-main-100">{props.price}</p>
                  <button type="button" className=" rounded-[14px] py-5 text-lg bg-main-100 w-full ">Выбрать</button>
              </div>

        </div>
    ) : (
            <div className=" card flex flex-col max-w-[424px] p-10 gap-1 bg-csneutral-100  rounded-[32px] min-h-[440px] justify-between hover:bg-main-200">
          <div className="flex flex-col gap-3">
                    <p className="card-title text-[32px] leading-[44px] font-comfortaa text-csneutral-600">
                  {props.title}
              </p>
              <ul className="flex flex-col gap-2">
                  {props.content.map( item => (
                      <li className="flex gap-2">
                          <span> <Image className="icon2 min-w-4" src={icon2} alt="Picture of the author" /> <Image className="icon hidden min-w-5" src={icon} alt="Picture of the author" /></span>
                          <span className="text-base font-roboto text-csneutral-500">{item}</span>
                      </li>
                  ) )}

              </ul>
          </div>

          <div className="flex flex-col gap-2">
              <p className="price text-[32px] leading-[44px] text-main-300">{props.price}</p>
              <button type="button" className=" rounded-[14px] py-5 text-lg  text-main-200 border">Выбрать</button>
          </div>

    </div>
    )
}

export default Card