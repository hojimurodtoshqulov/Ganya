"use client";

import React, { useEffect, useRef, useState } from "react";
import { useWindowSize } from "@/lib/hooks";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

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
    if (width < 660) {
      setSliderPerView(1.2);
    } else if (width < 820) {
      setSliderPerView(2.2);
    } else if (width < 1020) {
      setSliderPerView(3.2);
    } else {
      setSliderPerView(4);
    }
  }, [width]);

  return (
    <div className="pt-5 md:pt-10 container">
      <h2 className="title text-h2 leading-[56px] mb-8">
        {dcitionary.home.Partners}
      </h2>
      <Swiper
        spaceBetween={"24px"}
        slidesPerView={sliderPerView}
        loop
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        <SwiperSlide className="h-full flex justify-center">
          <div className=" h-[160px] bg-main-100 rounded-3xl"></div>
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <div className=" h-[160px] bg-main-100 rounded-3xl"></div>
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <div className=" h-[160px] bg-main-100 rounded-3xl"></div>
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <div className=" h-[160px] bg-main-100 rounded-3xl"></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Partners;