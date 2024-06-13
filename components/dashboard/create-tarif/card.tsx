import Image from "next/image";
import HashMain from "@/icons/hash-main.svg";
import HashSecond from "@/icons/hash-second.svg";
import Star1 from "@/icons/star-1.svg";
import Star2 from "@/icons/star-2.svg";
import Star3 from "@/icons/star-3.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateTarifForm from "./form";
import DeleteBtn from "./delete-btn";
import { cookies } from "next/headers";
interface CardProps {
  values: {
    availablePeriod: number;
    includeResources: boolean;
    includeSupport: boolean;
    includePrivateGroupAccess: boolean;
    price: number;
    discount?: number;
    discountExpiredAt?: string;
    titleUz: string;
    titleRu: string;
    detailsUz: string;
    detailsRu: string;
    descriptionUz: string;
    descriptionRu: string;
  };
  pro?: boolean;
  small?: boolean;
  planId: string;
  lang: "uz" | "ru";
}
function Card(props: CardProps): JSX.Element {
  const details =
    props.lang === "uz" ? props.values.detailsUz : props.values.detailsRu;

  const accesses = details?.split(".").map((str) => {
    const obj: any = {
      icon: str[0],
      text: str.slice(2),
      del: str[1] !== "+",
    };

    return obj;
  });
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
          {props.lang === "uz" ? props.values?.titleUz : props.values?.titleRu}
        </h2>
        <ul className="flex flex-col gap-2">
          {accesses?.map((acs, i) => (
            <li className="flex gap-2 items-start" key={i}>
              <span className="w-5 h-5 relative flex-shrink-0">
                <Image
                  fill
                  src={
                    acs?.icon === "#"
                      ? props.pro || acs?.del
                        ? HashSecond
                        : HashMain
                      : acs?.icon === "*" && props.pro && !acs?.del
                        ? Star2
                        : acs?.icon === "*" && props.pro && acs?.del
                          ? Star3
                          : acs?.icon === "*" && !props.pro && !acs?.del
                            ? Star1
                            : Star2
                  }
                  alt="Picture of the icon"
                />
              </span>
              <p
                className={cn(
                  `${props.pro && acs?.del ? "text-csneutral-300" : !props.pro && acs.del ? "text-csneutral-400" : props.pro ? "text-white" : "text-csneutral-500"}`,
                  { "line-through": acs?.del },
                )}
              >
                {acs?.text}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2 mt-8">
        <div className={props.pro ? "text-main-100" : "text-csneutral-500"}>
          {props.lang === "ru"
            ? props.values.descriptionRu
            : props.values.descriptionUz}
        </div>
        <div className="flex flex-col gap-0.5">
          <div
            className={`price text-sm w-max p-2 rounded-lg ${!props.pro ? "text-main-100" : "text-main-300"} ${props.pro ? "bg-main-100" : "bg-main-300"}`}
          >
            {props.lang === "ru"
              ? `Доступ к курсу ${props.values.availablePeriod / 30} месяцев`
              : `Kursga ${props.values.availablePeriod / 30} oy ruxsat`}
          </div>

          <p
            className={`price ${props.small ? "text-[22px]" : "text-[32px]"} ${props.pro ? "text-main-100" : "text-main-300"} ${props.values.discount ? "line-through" : ""}`}
          >
            {props.values.price} {props.lang === "ru" ? "УЗС" : "UZS"}
          </p>
          {props.values.discount && (
            <p
              className={`price ${props.small ? "text-[22px]" : "text-[32px]"} ${props.pro ? "text-main-100" : "text-main-300"}`}
            >
              {props.values.discount} {props.lang === "ru" ? "УЗС" : "UZS"}
            </p>
          )}
          {props.values.discountExpiredAt && (
            <span>
              {props.lang === "ru"
                ? `Повышение цен ${new Date(
                    props.values.discountExpiredAt,
                  ).toLocaleDateString("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}`
                : `Chegirma ${new Date(
                    props.values.discountExpiredAt,
                  ).toLocaleDateString("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })} gacha`}
            </span>
          )}
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant={props.pro ? "filled" : "outline"}
              size={props.small ? "sm" : "lg"}
              className={props.small ? "text-sm" : "text-base md:text-lg"}
              //   className=" rounded-[14px] py-5 text-lg bg-main-100 w-full "
            >
              {props.lang === "ru" ? "Изменить" : "O'zgartirish"}
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-4xl overflow-auto max-h-screen">
            <CreateTarifForm
              lang={props.lang}
              method="PATCH"
              planId={props.planId}
              defaultValues={props.values}
              accessToken={cookies().get("accessToken")?.value}
            />
          </DialogContent>
        </Dialog>
        <DeleteBtn
          id={props.planId}
          accessToken={cookies().get("accessToken")?.value}
        />
      </div>
    </div>
  );
}

export default Card;
