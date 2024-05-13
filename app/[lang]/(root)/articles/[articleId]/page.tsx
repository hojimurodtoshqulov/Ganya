"use client";

import Stati from "@/components/shared/stati/stati";
import Heading from "@/components/ui/heading";
import { Articlsall } from "@/types/auth";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import images from "@/images/siblings-hero.png";

interface Props {
  params: {
    articleId: string;
  };
}

const SingleArticle: FC<Props> = ({ params }: Props): JSX.Element => {
  const [data, setData] = useState<Articlsall>();

  useEffect(() => {
    fetch(
      `https://oar-api.onrender.com/api/v1/articles/single/${params.articleId}`,
    )
      .then((res) => res.json())
      .then((json) => setData(json));
  }, [params?.articleId]);

  return (
    <div className="container">
      <div className="pt-32">
        <Image
          className="max-w[1320px] h-[328px] object-cover rounded-[40px]"
          src={images}
          width={1320}
          height={328}
          alt="images"
        />
      </div>

      <div className=" pt-28">
        <div className="flex justify-between gap-6">
          <div className="bg-">
            <Heading text={`${data?.titleUz}`} />
            <h2 className="font-normal text-[32px] leading-[44px] mb-4 font-comfortaa mt-8">
              Подзаголовок
            </h2>
            <p className="font-normal text-2xl text-[#585D65] max-w-[827px]">
              {`${data?.textUz}`} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. At iusto quia iste facere ullam. Ipsa magnam hic
              officia facilis sequi nisi animi illum accusantium vitae! Nisi,
              voluptas. Voluptas quae tempore quam suscipit! Ipsa exercitationem
              ratione quasi excepturi minima! Ea recusandae dicta dolorum
              repellat animi! Dolores, deserunt est numquam labore officia
              ipsum, consequuntur consequatur quae rem, vel harum reiciendis
              temporibus iure! Magni vitae dolor sit sequi quae ex veniam odit
              quo, vero, nam pariatur impedit temporibus excepturi error eaque
              delectus labore sunt nostrum beatae reprehenderit, ipsam alias
              molestiae a laudantium! Amet, ipsum vitae sequi perspiciatis eum
              animi eos officia repellendus dolore, hic, fugit deserunt
              assumenda facere a quis! Asperiores, dolorem omnis? Animi aliquid,
              obcaecati autem numquam nostrum consectetur quibusdam suscipit
              iure! Libero minima consectetur nemo laboriosam tempore neque cum
              consequuntur pariatur odit ipsa soluta, eius quod, ducimus
              corporis voluptate, quisquam unde! Ullam, nobis nisi dolor illum
              eum similique perspiciatis dolore! Ab culpa fuga unde quasi
              suscipit ducimus dolorem maiores temporibus provident ipsum,
              libero soluta cum quae nesciunt, ipsa pariatur nostrum explicabo
              ex. Voluptatibus qui libero quidem aliquam voluptatem quam
              necessitatibus fugiat minus animi tempore et facilis aliquid
              corporis consectetur optio blanditiis deserunt sit, soluta est
              mollitia. Recusandae aliquid quam, blanditiis in tempore labore
              officiis deserunt molestiae reiciendis fugit doloremque nobis,
              odio maiores eveniet sunt vel odit quo ex nam dolor optio
              praesentium tenetur voluptas? Tempore, dolorum voluptates beatae
              sed, illo accusantium dolor vitae maxime explicabo architecto
              saepe aliquid corporis magni veniam tempora nisi expedita dicta
              numquam asperiores deleniti, eum commodi! Eum omnis provident illo
              nostrum! Nisi, natus possimus? Ratione cum ad, minus dignissimos
              quibusdam sint, mollitia quasi laborum numquam ea autem doloremque
              voluptate aliquid? Quibusdam quis amet dolorum! Distinctio maiores
              ipsa, natus veritatis pariatur molestiae fugiat, vel atque nulla,
              dolores modi sunt voluptatibus. Esse sequi laboriosam eius, sunt
              cupiditate velit et.
            </p>
          </div>
          <Link className="w-[30%]" href={`${data?.link}`}>
            <Image
              src={data?.imageWeb}
              className="w-[424px] h-[620px] object-cover rounded-[40px]"
              width={424}
              height={620}
              alt="Image baner"
            />
          </Link>
        </div>
      </div>
      <div id="articles">
        <Stati />
      </div>
    </div>
  );
};

export default SingleArticle;
