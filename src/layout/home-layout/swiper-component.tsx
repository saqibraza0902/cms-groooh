// SwiperComponent.js
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore from "swiper";
import Image from "next/image";
SwiperCore.use([Navigation]);

export const WorkSlider = ({ swiperRef, data }: any) => {
  const breakpoints = {
    768: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
  };

  return (
    <Swiper
      breakpoints={breakpoints}
      spaceBetween={5}
      ref={swiperRef}
      slidesPerView={1}
      allowTouchMove={false}
      pagination={{ clickable: false }}
      scrollbar={{ draggable: true }}
      autoplay={{ delay: 5000 }}
      loop={true}
      className="h-full w-full"
    >
      {data?.map((item: any, i: number) => (
        <SwiperSlide
          key={i}
          className="h-full cursor-pointer  bg-black rounded-t-3xl lg:rounded-3xl w-full"
        >
          <Image
            height={1200}
            width={1200}
            className="h-full w-full hover:opacity-70 !transition-all cursor-pointer !duration-700 min-h-[400px] lg:minh-full object-cover rounded-t-3xl lg:rounded-3xl "
            src={item.gallery[0]?.url}
            alt={item.gallery[0]?.alt}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export const WorkContentSlider = ({ swiperRef, data }: any) => {
  const breakpoints = {
    768: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
  };

  return (
    <Swiper
      breakpoints={breakpoints}
      spaceBetween={5}
      ref={swiperRef}
      allowTouchMove={false}
      slidesPerView={1}
      pagination={{ clickable: false }}
      autoplay={{ delay: 5000 }}
      loop={true}
      className="h-full"
    >
      {data?.map((item: any, i: number) => (
        <SwiperSlide key={i} className="h-full">
          <div className="w-full">
            <div className="  text-white gap-2 p-3 ">
              <h3 className="text-xl line-clamp-1 font-SuisseSemiBold">
                {item?.title}
              </h3>
              <p className="line-clamp-2">{item?.desc}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
