import React from "react";
import HeroComponent from "./hero-component";
import CTOMessageComponent from "./cto-message-component";
import ProcessesDetailsSection from "./process-details-component";
import ContactComponent from "../services-layout/(service-components)/contact-component";
import { get_processes } from "@/utils/function";

const ProcessesLayout = async () => {
  const data = await get_processes();

  return (
    <div>
      <section className="w-full h-full dark:bg-black pl-6 pr-11 lg:px-14 py-20">
        <HeroComponent
          title={data?.hero_section?.text}
          image={data?.hero_section?.image}
        />
      </section>
      <section className="h-full bg-primary 2xl:h-fit   w-full lg:px-14 py-10 ">
        <ProcessesDetailsSection prop={data?.processes_section} />
      </section>
      <section className="px-14 bg-white dark:bg-black py-10 min-h-screen h-fit flex items-center">
        <CTOMessageComponent prop={data?.cto_section} />
      </section>
      <section className="h-full min-h-full  bg-primary px-6 py-10 lg:py-20 lg:px-14">
        <ContactComponent />
      </section>
    </div>
  );
};

export default ProcessesLayout;
