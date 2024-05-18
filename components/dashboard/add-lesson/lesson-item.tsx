import clsx from "clsx";
import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";
import { useRouter } from "next/navigation";

interface Props {
    type: 'create' | 'item',
    link: any,
    lang?: string,
    value?: {
        title: any,
        number: number
    }
}

const LessonItem: React.FC<Props> = ({ type, link, value = { title: {}, number: 0 }, lang }) => {

    return (
        <Link href={link} className={clsx("rounded-2xl p-4 flex items-center justify-start gap-3", type === 'item' && 'bg-white', type === 'create' && 'border-dashed border-2')}>
            <div className={clsx('rounded-xl w-[60px] h-[60px] flex items-center justify-center', type === 'item' && 'bg-csneutral-100', type === 'create' && 'bg-white')}>
                {type === 'create' ? <CiCirclePlus className="w-7 h-7" /> : <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2c1.845 0 3.33 0 4.54.088L13.1 7.25H8.4L11.9 2zM3.464 3.464c1.253-1.252 3.158-1.433 6.632-1.46L6.599 7.25H2.104c.147-1.764.503-2.928 1.36-3.786" /><path fill="currentColor" fillRule="evenodd" d="M2 12c0-1.237 0-2.311.026-3.25h19.948C22 9.689 22 10.763 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12m11.014.585C14.338 13.44 15 13.867 15 14.5s-.662 1.06-1.986 1.915c-1.342.866-2.013 1.299-2.514.98c-.5-.317-.5-1.176-.5-2.895s0-2.578.5-2.896c.5-.318 1.172.115 2.514.981" clipRule="evenodd" /><path fill="currentColor" d="M21.896 7.25c-.147-1.764-.503-2.928-1.36-3.786c-.598-.597-1.344-.95-2.337-1.16L14.9 7.25z" /></svg>}
            </div>
            {
                type === 'item' ?
                    <div className="flex flex-col text-csneutral-500">
                        <p className="text-base font-normal">{lang === 'ru' ? `Урок ${value?.number + 1}` : `${value?.number + 1}-dars`}</p>
                        <h1 className="text-[22px] font-medium">{lang === 'ru' ? value?.title.titleRu : value?.title.titleUz}</h1>
                    </div> : <h1 className="text-[22px] font-medium">
                        {lang === 'ru' ? 'Добавить урок' : 'Dars Qo\'shish'}
                    </h1>
            }
        </Link >
    );
};

export default LessonItem;