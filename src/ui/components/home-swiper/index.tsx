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
  const images = [
    "https://firebasestorage.googleapis.com/v0/b/groooh-com.appspot.com/o/slide1.png?alt=media&token=1c6e6a9b-90ac-48c1-9ecd-5e737d7e91a9",
    "https://firebasestorage.googleapis.com/v0/b/groooh-com.appspot.com/o/slide2.png?alt=media&token=686e095e-fd68-48d9-81c2-8cc685ee4423",
    "https://firebasestorage.googleapis.com/v0/b/groooh-com.appspot.com/o/slide3.png?alt=media&token=4915dd73-06df-4652-a512-1dd90bf39ec7",
  ];
  const breakpoints = {
    768: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
  };

  return (
    <Swiper
      direction="vertical"
      breakpoints={breakpoints}
      spaceBetween={50}
      ref={swiperRef}
      slidesPerView={1}
      scrollbar={{ draggable: true }}
      autoplay={{ delay: 5000 }}
      loop={true}
      className="h-full w-full lg:h-[102%]"
    >
      {images.map((item, i) => (
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
