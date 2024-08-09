import React from "react";
import HeroComponent from "./HeroComponent";
import CTOMessageComponent from "./CTOMessageComponent";
import ProcessesDetailsSection from "./ProcessDetailsComponent";
import ContactComponent from "../Services/(ServiceComponents)/ContactComponent";
import { get_processes } from "@/utils/function";

const ProcessesLayout = async () => {
  const data = await get_processes();

  return (
    <div>
      <section>
        <HeroComponent
          title={data.hero_section.text}
          image={data.hero_section.image}
        />
      </section>
      <section className="h-full bg-primary 2xl:h-screen flex flex-col lg:flex-row  w-full lg:px-20 py-10">
        <ProcessesDetailsSection prop={data.processes_section} />
      </section>
      <section className="px-12 bg-white py-10 h-screen flex items-center">
        <CTOMessageComponent prop={data.cto_section} />
      </section>
      <section className="h-full min-h-full bg-primary pl-4 pr-9 py-10 lg:p-20 ">
        <ContactComponent />
      </section>
    </div>
  );
};

export default ProcessesLayout;
