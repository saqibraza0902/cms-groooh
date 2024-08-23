import CommonLayout from "@/layout";
import React from "react";
import Services from "@/layout/home-layout/services-section";
import HomeSection from "@/layout/home-layout/home-section";
import RatingSection from "@/layout/home-layout/rating-section";
import PartnerSection from "@/layout/home-layout/partner-section";
import BlogSection from "@/layout/home-layout/blog-section";
import WorkSection from "@/layout/home-layout/work-section";
import ScrollTextSection from "@/layout/home-layout/scroll-text-section";
import { home_details } from "@/utils/function";
import { IHome } from "@/utils/types";

const Home = async () => {
  const home_detail: IHome = await home_details();
  return (
    <CommonLayout>
      <section className="bg-white dark:bg-black h-full py-10 lg:h-lg 2xl:h-2xl">
        <HomeSection hero={home_detail?.HeroSection} />
      </section>
      <section className="bg-white  pl-11 pr-6 py-20 lg:mt-0 lg:px-28 h-full lg:h-full 2xl:h-screen flex  flex-col justify-center items-center">
        <ScrollTextSection text={home_detail?.ScrollText} />
      </section>
      <section className="h-full bg-brand_green-700 dark:bg-black 2xl:h-2xl flex justify-center items-center pl-6 pr-11 py-20 lg:pl-14 lg:pr-[60px]">
        <Services services={home_detail?.ServicesPage} />
      </section>

      <section className="h-full py-10 bg-primary w-full lg:px-14 lg:min-h-[700px] 2xl:h-fit ">
        <RatingSection rating={home_detail.RatingSection} />
      </section>
      <section className="min-h-screen bg-brand_pink-100 pl-6 pr-11 py-10 flex items-center justify-center h-full lg:px-14 lg:min-h-[850px] 2xl:h-2xl">
        <WorkSection title={home_detail?.WorksSection?.title} />
      </section>
      <section className="h-full px-6 py-10 lg:p-20 flex justify-center items-center bg-brand_green-700">
        <PartnerSection partners={home_detail.PartnersSection} />
      </section>
      <section className="h-full min-h-screen 2xl:min-h-fit bg-white pl-6 pr-11 py-10 lg:px-14 lg:py-20 ">
        <BlogSection mydata={home_detail.BlogSection} />
      </section>
    </CommonLayout>
  );
};

export default Home;
