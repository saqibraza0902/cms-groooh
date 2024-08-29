"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore from "swiper";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

SwiperCore.use([Navigation, Autoplay]);

interface IProp {
  slides: string[];
}
const HomeSwiper = ({ slides }: IProp) => {
  const breakpoints = {
    768: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
  };
  const isMd = useMediaQuery({
    query: "(min-width: 641px) and (max-width: 1023px)",
  });

  const isLgOrAbove = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  return (
    <Swiper
      direction={isMd || isLgOrAbove ? "vertical" : "horizontal"}
      breakpoints={breakpoints}
      spaceBetween={50}
      // speed={5000}
      slidesPerView={1}
      scrollbar={{ draggable: true }}
      autoplay={{ delay: 5000 }}
      loop={true}
      className="h-full w-full lg:h-[102%]"
    >
      {slides?.map((item, i) => (
        <SwiperSlide key={i} className="h-full w-full relative overflow-hidden">
          <Image
            src={item}
            alt=""
            className="object-center rounded-[40px] w-full h-full"
            layout="fill"
            objectFit="cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeSwiper;
