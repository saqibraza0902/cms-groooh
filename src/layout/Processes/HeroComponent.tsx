import { AnimatedHeroNav, ButtonLayout } from "@/ui/components/AnimatedButton";
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
      <ContentBox className="bg-primary " childClass="bg-secondary">
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
          <div className="lg:w-4/6 lg:h-1/6 pl-6 flex flex-col lg:flex-row lg:items-end pt-2">
            <div className="flex items-center gap-4">
              <Link href={PUBLIC_URLS.CONTACT}>
                <ButtonLayout>Contact Us</ButtonLayout>
              </Link>
            </div>
          </div>
        </div>
      </ContentBox>
    </section>
  );
};

export default HeroComponent;
