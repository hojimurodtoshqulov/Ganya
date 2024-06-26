"use client";

import React, { useEffect, useRef, useState } from "react";
import { useWindowSize } from "@/lib/hooks";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import image1 from "@/images/Partners1.jpg";
import image2 from "@/images/Partners2.jpg";
import image3 from "@/images/partners3.png";
import Image from "next/image";

interface Props {
  title: string;
  data: any[];
}

interface partners {
  lang: "ru" | "uz";
  dcitionary: any;
}

const Partners = ({ dcitionary }: partners) => {
  const swiperRef = useRef<SwiperType>();
  const [sliderPerView, setSliderPerView] = useState(4);

  const { width } = useWindowSize();

  useEffect(() => {
    if (width < 600) {
      setSliderPerView(1);
    } else if (width < 820) {
      setSliderPerView(2.2);
    } else if (width < 1020) {
      setSliderPerView(3.2);
    } else {
      setSliderPerView(4);
    }
  }, [width]);

  const data = [
    {
      id: 1,
      file: image1,
    },
    {
      id: 2,
      file: image3,
    },
    // {
    //   id: 3,
    //   file: image2,
    // },
    // {
    //   id: 4,
    //   file: image3,
    // },
    {
      id: 5,
      file: image1,
    },
    {
      id: 6,
      file: image3,
    },
    // {
    //   id: 7,
    //   file: image2,
    // },
    // {
    //   id: 8,
    //   file: image3,
    // },
  ];

  return (
    <div className="pt-5 md:pt-10 container">
      <h2 className="title text-h2 leading-[56px] mb-8">
        {dcitionary.home.Partners}
      </h2>
      <Swiper
        spaceBetween={"20px"}
        slidesPerView={sliderPerView}
        loop
        autoplay
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {[...data, ...data].map((element) => (
          <SwiperSlide
            key={element.id}
            className="aspect-[3/2] flex justify-center"
          >
            <Link href={"/"} className="block relative w-full h-full">
              <Image
                className="w-full object-cover"
                src={element.file}
                fill
                alt="Partners images logo"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Partners;
