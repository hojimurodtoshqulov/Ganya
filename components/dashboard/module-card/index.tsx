import Image from "next/image";
import SiblingsHero from '@/images/siblings-hero.png';

interface ModuleCardProps {
    title: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title }) => {
    const t = title ? title : 'Post-natal pilates';

    return (
        <div className="rounded-[18px] bg-white overflow-hidden pb-4 flex flex-col">
            <div className="w-full   md:max-h-36">
                <Image src={SiblingsHero} alt="salom" />
            </div>
            <div className="px-4 py-1 gap-2 flex flex-col justify-between grow">
                <h1 className="text-lg text-csneutral-500">{t}</h1>
                <div className="flex flex-col ">
                    <h1 className="text-lg text-main-300">650.000 UZS</h1>
                    <p className="text-xs text-csneutral-500">24 видео уроков</p>
                </div>
            </div>
        </div>
    );
}

export default ModuleCard;
