import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore from "swiper";
import { FaStar } from "react-icons/fa6";
import ContentBox from "../content-box";
SwiperCore.use([Navigation]);

export const RatingSwiper = ({ swiperRef, array }: any) => {
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
      slidesPerView: 3,
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
      loop={false}
      className="h-full w-full !py-5"
    >
      {array?.map((item: any, i: number) => (
        <SwiperSlide key={i} className="!h-6k pl-4 w-full pr-9 ">
          <ContentBox>
            <div className="w-full flex flex-col justify-center  gap-1 h-full min-h-full">
              <div className="flex items-center h-1/6 gap-4">
                <p className="!text-black text-xl font-bold">{item.rating}</p>
                <span className="flex gap-1">
                  {[0, 1, 2, 3].map((i) => (
                    <FaStar color="#FDC448" key={i} />
                  ))}
                </span>
              </div>
              <div className="h-[0.1px] my-6 w-full bg-black" />
              <div className="!h-full">
                <p className="text-lg text-black line-clamp-[12]  font-bold h-full">
                  {item.review}
                </p>
              </div>
              <div className="flex items-center h-1/6 mt-8 gap-3">
                <div className="h-12 w-12 bg-slate-400 rounded-full" />
                <div className="flex flex-col dark:text-white">
                  <span className="text-sm font-semibold text-black">
                    {item.clientName}
                  </span>
                  <span className="text-xs font-medium dark:text-[#ccc]">
                    {item.clientDescription}
                  </span>
                </div>
              </div>
            </div>
          </ContentBox>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
