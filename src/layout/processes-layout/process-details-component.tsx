"use client";
import {
  SliderLeftButton,
  SliderRightButton,
} from "@/ui/components/animated-button";
import React, { useRef, useState } from "react";
import { SwiperSlide } from "swiper/react";
import ContentBox from "@/ui/components/content-box";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/utils/styles";
import { SwiperComponent } from "@/ui/components/swiper-component";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import { IProcess } from "@/utils/types";

interface IProp {
  prop: IProcess;
}
const ProcessesDetailsSection = ({ prop }: IProp) => {
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
  const [hoverStates, setHoverStates] = useState(
    Array(prop.processes.length).fill(false)
  );

  const handleMouseEnter = (index: number) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = true;
    setHoverStates(newHoverStates);
  };

  const handleMouseLeave = (index: number) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = false;
    setHoverStates(newHoverStates);
  };
  return (
    <div className="w-full h-full 2xl:w-[85%] flex flex-col lg:flex-row mx-auto">
      <div className="w-full lg:w-5/12 xl:w-3/12  flex flex-row justify-between items-center lg:items-start lg:px-0 lg:justify-end lg:flex-col 2xl:justify-end  text-white">
        <div className="lg:w-1/2 flex pl-6 lg:px-0 flex-col">
          <span className="text-3xl  text-black font-SuisseMedium">
            {prop.title}
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
      <div className="w-full lg:w-8/12 xl:w-9/12 flex items-center justify-center  ">
        <SwiperComponent
          swiperRef={swiperRef}
          onNextSlide={nextSlide}
          onPrevSlide={prevSlide}
        >
          {prop?.processes?.map((el, i: number) => (
            <SwiperSlide key={i} className="h-full pl-6 pr-11 py-10">
              <ContentBox className="!px-0">
                <div className="w-full flex flex-col justify-center  gap-1 h-full min-h-full">
                  <div className="bg-white w-full h-96 rounded-2xl flex flex-col justify-between items-center relative">
                    <div className="relative z-10 w-full h-full flex justify-center items-center">
                      <Image src={el.image} alt="" width={150} height={150} />
                    </div>

                    <div
                      className={cn(
                        `group absolute inset-0 z-20 cursor-pointer overflow-hidden`
                      )}
                    >
                      <span className=" bottom-28 z-50 fixed right-14">
                        {hoverStates[i] === true ? (
                          <BiMinusCircle
                            size={30}
                            color="#000"
                            onClick={() => handleMouseLeave(i)}
                          />
                        ) : (
                          <BiPlusCircle
                            size={30}
                            color="#000"
                            onClick={() => handleMouseEnter(i)}
                          />
                        )}
                      </span>
                      <motion.div
                        initial={{ y: "83%" }}
                        animate={{ y: hoverStates[i] ? "0%" : "83%" }}
                        transition={{ duration: 0.3 }}
                        className=" w-10/12 mx-auto rounded-2xl bg-white text-black overflow-hidden flex-col h-full flex "
                      >
                        <p className="font-SuisseSemiBold w-11/12 text-2xl">
                          {el.title}
                        </p>
                        <p className="text-justify mt-7 font-Suisse">
                          {el.description}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </ContentBox>
            </SwiperSlide>
          ))}
        </SwiperComponent>
      </div>
    </div>
  );
};

export default ProcessesDetailsSection;
