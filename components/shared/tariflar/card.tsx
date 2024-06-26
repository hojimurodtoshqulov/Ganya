"use client";
import Image from "next/image";
import HashMain from "@/icons/hash-main.svg";
import HashSecond from "@/icons/hash-second.svg";
import Star1 from "@/icons/star-1.svg";
import Star2 from "@/icons/star-2.svg";
import Star3 from "@/icons/star-3.svg";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { saveLink } from "@/lib/actions/user";
import { useState } from "react";
interface PlanCardProps {
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
    id: string;
  };
  // pro?: boolean;
  small?: boolean;
  btn?: boolean;
  courseId: string;
  lang: "uz" | "ru";
}
function PlanCard(props: PlanCardProps): JSX.Element {
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

  const [pro, setPro] = useState(false);

  return (
    <div
      id="information"
      onMouseEnter={() => setPro(true)}
      onMouseLeave={() => setPro(false)}
      className={cn(
        `grid grid-rows-2 w-full transition-all duration-200 ${props.small ? "p-4 rounded-xl" : "py-4 px-5 sm:p-6 lg:p-10 rounded-[20px] md:rounded-[32px]"}  ${pro ? "bg-main-200" : "bg-csneutral-100"}`,
      )}
    >
      <div className="flex flex-col gap-3">
        <h2
          className={`title ${props.small ? "text-xl" : "text-2xl md:text-[32px]"} font-comfortaa font-semibold ${pro ? "text-main-100" : "text-csneutral-600"}`}
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
                      ? pro || acs?.del
                        ? HashSecond
                        : HashMain
                      : acs?.icon === "*" && pro && !acs?.del
                        ? Star2
                        : acs?.icon === "*" && pro && acs?.del
                          ? Star3
                          : acs?.icon === "*" && !pro && !acs?.del
                            ? Star1
                            : Star2
                  }
                  alt="Picture of the icon"
                />
              </span>
              <p
                className={cn(
                  `${pro && acs?.del ? "text-csneutral-300" : !pro && acs.del ? "text-csneutral-400" : pro ? "text-white" : "text-csneutral-500"}`,
                  { "line-through": acs?.del },
                )}
              >
                {acs?.text}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-0.5">
          <div
            className={`price text-sm w-max p-2 rounded-lg ${!pro ? "text-main-100" : "text-main-300"} ${pro ? "bg-main-100" : "bg-main-300"}`}
          >
            {props.lang === "ru"
              ? `Доступ к курсу ${props.values.availablePeriod / 30} месяцев`
              : `Kursga ${props.values.availablePeriod / 30} oy ruxsat`}
          </div>
          <p
            className={`price ${props.small ? "text-[22px]" : "text-[32px]"} ${pro ? "text-main-100" : "text-main-300"} ${props.values.discount ? "line-through" : ""}`}
          >
            {props.values?.price} {props.lang === "ru" ? "УЗС" : "UZS"}
          </p>
          {props.values?.discount && (
            <p
              className={`price ${props.small ? "text-[22px]" : "text-[32px]"} ${pro ? "text-main-100" : "text-main-300"}`}
            >
              {props.values?.discount} {props.lang === "ru" ? "УЗС" : "UZS"}
            </p>
          )}
          {props.values.discountExpiredAt && (
            <span className={pro ? "text-white" : "text-csneutral-500"}>
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
        {props.btn && (
          <Link
            className="block w-full my-2"
            href={`/${props.lang}/dashboard/client/buy/${props.courseId}/${props.values.id}`}
          >
            <Button
              variant={pro ? "filled" : "outline"}
              size={props.small ? "sm" : "default"}
              className="w-full"
              onClick={() => {
                const f = async () => {
                  await saveLink(
                    `/${props.lang}/dashboard/client/buy/${props.courseId}/${props.values.id}`,
                  );
                };
                f();
              }}
            >
              {props.lang === "ru" ? "Выбрать" : "Tanlash"}
            </Button>
          </Link>
        )}

        <p className={pro ? "text-white" : "text-csneutral-500"}>
          {props.lang === "ru"
            ? props.values.descriptionRu
            : props.values.descriptionUz}
        </p>
      </div>
    </div>
  );
}

export default PlanCard;
