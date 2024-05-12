import Image from "next/image";
import userImage1 from "@/images/about1.png";
import userImage2 from "@/images/about2.png";

interface InfoProps {
  title: string;
  text: string;
  tags?: string[];
  sort?: boolean;
}

function Info(props: InfoProps): JSX.Element {
  return (
    <>
      <div
        className={`flex ${props.sort ? "flex-row-reverse" : "flex-row"} w-full justify-center max-[900px]:mb-0 gap-8 max-[900px]:gap-0  max-[900px]:items-center max-[900px]:flex-col-reverse`}
      >
        <div className="flex flex-col justify-between flex-3 max-[900px]:flex-auto gap-4 bg-main-100 max-w-[760px] p-5 md:px-10 md:py-14 rounded-[20px] md:rounded-[40px] max-[900px]:max-w-[90%] max-[900px]:relative max-[450px]:max-w-full z-10 -top-20">
          <div className="flex flex-col gap-2 md:gap-4">
            <h2 className="text-h2">{props.title}</h2>
            <p className="text-base md:text-[22px] md:leading-8 text-main-200 font-roboto">
              {props.text}
            </p>
          </div>
          {props.tags && (
            <p className="flex gap-2.5">
              {props.tags.map((tag: string, indx: number) => (
                <span
                  key={indx}
                  className="px-3 py-1.5 md:px-4 md:py-2 border rounded-full text-base md:text-[22px] border-main-300 text-main-300"
                >
                  {tag}
                </span>
              ))}
            </p>
          )}
        </div>

        <div className="flex-2 max-[900px]:w-[90%] max-[450px]:w-full">
          <Image
            className="w-full h-full rounded-[40px] min-w-[343px] max-[370px]:min-w-[300px] max-w-[536px] max-[900px]:h-[416px] max-[900px]:max-w-full"
            priority
            src={props.sort ? userImage2 : userImage1}
            alt="Picture of the author"
          />
        </div>
      </div>
    </>
  );
}

export default Info;
