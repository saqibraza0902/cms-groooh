import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore from "swiper";
import { FaStar } from "react-icons/fa6";
import ContentBox from "../content-box";
SwiperCore.use([Navigation]);

export const SwiperComponent = ({ swiperRef, children }: any) => {
  const breakpoints = {
    768: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    1280: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    1536: {
      slidesPerView: 2.5,
      spaceBetween: 10,
    },
  };

  return (
    <Swiper
      breakpoints={breakpoints}
      spaceBetween={5}
      ref={swiperRef}
      pagination={{ clickable: false }}
      scrollbar={{ draggable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
      className="h-full 2xl:h-[90vh]"
    >
      {children}
      {/* {array?.map((item: any, i: number) => (
        <SwiperSlide key={i} className="h-full pl-4 pr-9 py-10">
          <ContentBox className="!h-full">
          {children}
          </ContentBox>
        </SwiperSlide>
      ))} */}
    </Swiper>
  );
};
