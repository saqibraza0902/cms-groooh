import { ButtonLayout } from "@/ui/components/AnimatedButton";
import BlueContentBox from "@/ui/components/BlueContentBox";
import ContentBox from "@/ui/components/ContentBox";
import HomeSwiper from "@/ui/components/HomeSwiper";
import { IHeroSection } from "@/utils/types";
import React from "react";

interface IProp {
  hero: IHeroSection;
}
const HomeSection = ({ hero }: IProp) => {
  return (
    <>
      <div className="h-screen lg:h-[50vh] xl:h-[80vh] 2xl:h-[60vh] flex flex-col lg:flex-row gap-14 w-full 2xl:w-[90%]">
        <div className="pl-4 pr-9 lg:pr-0 lg:pl-0 lg:w-9/12">
          <ContentBox
            className="!bg-primary w-full p-0"
            childClass="!bg-secondary dark:!bg-secondary"
          >
            <div className="w-full flex gap-14 lg:gap-5 flex-col justify-center items-start p-10 h-full ">
              <p className="font-extrabold z-40 w-full text-center lg:text-left text-3xl lg:text-6xl font-SuisseBold xl:text-[80px] lg:leading-[100px] text-black uppercase ">
                {hero?.text1}
              </p>
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
                  <ButtonLayout>Lets Talk</ButtonLayout>
                </div>
              </div>
            </div>
          </ContentBox>
        </div>
        <div className="md:w-1/2 w-full mx-auto xl:w-4/12   rounded-[60px] h-full  xl:h-[107%] relative ">
          <div className="w-full flex px-4 lg:px-0 justify-start items-start h-full  absolute xl:-top-5 right-0">
            <HomeSwiper />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeSection;
