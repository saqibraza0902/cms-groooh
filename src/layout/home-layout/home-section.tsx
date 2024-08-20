import { ButtonLayout } from "@/ui/components/animated-button";
import ContentBox from "@/ui/components/content-box";
import HomeSwiper from "@/ui/components/home-swiper";
import { IHeroSection } from "@/utils/types";
import React from "react";
import AnimatedText from "./animate-text";

interface IProp {
  hero: IHeroSection;
}
const HomeSection = ({ hero }: IProp) => {
  return (
    <div className="h-full flex justify-center flex-col gap-10 sm:items-center md:flex-row md:px-14 ">
      <div className="h-full w-full pr-9 pl-4 sm:w-2/3 md:w-7/12 md:pl-0 md:pr-0 lg:w-2/3 xl:w-8/12 xl:h-[99%] 2xl:h-4/6 2xl:w-7/12">
        <ContentBox
          className="!bg-primary p-0 "
          childClass="!bg-secondary dark:!bg-secondary  "
        >
          <div className="w-full flex gap-14 lg:gap-5 flex-col justify-center items-start p-10 h-full ">
            <AnimatedText />
            <div className="flex flex-col gap-5  lg:flex-row w-full justify-between lg:gap-0 items-center">
              <div className="hidden lg:flex text-black items-center w-5/6 2xl:w-full justify-between">
                <span className=" w-1/4 font-SuisseBold lg:text-[50px]">
                  {hero?.text2}
                </span>
                <span className="text-xl  w-3/4 2xl:text-3xl font-SuisseMedium ">
                  {hero?.text3}
                </span>
              </div>
              <div className="flex text-black lg:hidden">
                <span className="text-lg text-center  font-SuisseMedium ">
                  7Y OF TEST DRIVEN PRODUCTION DEVELOPMENT
                </span>
              </div>
              <div className="lg:w-1/6  text-black uppercase lg:mr-20 xl:mr-10">
                <ButtonLayout className="min-w-36">Lets Talk</ButtonLayout>
              </div>
            </div>
          </div>
        </ContentBox>
      </div>
      <div className="h-7k w-full px-4 sm:w-2/3 md:h-6.6k md:w-5/12 md:px-0 lg:w-1/3 lg:h-6.7k xl:w-4/12 2xl:w-3/12">
        <HomeSwiper />
      </div>
    </div>
  );
};

export default HomeSection;
