import Image from "next/image";
import FormModal from "../form-modal/form-modal";
import showcaseHero from "@/images/showcase-hero1.png";
import Media from "../media";
import { type getDictionary } from "../../../lib/get-dictionary";
import { Toaster } from "react-hot-toast";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Showcase({
  dict,
  lang,
}: {
  dict: Awaited<ReturnType<typeof getDictionary>>["home"];
  lang: "uz" | "ru";
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
      <div className="container pt-28 md:pt-40 pb-6 md:pb-16 h-full">
        <div className="w-full sm:w-1/2 flex flex-col justify-between h-full">
          <div>
            <h1 className="font-bold capitalize w-[22rem] sm:w-96 md:text-[67px] font-comfortaa text-[38px] md:leading-[70px] leading-[48px] text-white">
              {dict.showcase.title}
            </h1>
            <div className="flex items-start gap-4 mt-8 w-full">
              <FormModal dict={dict} lang={lang} />
              <Link
                className={buttonVariants({
                  variant: "filled",
                  className: "w-1/2 sm:w-auto",
                })}
                href={"#information"}
              >
                {lang === "ru" ? "Посмотреть курс" : "Kursni ko’rish"}
              </Link>
            </div>
          </div>
          <div>
            <Media color />
          </div>
        </div>
      </div>
    </div>
  );
}
