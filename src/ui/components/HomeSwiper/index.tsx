"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore from "swiper";
import Image from "next/image";

SwiperCore.use([Navigation, Autoplay]);
const HomeSwiper = ({ swiperRef }: any) => {
  const breakpoints = {
    768: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
  };

  return (
    <Swiper
      breakpoints={breakpoints}
      spaceBetween={50}
      ref={swiperRef}
      slidesPerView={1}
      scrollbar={{ draggable: true }}
      autoplay={{ delay: 5000 }}
      loop={true}
      className="h-full w-full "
    >
      {[0, 2, 3, 4, 5, 5].map((item, i) => (
        <SwiperSlide key={i} className="h-full w-full relative overflow-hidden">
          <div className="bg-black absolute bottom-0 right-0 w-[95%] dark:bg-white rounded-[60px] h-full lg:h-[95%] overflow-hidden"></div>
          <div className="absolute bottom-[3%] right-[5%] w-[95%] h-[95%] ">
            <div className="relative h-full">
              <Image
                src={
                  "https://firebasestorage.googleapis.com/v0/b/groooh-com.appspot.com/o/logos%2Fslide-1.jpg?alt=media&token=331dca77-447a-47c1-bb32-c8dab5920652"
                }
                alt=""
                className="object-center rounded-[40px] w-full h-full"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeSwiper;
