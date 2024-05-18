import Heading from "@/components/ui/heading";
import Image from "next/image";
import { FC } from "react";
import images from "@/images/success.png";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import Link from "next/link";
import { cookies } from "next/headers";
import { FaPerson } from "react-icons/fa6";
import { User2Icon } from "lucide-react";

const getUser = async () => {
  const api = process.env.NEXT_PUBLIC_BASE_URL + "/users/profile";
  const accessToken = cookies().get('accessToken')?.value
  try {
    const req = await fetch(api, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`
      }
    })

    if (!req.ok) throw new Error('Не удалось получить')

    const res = await req.json()
    return res
  } catch (error: any) {
    console.log(error.message);
  }
}

export default async function Profile({ params: { lang } }: { params: { lang: 'ru' | 'uz' } }) {
  const user = await getUser();
  return (
    <div className="w-gll max-w-[calc(100vw_-_368px)]">
      {lang === "ru" ?
        <Heading text="Профиль" />
        :
        <Heading text="Profile" />
      }
      <div className="mt-5 mx-6 p-6 rounded-2xl bg-white ">
        <div className="flex gap-5">
          {user.avatar ? (
            <div className="relative w-20 h-20 rounded-2xl">
              <Image
                className="bg-slate-600  object-contain rounded-2xl"
                src={user.avatar}
                fill={true}
                alt="Profile image"
              />
            </div>
          ) : (<div className="rounded-2xl bg-gray-100 flex items-center justify-center p-5">
            <User2Icon className="w-20 h-20" />
          </div>)
          }
          <Link href={"/dashboard/profile/edit"}>
            <div>
              <h3 className="text-3xl font-normal text-[#585D65]">
                {user.fullname}
              </h3>
              <div className="flex py-3 px-5 bg-main-100 items-center rounded-[8px] mt-3 cursor-pointer">
                <HiOutlinePencilSquare />
                <p className="text-sm text-main-300 ml-1">
                  {lang === "ru" ? "Редактитровать профиль" : "Tahrirlash"}
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div>
          <h2 className="text-3xl font-normal text-[#585D65] my-5">
            {lang === "ru" ? "Основная информация" : "Boshqa malumotlar"}
          </h2>
          <div className="flex mt-4 items-center sm:flex-row gap-3 sm:gap-0 flex-col">
            <div className="w-full sm:w-[500px]">
              <p className="text-sm text-[#585D65] mb-1">Email</p>
              <h5 className="text-lg font-normal text-main-300">
                {user.email}
              </h5>
            </div>
            <div className="w-full sm:w-[500px]">
              <p className="text-sm text-[#585D65] mb-1">Телефон</p>
              <h5 className="text-lg font-normal text-main-300">
                {user.phone}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

