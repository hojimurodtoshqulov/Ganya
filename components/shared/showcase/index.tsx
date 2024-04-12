import Image from "next/image";
import showcaseHero from "@/images/showcase-hero1.png";
import { Button } from "@/components/ui/button";
import FormModal from "../form-modal/form-modal";
import SocialMediaLink from "../social-media/social-media";

export default function Showcase() {
  return (
    <div className="h-screen  relative flex items-center justify-start">
      <Image
        priority
        src={showcaseHero}
        alt="Woman with her child"
        className="z-0 w-100 h-auto object-contain"
      />

      <div className="w-52  absolute z-10 pl-10 flex flex-col">
        <h1 className=" font-bold text-h1 font-comfortaa text-csneutral-500 leading-[100px]">
          Академия <span className="text-main-300"> Oсознанного </span>
          Pодительства
        </h1>

        <FormModal />
      </div>
      <div className="absolute pl-10 bottom-8 z-10">
        <SocialMediaLink />
      </div>
    </div>
  );
}
