// SwiperComponent.js
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore from "swiper";
import { useEffect } from "react";
import { SwiperNavButtons } from "./Slides";
import { FaStar } from "react-icons/fa6";
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
        <SwiperSlide key={i} className="h-full w-full">
          <img
            className="h-full  rounded-3xl"
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
              <h3 className="text-xl  font-SuisseSemiBold">{item?.title}</h3>
              <p>{item?.desc}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
