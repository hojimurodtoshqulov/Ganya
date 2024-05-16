import Image from "next/image";
import icon from "@/icons/Bolt.svg";
import icon2 from "@/icons/Vector.svg";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
interface PlanCardProps {
  values: {
    availablePeriod: number;
    includeResources: boolean;
    includeSupport: boolean;
    price: number;
    titleUz: string;
    titleRu: string;
  };
  pro?: boolean;
  small?: boolean;
  btn?: boolean;
}
function PlanCard(props: PlanCardProps): JSX.Element {
  return (
    <div
      className={cn(
        `flex flex-col justify-between h-full w-full ${props.small ? "p-4 rounded-xl" : "py-4 px-5 sm:p-6 lg:p-10 rounded-[20px] md:rounded-[32px]"}  gap-10 ${props.pro ? "bg-main-200" : "bg-csneutral-100"}  h-full justify-between`,
      )}
    >
      <div className="flex flex-col gap-3">
        <h2
          className={`title ${props.small ? "text-xl" : "text-2xl md:text-[32px]"} font-comfortaa font-semibold ${props.pro ? "text-main-100" : "text-csneutral-600"}`}
        >
          {props.values?.titleRu}
        </h2>
        <ul className="flex flex-col gap-2">
          <li className="flex gap-2 items-start">
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
              Доступ ко всем видеоурокам в течение{" "}
              {props.values?.availablePeriod} месяцев с момента приобретения
              курса.
            </p>
          </li>
          {props.values?.includeResources && (
            <li className="flex gap-2 items-start">
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
                Дополнительные текстовые материалы.
              </p>
            </li>
          )}
          {props.values?.includeSupport && (
            <li className="flex gap-2 items-start">
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
                1 онлайн - консультации со мной.
              </p>
            </li>
          )}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <p
          className={`price ${props.small ? "text-[22px]" : "text-[32px]"} ${props.pro ? "text-main-100" : "text-main-300"}`}
        >
          {props.values?.price} UZS
        </p>
        {props.btn && (
          <Button
            variant={props.pro ? "filled" : "outline"}
            size={props.small ? "sm" : "default"}
          >
            Выбрать
          </Button>
        )}
      </div>
    </div>
  );
}

export default PlanCard;
