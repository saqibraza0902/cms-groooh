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
  slides: {
    text: string;
    image: string;
  }[];
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
        <SwiperSlide
          key={i}
          className="h-full w-full relative group cursor-pointer overflow-hidden"
        >
          <Image
            src={item.image}
            alt=""
            className="object-center rounded-[40px] w-full h-full"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute -bottom-32 group-hover:bottom-0 h-28 bg-gradient-to-b from-transparent to-black flex flex-col justify-end p-7 group-hover:h-full gap-3 transition-all duration-300 text-white rounded-[40px] w-full">
            <p className=" font-SuisseBold text-2xl">{item.text}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeSwiper;
