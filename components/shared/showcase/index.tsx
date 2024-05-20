import Image from "next/image";
import FormModal from "../form-modal/form-modal";
import showcaseHero from "@/images/showcase-hero1.png";
import Media from "../media";
import { type getDictionary } from "../../../lib/get-dictionary";

export default function Showcase({
  dict,
}: {
  dict: Awaited<ReturnType<typeof getDictionary>>["home"];
}) {
  return (
    <div className="w-full h-screen showcase-image bg-[#A9C26A]">
      <div className="container pt-64 pb-6 md:pb-16">
        <div className="w-1/2">
          <h1 className="font-bold md:text-[67px] font-comfortaa text-[40px] md:leading-[100px] leading-[48px] text-white">
            {dict.showcase.title}
          </h1>

          <FormModal dict={dict} />
          <div className="md:mt-32 mt-[200px] mb-[30px]">
            <Media />
          </div>
        </div>
      </div>
    </div>
  );
}
