"use client";
import { FC, JSX, ReactNode, useEffect, useRef, useState } from "react";
// import { useWindowSize } from "@/hooks";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  title: string;
}

const Carousel: FC<Props> = ({ children, title }): JSX.Element => {
  const swiperRef = useRef<SwiperType>();
  const [sliderPerView, setSliderPerView] = useState(3);

  // const { width } = useWindowSize();

  // useEffect(() => {
  //   if (width < 768) {
  //     setSliderPerView(1);
  //   } else if (width < 1268) {
  //     setSliderPerView(2);
  //   } else setSliderPerView(3);
  // }, [width]);

  return (
    <section className="container">
      <div className="pb-3 border-b border-peach flex justify-between items-center">
        <h2 className="text-h1">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant={"main"}
            size={"icon"}
            id="portfolio-left"
            aria-label="left button"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ArrowLeft />
          </Button>
          <Button
            variant={"main"}
            size={"icon"}
            id="portfolio-right"
            aria-label="right button"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>

      <div className="pt-5 md:pt-10">
        <Swiper
          spaceBetween={"24px"}
          slidesPerView={sliderPerView}
          loop
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {/* {[1, 2, 3, 4, 5].map((item) => (
            <SwiperSlide key={item}>
              <div className="w-full aspect-square bg-csneutral-500">
                {item}
              </div>
            </SwiperSlide>
          ))} */}
          {children}
        </Swiper>
      </div>
    </section>
  );
};

export default Carousel;
