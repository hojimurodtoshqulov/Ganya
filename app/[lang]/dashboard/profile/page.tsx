import Heading from "@/components/ui/heading";
import Image from "next/image";
import { FC } from "react";
import images from "@/images/success.png";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import Link from "next/link";

const Profile: FC = (): JSX.Element => {
  return (
    <div>
      <Heading text="Профиль" />
      <div className="mt-5 mx-6 p-6 rounded-2xl bg-white ">
        <div className="flex">
          <Image
            className="bg-slate-600"
            src={images}
            width={100}
            height={100}
            alt="Profile image"
          />
          <Link href={"/dashboard/profile/edit"}>
            <div>
              <h3 className="text-3xl font-normal text-[#585D65]">
                Orinbaev Daut
              </h3>
              <div className="flex py-3 px-5 bg-main-100 items-center rounded-[8px] mt-3 cursor-pointer">
                <HiOutlinePencilSquare />
                <p className="text-sm text-main-300 ml-1">
                  Редактитровать профиль
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div>
          <h2 className="text-3xl font-normal text-[#585D65] my-5">
            Основная информация
          </h2>
          <div className="flex mt-4 items-center sm:flex-row gap-3 sm:gap-0 flex-col">
            <div className="w-full sm:w-[500px]">
              <p className="text-sm text-[#585D65] mb-1">Email</p>
              <h5 className="text-lg font-normal text-main-300">
                daut.webdesign@gmail.com
              </h5>
            </div>
            <div className="w-full sm:w-[500px]">
              <p className="text-sm text-[#585D65] mb-1">Телефон</p>
              <h5 className="text-lg font-normal text-main-300">
                +998900223664
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
