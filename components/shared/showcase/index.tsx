import Image from "next/image";

import SocialMediaLink from "../social-media/social-media";
import FormModal from "../form-modal/form-modal";
import showcaseHero from "@/images/showcase-hero1.png";
import Media from "../media";

export default function Showcase() {
  return (
    <div className="w-full showcase-image">
      <div className="container pt-36 pb-6 md:pb-16">
        <div className="w-1/2">
          <h1 className="font-bold md:text-[67px] font-comfortaa text-csneutral-500 text-[40px] md:leading-[100px] leading-[48px]">
            Академия <span className="text-main-300"> Oсознанного </span>
            Pодительства
          </h1>

          <FormModal />
          <div className="md:mt-32 mt-[400px]">
            <Media />
          </div>
        </div>
      </div>
    </div>
  );
}
