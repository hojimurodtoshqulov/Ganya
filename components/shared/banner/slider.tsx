"use client";
import Image from "next/image";
import { FC } from "react";
import "swiper/css";
import "swiper/effect-utils";
import "swiper/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import {} from "swiper";
interface Props {
  data: { imageWeb: string; imageMobile: string; link: string; id: string }[];
}

const Slider: FC<Props> = ({ data }): JSX.Element => {
  return (
    <Swiper slidesPerView={1} loop autoplay>
      {data.map(({ imageWeb, imageMobile, link, id }) => (
        <SwiperSlide className="h-full" key={id}>
          <a
            href={link}
            target="_blank"
            className="w-full bg-csneutral-100 rounded-2xl md:rounded-[40px] aspect-[343/164] md:aspect-[1320/328] relative overflow-hidden block"
          >
            <Image
              src={imageWeb}
              fill
              alt="image"
              className="object-cover hidden md:block"
            />
            <Image
              src={imageMobile}
              fill
              alt="image"
              className="object-cover block md:hidden"
            />
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
