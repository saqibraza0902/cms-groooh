"use client";
import {
  SliderLeftButton,
  SliderRightButton,
} from "@/ui/components/AnimatedButton";
import React, { useRef } from "react";
import { RatingSwiper } from "@/ui/components/RatingSwiper";
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
    <>
      <div className="w-full lg:w-5/12 xl:w-3/12  flex flex-row justify-between items-center lg:items-start lg:px-0 lg:justify-end lg:flex-col 2xl:justify-end  text-white">
        <div className="lg:w-1/2 flex px-4 lg:px-0 flex-col">
          <span className="text-4xl font-SuisseBold text-white">4.9</span>
          <span className="text-3xl  text-white font-SuisseMedium">
            {rating?.title}
          </span>
        </div>
        <div className="flex gap-10 px-4 lg:px-0 lg:mt-6">
          <span onClick={prevSlide} className="cursor-pointer">
            <SliderLeftButton />
          </span>
          <span onClick={nextSlide} className="cursor-pointer">
            <SliderRightButton />
          </span>
        </div>
      </div>
      <div className="w-full lg:w-8/12 xl:w-9/12 flex items-center justify-center  h-full">
        <RatingSwiper
          array={rating?.ratings}
          swiperRef={swiperRef}
          onNextSlide={nextSlide}
          onPrevSlide={prevSlide}
        />
      </div>
    </>
  );
};

export default RatingSection;
