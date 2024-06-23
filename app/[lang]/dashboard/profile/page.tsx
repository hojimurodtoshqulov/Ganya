import Heading from "@/components/ui/heading";
import Image from "next/image";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import Link from "next/link";
import { cookies } from "next/headers";
import { User2Icon } from "lucide-react";

async function getUser<T>(): Promise<T | Error> {
  const api = process.env.NEXT_PUBLIC_BASE_URL + "/users/profile";
  const accessToken = cookies().get("accessToken")?.value;
  try {
    const req = await fetch(api, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`,
      },
    });

    if (!req.ok) throw new Error("Не удалось получить");

    const res = await req.json();
    return res;
  } catch (e) {
    return new Error("Не удалось получить");
  }
}

export default async function Profile({
  params: { lang },
}: {
  params: { lang: "ru" | "uz" };
}) {
  const user = await getUser<{
    name: string;
    surname: string;
    avatar: string;
    email: string | null;
    phone: string | null;
  }>();
  if (user instanceof Error) return <div>Something went wrong</div>;
  return (
    <div className="w-full">
      <h1 className="text-2xl md:text-5xl font-bold text-main-300 font-comfortaa">
        {lang === "ru" ? "Профиль" : "Profile"}
      </h1>

      <div className="mt-3 md:mt-5 mx-6 p-4 md:p-6 rounded-2xl bg-white ">
        <div className="flex gap-2 md:gap-4 lg:gap-5">
          {user.avatar ? (
            <div className="relative w-20 h-20 rounded-2xl">
              <Image
                className="bg-slate-600  object-contain rounded-2xl"
                src={user?.avatar}
                fill={true}
                alt="Profile image"
              />
            </div>
          ) : (
            <div className="rounded-2xl bg-gray-100 flex items-center justify-center p-5">
              <User2Icon className="w-20 h-20" />
            </div>
          )}
          <Link href={`/${lang}/dashboard/profile/edit`}>
            <div>
              <h3 className="text-3xl font-normal text-[#585D65]">
                {user?.name} {user?.surname}
              </h3>
              <div className="flex md:py-3 md:px-5 py-1 px-3 bg-main-100 items-center rounded-[8px] mt-1 md:mt-3 cursor-pointer">
                <HiOutlinePencilSquare />
                <p className="text-sm text-main-300 ml-1">
                  {lang === "ru" ? "Редактитровать" : "Tahrirlash"}
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div>
          <h2 className="text-3xl font-normal text-[#585D65] my-5">
            {lang === "ru" ? "Основная информация" : "Asosiy malumotlar"}
          </h2>
          <div className="flex mt-4 items-center sm:flex-row gap-3 sm:gap-0 flex-col">
            <div className="w-full sm:w-[500px]">
              <p className="text-sm text-[#585D65] mb-1">Email</p>
              <h5 className="text-lg font-normal text-main-300">
                {user?.email}
              </h5>
            </div>
            <div className="w-full sm:w-[500px]">
              <p className="text-sm text-[#585D65] mb-1">Телефон</p>
              <h5 className="text-lg font-normal text-main-300">
                {user?.phone}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
