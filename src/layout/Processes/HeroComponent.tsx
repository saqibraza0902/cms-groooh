import { AnimatedHeroNav } from "@/ui/components/AnimatedButton";
import ContentBox from "@/ui/components/ContentBox";
import { PUBLIC_URLS } from "@/utils/urls";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IProp {
  title: string;
  image: string;
}

const HeroComponent = ({ image, title }: IProp) => {
  return (
    <section className="h-full dark:bg-black pl-4 pr-9 lg:px-20 py-20 w-full">
      <ContentBox
        className="bg-brand_blue-300 "
        childClass="bg-black dark:!bg-white"
      >
        <div className="flex flex-col w-full h-full justify-center ">
          <div className="flex flex-col lg:flex-row lg:h-5/6 w-full items-center">
            <div className="lg:w-1/2 h-96 flex items-center px-5 rounded-2xl">
              <h1 className="font-extrabold z-40 w-full text-center lg:text-left text-3xl lg:text-6xl font-SuisseBold xl:text-[80px] lg:leading-[100px] text-black uppercase ">
                {title}
              </h1>
            </div>
            <div className="lg:w-1/2 flex justify-end">
              <Image
                height={200}
                width={200}
                alt="Icon"
                className="lg:w-4/6"
                src={image}
              />
            </div>
          </div>
          <div className="lg:w-4/6 lg:h-1/6 px-2 flex flex-col lg:flex-row lg:items-end pt-2">
            <div className="flex items-center gap-4">
              <div className="bg-white dark:bg-black md:flex min-w-36 h-10 my-3 relative rounded-xl">
                <Link
                  href={PUBLIC_URLS.CONTACT}
                  className="absolute capitalize text-sm -top-1 -left-1"
                >
                  <AnimatedHeroNav
                    className="bg-black h-10 min-w-36"
                    text="CONTACT US"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ContentBox>
    </section>
  );
};

export default HeroComponent;
