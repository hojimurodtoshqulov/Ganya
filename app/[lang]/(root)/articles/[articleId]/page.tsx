import Stati from "@/components/shared/stati/stati";
import Heading from "@/components/ui/heading";
import { FC } from "react";

interface Props {
  params: {
    atricleId: string;
  };
}

const SingleArticle: FC<Props> = ({ params: { atricleId } }): JSX.Element => {
  return (
    <div className="mt-20">
      <div className="container">
        <Heading text="Роды в Lapino. Как это было?" />
        <h2 className="font-normal text-[32px] leading-[44px] mb-4 font-comfortaa mt-8">
          Подзаголовок
        </h2>
        <p className="font-normal text-2xl text-[#585D65]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet odio
          mollitia impedit provident aperiam laboriosam sunt consequuntur nobis
          eius itaque, harum fugiat officiis quas? Quisquam ipsum assumenda
          doloribus ab unde? Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Amet odio mollitia impedit provident aperiam laboriosam sunt
          consequuntur nobis eius itaque, harum fugiat officiis quas? Quisquam
          ipsum assumenda doloribus ab unde? Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Amet odio mollitia impedit provident
          aperiam laboriosam sunt consequuntur nobis eius itaque, harum fugiat
          officiis quas? Quisquam ipsum assumenda doloribus ab unde? Lorem ipsum
          dolor sit amet, consectetur adipisicing elit. Amet odio mollitia
          impedit provident aperiam laboriosam sunt consequuntur nobis eius
          itaque, harum fugiat officiis quas? Quisquam ipsum assumenda doloribus
          ab unde?
        </p>
      </div>
      <div id="articles">
        <Stati />
      </div>
    </div>
  );
};

export default SingleArticle;
