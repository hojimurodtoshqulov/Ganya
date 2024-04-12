import Image from "next/image";

interface InfoProps {
    title: string;
    text: string;
    tags?: string[];
    url: string;
    sort?: boolean;
}

function Info(props: InfoProps): JSX.Element {
    return <div className={`flex ${props.sort ? 'flex-row-reverse' : 'flex-row'} justify-between gap-8 w-full mx-auto px-6 mb-10  max-h-[650px]`}>
        <div className=" flex flex-col justify-between flex-3 bg-main-100 max-w-[760px] px-10 py-[60px] rounded-[40px]">
            <div className="flex flex-col gap-4">
                <h2 className="text-h2 leading-14">{props.title}</h2>
                <p className="text-[22px] leading-8 text-main-200">{props.text}</p>
            </div>
            <p className="flex gap-2.5 flex-wrap">{props.tags && props.tags.map((tag: string, indx: number) => (
                <span key={indx} className="px-4 py-2 border rounded-[30px] text-[22px] leading-8 border-main-300">{tag}</span>
            ))}</p>
        </div>
        <div className="max-w-[536px] flex-2">
            {/* <img src={props.url} alt="user" className="w-full h-full object-cover rounded-[40px]" /> */}
            <Image
                src="@/image/user.jfif"
                width={500}
                height={500}
                sizes="100% , 100%"
                alt="Picture of the author"
            />
        </div>
    </div>;
}

export default Info;

