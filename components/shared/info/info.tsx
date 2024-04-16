import Image from "next/image";
import userImage from "@/images/IMG_0574 1.jpg";

interface InfoProps {
    title: string;
    text: string;
    tags?: string[];
    sort?: boolean;
}

function Info(props: InfoProps): JSX.Element {
    return <div className={`flex ${props.sort ? 'flex-row-reverse' : 'flex-row'} w-full mx-auto px-6 max-[450px]:px-3 mb-10 max-[900px]:mb-0 gap-8 max-[900px]:gap-0 justify-between max-[900px]:items-center h-auto max-[900px]:flex-col-reverse`}>

        <div className=" flex flex-col justify-between flex-3 max-[900px]:flex-auto gap-4 bg-main-100 max-w-[760px] px-10 py-[60px] rounded-[40px] max-[900px]:max-w-[90%] max-[900px]:relative max-[450px]:max-w-full z-10" style={{top:"-80px"}}>
            <div className="flex flex-col gap-4">
                <h2 className="text-h2  leading-[56px]">{props.title}</h2>
                <p className="text-[22px] leading-8 text-main-200 font-roboto">{props.text}</p>
            </div>
            {props.tags &&
                (<p className="flex gap-2.5 flex-wrap">{props.tags.map((tag: string, indx: number) => (
                <span key={indx} className="px-4 py-2 border rounded-[30px] text-[22px] leading-8 border-main-300">{tag}</span>
            ))}</p>)}
        </div>

        <div className="flex-2 max-[900px]:w-[90%] max-[450px]:w-full">
            <Image
                className="w-full h-full rounded-[40px] min-w-[343px] max-[370px]:min-w-[300px] max-w-[536px] max-[900px]:h-[416px] max-[900px]:max-w-full"
                priority
                src={userImage}
                alt="Picture of the author"
            />
        </div>
    </div>;
}

export default Info;

