"use client";
import {
  SliderLeftButton,
  SliderRightButton,
} from "@/ui/components/animated-button";
import React, { useRef } from "react";
import { RatingSwiper } from "@/ui/components/rating-swiper";
import { IRating } from "@/utils/types";

interface IProp {
  rating: IRating;
}
const RatingSection = ({ rating }: IProp) => {
  const swiperRef = useRef<any>(null);

  const nextSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const prevSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  return (
    <div className="h-full flex flex-col md:flex-row ">
      <div className="flex flex-row justify-between items-center lg:items-start lg:justify-end lg:px-0 lg:flex-col  text-white">
        <div className="lg:w-1/2 flex pl-6 lg:px-0 flex-col">
          <span className="text-4xl font-SuisseBold text-black">4.9</span>
          <span className="text-3xl  text-black font-SuisseMedium">
            {rating?.title}
          </span>
        </div>
        <div className="flex gap-10 pr-6 lg:px-0 lg:mt-6">
          <span onClick={prevSlide} className="cursor-pointer">
            <SliderLeftButton
              item={{
                hoverBorder: "border-[#000]",
                iconColorA: "#000",
                iconColorB: "#fff",
                bg: "#000",
              }}
            />
          </span>
          <span onClick={nextSlide} className="cursor-pointer">
            <SliderRightButton
              item={{
                hoverBorder: "#000",
                iconColorA: "#000",
                iconColorB: "#fff",
                bg: "#000",
              }}
            />
          </span>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-8/12 xl:w-9/12 flex !items-end justify-end h-full">
        <div className="w-full xl:w-full 2xl:h-2/3  h-full">
          <RatingSwiper
            array={rating?.ratings}
            swiperRef={swiperRef}
            onNextSlide={nextSlide}
            onPrevSlide={prevSlide}
          />
        </div>
      </div>
    </div>
  );
};

export default RatingSection;
