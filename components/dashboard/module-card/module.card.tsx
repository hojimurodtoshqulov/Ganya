import Image from "next/image";
import { ImageIcon } from "lucide-react";

interface ModulesProps {
  data?: any;
}


// w-full max-h-44 md:max-h-72

const Modules: React.FC<ModulesProps> = ({ data }) => {
  const totalModules = data?.Module.length;
  return (
    <div className="flex flex-col gap-5">
      <div className="h-44 md:h-72 relative">
        {data?.image ? (
          <Image
            src={data?.image}
            alt={data?.descriptionRu}
            className="object-cover overflow-hidden rounded-2xl w-auto h-auto"
            fill={true}
          />
        ) : (
          <span
            className="rounded-[20px] bg-white flex  items-center justify-center h-full xl:rounded-[40px] w-full md:w-auto overflow-hidden"
          >
            <ImageIcon />
          </span>
        )}
      </div>

      <div className="p-4 lg:p-6   w-full  overflow-hidden rounded-2xl bg-white">
        <h1 className="text-[26px] text-main-300 pb-4">
          {data?.titleRu}
        </h1>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-5  relative">
          {data?.Module?.map((item: any, index: any) => (
            <div key={item?.id}>
              <div
                className={` md:border-b-0 md:my-4 border-csneutral-200 ${index % 2 === 1 ? "md:border-l  md:pl-5 border-csneutral-200" : ""}  ${index < totalModules - 1 ? "border-b  pb-3 md:pb-0" : "border-b-0"}`}
              >
                <h3 className="md:text-lg mb-3 text-main-300 font-bold font-comfortaa">
                  {item?.titleRu}
                </h3>
                <p className="text-sm text-csneutral-500 font-normal">
                  {item?.descriptionRu}
                </p>
              </div>
              {index % 2 === 1 &&
                (index < totalModules - 2 || index < totalModules - 1) ? (
                <span className=" my-3 md:absolute  right-0 h-[1px] w-[100%] bg-csneutral-200"></span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modules;
