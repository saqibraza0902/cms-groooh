import Image from "next/image";
import React from "react";
import RatingSection from "../home-layout/rating-section";
import { IHome, IServicesPage, IWebServices } from "@/utils/types";
import { home_details } from "@/utils/function";
import Offers from "./Offers";
import Link from "next/link";
import { PUBLIC_URLS } from "@/utils/urls";
import { ButtonLayout } from "@/ui/components/animated-button";
import ContentBox from "@/ui/components/content-box";

interface IProp {
  data: IWebServices;
}
const ServicesLayout = async ({ data }: IProp) => {
  const home_detail: IHome = await home_details();
  const { HeroSection, DesignProcessSection, OffersSection } = data;
  return (
    <div className="h-full w-full">
      <section className="h-full pl-4 pr-9 lg:px-14 py-20 w-full">
        <ContentBox className="bg-brand_blue-300 " childClass="bg-black">
          <div className="flex flex-col w-full h-full justify-center ">
            <div className="flex flex-col lg:flex-row lg:h-5/6 w-full items-center">
              <h1 className="text-4xl lg:text-[80px] lg:leading-[90px] font-semibold lg:w-4/6">
                {HeroSection?.text1}
              </h1>
              <Image
                height={200}
                width={200}
                alt="Icon"
                className="lg:w-2/6"
                src={HeroSection?.image}
              />
            </div>
            <div className="h-[0.5px]  w-full bg-brand_gray-100" />
            <div className="lg:w-4/6 lg:h-1/6 flex flex-col lg:flex-row lg:items-end pt-2">
              <div className="flex items-center gap-4">
                <p className="lg:text-5xl font-semibold">{HeroSection.text2}</p>
                <p className="lg:w-4/12 capitalize lg:text-xl font-semibold">
                  {HeroSection.text3}
                </p>
              </div>
              <div className="w-[0.5px] h-10 hidden lg:flex bg-brand_gray-100 mx-10 " />
              <div className="flex items-center gap-4">
                <p className="lg:text-5xl font-semibold">{HeroSection.text4}</p>
                <p className="lg:w-6/12 capitalize lg:text-xl font-semibold">
                  {HeroSection.text5}
                </p>
              </div>
            </div>
          </div>
        </ContentBox>
      </section>
      <section className="h-full p-4 lg:p-20 flex justify-center items-center bg-brand_green-300">
        <div className="grid grid-cols-2 lg:grid-cols-3 ">
          {OffersSection?.offers?.map((el, i) => (
            <Offers key={i} el={el} i={i} />
          ))}
        </div>
      </section>
      <section className="h-full bg-brand_blue-300 2xl:h-screen flex flex-col lg:flex-row  w-full  lg:px-20 py-10">
        <RatingSection rating={home_detail.RatingSection} />
      </section>
      <section className="h-full bg-brand_blue-300 2xl:h-screen flex flex-col gap-10 w-full lg:px-20 py-10">
        <div className="w-full pl-4 pr-9  h-full">
          <ContentBox>
            <div>
              <h3 className="w-1/3 text-black lg:text-7xl font-semibold">
                {DesignProcessSection?.title}
              </h3>
            </div>
            <div className="py-10 h-full space-y-5">
              {DesignProcessSection?.processes?.map((el, i) => (
                <div
                  key={i}
                  className="bg-brand_white-200 flex flex-col lg:flex-row w-full h-max p-5 rounded-xl "
                >
                  <div className="flex lg:w-1/2 items-center gap-3">
                    <Image src={el.icon} alt="" width={40} height={40} />
                    <div className="flex flex-col ">
                      <span className="text-black font-semibold text-xl">
                        {el.title}
                      </span>
                      <span className="text-black opacity-70 font-medium text-sm">
                        {el.time}
                      </span>
                    </div>
                  </div>

                  <div className="lg:w-1/2">
                    <p className="text-black opacity-70">{el.description}</p>
                    <div className="mt-4 items-center text-black col-span-2 flex flex-wrap w-full gap-2">
                      <span className="text-sm opacity-70 flex-wrap inline-block">
                        Deliverables:
                      </span>
                      <div className="col-span-2 flex flex-wrap gap-2">
                        {el.deliverables.map((item, i) => (
                          <span
                            key={i}
                            className="border-[#02021e4d] border-[1px] rounded-full px-4 text-sm py-1 inline-block"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-[1px] border-[#02021e4d] flex flex-col lg:flex-row w-full h-max px-5 py-5 rounded-xl ">
                <div className="flex lg:w-1/2 items-center gap-3">
                  <Image
                    src={DesignProcessSection?.nextphase?.icon}
                    alt=""
                    height={40}
                    width={40}
                  />
                  <div className="flex flex-col ">
                    <span className="text-black font-semibold text-xl">
                      {DesignProcessSection.nextphase.title}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:w-1/2 gap-5 items-center">
                  {DesignProcessSection?.nextphase?.plans?.map((el, i) => (
                    <div
                      key={i}
                      className="h-full bg-brand_white-200 text-black gap-2 w-full flex flex-col rounded-lg p-3 "
                    >
                      <span className="text-xl font-semibold">{el.title}</span>
                      <span className="opacity-70 text-sm">
                        {el.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ContentBox>
        </div>

        <div className="border py-10 px-5 mx-5 rounded-xl">
          <h3 className="text-center text-xl font-semibold">
            Need it simpler and faster? We have a solution for you!
          </h3>
          <div className="flex justify-center ">
            <div className="bg-white min-w-36 w-min h-10 my-3 rounded-xl">
              <Link href={PUBLIC_URLS.CONTACT} className=" capitalize text-sm ">
                <ButtonLayout className="bg-black h-10 min-w-36">
                  CONTACT US
                </ButtonLayout>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesLayout;
