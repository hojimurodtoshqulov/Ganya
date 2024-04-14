import Image from "next/image";

import SocialMediaLink from "../social-media/social-media";
import FormModal from "../form-modal/form-modal";
import showcaseHero from '@/images/showcase-hero1.png'

export default function Showcase() {
  return (
    <div className="w-full h-screen ">
      <Image src={showcaseHero} className="z-0 absolute inset-0 w-full h-screen object-cover " alt={"showcase hero image"} />

      <div className="w-full h-screen absolute z-10 inset-0 p-10 flex flex-col justify-center">
        <div className="w-1/2">
          <h1 className=" font-bold lg:text-[67px] font-comfortaa text-csneutral-500 lg:leading-[90px]">
            Академия <span className="text-main-300"> Oсознанного </span>
            Pодительства
          </h1>

          <FormModal />
          <div className="mt-20 pt-10">
            <SocialMediaLink />
          </div>
        </div>
      </div>


    </div>
  )
}