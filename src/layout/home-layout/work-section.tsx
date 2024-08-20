"use client";
import {
  SliderLeftButton,
  SliderRightButton,
} from "@/ui/components/animated-button";
import React, { useEffect, useRef, useState } from "react";
import { WorkContentSlider, WorkSlider } from "./swiper-component";
import { get_portfolios } from "@/utils/function";
import ContentBox from "@/ui/components/content-box";

interface IProp {
  title: string;
}
const WorkSection = ({ title }: IProp) => {
  const swiperRef = useRef<any>(null);
  const swiperRefs = useRef<any>(null);
  const [loading, setloading] = useState(false);
  const nextSlide = () => {
    if (
      swiperRef.current &&
      swiperRef.current.swiper &&
      swiperRefs.current &&
      swiperRefs.current.swiper
    ) {
      swiperRef.current.swiper.slideNext();
      swiperRefs.current.swiper.slideNext();
    }
  };

  const prevSlide = () => {
    if (
      swiperRef.current &&
      swiperRef.current.swiper &&
      swiperRefs.current &&
      swiperRefs.current.swiper
    ) {
      swiperRef.current.swiper.slidePrev();
      swiperRefs.current.swiper.slidePrev();
    }
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    const get_data = async () => {
      try {
        setloading(true);
        const newposts = await get_portfolios();
        console.log(newposts);
        setloading(false);
        setData(newposts);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };
    get_data();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <ContentBox className="bg-primary" childClass="!bg-secondary">
      <div className="flex flex-col-reverse z-0 h-full lg:flex-row relative p-5 lg:gap-5">
        <div className="lg:w-1/2 h-full flex 2xl:justify-end flex-col z-40  -mt-12 md:mt-0 gap-4">
          <h2 className="text-4xl hidden lg:flex w-1/12 lg:text-[70px] font-SuisseBold lg:leading-[65px] text-black ">
            {title}
          </h2>
          <div className=" bg-black flex p-3 flex-col w-full rounded-[40px] ">
            <div>
              <WorkContentSlider
                data={data}
                swiperRef={swiperRefs}
                onNextSlide={nextSlide}
                onPrevSlide={prevSlide}
              />
            </div>
            <div className="flex gap-10 ">
              <span onClick={prevSlide} className="cursor-pointer">
                <SliderLeftButton />
              </span>
              <span onClick={nextSlide} className="cursor-pointer">
                <SliderRightButton />
              </span>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 lg:pr-4 z-0">
          <h2 className="text-4xl flex lg:hidden w-1/12 lg:text-[70px] font-SuisseBold lg:leading-[65px] text-black ">
            {title}
          </h2>
          <WorkSlider
            data={data}
            swiperRef={swiperRef}
            onNextSlide={nextSlide}
            onPrevSlide={prevSlide}
          />
        </div>
      </div>
    </ContentBox>
  );
};

export default WorkSection;
