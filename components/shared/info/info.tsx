import Image from "next/image";
import userImage1 from "@/images/about1.png";
import userImage2 from "@/images/about2.2.png";
import Media from "../media";

interface InfoProps {
  data: {
    title: string;
    text: string;
    tags?: string[];
  };
  sort?: boolean;
  lang: "uz" | "ru";
}

async function Info(props: InfoProps) {
  return (
    <>
      {/* <div
        className={`flex ${props.sort ? "flex-row-reverse" : "flex-row"} w-full justify-center max-[900px]:-mb-20 gap-8 max-[900px]:gap-0  max-[900px]:items-center max-[900px]:flex-col-reverse about`}
      >
        <div className="flex flex-col justify-between flex-3 max-[900px]:flex-auto gap-4 bg-main-100 max-w-[760px] p-5 md:px-10 md:py-14 rounded-[20px] md:rounded-[40px] max-[900px]:max-w-full max-[900px]:relative max-[450px]:max-w-full z-10 -top-20">
          <div className="flex flex-col gap-2 md:gap-4">
            <h2 className="text-h2 leading-normal">{props.data.title}</h2>
            <p className="text-base md:text-[22px] md:leading-8 text-main-200 font-roboto">
              {props.data.text}
            </p>
          </div>

          {props.data.tags && (
            <p className="flex">
              <Media/>
            </p>
          )}
        </div>

        <div className="flex-2 max-[900px]:w-full relative">
          <Image
            className="w-full h-full max-sm:object-cover rounded-[40px] min-w-[343px] max-[370px]:min-w-[300px] max-w-[536px]  max-[900px]:max-w-full"
            priority
            src={props.sort ? userImage2 : userImage1}
            alt="Picture of the author"
          />
        </div>
      </div> */}
      <div
        className={`flex ${props.sort ? "flex-row-reverse" : "flex-row"} w-full justify-center max-[900px]:-mb-10 gap-8 max-[900px]:gap-0  max-[900px]:items-center max-[900px]:flex-col-reverse about`}
      >
        <div className={`w-3/5 min-[900px]:min-h-[600px] min-[900px]:max-w-[760px] flex flex-col justify-between gap-5 max-[900px]:w-full bg-main-100 sm:px-12 sm:py-6 p-5 min-[900px]:rounded-[40px] rounded-[20px] min-[900px]:py-14 relative z-10 max-[900px]:-top-10`}>
          <div className="flex flex-col gap-2 md:gap-4">
            <h2 className="text-h2 leading-normal">{props.data.title}</h2>
            <p className="text-base md:text-[22px] md:leading-8 text-main-200 font-roboto">
              {props.data.text}
            </p>
          </div>

          {props.data.tags && (
              <Media />
          )}
        </div>

        <div className="min-[900px]:w-2/5 w-full max-[900px]:h-[400px] min-[900px]:max-w-[576px] relative">
          <Image
            className="object-cover min-[900px]:rounded-[40px] rounded-[20px]"
            priority
            fill
            src={props.sort ? userImage2 : userImage1}
            alt="Picture of the author"
          />
        </div>
      </div>
    </>
  );
}

export default Info;
