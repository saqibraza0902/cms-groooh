import { home_details, services_page } from "@/utils/function";
import { IHome, IPageService, IServicesPage } from "@/utils/types";
import React from "react";
import HeroComponent from "../(service-components)/hero-component";
import ExpertiseComponent from "../(service-components)/expertise-component";
import TechStackComponent from "../(service-components)/techstack-component";
import BlogSection from "@/layout/home-layout/blog-section";
import ContactComponent from "../(service-components)/contact-component";

interface IProp {
  slug: string;
}
const SubServicesLayout = async ({ slug }: IProp) => {
  const home_detail: IHome = await home_details();
  const services_details: IPageService[] = await services_page();
  if (!services_details) {
    return <div>loading...</div>;
  }

  const matchingService = services_details?.find((el) => el.url === slug);

  if (!matchingService) {
    return <div>No service found</div>;
  }
  return (
    <div>
      <section>
        <HeroComponent
          title={matchingService?.hero_section?.text}
          image={matchingService?.hero_section?.image}
        />
      </section>
      <section className="bg-brand_green-700 h-full pl-1 pr-4 py-10 lg:p-20 ">
        <ExpertiseComponent
          expertise={matchingService?.expertise_section?.expertise}
          title={matchingService?.expertise_section?.title}
        />
      </section>
      {matchingService.tech_stack.length > 0 && (
        <section className="h-full px-5 py-10 lg:px-20">
          <TechStackComponent partners={matchingService.tech_stack} />
        </section>
      )}

      {/* <section className="h-full min-h-full bg-brand_blue-300 pl-4 pr-9 py-10 lg:p-20 ">
        <BlogSection mydata={home_detail.BlogSection} />
      </section> */}
      <section className="h-full min-h-full bg-primary pl-4 pr-9 py-10 lg:p-20 ">
        <ContactComponent />
      </section>
    </div>
  );
};

export default SubServicesLayout;
