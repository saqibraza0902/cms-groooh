import { ButtonLayout } from "@/ui/components/animated-button";
import ContentBox from "@/ui/components/content-box";
import HomeSwiper from "@/ui/components/home-swiper";
import { IHomeHeroSection } from "@/utils/types";
import React from "react";
import AnimatedText from "./animate-text";
import Image from "next/image";
import Link from "next/link";
import { PUBLIC_URLS } from "@/utils/urls";

interface IProp {
  hero: IHomeHeroSection;
}
const HomeSection = ({ hero }: IProp) => {
  return (
    <div className="h-full flex justify-center flex-col gap-10 sm:items-center md:flex-row md:px-14 ">
      <div className="h-full w-full pr-11 pl-6 sm:w-2/3 md:w-7/12 md:pl-0 md:pr-0 lg:w-2/3 xl:w-8/12 xl:h-[99%] 2xl:h-[80%] 2xl:w-7/12">
        <ContentBox
          className="!bg-primary p-0 "
          childClass="!bg-secondary !p-0 dark:!bg-secondary  "
        >
          <div className="w-full flex gap-14 lg:gap-5 flex-col justify-center items-start p-10 h-full ">
            <AnimatedText
              images={hero.animatedimages}
              words={hero.animatedtext}
              statictext={hero.statictext}
            />
            <div className="flex flex-col gap-5  lg:flex-row w-full justify-between lg:gap-0 items-center">
              <div className="hidden lg:flex text-black items-center w-5/6 2xl:w-full justify-between">
                <span className=" w-1/4 font-SuisseBold lg:text-[50px]">
                  {hero?.bottomstatictext[0]}
                </span>
                <span className="text-xl  w-3/4 2xl:text-3xl uppercase font-SuisseMedium ">
                  {hero.bottomstatictext?.length > 0 &&
                    // @ts-ignore
                    hero?.bottomstatictext[1]}
                </span>
              </div>
              <div className="flex text-black lg:hidden">
                <span className="text-lg text-center uppercase font-SuisseMedium ">
                  {hero.bottomstatictext.map((el, i) => (
                    <span className="px-[1px]" key={i}>
                      {el}
                    </span>
                  ))}
                </span>
              </div>
              <Link
                href={PUBLIC_URLS.CONTACT}
                className="lg:w-1/6   lg:mr-20 xl:mr-8 2xl:mr-0"
              >
                <ButtonLayout
                  Icon={
                    <Image
                      alt=""
                      src="https://firebasestorage.googleapis.com/v0/b/groooh-com.appspot.com/o/navbar-icons%2FChat-Dot.svg?alt=media&token=7f7ae362-84ff-4e89-9fab-19b45ce9744d"
                      height={30}
                      width={30}
                    />
                  }
                  className="min-w-36 max-h-11"
                >
                  Lets Talk
                </ButtonLayout>
              </Link>
            </div>
          </div>
        </ContentBox>
      </div>
      <div className="h-7k w-full px-6 sm:w-2/3 md:h-6.6k md:w-5/12 md:px-0 lg:w-1/3 lg:h-6.7k xl:w-4/12 2xl:w-3/12 2xl:!h-7.3k">
        <HomeSwiper slides={hero?.carouselslides} />
      </div>
    </div>
  );
};

export default HomeSection;
