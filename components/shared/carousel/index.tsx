"use client";
import { FC, JSX, ReactNode, useEffect, useRef, useState } from "react";
import { useWindowSize } from "@/lib/hooks";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  data: any[];
}

const Carousel: FC<Props> = ({ title, data }): JSX.Element => {
  const swiperRef = useRef<SwiperType>();
  const [sliderPerView, setSliderPerView] = useState(3);

  const { width } = useWindowSize();

  useEffect(() => {
    if (width < 660) {
      setSliderPerView(1.2);
    } else if (width < 1024) {
      setSliderPerView(2.2);
    } else setSliderPerView(3);
  }, [width]);

  return (
    <>
      <div className="pb-3 flex justify-between items-center">
        <h2 className="text-h1">{title}</h2>
        <div className="hidden sm:flex gap-2">
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
          autoplay
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {data.map((item, i) => (
            <SwiperSlide className="h-full" key={i}>
              {item}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Carousel;
