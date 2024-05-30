import Image from "next/image";
import FormModal from "../form-modal/form-modal";
import showcaseHero from "@/images/showcase-hero1.png";
import Media from "../media";
import { type getDictionary } from "../../../lib/get-dictionary";
import { Toaster } from "react-hot-toast";

export default function Showcase({
  dict,
}: {
  dict: Awaited<ReturnType<typeof getDictionary>>["home"];
}) {
  return (
    <div className="w-full md:h-screen h-[100vh] showcase-image bg-[#A9C26A]">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "16px",
            boxShadow: "box-shadow: 0px 24px 36px 0px #DEDEDE7A",
          },
        }}
      />
      <div className="container pt-36 md:pt-40 pb-6 md:pb-16 h-full">
        <div className="w-1/2 flex flex-col justify-between h-full">
          <div>
            <h1 className="font-bold w-80 md:text-[67px] font-comfortaa text-[40px] md:leading-[100px] leading-[48px] text-white">
              {dict.showcase.title}
            </h1>
            <FormModal dict={dict} />
          </div>
          <div>
            <Media color />
          </div>
        </div>
      </div>
    </div>
  );
}
