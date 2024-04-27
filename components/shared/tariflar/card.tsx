import Image from "next/image";
import icon from "@/icons/Bolt.svg";
import icon2 from "@/icons/Vector.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
interface CardProps {
  title: string;
  price: string;
  content: string[];
  pro?: boolean;
  small?: boolean;
}
function Card(props: CardProps): JSX.Element {
  return (
    <div
      className={cn(
        `flex flex-col w-full ${props.small ? "p-4 rounded-xl" : "py-4 px-5 sm:p-6 lg:p-10 rounded-[20px] md:rounded-[32px]"}  gap-10 ${props.pro ? "bg-main-200" : "bg-csneutral-100"}  h-full justify-between`,
      )}
    >
      <div className="flex flex-col gap-3">
        <h2
          className={`title ${props.small ? "text-xl" : "text-2xl md:text-[32px]"} font-comfortaa font-semibold ${props.pro ? "text-main-100" : "text-csneutral-600"}`}
        >
          {props.title}
        </h2>
        <ul className="flex flex-col gap-2">
          {props.content.map((item, i) => (
            <li className="flex gap-2 items-start" key={i}>
              <span className="w-5 h-5 relative flex-shrink-0">
                <Image
                  fill
                  src={props.pro ? icon : icon2}
                  alt="Picture of the author"
                />
              </span>

              <p
                className={`${props.small ? "text-sm" : "text-base"} font-roboto ${props.pro ? "text-csneutral-100" : ""}`}
              >
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2 mt-8">
        <p
          className={`price ${props.small ? "text-[22px]" : "text-[32px]"} ${props.pro ? "text-main-100" : "text-main-300"}`}
        >
          {props.price}
        </p>
        <Button
          type="button"
          variant={props.pro ? "filled" : "outline"}
          size={props.small ? "sm" : "lg"}
          className={props.small ? "text-sm" : "text-base md:text-lg"}
          //   className=" rounded-[14px] py-5 text-lg bg-main-100 w-full "
        >
          Выбрать
        </Button>
      </div>
    </div>
  );
}

export default Card;
