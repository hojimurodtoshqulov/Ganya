import Image from "next/image";
import SiblignsHero from "@/images/siblings-hero.png";

interface ModulesProps {}

const Modules: React.FC<ModulesProps> = ({}) => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <Image
          src={SiblignsHero}
          alt="salom"
          className=" object-cover overflow-hidden rounded-2xl w-full max-h-44 md:max-h-72"
        />
      </div>

      <div className="p-4 lg:p-6   w-full  overflow-hidden rounded-2xl bg-white">
        <h1 className="text-[26px] text-main-300 pb-4">
          Курс по грудному вскармливанию
        </h1>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-5">
          <div className="py-4 border-b border-csneutral-200  md:relative">
            <span className="md:absolute right-0 h-[80%] w-[2px] bg-csneutral-200"></span>
            {/* 
                md:relative
                */}
            <h3 className="md:text-lg mb-4 text-main-300 font-bold font-comfortaa">
              Модуль 1
            </h3>
            <p className="text-sm text-csneutral-500 font-normal">
              Приглашает вас погрузиться в тему введения первого прикорма для
              вашего малыша и узнать основные принципы BLW (Baby-Led Weaning –
              введение прикорма под руководством ребенка)
            </p>
          </div>
          <div className="py-4 border-b border-csneutral-200">
            <h3 className="md:text-lg mb-4 text-main-300 font-bold font-comfortaa">
              Модуль 2
            </h3>
            <p className="text-sm text-csneutral-500 font-normal">
              Посвящен формированию пищевого интереса у вашего малыша, помогая
              вам создать здоровые пищевые привычки.
            </p>
          </div>

          {/* <span className="w-full h-[2px] bg-csneutral-200"></span> */}
          <div className="py-4 border-b border-csneutral-200 md:relative">
            <span className="md:absolute right-0 h-[80%] w-[2px] bg-csneutral-200"></span>

            <h3 className="md:text-lg mb-4 text-main-300 font-bold font-comfortaa">
              Модуль 3
            </h3>
            <p className="text-sm text-csneutral-500 font-normal">
              Предлагает всесторонний анализ аллергии и ценную информацию,
              предоставленную врачом-аллергологом.
            </p>
          </div>
          <div className="py-4 border-b border-csneutral-200">
            <h3 className="md:text-lg mb-4 text-main-300 font-bold font-comfortaa">
              Модуль 4
            </h3>
            <p className="text-sm text-csneutral-500 font-normal">
              Разработанный совместно с детским психологом, поможет разобраться
              в вопросах, связанных с малышами, которые могут испытывать
              трудности с пищей.
            </p>
          </div>
          <div className="py-4  border-csneutral-200 md:relative border-b md:border-b-0">
            <span className="md:absolute right-0 h-[80%] w-[2px] bg-csneutral-200"></span>

            <h3 className="md:text-lg mb-4 text-main-300 font-bold font-comfortaa">
              Модуль 5
            </h3>
            <p className="text-sm text-csneutral-500 font-normal">
              Приглашает вас отправиться на рынок вместе со мной, где я поделюсь
              советами о том, как выбирать лучшие продукты для вашего малыша.
            </p>
          </div>
          <div className="py-4  border-csneutral-200 ">
            <h3 className="md:text-lg mb-4 text-main-300 font-bold font-comfortaa">
              Модуль 6
            </h3>
            <p className="text-sm text-csneutral-500 font-normal">
              Бонусное видео от детского психолога, дарит ценные советы по уходу
              за малышом и созданию благоприятной пищевой среды для него.
            </p>
          </div>
        </div>

        {/* <div className="bg-main-100 rounded-3xl p-3 md:p-5 grid md:grid-rows-2 grid-rows-2 md:mt-8 mt-5 grid-flow-col gap-2 md:gap-4 justify-start items-center md:items-center h-[202px] sm:h-auto">
                    <Image src={childrensSchedule} alt="salom" className="md:row-span-3 row-span-1 col-span-1" width={69} height={86} />
                    <h4 className="text-lg font-normal text-main-300 row-span-1 col-start-2 col-span-4">Подарок для каждой участницы курса:</h4>
                    <h1 className="w-full font-comfortaa font-bold text-[20px] leading-6 sm:text-[22px] sm:leading-7 md:text-3xl text-main-300 row-span-2 col-start-1 col-span-4  md:row-span-2 md:col-span-2">Книга рецептов для малышей до года и тд</h1>
                </div> */}
      </div>
    </div>
  );
};

export default Modules;
