import Image from "next/image";
import SiblingsHero from "@/images/siblings-hero.png";

interface ModuleCardProps {
  title: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title }) => {
  return (
    <div className="rounded-[18px] bg-white overflow-hidden w-full h-full flex flex-col">
      <div className="w-full aspect-[9/5] relative">
        <Image src={SiblingsHero} alt="image" className="object-cover" fill />
      </div>
      <div className="w-full h-fit p-4 pt-2 gap-2 flex flex-col justify-between grow">
        <h1 className="text-lg font-semibold">{title}</h1>
        <div className="flex flex-col ">
          <h3 className="text-lg text-main-300 font-semibold">650.000 UZS</h3>
          <p className="text-xs font-normal mt-1">24 видео уроков</p>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
