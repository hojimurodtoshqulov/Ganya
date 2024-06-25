import Image from "next/image";
import React from "react";
import pay1 from "@/icons/pay-1.png";
import pay2 from "@/icons/pay-2.png";
import pay3 from "@/icons/pay-3.png";
import { getDictionary } from "@/lib/get-dictionary";
import { cn } from "@/lib/utils";
import { getUserData } from "@/lib/actions/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DelCookie from "./delCookie";

interface Props {
  params: {
    lang: "uz" | "ru";
    planId: string;
    courseId: string;
  };
}
async function getPlans<T>(id: string): Promise<T[] | Error> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/plans/all/" + id,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return new Error("Failed to fetch data");
  }

  return res.json();
}
interface ICard {
  id: string;
  createdAt: string;
  updatedAt: string;
  titleUz: string;
  titleRu: string;
  image: string;
  descriptionUz: string;
  descriptionRu: string;
  courseStatus: string;
}

interface FullCourses {
  id: string;
  courseId: string;
  planId: string;
  userId: string;
  purchaseDate: string;
  expirationDate: string;
  createdAt: string;
  updatedAt: string;
  course: ICard;
}
async function getData<T>(): Promise<T[] | Error> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/courses/my-courses",
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${JSON.parse(cookies().get("accessToken")?.value ?? "")}`,
      },
    },
  );

  if (!res.ok) {
    return new Error("Failed to fetch data");
  }

  return res.json();
}
export default async function BuyCourse({
  params: { lang, planId, courseId },
}: Props) {
  // console.log("payment page refreshed");
  const data = await getData<FullCourses>();

  if (data instanceof Error) {
    return <h2>Failed to fetch data.</h2>;
  }

  const isBuyed = data.some((course) => course.courseId === courseId);
  if (isBuyed) {
    // redirect(`/${lang}/dashboard/client/edu`);
    return (
      <div className="w-full max-w-[650px] mx-auto h-[calc(100vh-200px)] flex flex-col justify-center items-center gap-2.5">
        <h3 className=" font-medium text-2xl text-center">
          {lang === "ru"
            ? "Что делать после оплаты курса?"
            : "Kurs uchun pul to'lagandan keyin nima qilish kerak?"}
        </h3>
        <p className="text-center">
          {lang === "ru"
            ? `После оплаты на вашу почту или телефон придет письмо/SMS с инструкциями. Доступ к курсу сразу появится в личном кабинете. Если письмо не пришло, проверьте "Спам" или свяжитесь с поддержкой в Телеграм: +998 99 768 66 00`
            : "To'lovdan so'ng, elektron pochta yoki telefoningizga ko'rsatmalar bilan elektron pochta / SMS yuboriladi. Kursga kirish darhol shaxsiy hisobingizda paydo bo'ladi. Agar xat kelmagan bo'lsa, Spamni tekshiring yoki Telegramda qo'llab-quvvatlash xizmatiga murojaat qiling: +998 99 768 66 00"}
        </p>
      </div>
    );
  }

  const langue = await getDictionary(lang);
  const plans = await getPlans<{
    id: string;
    price: number;
    availablePeriod: number;
    titleUz: string;
    titleRu: string;
    includeSupport: boolean;
    includeResources: boolean;
    includePrivateGroupAccess: boolean;
    descriptionUz: string;
    descriptionRu: string;
    discount?: number;
  }>(courseId);
  if (plans instanceof Error) return <h2>Failed to fetch data.</h2>;

  const plan = plans.find((plan) => plan.id === planId);

  if (!plan) {
    return <h2>Plan not found</h2>;
  }

  const userData = await getUserData();
  if (userData instanceof Error) return <h2>Failed to fetch user data.</h2>;
  const userId = userData?.id;

  return (
    <div
      className={cn(
        "w-full h-[calc(100vh-100px)] flex justify-center items-center",
        {
          "w-screen h-screen fixed top-0 left-0 z-[999999999999] bg-csneutral-100":
            false,
        },
      )}
    >
      <DelCookie />
      <div className="bg-white p-10 rounded-2xl w-[650px]">
        <h1 className="text-main-300 text-[32px] font-bold leading-[44px] font-comfortaa mb-8">
          {langue.pay.heading}
        </h1>
        {/* {userId} */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <p className="text-lg font-normal">{langue.pay.title}</p>
            <h2 className="text-[22px] leading-[32px] text-main-300 font-semibold">
              {lang === "uz" ? plan.titleUz : plan.titleRu}
            </h2>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg font-normal">{langue.pay.pay}</p>
            <h2 className="text-[22px] leading-[32px] text-main-300 font-semibold">
              {plan?.discount ? plan?.discount : plan.price}{" "}
              {lang === "uz" ? "UZS" : "УЗС"}
            </h2>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-4 items-center">
          <a
            // target="_blank"
            href={`https://my.click.uz/services/pay?service_id=33448&merchant_id=25047&amount=${plan?.discount ? plan?.discount : plan.price}&transaction_param=${planId}&additional_param3=${userId}`}
            className="border rounded-xl px-6 py-4 w-full flex justify-center md:w-[180px]"
          >
            <Image src={pay1} width={100} height={100} alt="Pay with Click" />
          </a>
          <a
            // target="_blank"
            href={`https://checkout.paycom.uz/${btoa(`m=6628f4dc2eb76ec81b6969eb;ac.user_id=${userId};ac.planId=${planId};a=${(plan?.discount ? plan?.discount : plan.price) * 100}`)}`}
            className="border rounded-xl px-6 py-4 w-full flex justify-center md:w-[180px]"
          >
            <Image src={pay2} width={100} height={100} alt="Pay with Payme" />
          </a>
          <a
            // target="_blank"
            href={`https://www.apelsin.uz/open-service?serviceId=498615742&planId=${planId}&userId=${userId}&amount=${(plan?.discount ? plan.discount : plan?.price) * 100}`}
            className="border rounded-xl px-6 py-4 w-full flex justify-center md:w-[180px]"
          >
            <Image src={pay3} width={100} height={100} alt="Pay with Uzum" />
          </a>
        </div>
      </div>
    </div>
  );
}
