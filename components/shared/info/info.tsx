import Image from "next/image";
import userImage from "@/images/IMG_0574 1.jpg";

interface InfoProps {
    title: string;
    text: string;
    tags?: string[];
    sort?: boolean;
}

function Info(props: InfoProps): JSX.Element {
    return <div className={`flex ${props.sort ? 'flex-row-reverse' : 'flex-row'} justify-between gap-8 w-full mx-auto px-6 mb-10  max-h-[650px]`}>
        <div className=" flex flex-col justify-between flex-3 gap-4 bg-main-100 max-w-[760px] px-10 py-[60px] rounded-[40px]">
            <div className="flex flex-col gap-4">
                <h2 className="text-h2  leading-[56px]">{props.title}</h2>
                <p className="text-[22px] leading-8 text-main-200 font-roboto">{props.text}</p>
            </div>
            {props.tags &&
                (<p className="flex gap-2.5 flex-wrap">{props.tags.map((tag: string, indx: number) => (
                <span key={indx} className="px-4 py-2 border rounded-[30px] text-[22px] leading-8 border-main-300">{tag}</span>
            ))}</p>)}
        </div>
        <div className="max-w-[536px] flex-2">
            <Image
                className="w-full h-full rounded-[40px]"
                priority
                src={userImage}
                alt="Picture of the author"
            />
        </div>
    </div>;
}

export default Info;

